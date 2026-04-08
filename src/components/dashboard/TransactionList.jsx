import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = () => {
  const { transactions, members } = useBudget();
  const [filterMember, setFilterMember] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const filteredTransactions = transactions
    .filter(t => filterMember === 'All' || t.member === filterMember)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      return 0;
    });

  const getIcon = (type) => {
    switch(type) {
      case 'income': return { icon: TrendingUp, color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.1)' };
      case 'expense': return { icon: TrendingDown, color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' };
      case 'savings': return { icon: PiggyBank, color: 'var(--info)', bg: 'rgba(59, 130, 246, 0.1)' };
      default: return { icon: TrendingUp, color: 'var(--primary)', bg: 'var(--glass)' };
    }
  };

  return (
    <motion.div 
      className="transaction-list-container glass-morphism"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="list-header">
        <div className="header-left">
          <h2>Recent Transactions</h2>
        </div>
        <div className="list-filters">
          <div className="filter-item">
            <Filter size={16} />
            <select value={filterMember} onChange={(e) => setFilterMember(e.target.value)}>
              <option value="All">All Members</option>
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>
      
      <div className="transaction-table">
        <div className="table-row table-head">
          <span>Transaction</span>
          <span>Member</span>
          <span>Category</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>
        
        <AnimatePresence mode="popLayout">
          {filteredTransactions.map(t => {
            const { icon: Icon, color, bg } = getIcon(t.type);
            return (
              <motion.div 
                key={t.id} 
                className="table-row"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionList;
