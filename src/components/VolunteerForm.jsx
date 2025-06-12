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

        // Area Selection
        type_volunteer: "STAFF", // Valor inicial
        name_postulation_area: "", // Esto DEBERÍA ser el ID del área

        // Dynamic questions responses
        responses: []
    })

    const [areas, setAreas] = useState([])
    const [subAreas, setSubAreas] = useState([]) // Nuevo estado para las subáreas

    const [areaQuestions, setAreaQuestions] = useState([]) // Inicializado correctamente como array
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState(null)

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

    // Carga todas las áreas disponibles al inicio
    useEffect(() => {
        loadAreas()
    }, [])

    // Carga las preguntas cuando el tipo de voluntario cambia
    useEffect(() => {
        const fetchAreaQuestions = async () => {
            const selectedAreaType = formData.type_volunteer;
            const area = areas.find(a => a.name === selectedAreaType); // Buscar el objeto de área por su nombre

            if (area) {
                await loadAreaQuestions(area.id);
            } else {
                setAreaQuestions([]);
            }
        };

        if (areas.length > 0) {
            fetchAreaQuestions();
        }
    }, [formData.type_volunteer, areas]);

    useEffect(() => {
        const fetchSubAreas = async () => {
            const selectedAreaType = formData.type_volunteer;
            const area = areas.find(a => a.name === selectedAreaType);

            if (area) {
                try {
                    const fetchedSubAreas = await volunteerService.getSubAreas(area.id);
                    setSubAreas(fetchedSubAreas);
                    // Opcional: Si solo hay una subárea por defecto, selecciónala
                    // if (fetchedSubAreas.length > 0) {
                    //     setFormData(prev => ({
                    //         ...prev,
                    //         selected_subarea_id: fetchedSubAreas[0].id // Asumiendo que la subárea tiene un 'id'
                    //     }));
                    // } else {
                    //     setFormData(prev => ({ ...prev, selected_subarea_id: "" }));
                    // }
                } catch (error) {
                    console.error("Error cargando subáreas:", error);
                    toast.error("Error cargando las subáreas de voluntariado");
                    setSubAreas([]);
                }
            } else {
                setSubAreas([]); // Si no se encuentra un área principal, limpia las subáreas
                setFormData(prev => ({ ...prev, selected_subarea_id: "" })); // También limpia la selección
            }
        };


        // Solo carga las preguntas si las áreas ya están cargadas
        if (areas.length > 0) { // Solo intenta cargar si las áreas principales ya están disponibles
            fetchSubAreas();
        }
    }, [formData.type_volunteer, areas]); // Depende del tipo de voluntario y de que las áreas estén cargadas

    const loadAreas = async () => {
        try {
            const areasData = await volunteerService.getVolunteerAreas()
            setAreas(areasData)
            // Optional: Set a default area type if areasData is not empty
            if (areasData.length > 0) {
                // Find the ID for "STAFF" or "ADVISER" initially, or just set the first one
                const defaultStaffArea = areasData.find(a => a.name === "STAFF");
                if (defaultStaffArea) {
                    setFormData(prev => ({
                        ...prev,
                        /*name_postulation_area: defaultStaffArea.id, // Set the actual ID*/
                        type_volunteer: "STAFF" // Keep this as the displayed value for the select
                    }));
                }
            }
        } catch (error) {
            console.error("Error loading areas:", error)
            toast.error("Error cargando las áreas de voluntariado")
            setAreas([]); // Ensure areas is an empty array on error
        }
    }

    const loadAreaQuestions = async (areaId) => {
        try {
            // Tu servicio espera un array de IDs, así que asegúrate de pasar un array
            const questions = await volunteerService.getAreaQuestions([areaId]);
            setAreaQuestions(questions);
        } catch (error) {
            console.error("Error loading area questions:", error);
            toast.error("Error cargando las preguntas del área");
            setAreaQuestions([]); // Asegúrate de que siempre sea un array en caso de error
        }
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (field, file) => {
        setFormData((prev) => ({ ...prev, [field]: file }))
    }

    // Modifica handleAreaChange para que solo actualice el tipo de voluntario en formData.
    // La carga de preguntas ahora se maneja en el useEffect.
    /*const handleAreaChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
            // Si el campo es 'type_volunteer', también podrías querer resetear las respuestas
            ...(field === 'type_volunteer' && { responses: [] })
        }));
    };*/

    const handleQuestionResponse = (questionId, response) => {
        setFormData((prev) => ({
            ...prev,
            responses: [
                ...prev.responses.filter(r => r.questionId !== questionId),
                { questionId, response }
            ]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSubmitError(null)

        try {
            await volunteerService.createVolunteer(formData)
            toast.success("¡Formulario enviado con éxito!")
            // Reset form or redirect
        } catch (error) {
            console.error("Error submitting form:", error)
            setSubmitError(error.message || "Error al enviar el formulario")
            toast.error(error.message || "Error al enviar el formulario")
        } finally {
            setLoading(false)
        }
    }

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
                        areas={areas}
                        subAreas={subAreas} // Pasar las subáreas cargadas
                        handleInputChange={handleInputChange}
                        areaQuestions={areaQuestions}
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