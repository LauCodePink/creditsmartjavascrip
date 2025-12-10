// src/pages/Home.jsx
import React from 'react';
import Hero from '../Components/Hero';
import CreditCard from '../Components/CreditCard';
import { useCredits } from '../hooks/useCredits'; // 👈 Nuevo hook

const Home = () => {
  const { credits, loading, error } = useCredits();

  if (loading) {
    return (
      <main className="container">
        <Hero />
        <div className="text-center py-4">
          <p>Cargando créditos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <Hero />
        <div className="text-center py-4 text-danger">
          <p>{error}</p>
          <p>Por favor, recarga la página.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <Hero />
      <section className="credits-section">
        <h3>CREDITOS QUE TE OFRECEMOS</h3>
        <div className="credits-grid">
          {credits.length > 0 ? (
            credits.map(credit => (
              <CreditCard key={credit.id} credit={credit} />
            ))
          ) : (
            <p className="text-center">No hay créditos disponibles.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;