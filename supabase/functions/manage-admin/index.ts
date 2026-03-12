import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function hmacSha256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(key)
  const msgData = encoder.encode(message)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function getServiceClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

async function getOrCreateSalt(supabase: ReturnType<typeof createClient>): Promise<{ salt: string; isNew: boolean }> {
  // Try to read existing salt
  const { data, error } = await supabase
    .from('system_config')
    .select('value')
    .eq('key', 'ADMIN_SALT')
    .maybeSingle()

  if (error) throw new Error(`Failed to read system_config: ${error.message}`)

  if (data?.value) {
    return { salt: data.value, isNew: false }
  }

  // Generate a cryptographically secure 64-char hex salt
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  const newSalt = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

  const { error: insertError } = await supabase
    .from('system_config')
    .insert({ key: 'ADMIN_SALT', value: newSalt })

  if (insertError) throw new Error(`Failed to store salt: ${insertError.message}`)

  return { salt: newSalt, isNew: true }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, email, password, authorization_token } = await req.json()

    const supabase = getServiceClient()

    // Handle get-salt action — returns the current salt (auto-generates if needed)
    if (action === 'get-salt') {
      const { salt, isNew } = await getOrCreateSalt(supabase)
      return new Response(
        JSON.stringify({
          success: true,
          salt,
          generated: isNew,
          message: isNew
            ? 'New salt generated and stored. Save this value to compute authorization tokens.'
            : 'Existing salt retrieved.',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!action || !email || !authorization_token) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: action, email, authorization_token' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'seed' && !password) {
      return new Response(
        JSON.stringify({ error: 'Password is required for seed action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!['seed', 'delete'].includes(action)) {
      return new Response(
        JSON.stringify({ error: 'Invalid action. Use "seed", "delete", or "get-salt".' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get or create the salt from the database
    const { salt, isNew } = await getOrCreateSalt(supabase)

    const expectedToken = await hmacSha256(salt, email.toLowerCase().trim())

    // Constant-time comparison to prevent timing attacks
    if (authorization_token.length !== expectedToken.length) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: invalid authorization token' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let mismatch = 0
    for (let i = 0; i < expectedToken.length; i++) {
      mismatch |= expectedToken.charCodeAt(i) ^ authorization_token.charCodeAt(i)
    }

    if (mismatch !== 0) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: invalid authorization token' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Authorized — proceed
    const normalizedEmail = email.toLowerCase().trim()

    if (action === 'seed') {
      const { data: existingUsers } = await supabase.auth.admin.listUsers()
      const existingUser = existingUsers?.users?.find(u => u.email === normalizedEmail)

      let userId: string

      if (existingUser) {
        userId = existingUser.id
        await supabase.auth.admin.updateUserById(userId, {
          password,
          email_confirm: true,
        })
      } else {
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: normalizedEmail,
          password,
          email_confirm: true,
        })
        if (createError) throw createError
        userId = newUser.user.id
      }

      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: 'admin' }, { onConflict: 'user_id,role' })

      if (roleError) throw roleError

      const response: Record<string, unknown> = {
        success: true,
        message: 'Admin user seeded successfully',
        userId,
      }

      // Include salt on first generation so the admin can note it down
      if (isNew) {
        response.salt = salt
        response.salt_notice = 'A new salt was auto-generated. Save this value to compute future authorization tokens.'
      }

      return new Response(
        JSON.stringify(response),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'delete') {
      const { data: existingUsers } = await supabase.auth.admin.listUsers()
      const existingUser = existingUsers?.users?.find(u => u.email === normalizedEmail)

      if (!existingUser) {
        return new Response(
          JSON.stringify({ error: 'User not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { error: deleteRoleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', existingUser.id)
        .eq('role', 'admin')

      if (deleteRoleError) throw deleteRoleError

      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(existingUser.id)
      if (deleteUserError) throw deleteUserError

      return new Response(
        JSON.stringify({ success: true, message: 'Admin user deleted successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
