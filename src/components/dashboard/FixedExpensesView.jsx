import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { RefreshCw, Calendar, ArrowRight, User } from 'lucide-react';

const FixedExpensesView = () => {
  const { transactions } = useBudget();
  const fixedItems = transactions.filter(t => t.isFixed);

  return (
    <div className="fixed-expenses-view fade-in">
      <div className="content-header">
        <div>
          <h1>Fixed Expenses</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your recurring monthly commitments.</p>
        </div>
      </div>

      <div className="fixed-grid">
        {fixedItems.map(item => (
          <div key={item.id} className="fixed-card glass-morphism">
            <div className="fixed-card-header">
              <div className="fixed-icon">
                <RefreshCw size={24} className="spinning-icon" />
              </div>
              <span className={`type-tag ${item.type}`}>{item.type}</span>
            </div>
            
            <div className="fixed-card-body">
              <h3>{item.category}</h3>
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
        
        <div className="fixed-card add-card glass-morphism">
          <div className="add-icon">
            <RefreshCw size={32} />
          </div>
          <h3>Add Recurring</h3>
          <p>Setup new monthly bill</p>
        </div>
      </div>
    </div>
  );
};

export default FixedExpensesView;
