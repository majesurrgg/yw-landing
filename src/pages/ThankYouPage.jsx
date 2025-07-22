import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    // Oculta el confeti después de 10 segundos
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#EAF1FF] to-white flex items-center justify-center px-6 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={600}
          recycle={false}
        />
      )}

      <div className="bg-white border border-[#043ED9]/10 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center z-10">
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-3xl font-extrabold text-[#043ED9] mb-3">
          ¡Gracias por postularte!
        </h1>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Gracias por postularte, estaremos revisando tu postulación en breve.
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