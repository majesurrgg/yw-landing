// AvailabilitySection.jsx
"use client"

import FormSelect from "./FormSelect" // Asegúrate de que este import sea correcto si usas FormSelect

export default function AvailabilitySection({ formData, handleInputChange, handleHorarioChange }) {

    const schoolGradesOptions = [
        { value: "PRIMARIA34", label: "Primaria (3° y 4° grado)" },
        { value: "PRIMARIA56", label: "Primaria (5° y 6° grado)" },
        { value: "SECUNDARIA123", label: "Secundaria (1°, 2° y 3° grado)" }
    ]

    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    const diasLabels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    const periodos = ["manana", "tarde", "noche"]
    const periodosLabels = ["Mañana\n(8am - 12 am)", "Tarde\n(2pm - 6pm)", "Noche\n(6pm - 10pm)"]

    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Disponibilidad</h3>
            <p className="text-sm text-gray-600 mb-4">
                Horarios disponibles para brindar asesorías Selecciona los rangos de horarios en los que podrías atender
                beneficiarios. No es necesario que tengas disponibilidad durante todo el rango horario completo. Por ejemplo, si
                solo puedes asesorar de 9:00 a 10:00 am, puedes marcar el rango de 8:00 am a 12:00 pm, ya que posteriormente se
                coordinará el horario específico con cada beneficiario según tu disponibilidad real dentro de ese bloque
            </p>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left p-2"></th>
                            {periodosLabels.map((periodo, index) => (
                                <th key={index} className="text-center p-2 text-sm font-medium whitespace-pre-line">
                                    {periodo}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dias.map((dia, diaIndex) => (
                            <tr key={dia} className="border-t">
                                <td className="p-2 font-medium">{diasLabels[diaIndex]}</td>
                                {periodos.map((periodo) => (
                                    <td key={periodo} className="p-2 text-center">
                                        <input
                                            type="checkbox"
                                            // ¡CAMBIA ESTA LÍNEA!
                                            checked={formData.availability[dia][periodo] || false} // Usa .availability en lugar de .horarios
                                            onChange={() => handleHorarioChange(dia, periodo)}
                                            className="h-4 w-4"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <FormSelect
                label="¿A qué niveles educativos podrías brindar asesoría?"
                value={formData.school_grades}
                onChange={(e) => handleInputChange("school_grades", e.target.value)}
                options={schoolGradesOptions}
                required
            />

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                    ¿Tienes un plan de llamadas ilimitadas?
                </label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="calling_plan"
                            checked={formData.calling_plan === true}
                            onChange={(e) => handleInputChange("calling_plan", true)}
                            className="mr-2"
                        />
                        Sí
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="calling_plan"
                            checked={formData.calling_plan === false}
                            onChange={(e) => handleInputChange("calling_plan", false)}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-4">
                    Nota: La disponibilidad de horarios es un factor importante para la selección. Por favor, asegúrate de marcar los horarios en los que realmente estarás disponible.
                </p>
            </div>
        </section>
    )
}