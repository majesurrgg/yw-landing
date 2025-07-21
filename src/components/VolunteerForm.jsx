// volunteerForm.jsx
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useVolunteerForm } from "../hooks/useVolunteerForm";
import { FORM_OPTIONS } from "../constants/formOptions";
import { validateStep } from "../utils/formValidation";
import { prepareSubmissionData, validateSubmissionData } from "../utils/formSubmission";
import { createApplication } from "../services/volunteerService";

// Componentes importados
import PersonalDataSection from "./PersonalDataSection";
import AvailabilitySection from "./AvailabilitySection";
import MotivationSection from "./MotivationSection";
import FormSubmitSection from "./FormSubmitSection";
import StaffMotivationSection from "./StaffMotivationSection";
import DynamicQuestionsSection from "./DynamicQuestionsSection";


// Componente principal limpio y enfocado solo en renderizado
export default function VolunteerForm() {
    const navigate = useNavigate();

    // Hook personalizado para manejar el estado del formulario
    // y la lógica de navegación entre pasos
    const {
        // Estado
        currentStep,
        formData, // datos que el usuario ha ingresado
        loading,
        submitError,
        positionInfo,
        dynamicQuestions,

        // Configuración
        volunteerType,
        totalSteps,

        // Handlers para manejar cambios en el formulario
        nextStep,
        prevStep,
        updateField,
        updateFile, // función para manejar cambios de archivo
        updateAvailability,
        updateResponse,
        updateFileResponse,
        setLoading,
        setSubmitError
    } = useVolunteerForm();

    const handleNextStep = () => {
        const errors = validateStep(currentStep, formData, volunteerType);
        if (errors.length > 0) {
            toast.error(errors[0]); // Mostrar el primer error
            return;
        }
        nextStep();
    };

    // función para manejar el envío del formulario
    // Aquí se valida el formulario y se envía al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación completa antes del submit
        const errors = validateSubmissionData(formData, volunteerType, dynamicQuestions);
        if (errors.length > 0) {
            setSubmitError(errors.join(', '));
            toast.error(`Errores encontrados: ${errors.join(', ')}`);
            return;
        }

        setLoading(true);
        setSubmitError(null);

        try {
            const payload = prepareSubmissionData(formData, volunteerType);
            const endpoint = volunteerType === 'staff' ? '/volunteer/staff' : '/volunteer/adviser';

            console.log('Enviando datos al endpoint:', endpoint);

            
            await createApplication(endpoint, payload);
            toast.success("¡Postulación enviada con éxito!");
            navigate('/thank-you');
        } catch (error) {
            console.error('Error al enviar formulario:', error);

            // Manejo mejorado de errores
            let errorMsg = "Error al enviar el formulario.";

            if (error.response?.data?.message) {
                errorMsg = Array.isArray(error.response.data.message)
                    ? error.response.data.message.join(', ')
                    : error.response.data.message;
            } else if (error.message) {
                errorMsg = error.message;
            }

            setSubmitError(errorMsg);
            toast.error(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    // Renderiza el componente según el paso actual
    // muestra el paso correcto segun currentStep y volunteerType
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PersonalDataSection
                        formData={formData}
                        onFieldChange={updateField}
                        onFileChange={updateFile}
                    />
                );

            case 2:
                if (volunteerType === 'staff') {
                    return (
                        <StaffMotivationSection
                            formData={formData}
                            onFieldChange={updateField}
                            programsUniversityOptions={FORM_OPTIONS.programsUniversity}
                            infoSourceOptions={FORM_OPTIONS.infoSource}
                        />
                    );
                } else {
                    return (
                        <DynamicQuestionsSection
                            questions={dynamicQuestions}
                            formData={formData}
                            onResponse={updateResponse}
                            onFileResponse={updateFileResponse}
                        />
                    );
                }

            case 3:
                if (volunteerType === 'staff') {
                    return (
                        <FormSubmitSection
                            formData={formData}
                            onFieldChange={updateField}
                        />
                    );
                } else {
                    return (
                        <AvailabilitySection
                            formData={formData}
                            onFieldChange={updateField}
                            onScheduleChange={updateAvailability}
                        />
                    );
                }

            case 4:
                return (
                    <MotivationSection
                        formData={formData}
                        onFieldChange={updateField}
                        occupationOptions={FORM_OPTIONS.occupation}
                        quechuaLevelOptions={FORM_OPTIONS.quechuaLevel}
                        programsUniversityOptions={FORM_OPTIONS.programsUniversity}
                        infoSourceOptions={FORM_OPTIONS.infoSource}
                    />
                );

            case 5:
                return (
                    <FormSubmitSection
                        formData={formData}
                        onFieldChange={updateField}
                    />
                );

            default:
                return null;
        }
    };

    // render de carga inicial mientras se obtiene la información del puesto
    if (loading && currentStep === 1) {
        return (
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Cargando información del puesto...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <header className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Formulario de Postulación</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Paso {currentStep} de {totalSteps}
                </p>
                <div className="bg-blue-100 text-blue-800 p-3 rounded-md">
                    <p>
                        Estás postulando a: {' '}
                        <strong>{positionInfo.subAreaName || positionInfo.areaName}</strong>
                    </p>
                </div>
            </header>

            {/* render del formulario */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                {renderCurrentStep()}

                <footer className="flex justify-between items-center pt-6 border-t mt-8">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                        >
                            Anterior
                        </button>
                    )}

                    {currentStep < totalSteps && (
                        <button
                            type="button"
                            onClick={handleNextStep}
                            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Siguiente
                        </button>
                    )}

                    {currentStep === totalSteps && (
                        <button
                            type="submit"
                            disabled={loading || !formData.acceptTerms || !formData.acceptDataPolicy}
                            className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Enviando...' : 'Enviar Postulación'}
                        </button>
                    )}
                </footer>

                {submitError && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {submitError}
                    </div>
                )}
            </form>
        </div>
    );
}