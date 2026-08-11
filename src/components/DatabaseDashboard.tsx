import React, { useState, useEffect } from 'react';
import { BlurUpImage } from './BlurUpImage';
import {
  Database,
  Table as TableIcon,
  BarChart3,
  Search,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Download,
  Upload,
  Terminal,
  RefreshCw,
  X,
  Server,
  HardDrive,
  Filter,
  Layers,
  FileText,
  Check,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface DatabaseDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed';
  createdAt: string;
}

interface PortfolioRecord {
  id: string;
  title: string;
  category: string;
  filterCategory: string;
  videoUrl: string;
  coverImage: string;
  views: number;
}

interface SystemLog {
  id: string;
  timestamp: string;
  action: string;
  level: 'info' | 'success' | 'warn';
  details: string;
}

const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-1',
    name: 'Sarah Jenkins',
    email: 'sarah@fintechpulse.io',
    service: 'SaaS UI Animation',
    budget: '$5,000 - $10,000',
    timeline: '2-4 weeks',
    message: 'We need 3 high-converting product motion promos for our upcoming Series A launch.',
    status: 'New',
    createdAt: '2026-08-06 14:22'
  },
  {
    id: 'inq-2',
    name: 'Marcus Vance',
    email: 'marcus@apexvisuals.com',
    service: 'Cinematic VFX / Montage',
    budget: '$10,000+',
    timeline: '1-2 months',
    message: 'Looking for high-end cinematic car commercial editing and sound design.',
    status: 'In Progress',
    createdAt: '2026-08-05 09:15'
  },
  {
    id: 'inq-3',
    name: 'Elena Rostova',
    email: 'elena@nordicdesign.co',
    service: 'Brand Commercial',
    budget: '$3,000 - $5,000',
    timeline: 'Immediate',
    message: 'Need a fast turnaround product teaser for social media ads.',
    status: 'Completed',
    createdAt: '2026-08-02 18:40'
  }
];

const INITIAL_PORTFOLIO: PortfolioRecord[] = [
  {
    id: 'port-1',
    title: 'NotchNook UI Motion',
    category: 'SaaS UI Motion',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057757/Drive_hkng6w.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    views: 1420
  },
  {
    id: 'port-2',
    title: 'PRAN Ghee Commercial',
    category: 'Brand Commercial',
    filterCategory: 'Commercials',
    videoUrl: 'https://drive.google.com/uc?id=1GxmwawkAImn8PdFGAsZBqu6wrhVmjtH8&export=download',
    coverImage: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
    views: 2890
  },
  {
    id: 'port-3',
    title: 'VALORANT x WHTAMIM',
    category: 'Motion Graphics',
    filterCategory: 'Cinematic / VFX',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057552/ikigai_lxe9jo.mp4',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    views: 4150
  }
];

const INITIAL_LOGS: SystemLog[] = [
  { id: 'log-1', timestamp: '2026-08-07 12:00:15', action: 'DATABASE_CONNECT', level: 'success', details: 'Connected to Firestore / Local PostgreSQL replica cluster' },
  { id: 'log-2', timestamp: '2026-08-07 11:45:22', action: 'INQUIRY_RECEIVED', level: 'info', details: 'New lead submission from Sarah Jenkins ($5k-$10k)' },
  { id: 'log-3', timestamp: '2026-08-07 10:12:05', action: 'SCHEMA_SYNC', level: 'success', details: 'Drizzle ORM migration successfully synchronized' },
  { id: 'log-4', timestamp: '2026-08-06 16:30:00', action: 'CACHE_PURGE', level: 'warn', details: 'Cloud CDN video cache invalidated' }
];

export const DatabaseDashboard: React.FC<DatabaseDashboardProps> = ({ isOpen, onClose }) => {
  useBodyScrollLock(isOpen);

  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'portfolio' | 'inspector' | 'sql'>('overview');
  
  // Persistent State
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    const saved = localStorage.getItem('whtamim_db_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [portfolio, setPortfolio] = useState<PortfolioRecord[]>(() => {
    const saved = localStorage.getItem('whtamim_db_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [logs] = useState<SystemLog[]>(INITIAL_LOGS);

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

  useEffect(() => {
    localStorage.setItem('whtamim_db_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('whtamim_db_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  if (!isOpen) return null;

  // Chart data calculations
  const inquiriesByStatus = [
    { name: 'New', count: inquiries.filter(i => i.status === 'New').length },
    { name: 'Contacted', count: inquiries.filter(i => i.status === 'Contacted').length },
    { name: 'In Progress', count: inquiries.filter(i => i.status === 'In Progress').length },
    { name: 'Completed', count: inquiries.filter(i => i.status === 'Completed').length },
  ];

  const portfolioByCategory = [
    { name: 'SaaS & UI', value: portfolio.filter(p => p.filterCategory === 'SaaS & UI').length },
    { name: 'Commercials', value: portfolio.filter(p => p.filterCategory === 'Commercials').length },
    { name: 'Cinematic / VFX', value: portfolio.filter(p => p.filterCategory === 'Cinematic / VFX').length },
    { name: 'Documentary', value: portfolio.filter(p => p.filterCategory === 'Documentary').length },
  ];

  const COLORS = ['#007AFF', '#34C759', '#FF9500', '#AF52DE'];

  const handleRunSql = () => {
    playSubtleClickSound();
    const query = sqlQuery.trim().toLowerCase();
    if (query.includes('from inquiries') || query.includes('inquiries')) {
      setSqlOutput(JSON.stringify(inquiries, null, 2));
    } else if (query.includes('from portfolio') || query.includes('portfolio')) {
      setSqlOutput(JSON.stringify(portfolio, null, 2));
    } else if (query.includes('count')) {
      setSqlOutput(`Query result: Total records = ${inquiries.length + portfolio.length}`);
    } else {
      setSqlOutput(`Executed successfully. Affected rows: 0. Result set: ${JSON.stringify(logs.slice(0, 2), null, 2)}`);
    }
  };

  const handleDeleteInquiry = (id: string) => {
    playSubtleClickSound();
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  const handleDeletePortfolio = (id: string) => {
    playSubtleClickSound();
    setPortfolio(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    playSubtleClickSound();
    if (editingType === 'inquiry') {
      if (modalMode === 'add') {
        const newInq: InquiryRecord = {
          id: `inq-${Date.now()}`,
          name: currentRecord.name || 'Untitled Client',
          email: currentRecord.email || 'client@example.com',
          service: currentRecord.service || 'SaaS UI Animation',
          budget: currentRecord.budget || '$5,000+',
          timeline: currentRecord.timeline || '2 weeks',
          message: currentRecord.message || 'No additional details provided.',
          status: 'New',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        setInquiries(prev => [newInq, ...prev]);
      } else {
        setInquiries(prev => prev.map(item => item.id === currentRecord.id ? currentRecord : item));
      }
    } else {
      if (modalMode === 'add') {
        const newPort: PortfolioRecord = {
          id: `port-${Date.now()}`,
          title: currentRecord.title || 'Untitled Project',
          category: currentRecord.category || 'Motion Design',
          filterCategory: currentRecord.filterCategory || 'SaaS & UI',
          videoUrl: currentRecord.videoUrl || 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057757/Drive_hkng6w.mp4',
          coverImage: currentRecord.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
          views: 100
        };
        setPortfolio(prev => [newPort, ...prev]);
      } else {
        setPortfolio(prev => prev.map(item => item.id === currentRecord.id ? currentRecord : item));
      }
    }
    setModalMode(null);
    setCurrentRecord(null);
  };

  useBodyScrollLock(isOpen);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md">
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
                <h2 className="text-lg font-bold tracking-tight">Studio Database & CMS Dashboard</h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-11px font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online (PostgreSQL / Local)
                </span>
              </div>
              <p className="text-12px text-neutral-500 dark:text-neutral-400">
                Manage client inquiries, portfolio assets, system logs, and run SQL queries in real time.
              </p>
            </div>
          </div>
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-[#161619] overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: BarChart3 },
            { id: 'inquiries', label: `Client Inquiries (${inquiries.length})`, icon: FileText },
            { id: 'portfolio', label: `Portfolio CMS (${portfolio.length})`, icon: Layers },
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
                    <span>+2 new today</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
                    <span className="text-12px font-mono uppercase tracking-wider">Portfolio Assets</span>
                    <Layers className="w-4 h-4 text-[#34C759]" />
                  </div>
                  <div className="text-2xl font-bold">{portfolio.length}</div>
                  <div className="text-11px text-neutral-500 dark:text-neutral-400 mt-1">
                    Synced across 4 categories
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
                    <span className="text-12px font-mono uppercase tracking-wider">Database Status</span>
                    <Server className="w-4 h-4 text-[#FF9500]" />
                  </div>
                  <div className="text-2xl font-bold">Healthy</div>
                  <div className="text-11px text-emerald-600 dark:text-emerald-400 mt-1">
                    Zero latency sync
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
                    <span className="text-12px font-mono uppercase tracking-wider">Storage Usage</span>
                    <HardDrive className="w-4 h-4 text-[#AF52DE]" />
                  </div>
                  <div className="text-2xl font-bold">1.2 MB</div>
                  <div className="text-11px text-neutral-500 dark:text-neutral-400 mt-1">
                    Quota: 1 GB Free Tier
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
                  <h3 className="text-sm font-bold mb-4">Portfolio Category Distribution</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={4}
                          dataKey="value"
                          label
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

              {/* Recent System Activity Log */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#007AFF]" />
                  Recent Audit Logs
                </h3>
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 text-13px">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${log.level === 'success' ? 'bg-emerald-500' : log.level === 'warn' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                        <span className="font-mono text-12px font-bold text-neutral-500">{log.timestamp}</span>
                        <span className="font-mono text-12px px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800">{log.action}</span>
                        <span className="text-neutral-700 dark:text-neutral-300">{log.details}</span>
                      </div>
                      <span className="text-11px text-emerald-600 dark:text-emerald-400 font-medium">OK</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search inquiries by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 text-13px focus:outline-none focus:border-[#007AFF]"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 text-13px font-medium focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button
                    onClick={() => {
                      playSubtleClickSound();
                      setEditingType('inquiry');
                      setCurrentRecord({ name: '', email: '', service: 'SaaS UI Animation', budget: '$5,000+', timeline: '2 weeks', message: '' });
                      setModalMode('add');
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007AFF] text-white text-13px font-medium hover:bg-[#0062CC] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New Lead
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161618] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#1c1c1f] text-11px font-mono uppercase tracking-wider text-neutral-500">
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Budget</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-13px">
                      {inquiries
                        .filter(i => statusFilter === 'All' || i.status === statusFilter)
                        .filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.email.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((inq) => (
                          <tr key={inq.id} className="hover:bg-neutral-50/80 dark:hover:bg-[#1c1c1f]/50 transition-colors">
                            <td className="py-3 px-4 font-medium">
                              <div>{inq.name}</div>
                              <div className="text-11px text-neutral-400 font-mono">{inq.email}</div>
                            </td>
                            <td className="py-3 px-4">{inq.service}</td>
                            <td className="py-3 px-4 font-mono text-12px">{inq.budget}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-11px font-medium ${
                                inq.status === 'New' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                inq.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                                'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              }`}>
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-12px text-neutral-500 font-mono">{inq.createdAt}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    playSubtleClickSound();
                                    setEditingType('inquiry');
                                    setCurrentRecord(inq);
                                    setModalMode('edit');
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500"
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
                <h3 className="text-sm font-bold">Portfolio Database Items</h3>
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
                {portfolio.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 space-y-3">
                    <div className="aspect-video rounded-xl overflow-hidden bg-neutral-900 relative">
                      <BlurUpImage src={proj.coverImage} alt={proj.title} className="w-full h-full" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-10px font-mono bg-black/60 text-white backdrop-blur-xs z-30">
                        {proj.filterCategory}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{proj.title}</h4>
                      <p className="text-12px text-neutral-500">{proj.category}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800 text-12px">
                      <span className="text-neutral-400 font-mono">{proj.views} views</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            playSubtleClickSound();
                            setEditingType('portfolio');
                            setCurrentRecord(proj);
                            setModalMode('edit');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePortfolio(proj.id)}
                          className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-500 text-xs font-medium"
                        >
                          Delete
                        </button>
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Raw JSON State & Database Export</h3>
                  <p className="text-12px text-neutral-500">Inspect or backup current local database collections.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playSubtleClickSound();
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ inquiries, portfolio, logs }, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `whtamim_db_backup_${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-13px font-medium hover:bg-neutral-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export JSON
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 text-emerald-400 font-mono text-12px overflow-x-auto max-h-96">
                <pre>{JSON.stringify({ inquiries, portfolio, logs }, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* TAB 5: SQL CONSOLE */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold">Interactive SQL Query Playground</h3>
                <p className="text-12px text-neutral-500">Execute standard SQL queries against mock database tables (`inquiries`, `portfolio`).</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 text-white font-mono text-13px border border-neutral-700 focus:outline-none focus:border-[#007AFF]"
                  />
                  <button
                    onClick={handleRunSql}
                    className="px-5 py-2.5 rounded-xl bg-[#007AFF] text-white text-13px font-medium hover:bg-[#0062CC] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Terminal className="w-4 h-4" />
                    Run Query
                  </button>
                </div>
                <div className="flex items-center gap-2 text-11px text-neutral-500 font-mono">
                  <span>Quick Queries:</span>
                  <button onClick={() => setSqlQuery('SELECT * FROM inquiries WHERE status = "New"')} className="underline hover:text-[#007AFF]">SELECT * FROM inquiries</button>
                  <span>•</span>
                  <button onClick={() => setSqlQuery('SELECT * FROM portfolio')} className="underline hover:text-[#007AFF]">SELECT * FROM portfolio</button>
                  <span>•</span>
                  <button onClick={() => setSqlQuery('SELECT COUNT(*) FROM portfolio')} className="underline hover:text-[#007AFF]">COUNT records</button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 text-emerald-400 font-mono text-12px overflow-x-auto min-h-[200px] max-h-80">
                <pre>{sqlOutput}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {modalMode && currentRecord && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg bg-white dark:bg-[#18181B] rounded-2xl p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bold text-base">
                  {modalMode === 'add' ? `Add New ${editingType === 'inquiry' ? 'Inquiry' : 'Portfolio Item'}` : `Edit ${editingType === 'inquiry' ? 'Inquiry' : 'Portfolio Item'}`}
                </h3>
                <button onClick={() => setModalMode(null)} className="text-neutral-400 hover:text-neutral-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveRecord} className="space-y-3">
                {editingType === 'inquiry' ? (
                  <>
                    <div>
                      <label className="block text-12px font-medium mb-1">Client Name</label>
                      <input
                        type="text"
                        required
                        value={currentRecord.name || ''}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px"
                      />
                    </div>
                    <div>
                      <label className="block text-12px font-medium mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={currentRecord.email || ''}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px"
                      />
                    </div>
                    <div>
                      <label className="block text-12px font-medium mb-1">Service Type</label>
                      <input
                        type="text"
                        value={currentRecord.service || ''}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, service: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px"
                      />
                    </div>
                    <div>
                      <label className="block text-12px font-medium mb-1">Status</label>
                      <select
                        value={currentRecord.status || 'New'}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, status: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-12px font-medium mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={currentRecord.title || ''}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px"
                      />
                    </div>
                    <div>
                      <label className="block text-12px font-medium mb-1">Category</label>
                      <input
                        type="text"
                        value={currentRecord.category || ''}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px"
                      />
                    </div>
                    <div>
                      <label className="block text-12px font-medium mb-1">Filter Category</label>
                      <select
                        value={currentRecord.filterCategory || 'SaaS & UI'}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, filterCategory: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px"
                      >
                        <option value="SaaS & UI">SaaS & UI</option>
                        <option value="Commercials">Commercials</option>
                        <option value="Cinematic / VFX">Cinematic / VFX</option>
                        <option value="Documentary">Documentary</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-12px font-medium mb-1">Video URL</label>
                      <input
                        type="text"
                        value={currentRecord.videoUrl || ''}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, videoUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-12px font-medium mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={currentRecord.coverImage || ''}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, coverImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-13px font-mono text-xs"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-13px font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] text-13px font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DatabaseDashboard;
