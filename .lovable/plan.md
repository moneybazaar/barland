

# Auto-Generate ADMIN_SALT in the Edge Function

The `ADMIN_SALT` secret isn't set yet. Rather than asking you to manually create and paste a salt, the edge function will **auto-generate a cryptographically secure 64-character hex salt on first invocation** and persist it in the database so it remains consistent across calls.

## Approach

1. **Create a `system_config` table** -- a simple key-value store for internal secrets like `ADMIN_SALT`. Locked down with RLS (no public access, only service-role can read/write).

2. **Update `manage-admin` edge function** -- on each call, the function checks `system_config` for the `ADMIN_SALT` key. If it doesn't exist, it generates one using `crypto.getRandomValues()` (64-char hex) and stores it. This salt is then used for HMAC verification.

3. **Add a `GET` endpoint** -- a separate action `get-salt` (also protected by service-role only) so you can retrieve the salt value when you need to compute tokens locally. Alternatively, the salt is returned once on first generation.

## How it works after implementation

- **First call** to `manage-admin` auto-generates and stores the salt, returning it in the response so you can save it
- **Subsequent calls** use the stored salt for HMAC verification
- No manual secret configuration needed
- Salt is stored in the database, accessible only via service role

## Database migration

```sql
CREATE TABLE public.system_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;
-- No public policies = no public access. Only service role can touch it.
```

## Edge function changes

- Remove dependency on `Deno.env.get('ADMIN_SALT')`
- Add `getOrCreateSalt()` helper that reads/writes from `system_config`
- Add `action: 'get-salt'` to retrieve the current salt (for token generation)
- Return the salt on first generation so the admin can note it down

