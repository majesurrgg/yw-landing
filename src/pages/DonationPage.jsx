import { useState } from 'react';
import React from 'react';
import { createDonation } from '../services/donationService';

export default function DonationPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    amount: '',
    currency: 'USD',
    donationType: 'general',
    message: '',
    is_anonymous: false,
    paymentMethod: 'paypal'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
      };
      const data = await createDonation(payload);
      window.location.href = data.redirectUrl;
    } catch (err) {
      alert('Error al procesar la donación.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Apoya a Yachay Wasi</h1>
      <p className="text-center text-gray-600 mb-8">
        Tu contribución hace posible nuestro trabajo en educación y desarrollo sostenible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-700">Nombre</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold text-gray-700">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block font-semibold text-gray-700">Monto</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="currency" className="block font-semibold text-gray-700">Moneda</label>
          <select
            id="currency"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mt-1"
          >
            <option value="USD">USD - Dólar estadounidense</option>
            <option value="EUR">EUR - Euro</option>
            <option value="PEN">PEN - Sol peruano</option>
            <option value="MXN">MXN - Peso mexicano</option>
            <option value="COP">COP - Peso colombiano</option>
            <option value="ARS">ARS - Peso argentino</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block font-semibold text-gray-700">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            rows={3}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mt-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_anonymous"
            name="is_anonymous"
            checked={form.is_anonymous}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="is_anonymous" className="text-gray-700">Donar de forma anónima</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Procesando...' : 'Donar con PayPal'}
        </button>
      </form>
    </div>
  );
}
