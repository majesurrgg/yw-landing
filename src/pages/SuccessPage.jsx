import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { captureDonation } from '../services/donationService';
import Confetti from 'react-confetti';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('token');
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    if (!orderId) return;
    captureDonation(orderId).catch((err) =>
      console.error('Error al capturar el pago:', err)
    );
  }, [orderId]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#EAF1FF] to-white flex items-center justify-center px-6 relative overflow-hidden">
      <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={150} recycle={true} />

      <div className="bg-white border border-[#043ED9]/10 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center z-10">
        <div className="text-6xl mb-4">🎁</div>

        <h1 className="text-4xl font-extrabold text-[#043ED9] mb-3">
          ¡Gracias por tu donación!
        </h1>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Tu generosidad impulsa la educación y el cambio en nuestras comunidades.
        </p>

        <p className="text-sm text-[#616161] italic mb-8">
          ✨ ¡Con tu ayuda sembramos futuro y esperanza! ✨
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-[#FF3828] hover:bg-[#e23624] transition-colors px-6 py-3 rounded-full text-white font-semibold shadow-lg"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
