import React, { useState } from 'react'
import { Wallet, Plus, Trash2, DollarSign, Calendar, Tag, FileText, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

const CostsView = ({ costs, addCost }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newCost, setNewCost] = useState({
    category: 'Marketing',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const totalCosts = costs.reduce((sum, cost) => sum + parseFloat(cost.amount), 0)

  const handleSave = (e) => {
    e.preventDefault()
    if (!newCost.amount || !newCost.description) return
    addCost(newCost)
    setNewCost({
      category: 'Marketing',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    })
    setIsAdding(false)
  }

  return (
    <div className="costs-wrapper animate-fade-in">
      <div className="view-header">
        <div className="header-info">
          <h1>Gestión de Costos Operativos</h1>
          <p className="subtitle">Registro de egresos para cálculo de rentabilidad y CAC</p>
        </div>
        
        <div className="summary-banner glass-panel">
          <div className="banner-item">
            <span className="label">Inversión Total Acumulada</span>
            <span className="value text-danger">
              {totalCosts.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
            </span>
          </div>
          <TrendingDown size={32} className="banner-icon text-danger" />
        </div>
      </div>

      <div className="costs-content">
        <div className="actions-bar">
          <button className="add-cost-btn" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? 'Cancelar' : <><Plus size={18} /> Registrar Gasto</>}
          </button>
        </div>

        {isAdding && (
          <motion.form 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="add-cost-card glass-panel"
            onSubmit={handleSave}
          >
            <div className="form-row">
              <div className="input-group">
                <label>Categoría</label>
                <select 
                  value={newCost.category} 
                  onChange={e => setNewCost({...newCost, category: e.target.value})}
                >
                  <option>Marketing</option>
                  <option>Operaciones</option>
                  <option>Ventas</option>
                  <option>Logística</option>
                  <option>Otros</option>
                </select>
              </div>
              <div className="input-group">
                <label>Monto (MXN)</label>
                <input 
                  type="number" 
                  value={newCost.amount}
                  onChange={e => setNewCost({...newCost, amount: e.target.value})}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="input-group">
                <label>Fecha</label>
                <input 
                  type="date" 
                  value={newCost.date}
                  onChange={e => setNewCost({...newCost, date: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Descripción / Concepto</label>
              <input 
                type="text" 
                value={newCost.description}
                onChange={e => setNewCost({...newCost, description: e.target.value})}
                placeholder="Ej. Facebook Ads - Campaña Monterrey"
                required
              />
            </div>
            <button type="submit" className="save-btn">Guardar Registro</button>
          </motion.form>
        )}

        <div className="costs-table-container glass-panel">
          <table className="costs-table">
            <thead>
              <tr>
                <th><Calendar size={14} /> Fecha</th>
                <th><Tag size={14} /> Categoría</th>
                <th><FileText size={14} /> Concepto</th>
                <th><DollarSign size={14} /> Monto</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((cost) => (
                <tr key={cost.id}>
                  <td className="date-cell">{cost.date}</td>
                  <td><span className={`cat-badge ${cost.category.toLowerCase()}`}>{cost.category}</span></td>
                  <td className="desc-cell">{cost.description}</td>
                  <td className="amount-cell">-${parseFloat(cost.amount).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .costs-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-info h1 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .summary-banner {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem 2rem;
          background: rgba(239, 68, 68, 0.05);
          border-color: rgba(239, 68, 68, 0.2);
        }

        .banner-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .banner-item .label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .banner-item .value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .actions-bar {
          margin-bottom: 1.5rem;
        }

        .add-cost-btn {
          background: var(--text-primary);
          color: var(--bg-dark);
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          transition: all 0.2s;
        }

        .add-cost-btn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .add-cost-card {
           padding: 2rem;
           margin-bottom: 2rem;
           display: flex;
           flex-direction: column;
           gap: 1.5rem;
           border-color: var(--accent-primary);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .input-group input,
        .input-group select {
           padding: 12px;
           background: rgba(0, 0, 0, 0.2);
           border: 1px solid var(--border-color);
           border-radius: 8px;
           color: white;
           outline: none;
        }

        .save-btn {
          background: var(--accent-primary);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          margin-top: 0.5rem;
        }

        .costs-table-container {
          padding: 1rem;
        }

        .costs-table {
          width: 100%;
          border-collapse: collapse;
        }

        .costs-table th {
          text-align: left;
          padding: 1rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .costs-table td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.9rem;
        }

        .cat-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .cat-badge.marketing { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
        .cat-badge.operaciones { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .cat-badge.ventas { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .amount-cell {
          font-weight: 700;
          color: #ef4444;
          text-align: right;
        }

        .date-cell { color: var(--text-secondary); }
        .desc-cell { color: var(--text-primary); }

        .text-danger { color: #ef4444; }
      `}</style>
    </div>
  )
}

export default CostsView
