import React from 'react'
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight, Store, HardHat } from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const stats = [
    { label: 'Ingresos Proyectados', value: '$842,000', icon: DollarSign, trend: '+12.5%', isUp: true, color: '#10b981' },
    { label: 'Nuevos Prospectos', value: '24', icon: Users, trend: '+4.3%', isUp: true, color: '#6366f1' },
    { label: 'Tasa de Conversión', value: '18.2%', icon: Target, trend: '-2.1%', isUp: false, color: '#f59e0b' },
    { label: 'Ventas Cerradas', value: '7', icon: TrendingUp, trend: '+8.0%', isUp: true, color: '#3b82f6' },
  ]

  return (
    <div className="dashboard-wrapper">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card glass-panel"
          >
            <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-value-group">
                <span className="stat-value">{stat.value}</span>
                <span className={`stat-trend ${stat.isUp ? 'up' : 'down'}`}>
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="chart-container glass-panel">
          <div className="panel-header">
            <h3>Distribución de Prospectos</h3>
            <select className="period-select">
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
            </select>
          </div>
          <div className="distribution-viz">
            <div className="viz-item">
              <div className="viz-label">
                <Store size={16} />
                <span>Franquicias</span>
                <span className="percentage">64%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '64%', background: 'var(--accent-primary)' }}></div>
              </div>
            </div>
            <div className="viz-item">
              <div className="viz-label">
                <HardHat size={16} />
                <span>Maquinaria</span>
                <span className="percentage">36%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '36%', background: 'var(--accent-secondary)' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-activity glass-panel">
          <div className="panel-header">
            <h3>Actividad Reciente</h3>
            <button className="view-all">Ver todo</button>
          </div>
          <div className="activity-list">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p><strong>Carlos Slim</strong> movió Maquinaria Industrial a <span>Negociación</span></p>
                  <span className="time">Hace 2 horas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .stat-value-group {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stat-trend.up { color: var(--accent-secondary); }
        .stat-trend.down { color: var(--accent-danger); }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 1.5rem;
        }

        .chart-container, .recent-activity {
          padding: 1.5rem;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .panel-header h3 {
          font-size: 1.1rem;
        }

        .period-select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          outline: none;
        }

        .distribution-viz {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .viz-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .percentage {
          margin-left: auto;
          color: var(--text-primary);
          font-weight: 600;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .activity-content p {
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .activity-content p span {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .time {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .view-all {
          font-size: 0.8rem;
          color: var(--accent-primary);
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
