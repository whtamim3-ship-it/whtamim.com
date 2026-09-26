import React, { useState, useEffect } from 'react';
import { BlurUpImage } from './BlurUpImage';
import {
  Database,
  BarChart3,
  Search,
  Plus,
  Trash2,
  Edit3,
  Clock,
  Terminal,
  RefreshCw,
  X,
  Server,
  HardDrive,
  Filter,
  Layers,
  FileText,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';
import { usePortfolio, Inquiry, DynamicProject } from '../context/PortfolioContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DatabaseDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullAdmin?: () => void;
}

export const DatabaseDashboard: React.FC<DatabaseDashboardProps> = ({
  isOpen,
  onClose,
  onOpenFullAdmin
}) => {
  useBodyScrollLock(isOpen);

  const {
    projects,
    isAdminAuthenticated,
    adminUser,
    login,
    logout,
    addProject,
    updateProject,
    deleteProject,
    fetchInquiries,
    updateInquiryStatus,
    deleteInquiry,
    refreshContent
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'portfolio' | 'inspector' | 'sql'>('overview');

  // Login form state
  const [authEmail, setAuthEmail] = useState('whtamim3@gmail.com');
  const [authPassword, setAuthPassword] = useState('');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Inquiries fetched from backend
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // SQL Query Runner state
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM inquiries WHERE status = "New"');
  const [sqlOutput, setSqlOutput] = useState<string>('Ready for execution...');

  // Modal for adding/editing record
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingType, setEditingType] = useState<'inquiry' | 'portfolio'>('inquiry');
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  // Load inquiries when modal is open and user is authenticated
  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const inqs = await fetchInquiries();
      setInquiries(inqs);
      await refreshContent();
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAdminAuthenticated) {
      loadData();
    }
  }, [isOpen, isAdminAuthenticated]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    playSubtleClickSound();

    const res = await login(authEmail.trim(), authPassword);
    setAuthLoading(false);
    if (!res.success) {
      setAuthError(res.error || 'Invalid credentials');
    } else {
      loadData();
    }
  };

  const handleFillDemo = () => {
    setAuthEmail('whtamim3@gmail.com');
    setAuthPassword('whtamim2026!');
    setAuthError(null);
    playSubtleClickSound();
  };

  // Chart data calculations
  const inquiriesByStatus = [
    { name: 'New', count: inquiries.filter((i) => i.status === 'New').length },
    { name: 'Contacted', count: inquiries.filter((i) => i.status === 'Contacted').length },
    { name: 'In Progress', count: inquiries.filter((i) => i.status === 'In Progress').length },
    { name: 'Archived', count: inquiries.filter((i) => i.status === 'Archived').length },
  ];

  const portfolioByCategory = [
    { name: 'SaaS & UI', value: projects.filter((p) => p.filterCategory === 'SaaS & UI').length },
    { name: 'Commercials', value: projects.filter((p) => p.filterCategory === 'Commercials').length },
    { name: 'Cinematic / VFX', value: projects.filter((p) => p.filterCategory === 'Cinematic / VFX').length },
    { name: 'Documentary', value: projects.filter((p) => p.filterCategory === 'Documentary').length },
    { name: 'Talking Head', value: projects.filter((p) => p.filterCategory === 'Talking Head').length },
  ].filter((item) => item.value > 0);

  const COLORS = ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55'];

  const handleRunSql = () => {
    playSubtleClickSound();
    const query = sqlQuery.trim().toLowerCase();
    if (query.includes('from inquiries') || query.includes('inquiries')) {
      setSqlOutput(JSON.stringify(inquiries, null, 2));
    } else if (query.includes('from portfolio') || query.includes('portfolio') || query.includes('projects')) {
      setSqlOutput(JSON.stringify(projects, null, 2));
    } else if (query.includes('count')) {
      setSqlOutput(`Query result: Total records = ${inquiries.length + projects.length}`);
    } else {
      setSqlOutput(`Query executed successfully. Result set:\n${JSON.stringify({ status: 'OK', records: projects.length + inquiries.length, timestamp: new Date().toISOString() }, null, 2)}`);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm('Delete this inquiry?')) {
      playSubtleClickSound();
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      playSubtleClickSound();
      await deleteProject(id);
    }
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    playSubtleClickSound();

    if (editingType === 'inquiry') {
      if (modalMode === 'add') {
        const newInq: Inquiry = {
          id: `inq-${Date.now()}`,
          name: currentRecord.name || 'Untitled Client',
          email: currentRecord.email || 'client@example.com',
          projectType: currentRecord.service || currentRecord.projectType || 'SaaS UI Animation',
          budget: currentRecord.budget || '$5,000+',
          timeline: currentRecord.timeline || '2 weeks',
          message: currentRecord.message || 'No additional details provided.',
          status: 'New',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        };
        setInquiries((prev) => [newInq, ...prev]);
      } else if (currentRecord.id) {
        await updateInquiryStatus(currentRecord.id, currentRecord.status);
        setInquiries((prev) => prev.map((item) => (item.id === currentRecord.id ? currentRecord : item)));
      }
    } else {
      if (modalMode === 'add') {
        await addProject({
          title: currentRecord.title || 'Untitled Project',
          subtitle: currentRecord.subtitle || '',
          category: currentRecord.category || 'Motion Design',
          filterCategory: currentRecord.filterCategory || 'SaaS & UI',
          videoUrl: currentRecord.videoUrl || 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
          coverImage: currentRecord.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
          featured: false,
          uploadDate: new Date().toISOString().split('T')[0],
          role: 'Lead Motion Designer',
        });
      } else if (currentRecord.id) {
        await updateProject(currentRecord.id, currentRecord);
      }
    }

    setModalMode(null);
    setCurrentRecord(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-6xl max-h-[92vh] bg-white dark:bg-[#121214] rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-[#1D1D1F] dark:text-[#F5F5F7]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#18181B]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Studio Database &amp; CMS Dashboard</h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-11px font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online API Gateway
                </span>
              </div>
              <p className="text-12px text-neutral-500 dark:text-neutral-400">
                Manage client inquiries, live portfolio assets, and run SQL queries in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{adminUser?.email || 'admin@whtamim.work'}</span>
              </div>
            )}
            <button
              onClick={() => {
                playSubtleClickSound();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-neutral-200/60 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GUARD */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center bg-neutral-50/40 dark:bg-[#0E0E10]">
            <div className="max-w-md w-full bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-xl text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                Admin Authentication Required
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                Access to client inquiries and portfolio CMS is restricted to authorized studio administrators.
              </p>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-11px font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="admin@whtamim.work"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#007AFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-11px font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type={showAuthPassword ? 'text' : 'password'}
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-9 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#007AFF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAuthPassword(!showAuthPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                    >
                      {showAuthPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-md shadow-[#007AFF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {authLoading ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Authenticate Session</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-11px font-mono text-neutral-400">Default Demo Credentials:</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-11px font-mono text-[#007AFF] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-Fill</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-[#161619] overflow-x-auto">
              <div className="flex items-center gap-1">
                {[
                  { id: 'overview', label: 'Overview & Analytics', icon: BarChart3 },
                  { id: 'inquiries', label: `Client Inquiries (${inquiries.length})`, icon: FileText },
                  { id: 'portfolio', label: `Portfolio CMS (${projects.length})`, icon: Layers },
                  { id: 'inspector', label: 'Database Inspector', icon: HardDrive },
                  { id: 'sql', label: 'SQL Query Console', icon: Terminal },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playSubtleClickSound();
                        setActiveTab(tab.id as any);
                      }}
                      className={`flex items-center gap-2 px-4 py-3 text-13px font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'border-[#007AFF] text-[#007AFF] bg-white dark:bg-[#121214] shadow-2xs'
                          : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadData}
                  disabled={isRefreshing}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  title="Refresh from server"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Tab Content Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/40 dark:bg-[#0E0E10]">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                      <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
                        <span className="text-12px font-mono uppercase tracking-wider">Total Inquiries</span>
                        <FileText className="w-4 h-4 text-[#007AFF]" />
                      </div>
                      <div className="text-2xl font-bold">{inquiries.length}</div>
                      <div className="text-11px text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                        <span>{inquiries.filter((i) => i.status === 'New').length} pending review</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                      <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
                        <span className="text-12px font-mono uppercase tracking-wider">Portfolio Assets</span>
                        <Layers className="w-4 h-4 text-[#34C759]" />
                      </div>
                      <div className="text-2xl font-bold">{projects.length}</div>
                      <div className="text-11px text-neutral-500 dark:text-neutral-400 mt-1">
                        Synced with live frontend
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                      <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
                        <span className="text-12px font-mono uppercase tracking-wider">Database Status</span>
                        <Server className="w-4 h-4 text-[#FF9500]" />
                      </div>
                      <div className="text-2xl font-bold">Connected</div>
                      <div className="text-11px text-emerald-600 dark:text-emerald-400 mt-1">
                        Live /api/admin session active
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                      <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
                        <span className="text-12px font-mono uppercase tracking-wider">Storage Engine</span>
                        <HardDrive className="w-4 h-4 text-[#AF52DE]" />
                      </div>
                      <div className="text-2xl font-bold">Persistent JSON</div>
                      <div className="text-11px text-neutral-500 dark:text-neutral-400 mt-1">
                        Server store synchronized
                      </div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800">
                      <h3 className="text-sm font-bold mb-4">Inquiries by Status</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={inquiriesByStatus}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                            <YAxis stroke="#888888" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: 12, color: '#fff' }} />
                            <Bar dataKey="count" fill="#007AFF" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800">
                      <h3 className="text-sm font-bold mb-4">Portfolio by Category</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={portfolioByCategory}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {portfolioByCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: 12, color: '#fff' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search inquiries..."
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#007AFF]"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161618] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#1c1c1f] text-11px font-mono uppercase tracking-wider text-neutral-500">
                            <th className="py-3 px-4">Client</th>
                            <th className="py-3 px-4">Project Type</th>
                            <th className="py-3 px-4">Budget</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Received</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-13px">
                          {inquiries
                            .filter((i) => statusFilter === 'All' || i.status === statusFilter)
                            .filter(
                              (i) =>
                                i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                i.email.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((inq) => (
                              <tr key={inq.id} className="hover:bg-neutral-50/80 dark:hover:bg-[#1c1c1f]/50 transition-colors">
                                <td className="py-3 px-4 font-medium">
                                  <div>{inq.name}</div>
                                  <div className="text-11px text-neutral-400 font-mono">{inq.email}</div>
                                </td>
                                <td className="py-3 px-4">{inq.projectType || 'Standard'}</td>
                                <td className="py-3 px-4 font-mono text-12px">{inq.budget || 'Custom'}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-11px font-medium ${
                                      inq.status === 'New'
                                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                        : inq.status === 'Archived'
                                        ? 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'
                                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                    }`}
                                  >
                                    {inq.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-12px text-neutral-500 font-mono">{inq.createdAt}</td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => handleDeleteInquiry(inq.id)}
                                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 cursor-pointer"
                                      title="Delete inquiry"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PORTFOLIO CMS */}
              {activeTab === 'portfolio' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold">Portfolio Database Items ({projects.length})</h3>
                    <button
                      onClick={() => {
                        playSubtleClickSound();
                        setEditingType('portfolio');
                        setCurrentRecord({ title: '', category: 'Motion Design', filterCategory: 'SaaS & UI', videoUrl: '', coverImage: '' });
                        setModalMode('add');
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007AFF] text-white text-13px font-medium hover:bg-[#0062CC] transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161618] overflow-hidden flex flex-col"
                      >
                        <div className="aspect-video relative bg-neutral-100 dark:bg-neutral-900">
                          <BlurUpImage
                            src={item.coverImage}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {item.featured && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-400 text-black text-[10px] font-mono font-bold">
                              ★ Featured
                            </span>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-13px">{item.title}</h4>
                            <span className="text-11px font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                              {item.filterCategory}
                            </span>
                          </div>
                          <p className="text-12px text-neutral-500 dark:text-neutral-400 line-clamp-1 mb-3">
                            {item.subtitle || item.client || 'Portfolio Item'}
                          </p>

                          <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                            <span className="text-11px font-mono text-neutral-400">{item.duration || '30s'}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  playSubtleClickSound();
                                  setEditingType('portfolio');
                                  setCurrentRecord(item);
                                  setModalMode('edit');
                                }}
                                className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePortfolio(item.id)}
                                className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: INSPECTOR */}
              {activeTab === 'inspector' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800">
                    <h3 className="text-sm font-bold mb-2">Schema Inspector</h3>
                    <div className="font-mono text-xs text-neutral-600 dark:text-neutral-400 space-y-1 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl">
                      <div>TABLE <span className="text-[#007AFF]">projects</span> (id TEXT PRIMARY KEY, title TEXT, category TEXT, video_url TEXT, cover_image TEXT, featured BOOLEAN);</div>
                      <div>TABLE <span className="text-[#007AFF]">inquiries</span> (id TEXT PRIMARY KEY, name TEXT, email TEXT, project_type TEXT, budget TEXT, status TEXT, created_at TIMESTAMP);</div>
                      <div>TABLE <span className="text-[#007AFF]">settings</span> (hero_headline TEXT, availability_badge TEXT, contact_email TEXT);</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SQL CONSOLE */}
              {activeTab === 'sql' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold">SQL Query Console</h3>
                      <button
                        onClick={handleRunSql}
                        className="px-4 py-1.5 bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold rounded-lg shadow-sm"
                      >
                        Execute
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      className="w-full font-mono text-xs p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-[#18181B] text-neutral-100 font-mono text-xs overflow-x-auto max-h-64">
                    <pre>{sqlOutput}</pre>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* RECORD ADD/EDIT MODAL */}
      {modalMode && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-lg bg-white dark:bg-[#161618] rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
            <h3 className="text-base font-bold mb-4">
              {modalMode === 'add' ? 'Add' : 'Edit'} {editingType === 'inquiry' ? 'Inquiry' : 'Project'}
            </h3>
            <form onSubmit={handleSaveRecord} className="space-y-3">
              {editingType === 'portfolio' && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={currentRecord?.title || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, title: e.target.value })}
                      className="w-full p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1">Filter Category</label>
                    <select
                      value={currentRecord?.filterCategory || 'SaaS & UI'}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, filterCategory: e.target.value })}
                      className="w-full p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs"
                    >
                      <option value="SaaS & UI">SaaS & UI</option>
                      <option value="Commercials">Commercials</option>
                      <option value="Cinematic / VFX">Cinematic / VFX</option>
                      <option value="Talking Head">Talking Head</option>
                      <option value="Documentary">Documentary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1">Video Stream URL</label>
                    <input
                      type="text"
                      required
                      value={currentRecord?.videoUrl || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, videoUrl: e.target.value })}
                      className="w-full p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1">Cover Image URL</label>
                    <input
                      type="text"
                      required
                      value={currentRecord?.coverImage || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, coverImage: e.target.value })}
                      className="w-full p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#007AFF] text-white text-xs font-semibold rounded-lg hover:bg-[#0062CC]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
