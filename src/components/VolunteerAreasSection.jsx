"use client"

import FormSelect from "./FormSelect"

export default function VolunteerAreasSection({ formData, handleInputChange, handleAreaChange }) {
    const areas = ["Arte & Cultura", "Asesoría a Colegios Nacionales", "Bienestar Psicológico"]

    const tallerOptions = [
        { value: "Cuenta cuentos", label: "Cuenta cuentos" },
        { value: "Arte y manualidades", label: "Arte y manualidades" },
        { value: "Música", label: "Música" },
    ]

    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Áreas de voluntariado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-600 mb-4">
                        Por favor, selecciona las áreas en las que te gustaría colaborar. Si no estás seguro(a), no marcar cada una de las
                        opciones:
                    </p>
                    {areas.map((area) => (
                        <label key={area} className="flex items-center mb-3">
                            <input
                                type="checkbox"
                                checked={formData.areasVoluntariado.includes(area)}
                                onChange={() => handleAreaChange(area)}
                                className="mr-3 h-4 w-4"
                            />
                            {area}
                        </label>
                    ))}
                </div>

                <div>
                    <div className="mb-4">
                        <FormSelect
                            label="¿En qué taller dentro del área te gustaría colaborar?"
                            value={formData.taller}
                            onChange={(e) => handleInputChange("taller", e.target.value)}
                            options={tallerOptions}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            ¿Cuántos beneficiarios puedes asesorar considerando que cada uno requiere 2-3 horas a la semana de
                            dedicación?
                        </label>
                        <div className="flex space-x-4">
                            {["1", "2", "3"].map((num) => (
                                <label key={num} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="beneficiarios"
                                        value={num}
                                        checked={formData.beneficiarios === num}
                                        onChange={(e) => handleInputChange("beneficiarios", e.target.value)}
                                        className="mr-2"
                                    />
                                    {num}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Video - Postulación</h3>
                <p className="text-sm text-gray-600 mb-3">
                    Por favor, sube tu video de postulación de máximo 3 minutos y comparte el enlace aquí. En el video, asegúrate
                    de presentarte, hablar sobre tu motivación para postularte como asesor/a y, si lo deseas, mostrar algún
                    talento o habilidad que creas relevante para el cargo. Asegúrate de que el video sea accesible (puedes usar
                    plataformas como YouTube, Google Drive o cualquier otra que prefieras)
                </p>
                <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Seleccionar archivo
                </button>
            </div>
        </section>
    )
}
