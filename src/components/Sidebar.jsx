import React from 'react'
import { LayoutDashboard, Kanban, Users, BarChart3, Settings, ChevronLeft, ChevronRight, Wallet, Briefcase } from 'lucide-react'

const Sidebar = ({ currentView, setCurrentView, isOpen, toggleSidebar }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline', icon: Kanban },
    { id: 'prospects', label: 'Prospectos', icon: Users },
    { id: 'costs', label: 'Costos', icon: Wallet },
    { id: 'analytics', label: 'Análisis', icon: BarChart3 },
  ]

  return (
    <aside className={`sidebar glass-panel ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Briefcase size={24} color="#6366f1" />
        </div>
        {isOpen && <span className="logo-text">Industrial<span className="text-accent">CRM</span></span>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
              {currentView === item.id && isOpen && <div className="active-indicator" />}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          {isOpen && <span>Configuración</span>}
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: calc(100vh - 3rem);
          margin: 1.5rem 0 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
          overflow: hidden;
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 0.75rem 2rem;
        }

        .logo-icon {
          background: rgba(99, 102, 241, 0.1);
          padding: 10px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .logo-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .text-accent {
          color: var(--accent-primary);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 0.75rem;
          border-radius: 12px;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          position: relative;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: rgba(99, 102, 241, 0.1);
          color: var(--text-primary);
        }

        .active-indicator {
          position: absolute;
          right: -10px;
          width: 4px;
          height: 20px;
          background: var(--accent-primary);
          border-radius: 4px 0 0 4px;
          box-shadow: -2px 0 10px rgba(99, 102, 241, 0.5);
        }

        .sidebar-footer {
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
      `}</style>
    </aside>
  )
}

export default Sidebar
