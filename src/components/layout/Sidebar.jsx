import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  BarChart3, 
  Settings,
  Users
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useBudget();
  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'income', label: t('income'), icon: TrendingUp },
    { id: 'expenses', label: t('expenses'), icon: TrendingDown },
    { id: 'savings', label: t('savings'), icon: PiggyBank },
    { id: 'stats', label: t('stats'), icon: BarChart3 },
    { id: 'family', label: t('family'), icon: Users },
  ];

  return (
    <div className="sidebar glass-morphism">
      <div className="sidebar-logo">
        <Wallet className="logo-icon" size={32} />
        <span>FamBudget</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <button 
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={20} />
          <span>{t('settings')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
