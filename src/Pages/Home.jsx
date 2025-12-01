import React from 'react';
import Hero from '../Components/Hero';
import CreditCard from '../Components/CreditCard';
import { creditOffers } from '../data/creditsData';

const Home = () => {
  return (
    <main className="container">
      <Hero />
      <section className="credits-section">
        <h3>CREDITOS QUE TE OFRECEMOS</h3>
        <div className="credits-grid">
          {creditOffers.map(credit => (
            <CreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;