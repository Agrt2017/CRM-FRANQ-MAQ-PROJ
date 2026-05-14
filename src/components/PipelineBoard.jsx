import React, { useState } from 'react'
import { MoreVertical, Plus, User, DollarSign, Calendar, Tag, HardHat, Store, X, MessageSquare } from 'lucide-react'
import { motion, Reorder } from 'framer-motion'
import LeadForm from './LeadForm'

const STAGES = [
  { id: 'PIP', title: 'Por Iniciar Proceso', code: 'PIP', color: '#00fbff', description: 'Primer contacto realizado.' },
  { id: 'EP1', title: 'En Proceso Fase 1', code: 'EP1', color: '#001f5c', description: 'Intercambio de información general.' },
  { id: 'EP2', title: 'En Proceso Fase 2', code: 'EP2', color: '#8bb24a', description: 'Asesoría económica y local.' },
  { id: 'EP3', title: 'En Proceso Fase 3', code: 'EP3', color: '#00ff00', description: 'Cierre de venta y reserva.' },
  { id: 'C', title: 'Completado', code: 'C', color: '#008000', description: 'Acuerdo logrado y pago realizado.' },
  { id: 'SB', title: 'Stand By', code: 'SB', color: '#ffff00', description: 'El potencial pidió tiempo.' },
  { id: 'PVS', title: 'Por Verificar Situación', code: 'PVS', color: '#ff8c00', description: 'Sin contacto > 1 mes.' },
  { id: 'D', title: 'Descartado', code: 'D', color: '#ff0000', description: 'Sin interés o recursos agotados.' },
]

const PipelineBoard = ({ leads, setLeads, updateLead, addLead }) => {
  const [selectedLead, setSelectedLead] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const getLeadsInStage = (stageId) => leads.filter(lead => lead.stage === stageId)

  // Sync selectedLead when leads change in parent
  const activeLead = selectedLead ? leads.find(l => l.id === selectedLead.id) : null

  const moveLead = (leadId, newStage) => {
    updateLead(leadId, { stage: newStage })
  }

  const getTotalValue = (stageId) => {
    return getLeadsInStage(stageId).reduce((sum, lead) => sum + lead.value, 0).toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    })
  }

  return (
    <div className="pipeline-wrapper">
      <div className="pipeline-header">
        <div className="summary-stats">
          <div className="stat">
            <span className="label">Total en Pipeline</span>
            <span className="value">400,000 MXN</span>
          </div>
          <div className="stat">
            <span className="label">Prospectos Activos</span>
            <span className="value">{leads.length}</span>
          </div>
        </div>
        <button className="add-btn" onClick={() => setIsFormOpen(true)}>
          <Plus size={18} />
          <span>Nuevo Prospecto</span>
        </button>
      </div>

      <div className="pipeline-grid">
        {STAGES.map(stage => (
          <div key={stage.id} className="pipeline-column">
            <div className="column-header">
              <div className="title-group">
                <div className="status-indicator" style={{ backgroundColor: stage.color }}></div>
                <div className="stage-title-container">
                  <span className="stage-code" style={{ color: stage.color }}>{stage.code}</span>
                  <h3>{stage.title}</h3>
                </div>
                <span className="count">{getLeadsInStage(stage.id).length}</span>
              </div>
              <span className="stage-value">{getTotalValue(stage.id)}</span>
            </div>

            <div className="column-content">
              {getLeadsInStage(stage.id).map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onClick={() => setSelectedLead(lead)}
                />
              ))}
              <div className="add-card-placeholder" onClick={() => setIsFormOpen(true)}>
                <Plus size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeLead && (
        <LeadDrawer 
          lead={activeLead} 
          onClose={() => setSelectedLead(null)} 
          onMove={(newStage) => moveLead(activeLead.id, newStage)}
          updateLead={updateLead}
        />
      )}

      {isFormOpen && (
        <LeadForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={addLead} 
        />
      )}

      <style jsx>{`
        .pipeline-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
        }

        .pipeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-stats {
          display: flex;
          gap: 2.5rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat .label {
          color: var(--text-secondary);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat .value {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
        }

        .add-btn {
          background: var(--accent-primary);
          color: white;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: all 0.2s;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
        }

        .pipeline-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 1rem;
          flex: 1;
          min-height: 0;
          overflow-x: auto;
          padding-bottom: 1rem;
        }

        .pipeline-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 280px;
        }

        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.25rem;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .stage-title-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stage-code {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .column-header h3 {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .count {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 12px;
          color: var(--text-secondary);
        }

        .stage-value {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .column-content {
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed var(--border-color);
          border-radius: 16px;
          padding: 0.75rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow-y: auto;
        }

        .add-card-placeholder {
          border: 1px dashed var(--border-color);
          border-radius: 12px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s;
          cursor: pointer;
        }

        .add-card-placeholder:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--text-secondary);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  )
}

const LeadCard = ({ lead, onClick, onMove }) => {
  const getHeatColor = (heat) => {
    switch (heat) {
      case 'hot': return '#ef4444'
      case 'warm': return '#f59e0b'
      case 'cold': return '#3b82f6'
      default: return '#94a3b8'
    }
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="lead-card glass-panel"
      onClick={onClick}
    >
      <div className="card-header">
        <div className="lead-type-badge">
          {lead.type === 'Franquicia' ? <Store size={12} /> : <HardHat size={12} />}
          <span>{lead.type}</span>
        </div>
      </div>

      <div className="card-body">
        <h4 className="lead-name">{lead.name}</h4>
        <p className="lead-company">{lead.company}</p>
        
        <div className="lead-meta">
          <div className="meta-item">
            <DollarSign size={14} />
            <span>{lead.value.toLocaleString()}</span>
          </div>
          <div className="lead-heat" style={{ borderColor: getHeatColor(lead.heat) }}>
            <span className="heat-dot" style={{ backgroundColor: getHeatColor(lead.heat) }}></span>
            {lead.heat}
          </div>
        </div>
        
        <div className="card-actions-row">
          <a 
            href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${lead.name}, te contacto desde el CRM industrial sobre tu interés en ${lead.type}...`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageSquare size={14} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .lead-card {
          padding: 1rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }

        .lead-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(45, 55, 72, 0.4);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .lead-type-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .lead-name {
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .lead-company {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .lead-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .lead-heat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          text-transform: uppercase;
          font-weight: 700;
          padding: 2px 8px;
          border: 1px solid transparent;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.2);
        }

        .heat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .card-actions-row {
          display: flex;
          gap: 8px;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .whatsapp-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          background: rgba(37, 211, 102, 0.1);
          color: #25d366;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid rgba(37, 211, 102, 0.2);
        }

        .whatsapp-btn:hover {
          background: #25d366;
          color: white;
          transform: translateY(-1px);
        }
      `}</style>
    </motion.div>
  )
}

const LeadDrawer = ({ lead, onClose, onMove, updateLead }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState('Llamada')

  const toggleActivity = (actId) => {
    const updatedActivities = lead.activities.map(act => 
      act.id === actId ? { ...act, done: !act.done } : act
    )
    updateLead(lead.id, { activities: updatedActivities })
  }

  const handleAddActivity = () => {
    if (!newTitle.trim()) return
    const newAct = {
      id: Date.now().toString(),
      type: newType,
      title: newTitle,
      date: 'Hoy',
      done: false
    }
    updateLead(lead.id, { activities: [newAct, ...(lead.activities || [])] })
    setNewTitle('')
    setShowAddForm(false)
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="drawer-content glass-panel"
        onClick={e => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h2 className="drawer-name">{lead.name}</h2>
            <div className="drawer-badge">{lead.type}</div>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="drawer-body">
          <div className="drawer-tabs">
            <div className="drawer-section">
              <h3 className="section-title">Datos del Interesado</h3>
              <div className="grid-2">
                <div className="field">
                  <label>Profesión</label>
                  <p>{lead.profession || 'No especificada'}</p>
                </div>
                <div className="field">
                  <label>Ocupación</label>
                  <p>{lead.occupation || 'Empresario'}</p>
                </div>
                <div className="field">
                  <label>Nombre Legal / RIF</label>
                  <p>{lead.legalName || 'N/A'} - {lead.rif || 'V-000000-0'}</p>
                </div>
              </div>
            </div>

            <div className="drawer-section">
              <h3 className="section-title">Contacto & Ubicación</h3>
              <div className="grid-2">
                <div className="field">
                  <label>Celular</label>
                  <div className="flex-center gap-10">
                    <p>{lead.phone || 'Sin número'}</p>
                    <a 
                      href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${lead.name}, te contacto desde el CRM industrial sobre tu interés en ${lead.type}...`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-icon-btn"
                    >
                      <MessageSquare size={16} />
                    </a>
                  </div>
                </div>
                <div className="field">
                  <label>Email</label>
                  <p>{lead.email || 'Sin correo'}</p>
                </div>
                <div className="field-full">
                  <label>Dirección</label>
                  <p>{lead.address || 'Calle Falsa 123, Col. Centro'}</p>
                </div>
                <div className="field">
                  <label>Ciudad/Estado</label>
                  <p>{lead.city || 'Ciudad'}, {lead.state || 'Estado'}</p>
                </div>
                <div className="field">
                  <label>País</label>
                  <p>{lead.country || 'México'}</p>
                </div>
              </div>
            </div>

            <div className="drawer-section">
              <h3 className="section-title">Perfil del Interesado</h3>
              <div className="perfil-grid">
                <div className="perfil-item"><span>Académico:</span> Licenciatura</div>
                <div className="perfil-item"><span>Empresarial:</span> Alta</div>
                <div className="perfil-item"><span>Económico:</span> Solvente</div>
                <div className="perfil-item"><span>Crediticio:</span> Excelente</div>
              </div>
            </div>

            <div className="drawer-section">
              <h3 className="section-title">Interés & Origen</h3>
              <div className="grid-2">
                <div className="field">
                  <label>Zona de Interés</label>
                  <p>{lead.interestZone || 'Nacional'}</p>
                </div>
                <div className="field">
                  <label>Medio de Contacto</label>
                  <p>{lead.source || 'Web'}</p>
                </div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="section-header-flex">
                <h3 className="section-title">Actividades a Realizar</h3>
                <button 
                  className="add-task-btn"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <Plus size={14} /> Nueva Tarea
                </button>
              </div>

              {showAddForm && (
                <div className="add-activity-form">
                  <select value={newType} onChange={e => setNewType(e.target.value)}>
                    <option>Llamada</option>
                    <option>Envío</option>
                    <option>Reunión</option>
                    <option>Documentación</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="¿Qué se debe hacer?" 
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    autoFocus
                  />
                  <button onClick={handleAddActivity} className="save-act-btn">Guardar</button>
                </div>
              )}

              <div className="activities-list">
                {lead.activities && lead.activities.length > 0 ? (
                  lead.activities.map(act => (
                    <div 
                      key={act.id} 
                      className={`activity-item ${act.done ? 'done' : ''}`}
                      onClick={() => toggleActivity(act.id)}
                    >
                      <div className="activity-check">
                        {act.done ? <div className="dot-done" /> : <div className="dot-pending" />}
                      </div>
                      <div className="activity-info">
                        <div className="activity-top">
                          <span className="activity-type">{act.type}</span>
                          <span className="activity-date">{act.date}</span>
                        </div>
                        <p className="activity-title">{act.title}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-activities">
                    <p>No hay actividades programadas.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="drawer-section">
              <label>Cambiar Etapa del Proceso</label>
              <div className="stage-buttons">
                {STAGES.map(stage => (
                  <button 
                    key={stage.id}
                    className={`stage-btn ${lead.stage === stage.id ? 'active' : ''}`}
                    onClick={() => onMove(stage.id)}
                    style={{ '--stage-color': stage.color }}
                    title={stage.description}
                  >
                    <span className="btn-code">{stage.code}</span>
                    <span className="btn-title">{stage.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
        }

        .drawer-content {
          width: 550px;
          height: 100%;
          border-radius: 0;
          border-left: 2px solid var(--border-color);
          padding: 0;
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 50px rgba(0, 0, 0, 0.4);
        }

        .drawer-header {
          padding: 2.5rem 2.5rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--border-color);
        }

        .drawer-name {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .drawer-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .close-btn {
          font-size: 2.5rem;
          color: var(--text-secondary);
          line-height: 0.8;
          font-weight: 300;
        }

        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem;
        }

        .drawer-tabs {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .section-title {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-primary);
          margin-bottom: 1.25rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .field label {
          display: block;
          color: var(--text-secondary);
          font-size: 0.7rem;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .field p {
          font-size: 1rem;
          color: var(--text-primary);
        }

        .field-full {
          grid-column: span 2;
        }

        .perfil-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 1.25rem;
          border-radius: 12px;
        }

        .perfil-item {
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .flex-center {
          display: flex;
          align-items: center;
        }

        .gap-10 { gap: 10px; }

        .whatsapp-icon-btn {
          color: #25d366;
          background: rgba(37, 211, 102, 0.1);
          padding: 6px;
          border-radius: 8px;
          line-height: 0;
          transition: all 0.2s;
          border: 1px solid rgba(37, 211, 102, 0.2);
        }

        .whatsapp-icon-btn:hover {
          background: #25d366;
          color: white;
        }

        .perfil-item span {
          color: var(--text-secondary);
          margin-right: 8px;
        }

        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .section-header-flex .section-title {
          margin-bottom: 0;
          border-bottom: none;
        }

        .add-task-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-task-btn:hover {
          background: var(--accent-primary);
          color: white;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .activity-item:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .activity-item.done {
          opacity: 0.6;
        }

        .activity-check {
          padding-top: 4px;
        }

        .dot-done {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-secondary);
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
        }

        .dot-pending {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--text-secondary);
        }

        .activity-info {
          flex: 1;
        }

        .activity-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .activity-type {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--accent-primary);
          letter-spacing: 0.05em;
        }

        .activity-date {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .activity-title {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .no-activities {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed var(--border-color);
          border-radius: 12px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .value-large {
          font-family: var(--font-display);
          font-size: 1.5rem !important;
          font-weight: 700;
          color: var(--accent-secondary);
        }

        .stage-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .stage-btn {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          min-width: 120px;
        }

        .btn-code {
          font-size: 0.6rem;
          font-weight: 800;
          opacity: 0.7;
        }

        .btn-title {
          font-weight: 600;
        }

        .stage-btn.active {
          background: var(--stage-color);
          border-color: var(--stage-color);
          color: white;
          box-shadow: 0 4px 12px var(--stage-color);
        }

        .stage-btn.active .btn-code {
          opacity: 1;
        }

        .add-activity-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(255, 255, 255, 0.03);
          padding: 1.25rem;
          border-radius: 12px;
          border: 1px solid var(--accent-primary);
          margin-bottom: 1.5rem;
        }

        .add-activity-form select, 
        .add-activity-form input {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          padding: 10px;
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          outline: none;
        }

        .save-act-btn {
          background: var(--accent-primary);
          color: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}


export default PipelineBoard
