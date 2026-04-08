import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DashboardOverview from './components/dashboard/DashboardOverview'
import TransactionList from './components/dashboard/TransactionList'
import TransactionForm from './components/dashboard/TransactionForm'
import SavingsView from './components/dashboard/SavingsView'
import StatsView from './components/dashboard/StatsView'
import FixedExpensesView from './components/dashboard/FixedExpensesView'
import FamilyView from './components/dashboard/FamilyView'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-wrapper">
        <Header />
        
        <div className="content-area">
          {activeTab === 'dashboard' && (
            <div className="fade-in">
              <div className="content-header">
                <div>
                  <h1>Welcome back, Team!</h1>
                  <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your family budget today.</p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Transaction
                </button>
              </div>
              <DashboardOverview />
              <TransactionList />
            </div>
          )}

          {activeTab === 'savings' && (
            <SavingsView />
          )}

          {activeTab === 'stats' && (
            <StatsView />
          )}

          {activeTab === 'family' && (
            <FamilyView />
          )}

          {(activeTab === 'income' || activeTab === 'expenses') && (
            <FixedExpensesView />
          )}
          
          {/* Default view */}
        </div>
      </main>

      <TransactionForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default App
