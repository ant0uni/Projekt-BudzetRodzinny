import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const BudgetContext = createContext();

export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [members, setMembers] = useState(['Antoni', 'Anna', 'Marek', 'Zosia']);
  const [language, setLanguage] = useState('pl'); // Default to Polish as requested
  const [savingsBalance, setSavingsBalance] = useState(2500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaults, setModalDefaults] = useState(null);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', amount: 5000, category: 'Salary', member: 'Marek', date: '2026-04-01', isFixed: true },
    { id: 2, type: 'income', amount: 3500, category: 'Salary', member: 'Anna', date: '2026-04-02', isFixed: true },
    { id: 3, type: 'expense', amount: 1200, category: 'Rent', member: 'Marek', date: '2026-04-03', isFixed: true },
    { id: 4, type: 'expense', amount: 300, category: 'Groceries', member: 'Anna', date: '2026-04-05', isFixed: false },
    { id: 5, type: 'expense', amount: 150, category: 'Cinema', member: 'Antoni', date: '2026-04-06', isFixed: false },
    { id: 6, type: 'savings', amount: 500, category: 'Monthly Save', member: 'Zosia', date: '2026-04-07', isFixed: false },
  ]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    
    if (transaction.type === 'savings') {
      setSavingsBalance(prev => prev + parseFloat(transaction.amount));
    }
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const getStats = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
      
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
      
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  };

  const t = (key) => {
    if (!key) return '';
    const safeKey = String(key).toLowerCase();
    const langData = translations[language] || translations['pl'];
    return langData[safeKey] || langData[key] || key;
  };

  const addMember = (name) => {
    if (!members.includes(name)) {
      setMembers([...members, name]);
    }
  };

  const removeMember = (name) => {
    setMembers(members.filter(m => m !== name));
  };

  const updateMember = (oldName, newName) => {
    setMembers(members.map(m => m === oldName ? newName : m));
    // Also update transactions
    setTransactions(transactions.map(t => t.member === oldName ? {...t, member: newName} : t));
  };

  return (
    <BudgetContext.Provider value={{ 
      transactions, 
      members, 
      savingsBalance, 
      language,
      setLanguage,
      addTransaction,
      getStats,
      t,
      addMember,
      removeMember,
      updateMember,
      isModalOpen,
      setIsModalOpen,
      modalDefaults,
      setModalDefaults
    }}>
      {children}
    </BudgetContext.Provider>
  );
};
