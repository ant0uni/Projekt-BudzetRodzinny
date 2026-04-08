import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DashboardOverview from './components/dashboard/DashboardOverview'
import TransactionList from './components/dashboard/TransactionList'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

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
                <button className="btn btn-primary">Download Report</button>
              </div>
              <DashboardOverview />
              <TransactionList />
            </div>
          )}
          {/* Other tabs will be implemented in subsequent commits */}
        </div>
      </main>
    </div>
  )
}

export default App
