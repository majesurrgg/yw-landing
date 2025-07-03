// MotivationSection.jsx
import FormSelect from "./FormSelect";
// ¡Necesitas importar FormInput aquí!
// Asumiendo que FormInput.jsx está en el mismo directorio,
// ajusta la ruta si se encuentra en otro lugar.
import FormInput from "./FormInput";

export default function MotivationSection({
    formData,
    handleInputChange,
    occupationOptions,
    quechuaLevelOptions,
    programsUniversityOptions,
    infoSourceOptions
}) {

    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Motivación y experiencia</h3>
            {/* El "x|" en tu código original parece un error tipográfico, lo estoy eliminando */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
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
                 <FormInput
                    label="¿Cuál es tu motivación para ser voluntario?"
                    type="textarea" // Aunque FormInput generalmente es para 'text', 'email', 'number', si tienes lógica interna para 'textarea' está bien. Si es un componente separado, se llamaría FormTextArea.
                    value={formData.volunteer_motivation}
                    // Usar handleInputChange aquí
                    onChange={(e) => handleInputChange("volunteer_motivation", e.target.value)}
                    placeholder="Cuéntanos por qué quieres ser parte de nuestro equipo..."
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <FormSelect
                    label="Actualmente te encuentras estudiando y/o trabajando"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    options={occupationOptions} // Ahora usa la prop
                    required
                />
                
                <FormSelect
                    label="¿Cuál consideras que es tu nivel de conocimiento del Quechua de forma fluida y escrita?"
                    value={formData.quechua_level}
                    onChange={(e) => handleInputChange("quechua_level", e.target.value)}
                    options={quechuaLevelOptions} // Ahora usa la prop
                    required
                />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormSelect
                    label="¿Perteneces a alguno de los siguientes programas/universidades?"
                    value={formData.programs_university}
                    onChange={(e) => handleInputChange("programs_university", e.target.value)}
                    options={programsUniversityOptions} // Ahora usa la prop
                    required
                />
                <FormSelect
                    label="¿Cómo te enteraste de nosotros?"
                    value={formData.how_did_you_find_us}
                    // Usar handleInputChange aquí
                    onChange={(e) => handleInputChange("how_did_you_find_us", e.target.value)}
                    options={infoSourceOptions} // Esta prop también necesita ser pasada
                    required
                />
            </div>
        </section>
    );
}