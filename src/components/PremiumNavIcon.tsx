import React from 'react';
import { 
  Home, 
  Briefcase, 
  User, 
  HelpCircle, 
  Mail, 
  FolderDown,
  LucideIcon 
} from 'lucide-react';

interface PremiumNavIconProps {
  name: 'Home' | 'Work' | 'About' | 'FAQ' | 'Contact' | 'Assets';
  isActive: boolean;
}

export const PremiumNavIcon: React.FC<PremiumNavIconProps> = ({ 
  name, 
  isActive 
}) => {
  const iconMap: Record<string, LucideIcon> = {
    'Home': Home,
    'Work': Briefcase,
    'About': User,
    'FAQ': HelpCircle,
    'Contact': Mail,
    'Assets': FolderDown,
  };

  const IconComponent = iconMap[name] || Home;

  return (
    <div className="nav-icon-wrapper">
      <div className={`nav-icon-container ${isActive ? 'active' : ''}`}>
        <IconComponent 
          size={14} 
          className="nav-icon"
          strokeWidth={2}
        />
      </div>
    </div>
  );
};

