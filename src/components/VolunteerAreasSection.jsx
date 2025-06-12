"use client"

import FormSelect from "./FormSelect"
import FormInput from "./FormInput"

export default function VolunteerAreasSection({
    formData,
    areas, // Prop de las áreas principales (STAFF, ADVISER)
    subAreas, // NUEVA Prop para las subáreas
    handleInputChange, // <-- ¡Este es el que debes usar!
    areaQuestions,
    handleQuestionResponse,
}) {
    const typeVolunteerOptions = [
        { value: "STAFF", label: "Staff" },
        { value: "ADVISER", label: "Asesor" },
    ]

    const schoolGradesOptions = [
        { value: "PRIMARIA34", label: "Primaria (3° y 4° grado)" },
        { value: "PRIMARIA56", label: "Primaria (5° y 6° grado)" },
        { value: "SECUNDARIA123", label: "Secundaria (1°, 2° y 3° grado)" }
    ]

    const infoSourceOptions = [
        { value: "FACEBOOK", label: "Facebook" },
        { value: "INSTAGRAM", label: "Instagram" },
        { value: "LINKEDIN", label: "LinkedIn" },
        { value: "TIKTOK", label: "TikTok" },
        { value: "EMAIL", label: "Correo electrónico" },
        { value: "UTEC_NEWSLETTER", label: "Boletín UTEC" },
        { value: "PROA", label: "Proa" },
        { value: "PRONABEC", label: "Pronabec" },
        { value: "REFERRAL", label: "Referencia de un amigo/familia" }
    ]

    // Las opciones para el select de subáreas
    const subAreaOptions = subAreas.map(sub => ({ value: sub.id, label: sub.name }));

    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Áreas de voluntariado</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <FormSelect
                    label="Tipo de voluntariado"
                    value={formData.type_volunteer}
                    // Usar handleInputChange aquí
                    onChange={(e) => handleInputChange("type_volunteer", e.target.value)}
                    options={typeVolunteerOptions}
                    required
                />

                {/* Nuevo select para las subáreas, solo se muestra si hay subáreas cargadas */}
                {subAreas.length > 0 && ( // Condición para mostrar solo si hay subáreas
                    <FormSelect
                        label="Sub-área de postulación"
                        value={formData.selected_subarea_id} // Nuevo campo para la subárea
                        onChange={(e) => handleInputChange("selected_subarea_id", e.target.value)}
                        options={subAreaOptions}
                        required
                    />
                )}
                {/* Puedes añadir un else aquí para mostrar un mensaje si no hay subáreas */}
                {subAreas.length === 0 && formData.type_volunteer && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Sub-área de postulación</label>
                        <p className="text-sm text-gray-500">Cargando sub-áreas o no disponibles para este tipo de voluntariado.</p>
                    </div>
                )}


                <FormSelect
                    label="Grados escolares"
                    value={formData.school_grades}
                    // Usar handleInputChange aquí
                    onChange={(e) => handleInputChange("school_grades", e.target.value)}
                    options={schoolGradesOptions}
                    required
                />
            </div>

            <div className="mb-6">
                <FormSelect
                    label="¿Cómo te enteraste de nosotros?"
                    value={formData.how_did_you_find_us}
                    // Usar handleInputChange aquí
                    onChange={(e) => handleInputChange("how_did_you_find_us", e.target.value)}
                    options={infoSourceOptions}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                    ¿Tienes experiencia previa en voluntariado?
                </label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="experience"
                            checked={formData.experience === true}
                            // Usar handleInputChange aquí
                            onChange={(e) => handleInputChange("experience", true)}
                            className="mr-2"
                        />
                        Sí
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="experience"
                            checked={formData.experience === false}
                            // Usar handleInputChange aquí
                            onChange={(e) => handleInputChange("experience", false)}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <FormInput
                    label="¿Cuál es tu motivación para ser voluntario?"
                    type="textarea"
                    value={formData.volunteer_motivation}
                    // Usar handleInputChange aquí
                    onChange={(e) => handleInputChange("volunteer_motivation", e.target.value)}
                    placeholder="Cuéntanos por qué quieres ser parte de nuestro equipo..."
                    required
                />
            </div>

            {formData.type_volunteer === "ADVISER" && (
                <div className="mb-6">
                    <FormInput
                        label="¿Por qué quieres ser asesor?"
                        type="textarea"
                        value={formData.why_asesor}
                        // Usar handleInputChange aquí
                        onChange={(e) => handleInputChange("why_asesor", e.target.value)}
                        placeholder="Cuéntanos por qué quieres ser asesor..."
                        required
                    />
                </div>
            )}

            {/* Dynamic questions based on selected area */}
            {areaQuestions.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-md font-semibold mb-4">Preguntas específicas del área</h4>
                    {areaQuestions.map((question) => (
                        <div key={question.id} className="mb-4">
                            {question.type === 'text' ? (
                                <FormInput
                                    label={question.question}
                                    type="text"
                                    value={formData.responses.find(r => r.questionId === question.id)?.response || ''}
                                    onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                                    required={question.required}
                                />
                            ) : question.type === 'textarea' ? (
                                <FormInput
                                    label={question.question}
                                    type="textarea"
                                    value={formData.responses.find(r => r.questionId === question.id)?.response || ''}
                                    onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                                    required={question.required}
                                />
                            ) : question.type === 'select' ? (
                                <FormSelect
                                    label={question.question}
                                    value={formData.responses.find(r => r.questionId === question.id)?.response || ''}
                                    onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                                    options={question.options.map(opt => ({ value: opt, label: opt }))}
                                    required={question.required}
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}