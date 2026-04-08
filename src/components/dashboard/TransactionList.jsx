import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = () => {
  const { transactions, members, t } = useBudget();
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
          <h2>{t('recentTransactions')}</h2>
        </div>
        <div className="list-filters">
          <div className="filter-item">
            <Filter size={16} />
            <select value={filterMember} onChange={(e) => setFilterMember(e.target.value)}>
              <option value="All">{t('allMembers')}</option>
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">{t('sortByDate')}</option>
            <option value="amount">{t('sortByAmount')}</option>
          </select>
        </div>
      </div>
      
      <div className="transaction-table">
        <div className="table-row table-head">
          <span>{t('income')} / {t('expenses')}</span>
          <span>{t('member')}</span>
          <span>{t('category')}</span>
          <span>{t('date')}</span>
          <span className="text-right">{t('amount')}</span>
        </div>
        
        <AnimatePresence mode="popLayout">
          {filteredTransactions.map(tr => {
            const { icon: Icon, color, bg } = getIcon(tr.type);
            return (
              <motion.div 
                key={tr.id} 
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
                    <span className="transaction-name">{t(tr.category.toLowerCase())}</span>
                    <span className="transaction-type">{tr.isFixed ? t('fixed') : t('variable')}</span>
                  </div>
                </div>
                
                <div className="member-badge">
                  <div className="member-avatar">{tr.member[0]}</div>
                  <span>{tr.member}</span>
                </div>
                
                <span className="category-text">{t(tr.category.toLowerCase())}</span>
                <span className="date-text">{tr.date}</span>
                
                <div className={`amount-text text-right ${tr.type === 'income' ? 'income' : tr.type === 'savings' ? 'savings' : 'expense'}`}>
                  {tr.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(tr.amount || 0)}
                  {tr.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
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
