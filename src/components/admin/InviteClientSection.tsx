import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Copy, Check, LinkIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const PUBLISHED_URL = 'https://barland.lovable.app';

function generateToken(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

function getInviteStatus(invite: { used_at: string | null; expires_at: string }): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } {
  if (invite.used_at) return { label: 'Used', variant: 'secondary' };
  if (new Date(invite.expires_at) < new Date()) return { label: 'Expired', variant: 'destructive' };
  return { label: 'Pending', variant: 'outline' };
}

interface InviteClientSectionProps {
  adminUserId: string;
}

const InviteClientSection = ({ adminUserId }: InviteClientSectionProps) => {
  const [email, setEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: invites = [], isLoading } = useQuery({
    queryKey: ['invite-tokens'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invite_tokens')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data || [];
    },
  });

  const createInviteMutation = useMutation({
    mutationFn: async (inviteEmail: string) => {
      const token = generateToken();
      const { error } = await supabase.from('invite_tokens').insert({
        email: inviteEmail,
        token,
        invited_by: adminUserId,
      });
      if (error) throw error;
      return token;
    },
    onSuccess: (token) => {
      const link = `${PUBLISHED_URL}/register-interest?ref=${token}`;
      setGeneratedLink(link);
      setEmail('');
      queryClient.invalidateQueries({ queryKey: ['invite-tokens'] });
      toast({ title: 'Invite link generated' });
    },
    onError: () => {
      toast({ title: 'Failed to create invite', variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    createInviteMutation.mutate(email.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <LinkIcon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Invite Client</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[250px]">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="client@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9 h-9 bg-muted/50 border-0"
            required
          />
        </div>
        <Button type="submit" size="sm" className="h-9" disabled={createInviteMutation.isPending}>
          {createInviteMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />}
          Generate Invite Link
        </Button>
      </form>

      {generatedLink && (
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg mb-4">
          <code className="text-xs flex-1 truncate text-foreground">{generatedLink}</code>
          <Button variant="outline" size="sm" className="h-7 shrink-0" onClick={handleCopy}>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      )}

      {/* Recent invites */}
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading invites...</p>
      ) : invites.length > 0 ? (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent" style={{ background: 'hsl(210 20% 97%)' }}>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Email</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Created</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Expires</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((inv) => {
                const status = getInviteStatus(inv);
                return (
                  <TableRow key={inv.id}>
                    <TableCell className="text-sm">{inv.email}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {format(new Date(inv.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {format(new Date(inv.expires_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="text-xs">{status.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default InviteClientSection;
