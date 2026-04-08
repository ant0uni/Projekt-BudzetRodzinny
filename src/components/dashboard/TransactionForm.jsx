import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { X, Plus, PiggyBank, TrendingUp, TrendingDown } from 'lucide-react';

const TransactionForm = ({ isOpen, onClose }) => {
  const { members, addTransaction } = useBudget();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    member: members[0],
    type: 'expense',
    isFixed: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData({ amount: '', category: '', member: members[0], type: 'expense', isFixed: false });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-morphism fade-in">
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Amount (PLN)</label>
            <input 
              type="number" 
              required 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <input 
              type="text" 
              required 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              placeholder="e.g. Groceries, Salary, Movie"
            />
          </div>
          
          <div className="form-group">
            <label>Family Member</label>
            <select 
              value={formData.member}
              onChange={(e) => setFormData({...formData, member: e.target.value})}
            >
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          
          <div className="type-selector">
            <button 
              type="button" 
              className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
              onClick={() => setFormData({...formData, type: 'income'})}
            >
              <TrendingUp size={18} /> Income
            </button>
            <button 
              type="button" 
              className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
              onClick={() => setFormData({...formData, type: 'expense'})}
            >
              <TrendingDown size={18} /> Expense
            </button>
            <button 
              type="button" 
              className={`type-btn ${formData.type === 'savings' ? 'active savings' : ''}`}
              onClick={() => setFormData({...formData, type: 'savings'})}
            >
              <PiggyBank size={18} /> Savings
            </button>
          </div>
          
          <div className="checkbox-group">
            <input 
              type="checkbox" 
              id="isFixed" 
              checked={formData.isFixed}
              onChange={(e) => setFormData({...formData, isFixed: e.target.checked})}
            />
            <label htmlFor="isFixed">Fixed (Recurring) Transaction</label>
          </div>
          
          <button type="submit" className="btn btn-primary submit-btn">
            Add Transaction <Plus size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
