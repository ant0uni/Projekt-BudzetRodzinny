import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const StatsView = () => {
  const { transactions, members, t } = useBudget();

  // Data for member spending
  const memberSpending = members.map(member => ({
    name: member,
    spent: transactions
      .filter(t => t.member === member && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0),
    saved: transactions
      .filter(t => t.member === member && t.type === 'savings')
      .reduce((acc, t) => acc + t.amount, 0),
  }));

  // Data for category breakdown
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, tr) => {
      const existing = acc.find(item => item.name === tr.category);
      if (existing) {
        existing.value += tr.amount;
      } else {
        acc.push({ name: t(tr.category.toLowerCase()) || tr.category, value: tr.amount });
      }
      return acc;
    }, []);

  const COLORS = ['#8b5cf6', '#ec4899', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="stats-view fade-in">
      <div className="content-header">
        <div>
          <h1>{t('familyAnalytics')}</h1>
          <p style={{ color: 'var(--text-muted)' }}>{t('analyzeSpending')}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="chart-container glass-morphism">
          <h3>{t('spendingSaving')}</h3>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={memberSpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="spent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saved" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container glass-morphism">
          <h3>Expense Distribution</h3>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
