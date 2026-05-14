import React from 'react'
import { TrendingUp, Target, CreditCard, AlertTriangle, BarChart3, PieChart, Map, FastForward, DollarSign, Percent } from 'lucide-react'
import { motion } from 'framer-motion'

const AnalyticsView = ({ leads, costs }) => {
  // Calculate real metrics
  const totalExpenses = costs.reduce((sum, c) => sum + parseFloat(c.amount), 0)
  const closedContracts = leads.filter(l => l.stage === 'C').length
  const realCAC = closedContracts > 0 ? (totalExpenses / closedContracts) : 0
  
  const weightedValue = leads.reduce((sum, l) => {
    let probability = 0.1
    if (l.stage === 'PIP') probability = 0.2
    if (l.stage.startsWith('EP')) probability = 0.5
    if (l.stage === 'C') probability = 1.0
    return sum + (l.value * probability)
  }, 0)

  const kpis = [
    { label: 'Sales Velocity', value: '14.2 días', icon: FastForward, color: '#6366f1', desc: 'Promedio de cierre' },
    { label: 'Valor Ponderado', value: `$${(weightedValue / 1000000).toFixed(1)}M`, icon: DollarSign, color: '#10b981', desc: 'Probabilidad aplicada' },
    { label: 'Lead Scoring Promedio', value: '8.4/10', icon: Target, color: '#f59e0b', desc: 'Calidad de prospectos' },
    { label: 'CAC Real', value: `$${realCAC.toLocaleString()}`, icon: CreditCard, color: '#ef4444', desc: `Basado en ${closedContracts} contratos` },
  ]

  return (
    <div className="analytics-wrapper animate-fade-in">
      <div className="analytics-grid">
        {/* ROW 1: CORE KPIs */}
        {kpis.map((kpi, i) => (
          <motion.div 
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="kpi-card glass-panel"
          >
            <div className="kpi-icon" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
              <kpi.icon size={24} />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">{kpi.label}</span>
              <span className="kpi-value">{kpi.value}</span>
              <span className="kpi-desc">{kpi.desc}</span>
            </div>
          </motion.div>
        ))}

        {/* ROW 2: EFICIENCIA & RENTABILIDAD */}
        <div className="analytics-card glass-panel span-2">
          <div className="card-header">
            <h3><BarChart3 size={18} /> Tasa de Conversión por Etapa (Yield Analysis)</h3>
            <span className="subtitle">Identificación de puntos de fuga</span>
          </div>
          <div className="funnel-viz">
            {[
              { stage: 'Prospección', rate: '100%', count: 120 },
              { stage: 'Calificación', rate: '68%', count: 82 },
              { stage: 'Análisis Legal', rate: '42%', count: 50 },
              { stage: 'Negociación', rate: '24%', count: 29 },
              { stage: 'Cierre', rate: '12%', count: 14 }
            ].map((step, i) => (
              <div key={step.stage} className="funnel-step" style={{ width: `${100 - (i * 10)}%` }}>
                <span className="step-name">{step.stage}</span>
                <span className="step-rate">{step.rate}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card glass-panel">
          <div className="card-header">
            <h3><PieChart size={18} /> Valor de Pipeline Ponderado</h3>
            <span className="subtitle">Proyección basada en probabilidad</span>
          </div>
          <div className="weighted-viz">
             <div className="ring-chart">
                <div className="ring-inner">
                  <span className="total">$4.8M</span>
                  <span className="label">Valor Nominal</span>
                </div>
             </div>
             <div className="legend">
               <div className="legend-item"><span className="dot" style={{ background: '#10b981' }}></span> Alta (80%) - $1.2M</div>
               <div className="legend-item"><span className="dot" style={{ background: '#f59e0b' }}></span> Media (50%) - $2.4M</div>
               <div className="legend-item"><span className="dot" style={{ background: '#6366f1' }}></span> Baja (20%) - $1.2M</div>
             </div>
          </div>
        </div>

        {/* ROW 3: RIESGOS & GEOGRAFIA */}
        <div className="analytics-card glass-panel">
          <div className="card-header">
            <h3><AlertTriangle size={18} /> Gestión de Riesgos</h3>
            <span className="subtitle">Alertas de deserción y saturación</span>
          </div>
          <div className="risk-list">
            <div className="risk-item warning">
              <span className="risk-tag">Deserción</span>
              <p>Incremento del 15% en abandonos por "Análisis Legal".</p>
            </div>
            <div className="risk-item critical">
              <span className="risk-tag">Geográfico</span>
              <p>82% de leads concentrados en CDMX. Riesgo de saturación.</p>
            </div>
          </div>
        </div>

        <div className="analytics-card glass-panel span-2">
          <div className="card-header">
            <h3><Map size={18} /> Concentración de Riesgo Geográfico</h3>
            <span className="subtitle">Demanda por zonas regionales</span>
          </div>
          <div className="geo-chart">
             {[
               { region: 'CDMX & Zona Metropolitana', value: 82, color: '#ef4444' },
               { region: 'Norte (Mty, Saltillo)', value: 45, color: '#3b82f6' },
               { region: 'Occidente (Gdl, Qro)', value: 38, color: '#10b981' },
               { region: 'Sureste (Cancún, Mérida)', value: 12, color: '#f59e0b' }
             ].map(item => (
               <div key={item.region} className="geo-row">
                 <span className="region-name">{item.region}</span>
                 <div className="bar-wrapper">
                   <div className="bar-fill" style={{ width: `${item.value}%`, background: item.color }}></div>
                   <span className="bar-value">{item.value} Leads</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .analytics-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .span-2 { grid-column: span 2; }

        .kpi-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .kpi-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kpi-content {
          display: flex;
          flex-direction: column;
        }

        .kpi-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .kpi-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .kpi-desc {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .analytics-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .card-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .subtitle {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* Funnel Viz */
        .funnel-viz {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .funnel-step {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.4), rgba(99, 102, 241, 0.1));
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          border: 1px solid rgba(99, 102, 241, 0.2);
          font-size: 0.85rem;
        }

        .step-name { font-weight: 600; }
        .step-rate { color: var(--accent-primary); font-weight: 700; }

        /* Weighted Viz */
        .weighted-viz {
          display: flex;
          align-items: center;
          gap: 2rem;
          justify-content: center;
        }

        .ring-chart {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 12px solid rgba(255, 255, 255, 0.05);
          border-top-color: var(--accent-secondary);
          border-right-color: var(--accent-warning);
          border-left-color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ring-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ring-inner .total { font-weight: 700; font-size: 1.25rem; }
        .ring-inner .label { font-size: 0.65rem; color: var(--text-secondary); }

        .legend {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .dot { width: 8px; height: 8px; border-radius: 50%; }

        /* Risks */
        .risk-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .risk-item {
          padding: 1rem;
          border-radius: 12px;
          border-left: 4px solid #fff;
          background: rgba(255, 255, 255, 0.02);
        }

        .risk-item.warning { border-color: var(--accent-warning); }
        .risk-item.critical { border-color: var(--accent-danger); }

        .risk-tag {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }

        .risk-item p { font-size: 0.85rem; }

        /* Geo Chart */
        .geo-chart {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .geo-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .region-name { font-size: 0.85rem; color: var(--text-secondary); }

        .bar-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .bar-fill {
          height: 12px;
          border-radius: 6px;
        }

        .bar-value { font-size: 0.8rem; font-weight: 600; width: 60px; }
      `}</style>
    </div>
  )
}

export default AnalyticsView
