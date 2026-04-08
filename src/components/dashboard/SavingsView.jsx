import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { PiggyBank, ArrowRight, Target, ShieldCheck } from 'lucide-react';

const SavingsView = () => {
  const { savingsBalance, transactions, t } = useBudget();
  const savingsTransactions = transactions.filter(t => t.type === 'savings');

  return (
    <div className="savings-view fade-in">
      <div className="content-header">
        <div>
          <h1>{t('savingsAccount')}</h1>
          <p style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        </div>
      </div>

      <div className="savings-banner glass-morphism">
        <div className="banner-content">
          <div className="banner-text">
            <h2>{t('savingsAccount')}</h2>
            <p className="large-amount">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(savingsBalance)}</p>
            <div className="goal-progress">
              <div className="progress-info">
                <span>{t('savingsGoal')}: 10 000,00 zł</span>
                <span>{(savingsBalance / 10000 * 100).toFixed(1)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(savingsBalance / 10000 * 100, 100)}%` }}></div>
              </div>
            </div>
          </div>
          <div className="banner-illustration">
            <PiggyBank size={120} className="floating-pig" />
          </div>
        </div>
      </div>

      <div className="savings-features">
        <div className="feature-card glass-morphism">
          <Target className="feature-icon" size={24} />
          <h3>{t('emergencyFund')}</h3>
          <p>3 months of expenses covered.</p>
          <span className="status-badge success">Complete</span>
        </div>
        <div className="feature-card glass-morphism">
          <ShieldCheck className="feature-icon" size={24} />
          <h3>{t('safeSecure')}</h3>
          <p>Your data is encrypted and safe.</p>
          <span className="status-badge info">Active</span>
        </div>
      </div>

      <div className="transaction-list-container glass-morphism" style={{ marginTop: '2rem' }}>
        <h2>Savings History</h2>
        <div className="transaction-table">
          {savingsTransactions.length > 0 ? savingsTransactions.map(item => (
            <div key={item.id} className="table-row">
              <div className="transaction-info">
                <div className="icon-circle" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <PiggyBank size={18} style={{ color: 'var(--info)' }} />
                </div>
                <span>{item.category || 'Savings Deposit'}</span>
              </div>
              <span>{item.member}</span>
              <span>{item.date}</span>
              <span className="amount-text savings">+{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(item.amount || 0)}</span>
            </div>
          )) : (
            <div className="empty-state">No savings transactions yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsView;
