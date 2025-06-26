// VolunteerForm.jsx
"use client"

import { useState, useEffect } from "react"
import { volunteerService } from "../services/volunteerService"
import PersonalDataSection from "./PersonalDataSection"
import VolunteerAreasSection from "./VolunteerAreasSection"
import AvailabilitySection from "./AvailabilitySection"
import FormSubmitSection from "./FormSubmitSection"
import { toast } from 'react-toastify'
import MotivationSection from "./MotivationSection"

export default function VolunteerForm() {
    const [formData, setFormData] = useState({
        // Personal Data
        name: "",
        last_name: "",
        date_birth: "",
        phone_number: "",
        email: "",
        type_identification: "DNI",
        num_identification: "",
        cv_url: null,
        was_voluntary: false,

        // Availability
        availability: {
            lunes: { manana: false, tarde: false, noche: false },
            martes: { manana: false, tarde: false, noche: false },
            miercoles: { manana: false, tarde: false, noche: false },
            jueves: { manana: false, tarde: false, noche: false },
            viernes: { manana: false, tarde: false, noche: false },
            sabado: { manana: false, tarde: false, noche: false },
            domingo: { manana: false, tarde: false, noche: false },
        },
        school_grades: "PRIMARIA34",
        calling_plan: false,

        // Experience and Motivation
        experience: false,
        occupation: "ESTUDIO",
        volunteer_motivation: "",
        why_asesor: "",
        quechua_level: "NULO",
        programs_university: "NINGUNO",
        how_did_you_find_us: "FACEBOOK",

        // Area Selection & dinamic questions
        type_volunteer: "", // Valor inicial
        selectedAreaId: null, // ID del área Staff o Asesoría seleccionada
        selectedSubAreaId: null, // ID de la subárea seleccionada
        responses: [] // Respuestas a preguntas dinámicas
    })

    const [allAreas, setAllAreas] = useState({ staffAreas: [], asesoryAreas: [] }); // Para almacenar TODAS las áreas
    const [displayAreas, setDisplayAreas] = useState([]); // Las áreas que se mostrarán en el select (filtradas por type_volunteer)
    const [subAreas, setSubAreas] = useState([]); // Subáreas del área seleccionada
    const [dynamicQuestions, setDynamicQuestions] = useState([]); // Preguntas de la subárea seleccionada

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // opciones para preguntas, quechua_level, program_university, occupation_opcion, etc
    const quechuaLevelOptions = [
        { value: "NULO", label: "No lo hablo" },
        { value: "BASICO", label: "Nivel básico" },
        { value: "INTERMEDIO", label: "Nivel intermedio" },
        { value: "AVANZADO", label: "Nivel avanzado" },
        { value: "NATIVO", label: "Nativo" },
    ]

    const programsUniversityOptions = [
        { value: "PRONABEC", label: "Becario Pronabec" },
        { value: "UNIVAS", label: "UNIVAS - UDEP" },
        { value: "UTEC", label: "UTEC" },
        { value: "UCV", label: "UCV" },
        { value: "NINGUNO", label: "Ninguno" },
    ]

    const occupationOptions = [
        { value: "ESTUDIO", label: "Solo estudio" },
        { value: "TRABAJO", label: "Solo trabajo" },
        { value: "AMBOS", label: "Ambos" },
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

    // Carga todas las áreas (STAFF y ASESORIAS) disponibles al inicio
    useEffect(() => {
        const loadAllAreas = async () => {
            try {
                const data = await volunteerService.getAllAreas();
                setAllAreas(data);
                // Establecer un valor por defecto para type_volunteer y displayAreas
                if (data.staffAreas.length > 0) {
                    setFormData(prev => ({ ...prev, type_volunteer: "STAFF" }));
                    setDisplayAreas(data.staffAreas);
                } else if (data.asesoryAreas.length > 0) {
                    setFormData(prev => ({ ...prev, type_volunteer: "ADVISER" }));
                    setDisplayAreas(data.asesoryAreas);
                }
            } catch (error) {
                console.error("Error cargando todas las áreas:", error);
                toast.error("Error cargando las áreas principales.");
            }
        };
        loadAllAreas();
    }, []);


    // Efecto para filtrar las áreas mostradas cuando cambia type_volunteer
    useEffect(() => {
        if (formData.type_volunteer === "STAFF") {
            setDisplayAreas(allAreas.staffAreas);
            // Resetear selección de área y subárea al cambiar de tipo
            setFormData(prev => ({ ...prev, selectedAreaId: null, selectedSubAreaId: null }));
            setSubAreas([]);
            setDynamicQuestions([]);
        } else if (formData.type_volunteer === "ADVISER") {
            setDisplayAreas(allAreas.asesoryAreas);
            // Resetear selección de área y subárea al cambiar de tipo
            setFormData(prev => ({ ...prev, selectedAreaId: null, selectedSubAreaId: null }));
            setSubAreas([]);
            setDynamicQuestions([]);
        }
    }, [formData.type_volunteer, allAreas]);

    // Efecto para cargar subáreas cuando se selecciona un selectedAreaId (Área Staff/Asesoría)
    useEffect(() => {
        const fetchSubAreas = async () => {
            if (formData.selectedAreaId && formData.type_volunteer === "STAFF") {
                try {
                    const fetchedSubAreas = await volunteerService.getSubAreasByAreaStaffId(formData.selectedAreaId);
                    setSubAreas(fetchedSubAreas);
                    // Resetear selección de subárea y preguntas al cargar nuevas subáreas
                    setFormData(prev => ({ ...prev, selectedSubAreaId: null }));
                    setDynamicQuestions([]);
                } catch (error) {
                    console.error("Error cargando subáreas:", error);
                    toast.error("Error cargando las subáreas.");
                    setSubAreas([]);
                }
            } else {
                setSubAreas([]); // Limpiar subáreas si no hay área seleccionada o no es STAFF
                setFormData(prev => ({ ...prev, selectedSubAreaId: null }));
                setDynamicQuestions([]);
            }
        };

        fetchSubAreas();
    }, [formData.selectedAreaId, formData.type_volunteer]); // Depende del área seleccionada y el tipo de voluntario


    // Efecto para cargar preguntas cuando se selecciona un selectedSubAreaId
    useEffect(() => {
        const fetchDynamicQuestions = async () => {
            if (formData.selectedSubAreaId) {
                try {
                    const questions = await volunteerService.getQuestionsBySubAreaId(formData.selectedSubAreaId);
                    setDynamicQuestions(questions);
                } catch (error) {
                    console.error("Error cargando preguntas dinámicas:", error);
                    toast.error("Error cargando las preguntas dinámicas.");
                    setDynamicQuestions([]);
                }
            } else {
                setDynamicQuestions([]); // Limpiar preguntas si no hay subárea seleccionada
            }
        };

        fetchDynamicQuestions();
    }, [formData.selectedSubAreaId]); // Depende de la subárea seleccionada 


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (field, file) => {
        setFormData((prev) => ({ ...prev, [field]: file }))
    }

    // Nueva función para manejar el cambio de tipo de voluntario (Staff/Asesor)
    const handleTypeVolunteerChange = (value) => {
        setFormData(prev => ({
            ...prev,
            type_volunteer: value,
            selectedAreaId: null, // Resetear área al cambiar el tipo
            selectedSubAreaId: null, // Resetear subárea
            responses: [] // Resetear respuestas dinámicas
        }));
    };

    // Nueva función para manejar el cambio de Área (Staff o Asesoría)
    const handleAreaSelectChange = (value) => {
        setFormData(prev => ({
            ...prev,
            selectedAreaId: value, // Guardar el ID del área seleccionada
            selectedSubAreaId: null, // Resetear subárea si cambia el área
            responses: [] // Resetear respuestas dinámicas
        }));
    };

    // Nueva función para manejar el cambio de SubÁrea
    const handleSubAreaSelectChange = (value) => {
        setFormData(prev => ({
            ...prev,
            selectedSubAreaId: value, // Guardar el ID de la subárea seleccionada
            responses: [] // Resetear respuestas dinámicas
        }));
    };

    const handleQuestionResponse = (questionId, response) => {
        setFormData((prev) => ({
            ...prev,
            responses: [
                ...prev.responses.filter(r => r.questionId !== questionId),
                { questionId, response }
            ]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);

        try {
            // Asegúrate de que el backend pueda procesar la estructura de formData
            // Es posible que necesites transformar los IDs de selectedAreaId y selectedSubAreaId
            // a la forma que espera tu backend (ej. `areaStaff: { id: selectedAreaId }`)
            await volunteerService.createVolunteer(formData);
            toast.success("¡Formulario enviado con éxito!");
            // Reset form or redirect
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitError(error.message || "Error al enviar el formulario");
            toast.error(error.message || "Error al enviar el formulario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl">
            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                </div>
            )}

            <div className="mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                    <PersonalDataSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                    />

                    <VolunteerAreasSection
                        formData={formData}
                        typeVolunteerOptions={[{ value: "STAFF", label: "Voluntario de Staff" }, { value: "ADVISER", label: "Voluntario Asesor" }]}
                        handleTypeVolunteerChange={handleTypeVolunteerChange} // Nuevo handler
                        displayAreas={displayAreas} // Las áreas filtradas
                        handleAreaSelectChange={handleAreaSelectChange} // Nuevo handler para selección de área
                        subAreas={subAreas} // Pasar las subáreas cargadas
                        handleSubAreaSelectChange={handleSubAreaSelectChange} // Nuevo handler para selección de subárea
                        dynamicQuestions={dynamicQuestions} // Pasar las preguntas dinámicas
                        handleQuestionResponse={handleQuestionResponse}
                    />

                    <AvailabilitySection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <MotivationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        occupationOptions={occupationOptions}
                        quechuaLevelOptions={quechuaLevelOptions}
                        programsUniversityOptions={programsUniversityOptions}
                        infoSourceOptions={infoSourceOptions}
                    />

                    <FormSubmitSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        loading={loading}
                    />

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Enviando...' : 'Enviar postulación'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}