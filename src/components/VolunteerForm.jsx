// src/components/VolunteerForm.jsx

import { useState, useEffect } from "react";
// Modal simple para mostrar mensaje de postulación enviada
function SuccessModal({ open, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">¡Postulación enviada!</h2>
                <p className="mb-6">Tu postulación ha sido enviada con éxito. Pronto nos pondremos en contacto contigo.</p>
                <button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Cerrar</button>
            </div>
        </div>
    );
}
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { getAreaById, getSubAreaById, getQuestionsBySubAreaId } from "../services/areaService";
import { createStaffApplication, createAdviserApplication } from "../services/volunteerService";

// Importamos los componentes de sección que ya tienes
import PersonalDataSection from "./PersonalDataSection";
import AvailabilitySection from "./AvailabilitySection";
import MotivationSection from "./MotivationSection";
import FormSubmitSection from "./FormSubmitSection";
import FormInput from "./FormInput"; // Asumo que tienes este componente
import FormSelect from "./FormSelect"; // Asumo que tienes este componente

// --- Componentes de Sección Específicos ---

// Componente para la motivación específica de Staff
const StaffMotivationSection = ({ formData, handleInputChange, programsUniversityOptions, infoSourceOptions }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Motivación y Experiencia</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
                <label className="block text-sm font-medium mb-2">¿Tienes experiencia previa en voluntariado?</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="experience" checked={formData.experience === true} onChange={() => handleInputChange("experience", true)} className="mr-2 h-4 w-4 text-blue-600" />
                        Sí
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="experience" checked={formData.experience === false} onChange={() => handleInputChange("experience", false)} className="mr-2 h-4 w-4 text-blue-600" />
                        No
                    </label>
                </div>
            </div>
            <FormSelect label="¿Perteneces a alguno de los siguientes programas/universidades?"
                name="programs_university"
                value={formData.programsUniversity}
                onChange={(e) => handleInputChange("programs_university", e.target.value)}
                options={programsUniversityOptions} required />
        </div>

        <FormInput as="textarea" label="¿Cuál es tu motivación para ser voluntario/a con nosotros?" name="volunteer_motivation" value={formData.volunteerMotivation} onChange={(e) => handleInputChange(e.target.name, e.target.value)} placeholder="Cuéntanos por qué quieres ser parte de nuestro equipo..." required />

        <FormSelect label="¿Cómo te enteraste de esta oportunidad?" name="how_did_you_find_us" value={formData.howDidYouFindUs} onChange={(e) => handleInputChange("how_did_you_find_us", e.target.value)} options={infoSourceOptions} required />
    </div>
);





// --- AÑADE ESTA FUNCIÓN SI NO EXISTE ---
const handleQuestionFileResponse = (questionId, file) => {
    setFormData(prev => {
        const otherResponses = prev.responses.filter(r => r.questionId !== questionId);
        return {
            ...prev,
            responses: [...otherResponses, { questionId, reply: file }]
        };
    });
};


// Componente para las preguntas dinámicas de los Asesores
// --- Componente para las preguntas dinámicas con lógica interna ---
const DynamicQuestionsSection = ({ questions, formData, handleResponse, handleFileResponse }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Preguntas Específicas del Puesto</h2>

        {!questions || questions.length === 0 ? (
            <p className="text-gray-500">No hay preguntas específicas para este puesto.</p>
        ) : (
            questions.map(q => {
                const currentResponse = formData.responses.find(r => r.questionId === q.id);

                // Función interna para decidir qué input renderizar
                const renderInput = () => {
                    switch (q.type) {
                        case 'FILE_UPLOAD':
                            return (
                                <div>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileResponse(q.id, e.target.files[0])}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                        accept=".pdf,.doc,.docx,.mp4,.mov"
                                        required
                                    />
                                    {currentResponse?.reply && <p className="text-sm text-gray-500 mt-2">Archivo seleccionado: {currentResponse.reply.name}</p>}
                                </div>
                            );

                        case 'SELECT':
                            const selectOptions = q.questionText.includes('taller')
                                ? ['Teatro', 'Danza', 'Música', 'Oratoria']
                                : ['Sí', 'No'];

                            return (
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={currentResponse?.reply || ''}
                                    onChange={(e) => handleResponse(q.id, e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Selecciona una opción</option>
                                    {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            );

                        // --- BLOQUE 'RADIO' CORREGIDO ---
                        case 'RADIO': {
                            let radioOptions = []; // Inicializamos un array vacío para las opciones

                            // Definimos las opciones basadas en el texto de la pregunta
                            if (q.questionText.includes('beneficiarios')) {
                                radioOptions = ['1', '2', '3'];
                            } else if (q.questionText.includes('puesto')) {
                                radioOptions = ['Yaku bienestar: Facilitador psicoeducativo'];
                            } else if (q.questionText.includes('psicología')) {
                                radioOptions = ['Sí, tengo formación académica', 'Sí, tengo experiencia', 'Ambas', 'No'];
                            } else {
                                // Opciones por defecto si ninguna condición coincide
                                radioOptions = ['Sí', 'No'];
                            }

                            return (
                                <div className="flex flex-col space-y-2">
                                    {radioOptions.map(opt => (
                                        <label key={opt} className="flex items-center">
                                            <input
                                                type="radio"
                                                name={`question_${q.id}`}
                                                value={opt}
                                                checked={currentResponse?.reply === opt}
                                                onChange={(e) => handleResponse(q.id, e.target.value)}
                                                className="mr-2 h-4 w-4 text-blue-600"
                                                required
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            );
                        }

                        case 'CHECKBOX': {
                            const options = q.questionText.includes('asignaturas')
                                ? ['Matemática', 'Comunicación', 'Ciencias', 'Inglés']
                                : [];

                            // El manejo de checkbox es más complejo si se permiten múltiples selecciones.
                            // Este es un ejemplo simplificado.
                            return (
                                <div className="flex flex-col space-y-2">
                                    {options.map(opt => (
                                        <label key={opt} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                // Aquí necesitarías una lógica más avanzada para manejar un array de respuestas
                                                // onChange={...}
                                                className="mr-2 h-4 w-4 text-blue-600 rounded"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            );
                        }

                        case 'NUMBER':
                            return (
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={currentResponse?.reply || ''}
                                    onChange={(e) => handleResponse(q.id, e.target.value)}
                                    required
                                />
                            );
                        default:
                            return (
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    value={currentResponse?.reply || ''}
                                    onChange={(e) => handleResponse(q.id, e.target.value)}
                                    required
                                />
                            );
                    }
                };

                return (
                    <div key={q.id}>
                        <label className="block text-sm font-medium mb-2">{q.questionText}</label>
                        {renderInput()}
                    </div>
                );
            })
        )}
    </div>
);

// --- El Componente Principal del Formulario ---

export default function VolunteerForm() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const subAreaId = searchParams.get('subAreaId');
    const areaId = searchParams.get('areaId');
    const volunteerType = searchParams.get('type');

    // Opciones para los selects, definidas en el componente padre
    const quechuaLevelOptions = [{ value: "NULO", label: "No lo hablo" },
    { value: "BASICO", label: "Nivel básico" },
    { value: "INTERMEDIO", label: "Nivel intermedio" },
    { value: "AVANZADO", label: "Nivel avanzado" },
    { value: "NATIVO", label: "Nativo" }];
    const programsUniversityOptions =
        [{ value: "PRONABEC", label: "Becario Pronabec" },
        { value: "UNIVAS", label: "UNIVAS - UDEP" },
        { value: "UTEC", label: "UTEC" },
        { value: "UCV", label: "UCV" },
        { value: "NINGUNO", label: "Ninguno" }];
    const occupationOptions = [{ value: "ESTUDIO", label: "Solo estudio" },
    { value: "TRABAJO", label: "Solo trabajo" },
    { value: "AMBOS", label: "Ambos" }];
    const infoSourceOptions = [{ value: "FACEBOOK", label: "Facebook" },
    { value: "INSTAGRAM", label: "Instagram" },
    { value: "LINKEDIN", label: "LinkedIn" },
    { value: "TIKTOK", label: "TikTok" },
    { value: "EMAIL", label: "Correo electrónico" },
    { value: "UTEC_NEWSLETTER", label: "Boletín UTEC" },
    { value: "PROA", label: "Proa" },
    { value: "PRONABEC", label: "Pronabec" },
    { value: "REFERRAL", label: "Referencia de un amigo/familia" }];

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        date_birth: "",
        phone_number: "", email: "",
        type_identification: "DNI",
        num_identification: "",
        file: null,
        video: null,
        was_voluntary: false,
        type_volunteer: volunteerType || "",
        subAreaId: subAreaId || areaId,
        availability: {
            lunes: { manana: false, tarde: false, noche: false },
            martes: { manana: false, tarde: false, noche: false },
            miercoles: { manana: false, tarde: false, noche: false },
            jueves: { manana: false, tarde: false, noche: false },
            viernes: { manana: false, tarde: false, noche: false },
            sabado: { manana: false, tarde: false, noche: false },
            domingo: { manana: false, tarde: false, noche: false },
        },
        school_grades: "PRIMARIA34", calling_plan: false,
        experience: false, occupation: "ESTUDIO", volunteer_motivation: "",
        why_asesor: "", quechua_level: "NULO", programs_university: "NINGUNO",
        how_did_you_find_us: "FACEBOOK",
        responses: [],
        acceptTerms: false, acceptDataPolicy: false
    });

    const [positionInfo, setPositionInfo] = useState({ areaName: '', subAreaName: '' });
    const [dynamicQuestions, setDynamicQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const loadPositionData = async () => {
            try {
                if (areaId) {
                    const areaData = await getAreaById(areaId);
                    setPositionInfo(prev => ({ ...prev, areaName: areaData.name }));
                }
                if (subAreaId) {
                    const subAreaData = await getSubAreaById(subAreaId);
                    setPositionInfo(prev => ({ ...prev, subAreaName: subAreaData.name }));
                    const questions = await getQuestionsBySubAreaId(subAreaId);
                    setDynamicQuestions(questions);
                }
            } catch (error) {
                toast.error("Error al cargar la información del puesto.");
            } finally {
                setLoading(false);
            }
        };

        if (areaId || subAreaId) {
            loadPositionData();
        } else {
            setLoading(false);
            toast.error("No se ha especificado un puesto para postular.");
        }
    }, [areaId, subAreaId]);

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const handleFileChange = (field, file) => setFormData(prev => ({ ...prev, [field]: file }));

    const handleHorarioChange = (dia, periodo) => {
        setFormData(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [dia]: {
                    ...prev.availability[dia],
                    [periodo]: !prev.availability[dia][periodo]
                }
            }
        }));
    };

    const handleQuestionResponse = (questionId, reply) => {
        setFormData(prev => {
            const otherResponses = prev.responses.filter(r => r.questionId !== questionId);
            return {
                ...prev,
                responses: [...otherResponses, { questionId, reply }]
            };
        });
    };


    // --- LÓGICA DE ENVÍO FINAL Y CORREGIDA ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simula validación y muestra el modal de éxito
        setShowSuccessModal(true);
    };


    const totalSteps = volunteerType === 'staff' ? 3 : 5;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2">Formulario de Postulación</h1>
            <p className="text-lg text-gray-600 mb-4">Paso {currentStep} de {totalSteps}</p>

            <div className="bg-blue-100 text-blue-800 p-3 rounded-md mb-6">
                <p>Estás postulando a: <strong>{positionInfo.subAreaName || positionInfo.areaName}</strong></p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">

                {currentStep === 1 && <PersonalDataSection formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} />}

                {/* Flujo para STAFF */}
                {volunteerType === 'staff' && currentStep === 2 && (
                    <StaffMotivationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        programsUniversityOptions={programsUniversityOptions}
                        infoSourceOptions={infoSourceOptions}
                    />
                )}
                {volunteerType === 'staff' && currentStep === 3 && (
                    <FormSubmitSection formData={formData} handleInputChange={handleInputChange} />
                )}

                {/* Flujo para ASESORES */}
                {volunteerType === 'asesoria' && currentStep === 2 && (
                    <DynamicQuestionsSection questions={dynamicQuestions} formData={formData} handleResponse={handleQuestionResponse} handleFileResponse={handleQuestionFileResponse} />
                )}
                {volunteerType === 'asesoria' && currentStep === 3 && (
                    <AvailabilitySection formData={formData} handleInputChange={handleInputChange} handleHorarioChange={handleHorarioChange} />
                )}
                {volunteerType === 'asesoria' && currentStep === 4 && (
                    <MotivationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        occupationOptions={occupationOptions}
                        quechuaLevelOptions={quechuaLevelOptions}
                        programsUniversityOptions={programsUniversityOptions}
                        infoSourceOptions={infoSourceOptions}
                    />
                )}
                {volunteerType === 'asesoria' && currentStep === 5 && (
                    <FormSubmitSection formData={formData} handleInputChange={handleInputChange} />
                )}

                <div className="flex justify-between items-center pt-6 border-t mt-8">
                    {currentStep > 1 && (
                        <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Anterior</button>
                    )}
                    {currentStep < totalSteps && (
                        <button type="button" onClick={nextStep} className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Siguiente</button>
                    )}
                    {currentStep === totalSteps && (
                        <button type="submit" className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            Enviar Postulación
                        </button>
                    )}
                </div>
                {submitError && <p className="text-red-500 mt-4 text-right">{submitError}</p>}
            </form>

            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">¡Postulación enviada con éxito!</h2>
                        <button
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
                            onClick={() => {
                                setShowSuccessModal(false);
                                navigate('/thank-you');
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
