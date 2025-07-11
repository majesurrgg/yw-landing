import { useState } from 'react';
import { motion } from 'framer-motion';
import { createDonation } from '../services/donationService';

const suggestedAmounts = [
  { amount: 25, label: '$25' },
  { amount: 50, label: '$50' },
  { amount: 100, label: '$100' },
  { amount: 200, label: '$200' },
  { amount: 500, label: '$500' },
];

export default function DonationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    amount: '',
    currency: 'USD',
    donationType: 'general',
    message: '',
    is_anonymous: false,
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStep1 = () => {
    const err = {};
    if (!form.amount || Number(form.amount) <= 0) {
      err.amount = 'El monto debe ser mayor a 0.';
    }
    return err;
  };

  const validateStep2 = () => {
    const err = {};
    if (!form.name.trim()) {
      err.name = 'El nombre es requerido.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(form.name)) {
      err.name = 'Ingresa un nombre válido.';
    }

    if (!form.email) {
      err.email = 'El correo es requerido.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      err.email = 'Correo no válido.';
    }

    return err;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const nextStep = () => {
    const err = validateStep1();
    if (Object.keys(err).length > 0) {
      setErrors(err);
    } else {
      setErrors({});
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
        paymentMethod: 'paypal',
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
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 border border-[#043ED9]/10 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#043ED9] mb-4">Apoya a Yachay Wasi</h1>
        <p className="text-xl text-gray-600 mb-4">
          Tu contribución hace posible nuestro trabajo en educación y desarrollo sostenible.
        </p>
      </div>

      {step === 1 && (
        <div className="bg-[#FDB82D]/5 rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#043ED9]">¿Cuánto quieres donar?</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {suggestedAmounts.map((amount) => (
              <motion.button
                key={amount.amount}
                type="button"
                onClick={() => setForm({ ...form, amount: amount.amount.toString() })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                  form.amount === amount.amount.toString()
                    ? 'bg-[#FF3828] text-white'
                    : 'bg-white text-[#616161] border border-[#FF3828]/20 hover:bg-[#FF3828]/10'
                }`}
              >
                {amount.label}
              </motion.button>
            ))}
          </div>

          <div>
            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Otro monto
            </label>
            <input
              id="customAmount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#043ED9]"
              min={1}
            />
            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Moneda
            </label>
            <select
              id="currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#043ED9]"
            >
              <option value="USD">USD - Dólar estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso mexicano</option>
              <option value="CAD">CAD - Dólar canadiense</option>
            </select>
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="w-full mt-4 bg-[#043ED9] text-white font-semibold py-3 rounded-xl hover:bg-[#032ea7] transition duration-300"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-[#043ED9]">Información personal</h2>

          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 mt-1 focus:ring-2 ${
                errors.name ? 'border-red-500 ring-red-300' : 'focus:ring-[#043ED9]'
              }`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 mt-1 focus:ring-2 ${
                errors.email ? 'border-red-500 ring-red-300' : 'focus:ring-[#043ED9]'
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block font-semibold text-gray-700">
              Mensaje (opcional)
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              rows={3}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-[#043ED9]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_anonymous"
              name="is_anonymous"
              checked={form.is_anonymous}
              onChange={handleChange}
              className="w-4 h-4 text-[#FF3828] border-gray-300 rounded focus:ring-[#FF3828]"
            />
            <label htmlFor="is_anonymous" className="text-gray-700">
              Donar de forma anónima
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#043ED9] font-semibold hover:underline"
            >
              ← Volver
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF3828] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#e23624] transition duration-300"
            >
              {loading ? 'Procesando...' : 'Donar con PayPal'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
