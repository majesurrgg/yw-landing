import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DonatePage() {
  const navigate = useNavigate();

  const handlePaypalClick = () => {
    navigate('/donation-form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="relative h-[550px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/assets/images/donation/photo-1591522810850-58128c5fb089.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center -18rem'
          }}        
        ></div>

        <div className="absolute inset-0 bg-[#043ED9]/60 backdrop-blur-sm"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl h-full mx-auto flex flex-col justify-center items-center text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FDB82D]">
            ¡Dona esperanza, dona educación!
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Tu aporte transforma vidas en comunidades andinas. Cada sol, dólar o palabra cuenta.
          </p>
        </motion.div>
      </div>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-[#FF3828]/10"
          >
            <h2 className="text-2xl font-bold text-[#FF3828] mb-4">Donación libre</h2>
            <p className="text-lg text-[#616161] mb-8">
              Contribuye con lo que puedas. Cada aporte ayuda a cubrir materiales, alimentos o transporte.
            </p>
            <button
              onClick={handlePaypalClick}
              className="inline-flex items-center px-6 py-4 rounded-xl bg-[#FF3828] text-white font-medium transition duration-300 hover:scale-105"
            >
              Donar ahora
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-2"
              >
                →
              </motion.span>
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-[#043ED9]/10"
          >
            <h2 className="text-2xl font-bold text-[#043ED9] mb-4">Apoyo en especie</h2>
            <p className="text-lg text-[#616161] mb-8">
              Dona libros, útiles escolares o únete como voluntario/a.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center px-6 py-4 rounded-xl bg-[#043ED9] text-white font-medium transition duration-300 hover:scale-105"
            >
              Contáctanos
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-2"
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-[#FDB82D]/10">
        <div className="max-w-4xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-medium text-center text-gray-800 italic relative"
          >
            <span className="block mb-4">
            ✨ “Un solo gesto puede cambiar el mundo de un niño. Sé ese gesto.”
            </span>

          </motion.blockquote>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#FF3828]/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-[#FF3828]">¡Haz la diferencia hoy!</h2>
            <p className="text-xl text-gray-700 mb-12">
              Tu aporte, por pequeño que sea, puede cambiar vidas enteras.
            </p>
            <button
              onClick={handlePaypalClick}
              className="inline-flex items-center px-8 py-5 rounded-xl bg-[#FF3828] text-white font-medium text-xl transition duration-300 hover:bg-[#FF3828]/90"
            >
              Donar ahora
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-4"
              >
                →
              </motion.span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
