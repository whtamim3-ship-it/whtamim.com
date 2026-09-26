import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Film,
  Settings,
  Package,
  Inbox,
  Shield,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Star,
  Check,
  RefreshCw,
  LogOut,
  ArrowUpRight,
  Eye,
  Search,
  Sparkles,
  Sliders,
  AlertCircle,
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import { usePortfolio, DynamicProject, Inquiry, SiteSettings, DynamicAssetPack } from '../../context/PortfolioContext';
import { playSubtleClickSound } from '../../utils/motion';

interface AdminDashboardProps {
  onNavigateHome: () => void;
  onNavigateWork?: () => void;
  onNavigateAssets?: () => void;
}

type TabType = 'projects' | 'settings' | 'assets' | 'inquiries' | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateHome,
  onNavigateWork,
  onNavigateAssets
}) => {
  const {
    projects,
    settings,
    assetPacks,
    adminUser,
    logout,
    updateSettings,
    addProject,
    updateProject,
    deleteProject,
    updateAssetPack,
    resetContentToDefaults,
    fetchInquiries,
    updateInquiryStatus,
    deleteInquiry,
    updateCredentials
  } = usePortfolio();

  const [currentTab, setCurrentTab] = useState<TabType>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All');
  const [editingProject, setEditingProject] = useState<DynamicProject | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);

  // Security credentials form
  const [newEmail, setNewEmail] = useState(adminUser?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Synchronize settings state when context updates
  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Load inquiries when tab switches to inquiries
  useEffect(() => {
    if (currentTab === 'inquiries') {
      fetchInquiries().then(setInquiries);
    }
  }, [currentTab]);

  const showToast = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => {
      setStatusNotification(null);
    }, 3500);
  };

  // --- Project Handlers ---
  const handleToggleFeatured = async (project: DynamicProject) => {
    playSubtleClickSound();
    const updated = await updateProject(project.id, { featured: !project.featured });
    if (updated) {
      showToast(project.featured ? `Removed "${project.title}" from Featured Work` : `Pinned "${project.title}" to Featured Work`);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      playSubtleClickSound();
      const success = await deleteProject(id);
      if (success) showToast(`Deleted "${title}"`);
    }
  };

  const handleSaveProjectForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playSubtleClickSound();
    const formData = new FormData(e.currentTarget);

    const projectData = {
      title: (formData.get('title') as string) || 'Untitled Project',
      subtitle: (formData.get('subtitle') as string) || '',
      client: (formData.get('client') as string) || '',
      industry: (formData.get('industry') as string) || '',
      category: (formData.get('category') as string) || 'Motion Design',
      tag: (formData.get('tag') as string) || 'MOTION DESIGN',
      filterCategory: (formData.get('filterCategory') as string) || 'SaaS & UI',
      type: (formData.get('type') as string) || 'video',
      videoUrl: (formData.get('videoUrl') as string) || '',
      src: (formData.get('videoUrl') as string) || '',
      coverImage: (formData.get('coverImage') as string) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      logline: (formData.get('logline') as string) || '',
      overview: (formData.get('overview') as string) || '',
      featured: formData.get('featured') === 'on',
      uploadDate: (formData.get('uploadDate') as string) || new Date().toISOString().split('T')[0],
      role: (formData.get('role') as string) || 'Lead Motion Designer',
      duration: (formData.get('duration') as string) || '30 Seconds'
    };

    if (isCreatingProject) {
      const ok = await addProject(projectData);
      if (ok) {
        setIsCreatingProject(false);
        showToast(`Added new project "${projectData.title}"`);
      }
    } else if (editingProject) {
      const ok = await updateProject(editingProject.id, projectData);
      if (ok) {
        setEditingProject(null);
        showToast(`Updated "${projectData.title}"`);
      }
    }
  };

  // --- Settings Handlers ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    playSubtleClickSound();
    const ok = await updateSettings(settingsForm);
    if (ok) {
      showToast('Studio settings & headline updated successfully!');
    } else {
      showToast('Error updating settings.');
    }
  };

  // --- Security Handlers ---
  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      showToast('Passwords do not match.');
      return;
    }
    playSubtleClickSound();
    const res = await updateCredentials(newEmail, newPassword || undefined);
    if (res.success) {
      showToast('Admin credentials updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast(res.error || 'Failed to update credentials.');
    }
  };

  const handleResetToDefaults = async () => {
    if (window.confirm('WARNING: Reset all portfolio projects and studio settings back to default factory content?')) {
      playSubtleClickSound();
      const ok = await resetContentToDefaults();
      if (ok) {
        showToast('Site content restored to defaults.');
      }
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat =
      selectedFilterCategory === 'All' || p.filterCategory === selectedFilterCategory;

    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Commercials', 'SaaS & UI', 'Cinematic / VFX', 'Talking Head', 'Documentary'];

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#F5F5F7] font-sans flex flex-col selection:bg-[#0066FF] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {statusNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#0066FF] text-white text-xs font-medium rounded-full shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{statusNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#121216]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-10 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#0066FF] flex items-center justify-center font-bold text-white text-xs tracking-wider">
            WH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white">whtamim</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-[#0A84FF] border border-[#0066FF]/30 font-medium">
                Admin Panel
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#86868B] hidden sm:block">
              {adminUser?.email || 'whtamim3@gmail.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              playSubtleClickSound();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#A1A1A6] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/5"
            title="Preview Live Portfolio"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            onClick={() => {
              playSubtleClickSound();
              logout();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10 border border-red-500/20 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-56 shrink-0 flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => {
              playSubtleClickSound();
              setCurrentTab('projects');
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap ${
              currentTab === 'projects'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25 font-semibold'
                : 'text-[#86868B] hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="w-4 h-4 shrink-0" />
            <span>Projects & Media</span>
            <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => {
              playSubtleClickSound();
              setCurrentTab('settings');
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap ${
              currentTab === 'settings'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25 font-semibold'
                : 'text-[#86868B] hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4 shrink-0" />
            <span>Site Content & Hero</span>
          </button>

          <button
            onClick={() => {
              playSubtleClickSound();
              setCurrentTab('assets');
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap ${
              currentTab === 'assets'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25 font-semibold'
                : 'text-[#86868B] hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Assets & Downloads</span>
            <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20">
              {assetPacks.length}
            </span>
          </button>

          <button
            onClick={() => {
              playSubtleClickSound();
              setCurrentTab('inquiries');
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap ${
              currentTab === 'inquiries'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25 font-semibold'
                : 'text-[#86868B] hover:text-white hover:bg-white/5'
            }`}
          >
            <Inbox className="w-4 h-4 shrink-0" />
            <span>Client Inquiries</span>
            {inquiries.filter((i) => i.status === 'New').length > 0 && (
              <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold">
                {inquiries.filter((i) => i.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              playSubtleClickSound();
              setCurrentTab('security');
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap ${
              currentTab === 'security'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25 font-semibold'
                : 'text-[#86868B] hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span>Security & Auth</span>
          </button>
        </nav>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: PROJECTS & MEDIA */}
          {currentTab === 'projects' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Portfolio Projects
                  </h2>
                  <p className="text-xs text-[#86868B] mt-1">
                    Manage showcase videos, YouTube embeds, poster thumbnails, and featured home highlights.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    setIsCreatingProject(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-medium transition-all shadow-md shadow-[#0066FF]/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Search & Filter bar */}
              <div className="bg-[#141418] border border-white/10 rounded-2xl p-3 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, client, category..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFilterCategory(cat)}
                      className={`text-[11px] px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                        selectedFilterCategory === cat
                          ? 'bg-white/15 text-white font-medium'
                          : 'text-[#86868B] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#141418] border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-black/40 overflow-hidden">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Featured star toggle */}
                      <button
                        onClick={() => handleToggleFeatured(project)}
                        title={project.featured ? 'Pinned to Featured Work on Home' : 'Click to pin to Featured Work'}
                        className={`absolute top-2.5 left-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
                          project.featured
                            ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                            : 'bg-black/60 text-white/50 hover:text-white'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>

                      {/* Category Badge */}
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10">
                        {project.filterCategory || project.category}
                      </span>

                      {/* Video Type indicator */}
                      <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{project.type === 'youtube' ? 'YouTube Embed' : 'Direct Video'}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-white line-clamp-1">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="text-[10px] font-mono text-amber-400 font-medium shrink-0">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#86868B] line-clamp-1 mb-2">
                        {project.subtitle || project.client || 'Portfolio Showpiece'}
                      </p>

                      <div className="text-[11px] text-[#A1A1A6] font-mono mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                        <span>{project.duration || '30s'}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              playSubtleClickSound();
                              setEditingProject(project);
                            }}
                            className="p-1 rounded text-[#86868B] hover:text-[#0A84FF] transition-colors"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id, project.title)}
                            className="p-1 rounded text-[#86868B] hover:text-red-400 transition-colors"
                            title="Delete Project"
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

          {/* TAB 2: SITE CONTENT & HERO SETTINGS */}
          {currentTab === 'settings' && (
            <div className="max-w-2xl">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Site Content & Branding
                </h2>
                <p className="text-xs text-[#86868B] mt-1">
                  Update your hero headline, availability badge status, showreel video, and studio info.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5 bg-[#141418] border border-white/10 rounded-2xl p-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                    Hero Headline
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.heroHeadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                    className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                    Hero Subheadline / Value Proposition
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.heroSubheadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })}
                    className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                      Availability Badge Text
                    </label>
                    <input
                      type="text"
                      value={settingsForm.availabilityBadge}
                      onChange={(e) => setSettingsForm({ ...settingsForm, availabilityBadge: e.target.value })}
                      className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                      Status Indicator
                    </label>
                    <select
                      value={settingsForm.availabilityStatus}
                      onChange={(e) => setSettingsForm({ ...settingsForm, availabilityStatus: e.target.value as any })}
                      className="w-full p-3 bg-[#1A1A20] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                    >
                      <option value="available">🟢 Available (Green Active Dot)</option>
                      <option value="busy">🟡 High Demand / Limited Slots</option>
                      <option value="closed">🔴 Fully Booked</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                    Showreel Video URL (Cloudinary or MP4)
                  </label>
                  <input
                    type="url"
                    value={settingsForm.showreelUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, showreelUrl: e.target.value })}
                    className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                      Studio Contact Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                      Location / Timezone
                    </label>
                    <input
                      type="text"
                      value={settingsForm.location}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                      className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0066FF] hover:bg-[#0055D4] text-white font-medium text-xs rounded-xl shadow-lg shadow-[#0066FF]/20 transition-all cursor-pointer"
                  >
                    Save & Publish Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ASSETS & DOWNLOADS */}
          {currentTab === 'assets' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Digital Asset Packs
                </h2>
                <p className="text-xs text-[#86868B] mt-1">
                  Manage the free production asset kits and resources available on the dedicated /assets page.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assetPacks.map((pack) => (
                  <div
                    key={pack.id}
                    className="bg-[#141418] border border-white/10 rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono text-[#0A84FF] px-2 py-0.5 rounded bg-[#0066FF]/10 border border-[#0066FF]/20 font-medium">
                          {pack.category}
                        </span>
                        {pack.badge && (
                          <span className="text-[10px] font-mono text-amber-400 font-semibold">
                            {pack.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{pack.title}</h3>
                      <p className="text-xs text-[#86868B] leading-relaxed mb-4">
                        {pack.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#A1A1A6]">
                      <span>{pack.filesCount} • {pack.size}</span>
                      <span className="text-[11px] text-[#0A84FF]">{pack.format}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CLIENT INQUIRIES */}
          {currentTab === 'inquiries' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Client Inquiries & Briefs
                  </h2>
                  <p className="text-xs text-[#86868B] mt-1">
                    Direct inquiries and project estimates received via the contact form.
                  </p>
                </div>
                <button
                  onClick={() => fetchInquiries().then(setInquiries)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#86868B] hover:text-white px-3 py-1.5 rounded-lg border border-white/10 bg-white/5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-[#141418] border border-white/10 rounded-2xl p-12 text-center text-[#86868B]">
                  <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium text-white">No inquiries recorded yet.</p>
                  <p className="text-xs mt-1">Submissions from your portfolio contact form will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-[#141418] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-white">{inq.name}</h3>
                            {inq.company && inq.company !== 'N/A' && (
                              <span className="text-xs text-[#86868B]">({inq.company})</span>
                            )}
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                                inq.status === 'New'
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                  : inq.status === 'In Progress'
                                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                  : 'bg-white/10 text-[#86868B]'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-xs font-mono text-[#0A84FF] hover:underline"
                          >
                            {inq.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value as Inquiry['status'];
                              await updateInquiryStatus(inq.id, newStatus);
                              setInquiries((prev) =>
                                prev.map((item) => (item.id === inq.id ? { ...item, status: newStatus } : item))
                              );
                              showToast(`Status updated to ${newStatus}`);
                            }}
                            className="bg-[#1A1A20] text-xs text-[#A1A1A6] border border-white/10 rounded-lg px-2.5 py-1 focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Archived">Archived</option>
                          </select>

                          <button
                            onClick={async () => {
                              if (window.confirm('Delete this inquiry?')) {
                                await deleteInquiry(inq.id);
                                setInquiries((prev) => prev.filter((i) => i.id !== inq.id));
                                showToast('Inquiry deleted');
                              }
                            }}
                            className="p-1.5 text-[#86868B] hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-[#86868B] bg-white/[0.02] p-2.5 rounded-lg mb-3">
                        <div><span className="text-[#555]">Type:</span> {inq.projectType || 'Standard'}</div>
                        <div><span className="text-[#555]">Budget:</span> {inq.budget || 'Undisclosed'}</div>
                        <div><span className="text-[#555]">Timeline:</span> {inq.timeline || 'Flexible'}</div>
                      </div>

                      <p className="text-xs text-[#D1D1D6] leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </p>

                      <div className="mt-3 text-[10px] font-mono text-[#666]">
                        Received: {inq.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SECURITY & CREDENTIALS */}
          {currentTab === 'security' && (
            <div className="max-w-xl space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Security & Access Credentials
                </h2>
                <p className="text-xs text-[#86868B] mt-1">
                  Change the admin account email or password for your control dashboard.
                </p>
              </div>

              <form onSubmit={handleUpdateCredentials} className="bg-[#141418] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-white mb-2">Update Admin Credentials</h3>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                    New Password (Leave blank to keep unchanged)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                {newPassword && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-medium rounded-xl shadow-lg shadow-[#0066FF]/20 transition-all cursor-pointer"
                >
                  Save Credentials
                </button>
              </form>

              {/* Danger Zone */}
              <div className="bg-red-500/[0.04] border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Factory Reset</span>
                </h3>
                <p className="text-xs text-[#86868B] mb-4 leading-relaxed">
                  Restore all site portfolio projects, showcase videos, and studio copy back to initial pristine launch defaults.
                </p>
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium rounded-xl border border-red-500/30 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Content to Factory Defaults</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE / EDIT PROJECT MODAL */}
      <AnimatePresence>
        {(isCreatingProject || editingProject) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#141418] border border-white/10 rounded-3xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isCreatingProject ? 'Add New Project' : `Edit: ${editingProject?.title}`}
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    Configure media stream URL, cover thumbnail, and metadata.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCreatingProject(false);
                    setEditingProject(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#86868B] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveProjectForm} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                      Project Title *
                    </label>
                    <input
                      name="title"
                      required
                      defaultValue={editingProject?.title || ''}
                      placeholder="e.g. WhatsApp Promo"
                      className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                      Client / Brand
                    </label>
                    <input
                      name="client"
                      defaultValue={editingProject?.client || ''}
                      placeholder="e.g. WhatsApp Campaign"
                      className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                    Subtitle / Catchphrase
                  </label>
                  <input
                    name="subtitle"
                    defaultValue={editingProject?.subtitle || ''}
                    placeholder="e.g. High-Impact Promotional Motion Design"
                    className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                      Filter Category *
                    </label>
                    <select
                      name="filterCategory"
                      defaultValue={editingProject?.filterCategory || 'SaaS & UI'}
                      className="w-full p-2.5 bg-[#1A1A20] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option value="Commercials">Commercials</option>
                      <option value="SaaS & UI">SaaS & UI</option>
                      <option value="Cinematic / VFX">Cinematic / VFX</option>
                      <option value="Talking Head">Talking Head</option>
                      <option value="Documentary">Documentary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                      Category Tag
                    </label>
                    <input
                      name="category"
                      defaultValue={editingProject?.category || 'Motion Design'}
                      placeholder="Motion Design"
                      className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                      Media Type
                    </label>
                    <select
                      name="type"
                      defaultValue={editingProject?.type || 'video'}
                      className="w-full p-2.5 bg-[#1A1A20] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option value="video">Direct MP4 / Cloudinary</option>
                      <option value="youtube">YouTube Embed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                    Video Stream / Embed URL *
                  </label>
                  <input
                    name="videoUrl"
                    required
                    defaultValue={editingProject?.videoUrl || editingProject?.src || ''}
                    placeholder="https://res.cloudinary.com/... or YouTube URL"
                    className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                    Cover / Poster Image URL *
                  </label>
                  <input
                    name="coverImage"
                    required
                    defaultValue={editingProject?.coverImage || ''}
                    placeholder="https://images.unsplash.com/... or YouTube thumbnail URL"
                    className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                    Logline / Short Description
                  </label>
                  <textarea
                    name="logline"
                    rows={2}
                    defaultValue={editingProject?.logline || ''}
                    placeholder="Brief description of the motion design approach..."
                    className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                      Duration / Length
                    </label>
                    <input
                      name="duration"
                      defaultValue={editingProject?.duration || '30 Seconds'}
                      placeholder="e.g. 30 Seconds"
                      className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1A6] mb-1.5">
                      Role
                    </label>
                    <input
                      name="role"
                      defaultValue={editingProject?.role || 'Lead Motion Designer'}
                      placeholder="Lead Motion Designer"
                      className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Featured on Home switch */}
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-white flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Feature on Home Page</span>
                    </div>
                    <p className="text-[11px] text-[#86868B]">
                      Display this project inside the top 3 curated Featured Work on the main landing page.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editingProject ? editingProject.featured : false}
                    className="w-4 h-4 accent-[#0066FF] rounded cursor-pointer"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingProject(false);
                      setEditingProject(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs text-[#86868B] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-medium shadow-md shadow-[#0066FF]/20 cursor-pointer"
                  >
                    {isCreatingProject ? 'Publish Project' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
