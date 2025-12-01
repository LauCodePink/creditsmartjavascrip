import React, { useState, useMemo } from 'react';
import CreditCard from '../Components/CreditCard';
import { creditOffers } from '../data/creditsData';

const Simulator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');

  // Filtrado
  const filteredCredits = useMemo(() => {
    return creditOffers.filter(credit => {
      // Búsqueda por nombre
      const matchesName = credit.name.toLowerCase().includes(searchTerm.toLowerCase());

      //  Filtro por rango de monto
      let matchesAmount = true;
      if (amountFilter) {
        if (amountFilter === '1M-10M') matchesAmount = credit.maxAmount >= 1000000 && credit.minAmount <= 10000000;
        else if (amountFilter === '10M-30M') matchesAmount = credit.maxAmount >= 10000000 && credit.minAmount <= 30000000;
        else if (amountFilter === '30M-80M') matchesAmount = credit.maxAmount >= 30000000 && credit.minAmount <= 80000000;
        else if (amountFilter === '80M+') matchesAmount = credit.minAmount >= 80000000;
      }

      // Filtro por tasa de interes
      let matchesInterest = true;
      if (interestFilter) {
        matchesInterest = credit.interest === parseFloat(interestFilter);
      }

      return matchesName && matchesAmount && matchesInterest;
    });
  }, [searchTerm, amountFilter, interestFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setAmountFilter('');
    setInterestFilter('');
  };

  // Boton buscar Credito
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <main className="container">
      {}
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

        {/* Botones */}
        <div className="search-buttons">
          <button className="btn-clear" onClick={handleClearFilters}>
            Limpiar Filtros
          </button>
          <button className="btn-search" onClick={handleSearch}>
            Buscar Crédito
          </button>
        </div>
      </section>

      {/* Resultados */}
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

export default Simulator