"use client"

import { useState } from "react"
import PersonalDataSection from "./PersonalDataSection"
import VolunteerAreasSection from "./VolunteerAreasSection"
import AvailabilitySection from "./AvailabilitySection"
import FormSubmitSection from "./FormSubmitSection"

export default function VolunteerForm() {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        telefono: "",
        email: "",
        tipoDocumento: "DNI o Pasaporte",
        numeroDocumento: "",
        fechaNacimiento: "",
        haParticipado: null,
        areasVoluntariado: [],
        taller: "Cuenta cuentos",
        beneficiarios: "1",
        horarios: {
            lunes: { manana: false, tarde: false, noche: false },
            martes: { manana: false, tarde: false, noche: false },
            miercoles: { manana: false, tarde: false, noche: false },
            jueves: { manana: false, tarde: false, noche: false },
            viernes: { manana: false, tarde: false, noche: false },
            sabado: { manana: false, tarde: false, noche: false },
            domingo: { manana: false, tarde: false, noche: false },
        },
        aceptaTerminos: false,
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleAreaChange = (area) => {
        setFormData((prev) => ({
            ...prev,
            areasVoluntariado: prev.areasVoluntariado.includes(area)
                ? prev.areasVoluntariado.filter((a) => a !== area)
                : [...prev.areasVoluntariado, area],
        }))
    }

    const handleHorarioChange = (dia, periodo) => {
        setFormData((prev) => ({
            ...prev,
            horarios: {
                ...prev.horarios,
                [dia]: {
                    ...prev.horarios[dia],
                    [periodo]: !prev.horarios[dia][periodo],
                },
            },
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
    }

    return (

        <div >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg py-4 p-8">
                <PersonalDataSection formData={formData} handleInputChange={handleInputChange} />

                <VolunteerAreasSection
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleAreaChange={handleAreaChange}
                />

                <AvailabilitySection formData={formData} handleHorarioChange={handleHorarioChange} />

                <FormSubmitSection formData={formData} handleInputChange={handleInputChange} />
            </form>
        </div>

    )
}
