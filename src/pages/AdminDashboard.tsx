import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, CalendarDays, TrendingUp, Search, Download, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import barclaysLogo from '@/assets/barclays-logo-dark.svg';
import InviteClientSection from '@/components/admin/InviteClientSection';

const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  new: { label: 'New', dot: 'bg-blue-500', bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800' },
  contacted: { label: 'Contacted', dot: 'bg-amber-500', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800' },
  converted: { label: 'Converted', dot: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' },
  archived: { label: 'Archived', dot: 'bg-gray-400', bg: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700' },
};

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAdmin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/portal/a7x9/login');
    }
  }, [user, isAdmin, loading, navigate]);

  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ['admin-leads', statusFilter, regionFilter],
    queryFn: async () => {
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (regionFilter !== 'all') query = query.eq('region', regionFilter);
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: isAdmin,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('leads').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      toast({ title: 'Status updated' });
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(210 20% 98%)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      lead.first_name?.toLowerCase().includes(q) ||
      lead.last_name?.toLowerCase().includes(q) ||
      lead.email?.toLowerCase().includes(q) ||
      lead.phone?.toLowerCase().includes(q)
    );
  });

  const totalLeads = leads.length;
  const newToday = leads.filter(l => {
    const created = new Date(l.created_at || '');
    const today = new Date();
    return created.toDateString() === today.toDateString();
  }).length;
  const upcoming = leads.filter(l => {
    if (!l.preferred_date) return false;
    return new Date(l.preferred_date) >= new Date();
  }).length;

  const stats = [
    { label: 'Total Leads', value: totalLeads, icon: Users, accent: 'border-l-primary' },
    { label: 'New Today', value: newToday, icon: TrendingUp, accent: 'border-l-accent' },
    { label: 'Upcoming Callbacks', value: upcoming, icon: CalendarDays, accent: 'border-l-[hsl(38,92%,50%)]' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navy Header */}
      <header className="text-secondary-foreground" style={{ background: 'hsl(200 100% 18%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img src={barclaysLogo} alt="Barclays" className="h-6" />
            <div className="h-6 w-px bg-white/20" />
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Admin Portal</h1>
              <p className="text-xs text-white/60">Lead Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/50 hidden sm:block">{user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-card rounded-xl p-5 border border-border border-l-4 ${stat.accent} relative overflow-hidden`}
            >
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-muted-foreground/50" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/50 border-0"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-9 bg-muted/50 border-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-36 h-9 bg-muted/50 border-0">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="US">US</SelectItem>
              <SelectItem value="SG">Singapore</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-muted-foreground">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>

        {/* Leads Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {leadsLoading ? (
            <div className="p-12 text-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 text-center">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-foreground font-medium mb-1">No leads found</p>
              <p className="text-muted-foreground text-sm">
                {searchQuery ? 'Try adjusting your search or filters.' : 'Leads will appear here when submitted.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent" style={{ background: 'hsl(210 20% 97%)' }}>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider">Name</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider">Contact</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider">Callback</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider">Region</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider">Source</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider">Status</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider">Date</TableHead>
                  <TableHead className="w-8" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const isExpanded = expandedRow === lead.id;
                  const sc = statusConfig[lead.status] || statusConfig.new;
                  return (
                    <>
                      <TableRow
                        key={lead.id}
                        className="cursor-pointer group"
                        onClick={() => setExpandedRow(isExpanded ? null : lead.id)}
                      >
                        <TableCell className="font-medium">{lead.first_name} {lead.last_name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{lead.email}</TableCell>
                        <TableCell className="text-sm">
                          {lead.preferred_date ? format(new Date(lead.preferred_date), 'MMM d, yyyy') : '—'}
                          {lead.preferred_time && (
                            <span className="text-muted-foreground ml-1 capitalize">· {lead.preferred_time}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs font-medium">{lead.region}</Badge>
                        </TableCell>
                        <TableCell className="capitalize text-sm text-muted-foreground">{lead.source}</TableCell>
                        <TableCell>
                          <Select
                            value={lead.status}
                            onValueChange={(val) => {
                              updateStatusMutation.mutate({ id: lead.id, status: val });
                            }}
                          >
                            <SelectTrigger
                              className={`w-32 h-7 text-xs border ${sc.bg} gap-1.5`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                              {sc.label}
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusConfig).map(([key, cfg]) => (
                                <SelectItem key={key} value={key}>
                                  <span className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                    {cfg.label}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {lead.created_at ? format(new Date(lead.created_at), 'MMM d, yyyy') : '—'}
                        </TableCell>
                        <TableCell>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow key={`${lead.id}-detail`} className="bg-muted/30 hover:bg-muted/30">
                          <TableCell colSpan={8} className="py-4">
                            <div className="flex flex-wrap gap-6 text-sm pl-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-3.5 h-3.5" />
                                <span>{lead.phone || 'No phone'}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-3.5 h-3.5" />
                                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
                              </div>
                              {lead.preferred_time && (
                                <div className="text-muted-foreground">
                                  Preferred time: <span className="capitalize font-medium text-foreground">{lead.preferred_time}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          )}
          {/* Footer count */}
          {filteredLeads.length > 0 && (
            <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
              Showing {filteredLeads.length} of {totalLeads} leads
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
