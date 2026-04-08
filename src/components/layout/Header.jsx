import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="header glass-morphism">
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search transactions..." />
      </div>
      
      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Kowalski Family</span>
            <span className="user-role">Premium Account</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
