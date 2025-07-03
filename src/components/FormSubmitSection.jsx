// FormSubmitSection.jsx
"use client"

export default function FormSubmitSection({ formData, handleInputChange, loading }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Términos y condiciones</h3>

      <div className="mb-6">
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-sm">
            Acepto los términos y condiciones del programa de voluntariado. Entiendo que mi postulación será evaluada y que seré contactado/a en caso de ser seleccionado/a. Me comprometo a participar activamente en las actividades del programa y a cumplir con las responsabilidades asignadas.
          </span>
        </label>
      </div>

      <div className="mb-6">
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={formData.acceptDataPolicy}
            onChange={(e) => handleInputChange("acceptDataPolicy", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-sm">
            Acepto la política de tratamiento de datos personales. Autorizo el uso de mis datos para los fines relacionados con el programa de voluntariado y entiendo que estos serán tratados de manera confidencial.
          </span>
        </label>
      </div>

      {loading && (
        <div className="text-center text-gray-600">
          <p>Enviando tu postulación...</p>
          <p className="text-sm mt-2">Por favor, no cierres esta ventana.</p>
        </div>
      )}
    </section>
  )
}
