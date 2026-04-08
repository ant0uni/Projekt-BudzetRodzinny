import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionList = () => {
  const { transactions } = useBudget();

  const getIcon = (type) => {
    switch(type) {
      case 'income': return { icon: TrendingUp, color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.1)' };
      case 'expense': return { icon: TrendingDown, color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' };
      case 'savings': return { icon: PiggyBank, color: 'var(--info)', bg: 'rgba(59, 130, 246, 0.1)' };
      default: return { icon: TrendingUp, color: 'var(--primary)', bg: 'var(--glass)' };
    }
  };

  return (
    <div className="transaction-list-container glass-morphism fade-in">
      <div className="list-header">
        <h2>Recent Transactions</h2>
        <button className="text-btn">View All</button>
      </div>
      
      <div className="transaction-table">
        <div className="table-row table-head">
          <span>Transaction</span>
          <span>Member</span>
          <span>Category</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>
        
        {transactions.map(t => {
          const { icon: Icon, color, bg } = getIcon(t.type);
          return (
            <div key={t.id} className="table-row">
              <div className="transaction-info">
                <div className="icon-circle" style={{ backgroundColor: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="name-wrapper">
                  <span className="transaction-name">{t.category}</span>
                  <span className="transaction-type">{t.isFixed ? 'Fixed' : 'Variable'}</span>
                </div>
              </div>
              
              <div className="member-badge">
                <div className="member-avatar">{t.member[0]}</div>
                <span>{t.member}</span>
              </div>
              
              <span className="category-text">{t.category}</span>
              <span className="date-text">{t.date}</span>
              
              <div className={`amount-text text-right ${t.type === 'income' ? 'income' : t.type === 'savings' ? 'savings' : 'expense'}`}>
                {t.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(t.amount)}
                {t.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;
