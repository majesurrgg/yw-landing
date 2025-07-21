// useVolunteerForm.js
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { getAreaById, getSubAreaById, getQuestionsBySubAreaId } from "../services/areaService";

// Hook personalizado para manejar toda la lógica del formulario
export const useVolunteerForm = () => {
    const [searchParams] = useSearchParams();
    const subAreaId = searchParams.get('subAreaId');
    const areaId = searchParams.get('areaId');
    const volunteerType = searchParams.get('type');

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitError, setSubmitError] = useState(null);
    const [positionInfo, setPositionInfo] = useState({ areaName: '', subAreaName: '' });
    const [dynamicQuestions, setDynamicQuestions] = useState([]);

    // Estado inicial del formulario - separado para mejor mantenimiento
    const [formData, setFormData] = useState({
        // Datos personales
        name: "",
        lastname: "",
        date_birth: "",
        phone_number: "",
        email: "",
        type_identification: "DNI",
        num_identification: "",
        file: null,
        video: null,

        // Configuración del voluntario
        was_voluntary: false,
        type_volunteer: volunteerType || "",
        subAreaId: subAreaId || areaId,

        // Campos específicos para asesores (requeridos por el backend)
        experience: false,
        advisoryCapacity: 3, // Valor por defecto más realista
        school_grades: "Secundaria (1°, 2° y 3° grado)", // Coincidir con el ejemplo del error
        quechua_level: "Nivel intermedio", // Coincidir con el ejemplo del error
        
        
        // Disponibilidad (solo para asesores)
        availability: {
            lunes: { manana: false, tarde: false, noche: false },
            martes: { manana: false, tarde: false, noche: false },
            miercoles: { manana: false, tarde: false, noche: false },
            jueves: { manana: false, tarde: false, noche: false },
            viernes: { manana: false, tarde: false, noche: false },
            sabado: { manana: false, tarde: false, noche: false },
            domingo: { manana: false, tarde: false, noche: false },
        },

        // Información adicional
        calling_plan: false,
        occupation: "ESTUDIO",
        volunteer_motivation: "",
        why_asesor: "",
        programs_university: "NINGUNO",
        how_did_you_find_us: "FACEBOOK",

        // Respuestas dinámicas
        responses: [],

        // Términos y condiciones
        acceptTerms: false,
        acceptDataPolicy: false
    });

    // Cargar datos de la posición al montar el componente
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
                    // solo cargar preguntas si no es staff
                    if (volunteerType !== 'staff') {
                        const questions = await getQuestionsBySubAreaId(subAreaId);
                        setDynamicQuestions(questions);
                    }
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

    // Handlers - separados por responsabilidad
    const handlers = {
        nextStep: () => setCurrentStep(prev => prev + 1),
        prevStep: () => setCurrentStep(prev => prev - 1),

        updateField: (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        },

        updateFile: (field, file) => {
            setFormData(prev => ({ ...prev, [field]: file }));
        },

        updateAvailability: (dia, periodo) => {
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
        },

        updateResponse: (questionId, reply) => {
            setFormData(prev => {
                const otherResponses = prev.responses.filter(r => r.questionId !== questionId);
                const newResponse = { questionId, reply };
                console.log(' Actualizando respuesta', newResponse);
                return {
                    ...prev,
                    responses: [...otherResponses, newResponse]
                };
            });
        },

        updateFileResponse: (questionId, file) => {
            setFormData(prev => {
                const otherResponses = prev.responses.filter(r => r.questionId !== questionId);
                return {
                    ...prev,
                    responses: [...otherResponses, { questionId, reply: file }]
                };
            });
        }
    };

    const totalSteps = volunteerType === 'staff' ? 3 : 5;

    return {
        // Estado
        currentStep,
        formData,
        loading,
        submitError,
        positionInfo,
        dynamicQuestions,
        //updateResponse,

        // Configuración
        volunteerType,
        subAreaId,
        areaId,
        totalSteps,

        // Handlers
        ...handlers,

        // Setters para casos especiales
        setLoading,
        setSubmitError
    };
};