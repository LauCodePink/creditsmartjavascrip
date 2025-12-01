import React, { useState } from 'react';
import { creditOffers } from '../data/creditsData';
import Swal from 'sweetalert2';

const Request = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    monthlyIncome: '',
    creditType: '',
    amountRequested: '',
    termMonths: '',
    creditPurpose: ''
  });

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const creditTypeMap = {
    libre: "Crédito de Libre Inversión",
    vehiculo: "Crédito de Vehículos",
    educativo: "Crédito Educativo",
    empresarial: "Crédito Empresarial",
    vivienda: "Crédito de Vivienda",
    consumo: "Crédito de Consumo"
  };

  const calculatePayment = (amount, months, rate) => {
    if (!amount || !months || !rate) return 0;
    const r = rate / 100;
    const payment = (amount * r) / (1 - Math.pow(1 + r, -months));
    return Math.round(payment);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'amountRequested' || name === 'termMonths' || name === 'creditType') {
      const amount = parseFloat(formData.amountRequested);
      const months = parseInt(formData.termMonths);
      const creditType = name === 'creditType' ? value : formData.creditType;

      if (creditType && amount && months) {
        const creditName = creditTypeMap[creditType];
        const credit = creditOffers.find(c => c.name === creditName);
        if (credit) {
          const payment = calculatePayment(amount, months, credit.interest);
          setMonthlyPayment(payment);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mensaje de éxito con SweetAlert
    Swal.fire({
      title: "¡Solicitud Enviada!",
      text: "Gracias por confiar en CreditSmart. En menos de 24 horas recibirás una respuesta.",
      icon: "success",
      confirmButtonText: "Aceptar",
      draggable: true
    });

    // Limpiesa del formulario
    setFormData({
      fullName: '',
      idNumber: '',
      email: '',
      phone: '',
      companyName: '',
      jobTitle: '',
      monthlyIncome: '',
      creditType: '',
      amountRequested: '',
      termMonths: '',
      creditPurpose: ''
    });
    setMonthlyPayment(0);
  };

  return (
    <main className="container">
      <h2 className="form-title">Solicita tu Crédito</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <section className="form-section">
          <h3>Datos Personales</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Juan Pérez García"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="idNumber">Cédula *</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                placeholder="1234567890"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="3001234567"
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Datos Laborales</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName">Empresa donde Trabaja *</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Nombre de la empresa"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobTitle">Cargo *</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Desarrollador de Software"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="monthlyIncome">Ingresos Mensuales *</label>
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleInputChange}
              placeholder="3000000"
              min="0"
              step="1000"
              required
            />
            <small className="form-hint">Ingrese sus ingresos mensuales aproximados</small>
          </div>
        </section>

        <section className="form-section">
          <h3>Datos del Crédito</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="creditType">Tipo de Crédito *</label>
              <select
                id="creditType"
                name="creditType"
                value={formData.creditType}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="libre">Crédito de Libre Inversión</option>
                <option value="vehiculo">Crédito de Vehículo</option>
                <option value="educativo">Crédito Educativo</option>
                <option value="empresarial">Crédito Empresarial</option>
                <option value="vivienda">Crédito de Vivienda</option>
                <option value="consumo">Crédito de Consumo</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amountRequested">Monto Solicitado *</label>
              <input
                type="number"
                id="amountRequested"
                name="amountRequested"
                value={formData.amountRequested}
                onChange={handleInputChange}
                placeholder="5000000"
                min="1000"
                step="1000"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="termMonths">Plazo (meses) *</label>
              <select
                id="termMonths"
                name="termMonths"
                value={formData.termMonths}
                onChange={handleInputChange}
                required
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
            <div className="form-group">
              <label htmlFor="creditPurpose">Destino del Crédito *</label>
              <textarea
                id="creditPurpose"
                name="creditPurpose"
                value={formData.creditPurpose}
                onChange={handleInputChange}
                rows="3"
                placeholder="Describa brevemente para qué utilizará el dinero"
                required
              ></textarea>
            </div>
          </div>

          {monthlyPayment > 0 && (
            <div className="info-box">
              <p>
                <strong>Cuota mensual estimada:</strong> ${monthlyPayment.toLocaleString('es-CO')}
              </p>
            </div>
          )}
        </section>

        <div className="form-buttons">
          <button type="submit" className="btn-primaryy">Enviar Solicitud</button>
          <button
            type="button"
            className="btn-clear"
            onClick={() => {
              setFormData({
                fullName: '',
                idNumber: '',
                email: '',
                phone: '',
                companyName: '',
                jobTitle: '',
                monthlyIncome: '',
                creditType: '',
                amountRequested: '',
                termMonths: '',
                creditPurpose: ''
              });
              setMonthlyPayment(0);
            }}
          >
            Limpiar Formulario
          </button>
        </div>
      </form>

      <div className="info-box">
        <h4>Información Importante</h4>
        <ul>
          <li>Todos los campos con (<strong>*</strong>) son obligatorios.</li>
          <li>La respuesta a tu solicitud llegará en menos de 24 horas.</li>
          <li>No necesitas aval ni garantía para solicitar este crédito.</li>
          <li>El monto máximo disponible depende de tu historial crediticio.</li>
        </ul>
      </div>
    </main>
  );
};

export default Request