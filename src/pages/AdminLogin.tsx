import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Lock, Mail, ChevronDown, Shield, UserPlus, UserMinus } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Management state
  const [mgmtOpen, setMgmtOpen] = useState(false);
  const [mgmtAction, setMgmtAction] = useState<'seed' | 'delete'>('seed');
  const [mgmtEmail, setMgmtEmail] = useState('');
  const [mgmtPassword, setMgmtPassword] = useState('');
  const [mgmtToken, setMgmtToken] = useState('');
  const [mgmtLoading, setMgmtLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: hasAdmin } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin',
        });

        if (hasAdmin) {
          navigate('/portal/a7x9');
        } else {
          await supabase.auth.signOut();
          toast({
            title: 'Access Denied',
            description: 'You do not have admin privileges.',
            variant: 'destructive',
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMgmtLoading(true);

    try {
      const payload: Record<string, string> = {
        action: mgmtAction,
        email: mgmtEmail,
        authorization_token: mgmtToken,
      };
      if (mgmtAction === 'seed') {
        payload.password = mgmtPassword;
      }

      const { data, error } = await supabase.functions.invoke('manage-admin', {
        body: payload,
      });

      if (error) throw error;

      if (data?.success) {
        toast({
          title: mgmtAction === 'seed' ? 'Admin Seeded' : 'Admin Deleted',
          description: data.message,
        });
        setMgmtEmail('');
        setMgmtPassword('');
        setMgmtToken('');
      } else {
        throw new Error(data?.error || 'Unknown error');
      }
    } catch (error: any) {
      toast({
        title: 'Operation Failed',
        description: error.message || 'Could not complete the operation.',
        variant: 'destructive',
      });
    } finally {
      setMgmtLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Login Card */}
        <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground mt-1">Sign in to manage leads and appointments</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="admin@barclays-ib.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 font-semibold" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Admin Management Collapsible */}
        <Collapsible open={mgmtOpen} onOpenChange={setMgmtOpen}>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              <Shield className="w-4 h-4" />
              Admin Management
              <ChevronDown className={`w-4 h-4 transition-transform ${mgmtOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-background rounded-2xl p-6 shadow-lg border border-border">
              {/* Action Toggle */}
              <div className="flex rounded-lg border border-border overflow-hidden mb-5">
                <button
                  type="button"
                  onClick={() => setMgmtAction('seed')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                    mgmtAction === 'seed'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  Seed Admin
                </button>
                <button
                  type="button"
                  onClick={() => setMgmtAction('delete')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                    mgmtAction === 'delete'
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <UserMinus className="w-4 h-4" />
                  Delete Admin
                </button>
              </div>

              <form onSubmit={handleManageAdmin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Admin email"
                    value={mgmtEmail}
                    onChange={(e) => setMgmtEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>

                {mgmtAction === 'seed' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Admin password"
                      value={mgmtPassword}
                      onChange={(e) => setMgmtPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Authorization token (HMAC-SHA256)"
                    value={mgmtToken}
                    onChange={(e) => setMgmtToken(e.target.value)}
                    className="pl-10 font-mono text-xs"
                    required
                  />
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Token = HMAC-SHA256(ADMIN_SALT, email). Generate via CLI:{' '}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-[10px]">
                    echo -n "email" | openssl dgst -sha256 -hmac "SALT"
                  </code>
                </p>

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold"
                  variant={mgmtAction === 'delete' ? 'destructive' : 'default'}
                  disabled={mgmtLoading}
                >
                  {mgmtLoading
                    ? 'Processing...'
                    : mgmtAction === 'seed'
                      ? 'Seed Admin User'
                      : 'Delete Admin User'}
                </Button>
              </form>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default AdminLogin;
