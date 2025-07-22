import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function StaffMotivationSection({
    formData,
    onFieldChange,
    programsUniversityOptions,
    infoSourceOptions
}) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Motivación y Experiencia
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
                                onChange={() => onFieldChange("experience", true)}
                                className="mr-2 h-4 w-4 text-blue-600"
                            />
                            Sí
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="experience"
                                checked={formData.experience === false}
                                onChange={() => onFieldChange("experience", false)}
                                className="mr-2 h-4 w-4 text-blue-600"
                            />
                            No
                        </label>
                    </div>
                </div>

                <FormSelect
                    label="¿Perteneces a alguno de los siguientes programas/universidades?"
                    name="programs_university"
                    value={formData.programs_university}
                    onChange={(e) => onFieldChange("programs_university", e.target.value)}
                    options={programsUniversityOptions}
                    required
                />
            </div>

            <FormInput
                as="textarea"
                label="¿Cuál es tu motivación para ser voluntario/a con nosotros?"
                name="volunteer_motivation"
                value={formData.volunteer_motivation}
                onChange={(e) => onFieldChange("volunteer_motivation", e.target.value)}
                placeholder="Cuéntanos por qué quieres ser parte de nuestro equipo..."
                required
            />

            <FormSelect
                label="¿Cómo te enteraste de esta oportunidad?"
                name="how_did_you_find_us"
                value={formData.how_did_you_find_us}
                onChange={(e) => onFieldChange("how_did_you_find_us", e.target.value)}
                options={infoSourceOptions}
                required
            />
        </div>
    );
}