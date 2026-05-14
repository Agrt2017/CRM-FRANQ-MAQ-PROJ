import React, { useState } from 'react'
import { Search, Filter, Download, MoreHorizontal, Mail, Phone, MapPin, Tag, Plus, Edit2 } from 'lucide-react'
import { motion } from 'framer-motion'
import LeadForm from './LeadForm'

const ProspectsList = ({ leads, addLead, updateLead }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLeadId, setSelectedLeadId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedLead = leads.find(l => l.id === selectedLeadId)

  const handleCreate = () => {
    setEditMode(false)
    setShowForm(true)
  }

  const handleEdit = () => {
    if (!selectedLeadId) return
    setEditMode(true)
    setShowForm(true)
  }

  const handleSave = (data) => {
    if (editMode) {
      updateLead(selectedLeadId, data)
    } else {
      addLead(data)
    }
    setShowForm(false)
  }

  return (
    <div className="prospects-wrapper animate-fade-in">
      <div className="prospects-header">
        <div className="header-top">
          <div className="header-info">
            <h1>Base de Datos de Prospectos</h1>
            <p className="subtitle">Gestión centralizada de todos los interesados e inversionistas</p>
          </div>
          <div className="header-buttons">
            <button className="action-btn primary" onClick={handleCreate}>
              <Plus size={18} />
              <span>Nuevo Prospecto</span>
            </button>
            <button 
              className={`action-btn secondary ${!selectedLeadId ? 'disabled' : ''}`} 
              onClick={handleEdit}
              disabled={!selectedLeadId}
            >
              <Edit2 size={18} />
              <span>Editar Prospecto</span>
            </button>
          </div>
        </div>

        <div className="header-actions">
          <div className="search-bar glass-panel">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, empresa o estado..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="action-btn secondary">
            <Filter size={18} />
            <span>Filtros Avanzados</span>
          </button>
          <button className="action-btn secondary">
            <Download size={18} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="table-container glass-panel">
        <table className="prospects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Interesado</th>
              <th>Contacto Directo</th>
              <th>Ubicación</th>
              <th>Tipo</th>
              <th>Zona Interés</th>
              <th>Estado Pipeline</th>
              <th>Origen</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id} 
                className={`table-row ${selectedLeadId === lead.id ? 'selected' : ''}`}
                onClick={() => setSelectedLeadId(lead.id)}
              >
                <td className="id-cell">#{lead.id.slice(-4)}</td>
                <td>
                  <div className="lead-info">
                    <span className="lead-name">{lead.name}</span>
                    <span className="lead-company-mini">{lead.company}</span>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-item"><Mail size={12} /> {lead.email}</div>
                    <div className="contact-item"><Phone size={12} /> {lead.phone}</div>
                  </div>
                </td>
                <td>{lead.city}, {lead.country}</td>
                <td>
                  <span className={`type-badge ${lead.type === 'Franquicia' ? 'franchise' : 'machinery'}`}>
                    {lead.type}
                  </span>
                </td>
                <td>{lead.interestZone || 'Nacional'}</td>
                <td>
                  <div className="status-pill" style={{ '--pill-color': getStageColor(lead.stage) }}>
                    <span className="pill-dot"></span>
                    {lead.stage}
                  </div>
                </td>
                <td>{lead.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <LeadForm 
          onClose={() => setShowForm(false)} 
          onSave={handleSave}
          initialData={editMode ? selectedLead : null}
        />
      )}

      <style jsx>{`
        .prospects-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
        }

        .prospects-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-info h1 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .header-info .subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .header-buttons {
          display: flex;
          gap: 1rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          width: 100%;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1.25rem;
          flex: 1;
        }

        .search-bar input {
          background: none;
          border: none;
          color: var(--text-primary);
          outline: none;
          font-size: 0.9rem;
          width: 100%;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.2s;
          cursor: pointer;
        }

        .action-btn.primary {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
        }

        .action-btn.secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .action-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .table-container {
          flex: 1;
          overflow: auto;
          border-radius: 16px;
        }

        .prospects-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 1.25rem 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          font-weight: 700;
          white-space: nowrap;
        }

        .table-row {
          transition: background 0.2s;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          cursor: pointer;
        }

        .table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .table-row.selected {
          background: rgba(99, 102, 241, 0.08);
          box-shadow: inset 4px 0 0 var(--accent-primary);
        }

        td {
          padding: 1.25rem 1.5rem;
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .id-cell {
          font-family: monospace;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.8rem;
        }

        .lead-info {
          display: flex;
          flex-direction: column;
        }

        .lead-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .lead-company-mini {
          font-size: 0.7rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          font-weight: 800;
        }

        .table-row {
          transition: background 0.2s;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        td {
          padding: 1.25rem 1.5rem;
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .lead-info {
          display: flex;
          flex-direction: column;
        }

        .lead-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .lead-profession {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .contact-info, .location-info, .interest-zone {
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .contact-item, .location-info, .interest-zone {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .type-badge {
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .type-badge.franchise { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
        .type-badge.machinery { background: rgba(16, 185, 129, 0.15); color: #34d399; }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--pill-color);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--pill-color);
        }

        .source-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .icon-btn {
          color: var(--text-secondary);
          padding: 8px;
          border-radius: 8px;
        }

        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  )
}

// Helper to get color (can be moved to a shared utils)
function getStageColor(stageId) {
  const map = {
    'PIP': '#00fbff',
    'EP1': '#001f5c',
    'EP2': '#8bb24a',
    'EP3': '#00ff00',
    'C': '#008000',
    'SB': '#ffff00',
    'PVS': '#ff8c00',
    'D': '#ff0000'
  }
  return map[stageId] || '#94a3b8'
}

export default ProspectsList
