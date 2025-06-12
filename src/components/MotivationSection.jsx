import FormSelect from "./FormSelect" 

export default function MotivationSection({
    formData,
    handleInputChange,
    occupationOptions,
    quechuaLevelOptions,
    programsUniversityOptions
}) {

    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Motivación y experiencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormSelect
                    label="Ocupación actual"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    options={occupationOptions} // Ahora usa la prop
                    required
                />
                <FormSelect
                    label="Nivel de Quechua"
                    value={formData.quechua_level}
                    onChange={(e) => handleInputChange("quechua_level", e.target.value)}
                    options={quechuaLevelOptions} // Ahora usa la prop
                    required
                />
                <FormSelect
                    label="Programa universitario"
                    value={formData.programs_university}
                    onChange={(e) => handleInputChange("programs_university", e.target.value)}
                    options={programsUniversityOptions} // Ahora usa la prop
                    required
                />
            </div>
        </section>

    )
}