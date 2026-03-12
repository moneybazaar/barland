

# Admin Management System with Entropy-Based Authorization

## Concept (Refined)

Instead of a static `SEED_SECRET`, authorization for admin management operations uses a **derived key** computed from a server-side salt combined with the admin email being acted upon. This ensures:

- Each operation is **email-specific** -- a token for `alice@example.com` cannot be reused for `bob@example.com`
- The salt is stored server-side only (as a secret), never exposed to the client
- The derivation uses HMAC-SHA256 for cryptographic strength
- No single master password grants blanket admin-creation power

**How it works:**

```text
User provides:   email + authorization_token
Server computes: HMAC-SHA256(ADMIN_SALT, email)
Server compares: computed_hash === authorization_token
Match? → proceed. No match? → 403 Forbidden.
```

To generate a valid token, someone must know both the secret salt AND the target email. The token is different for every email address.

## Changes

### 1. Replace `seed-admin` edge function with `manage-admin`

A single edge function supporting two actions:

- **`seed`** -- Create or update an admin user (email + password + authorization token)
- **`delete`** -- Remove admin role and optionally delete the user (email + authorization token)

Authorization: HMAC-SHA256 of `ADMIN_SALT` + provided email, compared against the `authorization_token` in the request body. No more static `SEED_SECRET`.

Request format:
```json
{ "action": "seed", "email": "...", "password": "...", "authorization_token": "..." }
{ "action": "delete", "email": "...", "authorization_token": "..." }
```

### 2. Update `supabase/config.toml`

Add `verify_jwt = false` for the new function.

### 3. Update Admin Login page

Add a collapsible "Admin Management" section below the login form with:
- Action toggle: Seed / Delete
- Email input
- Password input (only for seed)
- Authorization token input (the HMAC they pre-computed)
- Submit button that calls the `manage-admin` edge function

### 4. Secret configuration

Replace `SEED_SECRET` with `ADMIN_SALT` -- a random 64-character hex string stored as a backend secret. Remove `ADMIN_EMAIL` and `ADMIN_PASSWORD` since credentials are now passed per-request.

### 5. Delete old `seed-admin` function

Remove `supabase/functions/seed-admin/index.ts`.

## How admins generate their token

Admins use any HMAC-SHA256 tool (online or CLI) with the shared salt and their email:

```bash
echo -n "admin@example.com" | openssl dgst -sha256 -hmac "THE_SALT_VALUE"
```

This output is their authorization token. Without the salt, the token cannot be forged.

