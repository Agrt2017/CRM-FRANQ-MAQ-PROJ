import React, { useState } from 'react'
import { X, User, Building, DollarSign, Mail, Phone, MapPin, Globe, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

const LeadForm = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    company: '',
    value: '',
    type: 'Franquicia',
    stage: 'PIP',
    heat: 'warm',
    profession: '',
    email: '',
    phone: '',
    city: '',
    country: 'México',
    interestZone: '',
    source: 'Web',
    activities: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      value: parseFloat(formData.value) || 0
    })
    onClose()
  }

  return (
    <div className="form-overlay" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="form-container glass-panel"
        onClick={e => e.stopPropagation()}
      >
        <div className="form-header">
          <div className="title-group">
            <Filter className="text-secondary" size={20} />
            <h2>Captura de Nuevo Prospecto</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-grid">
            {/* Section 1: Perfil */}
            <div className="form-section span-2">
              <h3 className="section-label">Información del Inversionista</h3>
              <div className="grid-3">
                <div className="input-field">
                  <label><User size={14} /> Nombre Completo</label>
                  <input required name="name" value={formData.name} onChange={handleChange} placeholder="Ej. Roberto Baez" />
                </div>
                <div className="input-field">
                  <label><Building size={14} /> Empresa / Razón Social</label>
                  <input name="company" value={formData.company} onChange={handleChange} placeholder="Nombre de la empresa" />
                </div>
                <div className="input-field">
                  <label>Profesión / Ocupación</label>
                  <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Ej. Arquitecto" />
                </div>
              </div>
            </div>

            {/* Section 2: Contacto */}
            <div className="form-section span-2">
              <h3 className="section-label">Vías de Contacto & Ubicación</h3>
              <div className="grid-3">
                <div className="input-field">
                  <label><Mail size={14} /> Correo Electrónico</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contacto@empresa.com" />
                </div>
                <div className="input-field">
                  <label><Phone size={14} /> Teléfono / WhatsApp</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="+52 ..." />
                </div>
                <div className="input-field">
                  <label><Globe size={14} /> País</label>
                  <input name="country" value={formData.country} onChange={handleChange} />
                </div>
                <div className="input-field">
                  <label><MapPin size={14} /> Ciudad / Estado</label>
                  <input name="city" value={formData.city} onChange={handleChange} placeholder="Ej. CDMX" />
                </div>
                <div className="input-field span-2">
                  <label>Zona de Interés Específica</label>
                  <input name="interestZone" value={formData.interestZone} onChange={handleChange} placeholder="Ej. Zona Norte / Santa Fe" />
                </div>
              </div>
            </div>

            {/* Section 3: Datos de Negocio */}
            <div className="form-section span-2">
              <h3 className="section-label">Detalles del Negocio</h3>
              <div className="grid-3">
                <div className="input-field">
                  <label>Tipo de Interés</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Franquicia">Franquicia</option>
                    <option value="Maquinaria">Maquinaria</option>
                  </select>
                </div>
                <div className="input-field">
                  <label><DollarSign size={14} /> Valor Estimado (MXN)</label>
                  <input type="number" name="value" value={formData.value} onChange={handleChange} placeholder="0.00" />
                </div>
                <div className="input-field">
                  <label>Fuente de Captación</label>
                  <select name="source" value={formData.source} onChange={handleChange}>
                    <option value="Web">Sitio Web</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referido">Referido</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="submit-btn">Guardar Prospecto</button>
          </div>
        </form>
      </motion.div>

      <style jsx>{`
        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .form-container {
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-color);
        }

        .form-header {
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .form-header h2 {
          font-size: 1.25rem;
          margin: 0;
        }

        .close-btn {
          color: var(--text-secondary);
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: var(--text-primary);
        }

        .form-body {
          padding: 2.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .span-2 { grid-column: span 2; }

        .section-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-primary);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-field label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        .input-field input,
        .input-field select {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          padding: 12px;
          border-radius: 10px;
          color: white;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-field input:focus,
        .input-field select:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .form-footer {
          margin-top: 3rem;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .cancel-btn {
          padding: 12px 24px;
          border-radius: 10px;
          color: var(--text-secondary);
          font-weight: 600;
          transition: all 0.2s;
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .submit-btn {
          background: var(--accent-primary);
          color: white;
          padding: 12px 32px;
          border-radius: 10px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: all 0.2s;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  )
}

export default LeadForm
