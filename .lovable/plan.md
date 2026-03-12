

## Plan: Obscure Admin Portal URLs

The admin routes (`/admin`, `/admin/login`) are easily guessable. We'll change them to a non-obvious path that only authorized users would know.

### Changes

**`src/App.tsx`**
- `/admin/login` → `/portal/a7x9/login`
- `/admin` → `/portal/a7x9`

**`src/pages/AdminLogin.tsx`**
- `navigate('/admin')` → `navigate('/portal/a7x9')`

**`src/pages/AdminDashboard.tsx`**
- `navigate('/admin/login')` → `navigate('/portal/a7x9/login')`

**`src/hooks/useAdmin.ts`**
- `navigate('/admin/login')` → `navigate('/portal/a7x9/login')`

No links to the admin portal will exist on the public landing page. The URL is only known to administrators.

