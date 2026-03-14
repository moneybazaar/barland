

# Invite Link System for Admin Portal

## Overview

Add an invite system where the admin can enter a client's email in the dashboard, generating a unique registration link with a randomized token. The token tracks who was invited and whether they signed up.

## Database

**New table: `invite_tokens`**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| email | text | Invited email |
| token | text | Random 32-char hex, unique |
| created_at | timestamptz | Default now() |
| expires_at | timestamptz | Default now() + 7 days |
| used_at | timestamptz | Nullable, set on registration |
| invited_by | uuid | Admin user ID |

RLS: Admins can SELECT/INSERT/UPDATE. Anon can SELECT (to validate token on registration page).

## Admin Dashboard Changes (`AdminDashboard.tsx`)

Add an "Invite Client" section above the leads table:
- Email input + "Send Invite Link" button
- On submit: insert row into `invite_tokens` with a `crypto.randomUUID()`-based token
- Display the generated link (e.g., `https://bonds.domain.com/register-interest?ref=<token>`) in a copyable field
- Show a small table of recent invites with status (pending/used/expired)

## Registration Page Changes (`RegisterInterest.tsx`)

- Read `ref` query param from URL
- On page load, validate token against `invite_tokens` (exists, not expired, not used)
- If invalid/missing token: show access denied or redirect
- Pre-fill the email field from the invite record (read-only)
- On successful registration: update `invite_tokens` set `used_at = now()`

## File Summary

| File | Action |
|------|--------|
| Migration SQL | Create `invite_tokens` table + RLS policies |
| `src/pages/AdminDashboard.tsx` | Add invite section with email input and link generator |
| `src/pages/RegisterInterest.tsx` | Read `ref` param, validate token, pre-fill email, mark used on submit |

## Security

- Tokens are 32-byte random hex (cryptographically strong)
- 7-day expiry prevents stale links
- Each token is single-use (marked on registration)
- Only admin can create tokens (RLS + `has_role` check)
- Registration is gated behind a valid invite token

