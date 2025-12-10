import React, { useState } from 'react';
import { db } from '../firebase/config.js';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';

const MisSolicitudes = () => {
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Mapeo para mostrar nombres legibles
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

  return (
    <main className="container">
      <h2 className="form-title">Mis Solicitudes</h2>
      
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

      {searched && !loading && (
        <div className="info-box" style={{ marginTop: '2rem' }}>
          {requests.length > 0 ? (
            <>
              <h4>Tienes {requests.length} solicitud(es):</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {requests.map(req => (
                  <li key={req.id} style={{ 
                    borderBottom: '1px solid #eee', 
                    padding: '1rem 0',
                    marginBottom: '1rem'
                  }}>
                    <strong>Nombre:</strong> {req.fullName}<br />
                    <strong>Crédito:</strong> {getCreditTypeName(req.creditType)}<br />
                    <strong>Monto:</strong> ${Number(req.amountRequested).toLocaleString('es-CO')}<br />
                    <strong>Plazo:</strong> {req.termMonths} meses<br />
                    <strong>Estado:</strong> <span style={{ color: '#763626' }}>{req.status}</span><br />
                    <small>Enviado: {req.createdAt?.toDate?.().toLocaleDateString('es-CO') || 'N/A'}</small>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No se encontraron solicitudes para este email.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default MisSolicitudes;