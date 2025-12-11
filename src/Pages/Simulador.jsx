import React, { useState, useMemo } from 'react';
import CreditCard from '../Components/CreditCard';
import { useCredits } from '../hooks/useCredits'; 

const Simulator = () => {
  const { credits: allCredits, loading, error } = useCredits(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');

  // Filtrado
  const filteredCredits = useMemo(() => {
    if (loading || error) return [];
    
    return allCredits.filter(credit => {
      const matchesName = credit.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesAmount = true;
      if (amountFilter) {
        if (amountFilter === '1M-10M') matchesAmount = credit.maxAmount >= 1000000 && credit.minAmount <= 10000000;
        else if (amountFilter === '10M-30M') matchesAmount = credit.maxAmount >= 10000000 && credit.minAmount <= 30000000;
        else if (amountFilter === '30M-80M') matchesAmount = credit.maxAmount >= 30000000 && credit.minAmount <= 80000000;
        else if (amountFilter === '80M+') matchesAmount = credit.minAmount >= 80000000;
      }

      let matchesInterest = true;
      if (interestFilter) {
        matchesInterest = credit.interest === parseFloat(interestFilter);
      }

      return matchesName && matchesAmount && matchesInterest;
    });
  }, [searchTerm, amountFilter, interestFilter, allCredits, loading, error]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setAmountFilter('');
    setInterestFilter('');
  };

  if (loading) {
    return (
      <main className="container">
        <section className="search-section text-center py-4">
          <h2 className="search-title">Cargando créditos...</h2>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <section className="search-section text-center py-4 text-danger">
          <h2 className="search-title">{error}</h2>
          <p>Recarga la página para intentar de nuevo.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="search-section">
        <h2 className="search-title">Buscar Crédito</h2>
        <div className="search-container">
          <div className="form-group">
            <label htmlFor="searchName">Buscar por nombre:</label>
            <input
              type="text"
              id="searchName"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej: Crédito Vehículo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amountRange">Rango de monto:</label>
            <select
              id="amountRange"
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
            >
              <option value="">Todos los montos</option>
              <option value="1M-10M">$1M - $10M</option>
              <option value="10M-30M">$10M - $30M</option>
              <option value="30M-80M">$30M - $80M</option>
              <option value="80M+">$80M+</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="interestRate">Tasa de interés:</label>
            <select
              id="interestRate"
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
            >
              <option value="">Todas las tasas</option>
              <option value="0.5">0.5% mensual</option>
              <option value="1.0">1.0% mensual</option>
              <option value="1.5">1.5% mensual</option>
              <option value="1.8">1.8% mensual</option>
              <option value="1.9">1.9% mensual</option>
              <option value="2.0">2.0% mensual</option>
            </select>
          </div>
        </div>

        <div className="search-buttons">
          <button className="btn-clear" onClick={handleClearFilters}>
            Limpiar Filtros
          </button>
        </div>
      </section>

      <section className="credits-section">
        <h3>Resultados de la búsqueda</h3>
        {filteredCredits.length === 0 ? (
          <p className="text-center text-muted">No hay créditos disponibles con esos criterios.</p>
        ) : (
          <div className="credits-grid">
            {filteredCredits.map(credit => (
              <CreditCard key={credit.id} credit={credit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Simulator;