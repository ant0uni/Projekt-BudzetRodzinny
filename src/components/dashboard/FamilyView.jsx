import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Users, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const FamilyView = () => {
  const { members, transactions } = useBudget();

  const memberData = members.map(member => {
    const income = transactions.filter(t => t.member === member && t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.member === member && t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const savings = transactions.filter(t => t.member === member && t.type === 'savings').reduce((acc, t) => acc + t.amount, 0);
    
    return { name: member, income, expenses, savings };
  });

  return (
    <div className="family-view fade-in">
      <div className="content-header">
        <div>
          <h1>Family Members</h1>
          <p style={{ color: 'var(--text-muted)' }}>See who is contributing most to the budget.</p>
        </div>
      </div>

      <div className="family-grid">
        {memberData.map(member => (
          <div key={member.name} className="member-card glass-morphism">
            <div className="member-header">
              <div className="member-avatar-large">{member.name[0]}</div>
              <div className="member-name-group">
                <h3>{member.name}</h3>
                <span className="member-status">Active Member</span>
              </div>
            </div>

            <div className="member-stats">
              <div className="member-stat-item">
                <div className="stat-label">
                  <TrendingUp size={14} className="success-text" /> 
                  <span>Income</span>
                </div>
                <span className="stat-value">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(member.income)}</span>
              </div>
              <div className="member-stat-item">
                <div className="stat-label">
                  <TrendingDown size={14} className="danger-text" /> 
                  <span>Expenses</span>
                </div>
                <span className="stat-value">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(member.expenses)}</span>
              </div>
              <div className="member-stat-item">
                <div className="stat-label">
                  <PiggyBank size={14} className="info-text" /> 
                  <span>Savings Contribution</span>
                </div>
                <span className="stat-value">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(member.savings)}</span>
              </div>
            </div>

            <div className="contribution-bar">
              <div className="bar-fill" style={{ width: `${(member.income / (member.income + member.expenses || 1) * 100)}%` }}></div>
            </div>
            <p className="bar-label">Income to Expense Ratio</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyView;
