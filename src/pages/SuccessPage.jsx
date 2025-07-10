import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('token');

  useEffect(() => {
    if (!orderId) return;

    const capture = async () => {
      try {
        await api.post(`/donation/capture/${orderId}?method=paypal`);
      } catch (err) {
        console.error('Error al capturar el pago:', err);
      }
    };

    capture();
  }, [orderId]);

  return (
    <div className="max-w-xl mx-auto p-8 text-center mt-20">
      <h1 className="text-3xl font-bold text-green-700 mb-4">¡Gracias por tu donación! 🎉</h1>
      <p className="text-gray-700">Hemos recibido tu aporte. Gracias por apoyar a Yachay Wasi.</p>
    </div>
  );
}
