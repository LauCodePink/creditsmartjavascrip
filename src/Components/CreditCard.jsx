import React from 'react';
import { Link } from 'react-router-dom'; 

const CreditCard = ({ credit }) => {
  const { 
    name,
    emoji,
    description,
    interest,
    minAmount, 
    maxAmount,
    maxTerm 
  } = credit;

  const formatAmount = (amount) => {
    return `$${Math.round(amount / 1000000)}M`;
  };

  return (
    <div className="credit-card">
      <div className="card-header">
        <h4>{emoji}{name}</h4>
      </div>
      <p>{description}</p>
      <div className="details">
        <div className="datail-item">
          <span className="label">Tasa de interes</span>
          <span className="value highlight">{interest}% mensual</span>
        </div>
        <div className="datail-item">
          <span className="label">Monto</span>
          <span className="value">
            {formatAmount(minAmount)} - {formatAmount(maxAmount)}
          </span>
        </div>
        <div className="datail-item">
          <span className="label">Plazo</span>
          <span className="value">Hasta {maxTerm} meses</span>
        </div>
      </div>
      <Link to="/solicitud" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
  Solicita tu credito ahora!
</Link>
    </div>
  );
};

export default CreditCard;
  