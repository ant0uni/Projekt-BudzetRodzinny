import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { RefreshCw, Calendar, ArrowRight, User } from 'lucide-react';

const FixedExpensesView = ({ type = 'expenses' }) => {
  const { transactions, t, setIsModalOpen, setModalDefaults } = useBudget();
  const isIncome = type === 'income';
  const filterType = isIncome ? 'income' : 'expense';
  const fixedItems = transactions.filter(item => item.isFixed && item.type === filterType);

  return (
    <div className="fixed-expenses-view fade-in">
      <div className="content-header">
        <div>
          <h1>{isIncome ? t('fixedIncomes') : t('fixedExpenses')}</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {isIncome ? t('recurringSubtitleIncome') : t('recurringSubtitle')}
          </p>
        </div>
      </div>

      <div className="fixed-grid">
        {fixedItems.map(item => (
          <div key={item.id} className="fixed-card glass-morphism">
            <div className="fixed-card-header">
              <div className="fixed-icon">
                <RefreshCw size={24} className="spinning-icon" />
              </div>
              <span className={`type-tag ${item.type}`}>{t(item.type)}</span>
            </div>
            
            <div className="fixed-card-body">
              <h3>{t(item.category.toLowerCase())}</h3>
              <p className="fixed-amount">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(item.amount)}</p>
            </div>
            
            <div className="fixed-card-footer">
              <div className="footer-item">
                <User size={14} />
                <span>{item.member}</span>
              </div>
              <div className="footer-item">
                <Calendar size={14} />
                <span>Monthly</span>
              </div>
            </div>
          </div>
        ))}
        
        <div 
          className="fixed-card add-card glass-morphism" 
          onClick={() => {
            setModalDefaults({ type: filterType, isFixed: true });
            setIsModalOpen(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="add-icon">
            <RefreshCw size={32} />
          </div>
          <h3>{t('addRecurring')}</h3>
          <p>{isIncome ? t('setupMonthlyIncome') : t('setupMonthly')}</p>
        </div>
      </div>
    </div>
  );
};

export default FixedExpensesView;
