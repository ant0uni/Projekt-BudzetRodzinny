import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Globe, Users, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsView = () => {
  const { language, setLanguage, members, addMember, removeMember, updateMember, t } = useBudget();
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      addMember(newMemberName.trim());
      setNewMemberName('');
    }
  };

  const startEditing = (name) => {
    setEditingMember(name);
    setEditName(name);
  };

  const handleUpdate = () => {
    if (editName.trim() && editName !== editingMember) {
      updateMember(editingMember, editName);
    }
    setEditingMember(null);
  };

  return (
    <div className="settings-view fade-in">
      <div className="content-header">
        <div>
          <h1>{t('settings')}</h1>
          <p style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        </div>
      </div>

      <div className="settings-grid">
        <section className="settings-section glass-morphism">
          <div className="section-header">
            <Globe className="section-icon" size={24} />
            <h2>{t('language')}</h2>
          </div>
          <div className="language-selector">
            <button 
              className={`lang-btn ${language === 'pl' ? 'active' : ''}`}
              onClick={() => setLanguage('pl')}
            >
              🇵🇱 {t('languagePolish')}
            </button>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              🇺🇸 {t('languageEnglish')}
            </button>
          </div>
        </section>

        <section className="settings-section glass-morphism">
          <div className="section-header">
            <Users className="section-icon" size={24} />
            <h2>{t('manageFamily')}</h2>
          </div>
          
          <form className="add-member-form" onSubmit={handleAddMember}>
            <input 
              type="text" 
              placeholder={t('placeholderMember')} 
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
            />
            <button type="submit" className="icon-btn-circle success">
              <Plus size={20} />
            </button>
          </form>

          <div className="members-list">
            {members.map(member => (
              <div key={member} className="member-item">
                {editingMember === member ? (
                  <div className="edit-group">
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                    />
                    <button className="icon-btn-small success" onClick={handleUpdate}>
                      <Check size={16} />
                    </button>
                    <button className="icon-btn-small danger" onClick={() => setEditingMember(null)}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="member-info">
                      <div className="member-avatar-mini">{member[0]}</div>
                      <span>{member}</span>
                    </div>
                    <div className="member-actions">
                      <button className="icon-btn-small" onClick={() => startEditing(member)}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="icon-btn-small danger" 
                        onClick={() => removeMember(member)}
                        disabled={members.length <= 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
