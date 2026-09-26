import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminPageProps {
  onNavigateHome: () => void;
  onNavigateWork?: () => void;
  onNavigateAssets?: () => void;
}

/**
 * Dedicated Admin Route Component mapped to `/admin` and `/admin/index`
 * Provides secure authentication verification and the full website customization dashboard.
 */
export const AdminPage: React.FC<AdminPageProps> = ({
  onNavigateHome,
  onNavigateWork,
  onNavigateAssets
}) => {
  const { isAdminAuthenticated, isLoading } = usePortfolio();

  // Set specific admin meta title
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Studio Admin Control | whtamim.work';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#0A0A0C] text-[#F5F5F7] flex flex-col items-center justify-center font-mono text-sm">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin mb-4" />
        <span className="text-neutral-400">Verifying secure admin environment...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0C] text-[#F5F5F7]">
      {isAdminAuthenticated ? (
        <AdminDashboard
          onNavigateHome={onNavigateHome}
          onNavigateWork={onNavigateWork}
          onNavigateAssets={onNavigateAssets}
        />
      ) : (
        <AdminLogin
          onNavigateHome={onNavigateHome}
        />
      )}
    </div>
  );
};

export default AdminPage;
