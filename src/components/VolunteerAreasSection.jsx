// VolunteerAreasSection.jsx

import React from 'react';

export default function VolunteerAreasSection({
    formData,
    typeVolunteerOptions, // Opciones para Staff/Adviser
    handleTypeVolunteerChange,
    displayAreas, // Áreas filtradas (Staff o Asesoría)
    handleAreaSelectChange,
    subAreas, // Subáreas del área seleccionada
    handleSubAreaSelectChange,
    dynamicQuestions, // Preguntas de la subárea seleccionada
    handleQuestionResponse,
}) {
    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Áreas de Postulación</h3>

            {/* Selector de Tipo de Voluntario (Staff/Asesor) */}
            <div className="mb-4">
                <label htmlFor="type_volunteer" className="block text-gray-700 text-sm font-bold mb-2">
                    Tipo de Voluntariado:
                </label>
                <select
                    id="type_volunteer"
                    name="type_volunteer"
                    value={formData.type_volunteer}
                    onChange={(e) => handleTypeVolunteerChange(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Selecciona un tipo</option>
                    {typeVolunteerOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Selector de Área (Staff o Asesoría) */}
            {formData.type_volunteer && ( // Solo muestra si se ha seleccionado un tipo
                <div className="mb-4">
                    <label htmlFor="selectedAreaId" className="block text-gray-700 text-sm font-bold mb-2">
                        ¿En qué área de voluntariado estás interesado/a?:
                    </label>
                    <select
                        id="selectedAreaId"
                        name="selectedAreaId"
                        value={formData.selectedAreaId || ''}
                        onChange={(e) => handleAreaSelectChange(parseInt(e.target.value, 10))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={displayAreas.length === 0}
                    >
                        <option value="">Selecciona un área</option>
                        {displayAreas.map(area => (
                            <option key={area.id} value={area.id}>
                                {area.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Selector de SubÁrea (Solo si es STAFF y hay un área seleccionada) */}
            {formData.type_volunteer === "STAFF" && formData.selectedAreaId && (
                <div className="mb-4">
                    <label htmlFor="selectedSubAreaId" className="block text-gray-700 text-sm font-bold mb-2">
                        Selecciona la SubÁrea:
                    </label>
                    <select
                        id="selectedSubAreaId"
                        name="selectedSubAreaId"
                        value={formData.selectedSubAreaId || ''}
                        onChange={(e) => handleSubAreaSelectChange(parseInt(e.target.value, 10))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={subAreas.length === 0}
                    >
                        <option value="">Selecciona una subárea</option>
                        {subAreas.map(subArea => (
                            <option key={subArea.id} value={subArea.id}>
                                {subArea.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Preguntas Dinámicas */}
            {dynamicQuestions.length > 0 && (
                <div className="mb-4 p-4 border rounded bg-gray-50">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Preguntas Específicas:</h3>
                    {dynamicQuestions.map((question) => (
                        <div key={question.id} className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {question.questionText}
                            </label>
                            {/* Renderizado condicional basado en el tipo de pregunta */}
                            {question.type === 'TEXT' && (
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formData.responses.find(r => r.questionId === question.id)?.response || ''}
                                    onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                                />
                            )}
                            {question.type === 'NUMBER' && (
                                <input
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formData.responses.find(r => r.questionId === question.id)?.response || ''}
                                    onChange={(e) => handleQuestionResponse(question.id, e.type === 'number' ? parseInt(e.target.value) : e.target.value)}
                                />
                            )}
                            {question.type === 'BOOLEAN' && (
                                <input
                                    type="checkbox"
                                    className="mr-2 leading-tight"
                                    checked={formData.responses.find(r => r.questionId === question.id)?.response || false}
                                    onChange={(e) => handleQuestionResponse(question.id, e.target.checked)}
                                />
                            )}
                            {question.type === 'FILE_UPLOAD' && (
                                <input
                                    type="file"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => handleQuestionResponse(question.id, e.target.files[0])}
                                />
                            )}
                            {/* Agrega más tipos según tus necesidades */}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}