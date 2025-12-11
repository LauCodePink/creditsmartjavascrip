// src/pages/MisSolicitudes.jsx
import React, { useState } from 'react';
import { db } from '../firebase/config.js';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import Swal from 'sweetalert2';

const MisSolicitudes = () => {
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    amountRequested: '',
    termMonths: ''
  });

  // Mapeo para nombres legibles
  const getCreditTypeName = (code) => {
    const map = {
      libre: "Crédito de Libre Inversión",
      vehiculo: "Crédito de Vehículo",
      educativo: "Crédito Educativo",
      empresarial: "Crédito Empresarial",
      vivienda: "Crédito de Vivienda",
      consumo: "Crédito de Consumo"
    };
    return map[code] || code;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      Swal.fire('Email requerido', 'Por favor ingresa tu email para buscar solicitudes.', 'warning');
      return;
    }

    setLoading(true);
    setSearched(true);
    setRequests([]);
    setEditingId(null);

    try {
      const q = query(
        collection(db, 'requests'),
        where('email', '==', email.trim()),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const requestsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRequests(requestsList);
    } catch (error) {
      console.error('Error al buscar solicitudes:', error);
      Swal.fire('Error', 'No se pudieron cargar las solicitudes. Intenta de nuevo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (request) => {
    setEditingId(request.id);
    setEditForm({
      fullName: request.fullName,
      idNumber: request.idNumber,
      phone: request.phone,
      amountRequested: request.amountRequested,
      termMonths: request.termMonths
    });
  };

  const saveEdit = async (id) => {
    try {
      const docRef = doc(db, 'requests', id);
      await updateDoc(docRef, {
        fullName: editForm.fullName,
        idNumber: editForm.idNumber,
        phone: editForm.phone,
        amountRequested: Number(editForm.amountRequested),
        termMonths: Number(editForm.termMonths),
        updatedAt: new Date()
      });

      setRequests(prev => 
        prev.map(req => 
          req.id === id 
            ? { ...req, 
                fullName: editForm.fullName,
                idNumber: editForm.idNumber,
                phone: editForm.phone,
                amountRequested: Number(editForm.amountRequested),
                termMonths: Number(editForm.termMonths),
                updatedAt: new Date()
              } 
            : req
        )
      );
      setEditingId(null);
      Swal.fire('Actualizado', 'La solicitud ha sido modificada.', 'success');
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire('Error', 'No se pudo guardar los cambios.', 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      fullName: '',
      idNumber: '',
      phone: '',
      amountRequested: '',
      termMonths: ''
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'requests', id));
        setRequests(prev => prev.filter(req => req.id !== id));
        Swal.fire('Eliminado', 'La solicitud ha sido eliminada.', 'success');
      } catch (error) {
        console.error('Error al eliminar:', error);
        Swal.fire('Error', 'No se pudo eliminar la solicitud.', 'error');
      }
    }
  };

  return (
    <main className="container">
      <h2 className="form-title">Mis Solicitudes</h2>
      
      {!searched ? (
        <form className="form-container" onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="form-group">
            <label htmlFor="searchEmail">Ingresa tu email para ver tus solicitudes:</label>
            <input
              type="email"
              id="searchEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tuemail@ejemplo.com"
              className="form-control"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn-primaryy" 
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Buscando...' : 'Buscar Solicitudes'}
          </button>
        </form>
      ) : (
        <div>
          <button 
            onClick={() => { setSearched(false); setEmail(''); setRequests([]); }}
            className="btn-clear"
            style={{ marginBottom: '1rem' }}
          >
            ← Volver a buscar
          </button>
          
          {requests.length === 0 ? (
            <div className="info-box">
              <p>No se encontraron solicitudes para este email.</p>
            </div>
          ) : (
            <div className="info-box">
              <h4>Tienes {requests.length} solicitud(es):</h4>
              {requests.map(req => (
                <div key={req.id} style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '1rem', 
                  marginBottom: '1rem',
                  backgroundColor: '#f9f9f9'
                }}>
                  {editingId === req.id ? (
                    <div>
                      <h5>Editar solicitud</h5>
                      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                        <label>Nombre Completo</label>
                        <input
                          type="text"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm(prev => ({...prev, fullName: e.target.value}))}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                        <label>Cédula</label>
                        <input
                          type="text"
                          value={editForm.idNumber}
                          onChange={(e) => setEditForm(prev => ({...prev, idNumber: e.target.value}))}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                        <label>Teléfono</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm(prev => ({...prev, phone: e.target.value}))}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                        <label>Monto Solicitado</label>
                        <input
                          type="number"
                          value={editForm.amountRequested}
                          onChange={(e) => setEditForm(prev => ({...prev, amountRequested: e.target.value}))}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                        <label>Plazo (meses)</label>
                        <select
                          value={editForm.termMonths}
                          onChange={(e) => setEditForm(prev => ({...prev, termMonths: e.target.value}))}
                          className="form-control"
                        >
                          <option value="">Seleccione el plazo</option>
                          <option value="12">12 meses</option>
                          <option value="24">24 meses</option>
                          <option value="36">36 meses</option>
                          <option value="48">48 meses</option>
                          <option value="60">60 meses</option>
                          <option value="72">72 meses</option>
                          <option value="84">84 meses</option>
                          <option value="96">96 meses</option>
                          <option value="120">120 meses</option>
                        </select>
                      </div>
                      <div className="form-buttons" style={{ marginTop: '0.5rem' }}>
                        <button 
                          type="button" 
                          className="btn-primaryy"
                          onClick={() => saveEdit(req.id)}
                          style={{ marginRight: '0.5rem' }}
                        >
                          Guardar
                        </button>
                        <button 
                          type="button" 
                          className="btn-clear"
                          onClick={cancelEdit}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <strong>Nombre:</strong> {req.fullName}<br />
                      <strong>Cédula:</strong> {req.idNumber}<br />
                      <strong>Teléfono:</strong> {req.phone}<br />
                      <strong>Crédito:</strong> {getCreditTypeName(req.creditType)}<br />
                      <strong>Monto:</strong> ${Number(req.amountRequested).toLocaleString('es-CO')}<br />
                      <strong>Plazo:</strong> {req.termMonths} meses<br />
                      <small>Enviado: {req.createdAt?.toDate?.().toLocaleDateString('es-CO') || 'N/A'}</small>
                      
                      <div style={{ marginTop: '0.8rem' }}>
                        <button 
                          onClick={() => startEditing(req)}
                          className="btn-primaryy"
                          style={{ 
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            marginRight: '0.5rem'
                          }}
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(req.id)}
                          className="btn-clear"
                          style={{ 
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            backgroundColor: '#ffebee',
                            color: '#c62828',
                            border: '1px solid #ffcdd2'
                          }}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default MisSolicitudes;