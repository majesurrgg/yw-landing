"use client"

export default function AvailabilitySection({ formData, handleHorarioChange }) {
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    const diasLabels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    const periodos = ["manana", "tarde", "noche"]
    const periodosLabels = ["Mañana\n(8am - 12 am)", "Tarde\n(2pm - 6pm)", "Noche\n(6pm - 10pm)"]

    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Disponibilidad</h3>
            <p className="text-sm text-gray-600 mb-4">
                ¿Qué horarios tienes disponibles para brindar asesorías? Selecciona los rangos de horarios en los que podrías atender
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
                                            checked={formData.horarios[dia][periodo]}
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
        </section>
    )
}
