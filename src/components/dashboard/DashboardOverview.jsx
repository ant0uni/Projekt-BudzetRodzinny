import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import StatCard from './StatCard';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const DashboardOverview = () => {
  const { getStats, savingsBalance } = useBudget();
  const { totalIncome, totalExpenses, balance } = getStats();

  const stats = [
    { title: 'Total Balance', amount: balance, icon: Wallet, color: 'primary', trend: 12 },
    { title: 'Monthly Income', amount: totalIncome, icon: TrendingUp, color: 'success', trend: 8 },
    { title: 'Monthly Expenses', amount: totalExpenses, icon: TrendingDown, color: 'danger', trend: -5 },
    { title: 'Savings Account', amount: savingsBalance, icon: PiggyBank, color: 'info', trend: 15 },
  ];

  return (
    <div className="dashboard-grid">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardOverview;
