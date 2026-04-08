import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import StatCard from './StatCard';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const DashboardOverview = () => {
  const { getStats, savingsBalance, t } = useBudget();
  const { totalIncome, totalExpenses, balance } = getStats();

  const stats = [
    { title: t('totalBalance'), amount: balance, icon: Wallet, color: 'primary', trend: 12 },
    { title: t('monthlyIncome'), amount: totalIncome, icon: TrendingUp, color: 'success', trend: 8 },
    { title: t('monthlyExpenses'), amount: totalExpenses, icon: TrendingDown, color: 'danger', trend: -5 },
    { title: t('savingsAccount'), amount: savingsBalance, icon: PiggyBank, color: 'info', trend: 15 },
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
