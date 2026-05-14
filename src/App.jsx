import React, { useState, useEffect } from 'react'
import './App.css'
import { LayoutDashboard, Columns, Users, TrendingUp, Settings, Plus, Search, Bell, Menu } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import PipelineBoard from './components/PipelineBoard'
import ProspectsList from './components/ProspectsList'
import AnalyticsView from './components/AnalyticsView'
import CostsView from './components/CostsView'
import { db } from './firebase'
import { collection, onSnapshot, addDoc, updateDoc, doc, setDoc, query, getDocs } from 'firebase/firestore'

const INITIAL_DATA = [
  // ... (keep for reference or seeding if needed)
]

function App() {
  const [currentView, setCurrentView] = useState('pipeline')
  const [leads, setLeads] = useState([])
  const [costs, setCosts] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Real-time Listeners
  useEffect(() => {
    const unsubLeads = onSnapshot(collection(db, 'leads'), (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setLeads(leadsData)
    })

    const unsubCosts = onSnapshot(collection(db, 'costs'), (snapshot) => {
      const costsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCosts(costsData)
    })

    return () => {
      unsubLeads()
      unsubCosts()
    }
  }, [])

  const updateLead = async (leadId, updatedFields) => {
    try {
      const leadRef = doc(db, 'leads', leadId)
      await updateDoc(leadRef, updatedFields)
    } catch (error) {
      console.error("Error updating lead:", error)
    }
  }

  const addLead = async (newLead) => {
    try {
      await addDoc(collection(db, 'leads'), {
        ...newLead,
        activities: newLead.activities || [],
        createdAt: new Date()
      })
    } catch (error) {
      console.error("Error adding lead:", error)
    }
  }

  const addCost = async (newCost) => {
    try {
      await addDoc(collection(db, 'costs'), {
        ...newCost,
        createdAt: new Date()
      })
    } catch (error) {
      console.error("Error adding cost:", error)
    }
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard leads={leads} costs={costs} />
      case 'pipeline':
        return <PipelineBoard leads={leads} setLeads={setLeads} updateLead={updateLead} addLead={addLead} />
      case 'prospects':
        return <ProspectsList leads={leads} updateLead={updateLead} addLead={addLead} />
      case 'analytics':
        return <AnalyticsView leads={leads} costs={costs} />
      case 'costs':
        return <CostsView costs={costs} addCost={addCost} />
      default:
        return <PipelineBoard leads={leads} setLeads={setLeads} updateLead={updateLead} addLead={addLead} />
    }
  }



  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
        <header className="top-bar glass-panel">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu size={20} />
            </button>
            <h1>{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
          </div>
          
          <div className="header-right">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Buscar prospectos..." />
            </div>
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <div className="avatar">JD</div>
            </div>
          </div>
        </header>

        <section className="view-container">
          {renderView()}
        </section>
      </main>

      <style jsx>{`
        .app-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: var(--bg-main);
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 1.5rem;
          overflow-y: auto;
        }

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-left h1 {
          font-size: 1.25rem;
          letter-spacing: -0.01em;
        }

        .menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          color: var(--text-secondary);
        }

        .menu-toggle:hover {
          background: var(--bg-surface-hover);
          color: var(--text-primary);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0.5rem 1rem;
          gap: 0.75rem;
          width: 300px;
        }

        .search-box input {
          background: none;
          border: none;
          color: var(--text-primary);
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }

        .icon-btn {
          position: relative;
          color: var(--text-secondary);
        }

        .notification-dot {
          position: absolute;
          top: 0;
          right: 0;
          width: 8px;
          height: 8px;
          background: var(--accent-danger);
          border-radius: 50%;
          border: 2px solid var(--bg-main);
        }

        .user-profile {
          display: flex;
          align-items: center;
        }

        .avatar {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.85rem;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .view-container {
          flex: 1;
          min-height: 0;
        }

        @media (max-width: 1024px) {
          .search-box {
            width: 150px;
          }
        }
      `}</style>
    </div>
  )
}

export default App
