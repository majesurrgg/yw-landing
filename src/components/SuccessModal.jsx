// Modal simple para mostrar mensaje de postulación enviada

export default function SuccessModal({ open, onClose }) {
  if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">¡Postulación enviada!</h2>
                <p className="mb-6">Tu postulación ha sido enviada con éxito. Pronto nos pondremos en contacto contigo.</p>
                <button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Cerrar</button>
            </div>
        </div>
    );
}
