import React from 'react';

const StatCard = ({ title, amount, icon: Icon, color, trend }) => {
  return (
    <div className="stat-card glass-morphism">
      <div className="stat-card-header">
        <div className="stat-icon" style={{ backgroundColor: `var(--${color}-light, rgba(255,255,255,0.1))` }}>
          <Icon size={24} style={{ color: `var(--${color})` }} />
        </div>
        {trend && (
          <span className={`trend ${trend > 0 ? 'up' : 'down'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="stat-card-body">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-amount">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount)}</p>
      </div>
    </div>
  );
};

export default StatCard;
