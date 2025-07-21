// formValidation.js
export const validateStep = (step, formData, volunteerType, dynamicQuestions = []) => {

    const errors = [];

    switch (step) {
        case 1: // Datos personales
            if (!formData.name.trim()) errors.push("El nombre es requerido");
            if (!formData.lastname.trim()) errors.push("El apellido es requerido");
            if (!formData.email || !formData.email.trim()) error.push("El email es requerido");
            // validar formato de email
            if (!formData.email && formData.email.trim()){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    errors.push("El email no tiene un formato válido");
                }
            } 
            
            if (!formData.phone_number.trim()) errors.push("El teléfono es requerido");
            if (!formData.date_birth) errors.push("La fecha de nacimiento es requerida");
            if (!formData.num_identification.trim()) errors.push("El número de identificación es requerido");
            if (!formData.file) errors.push("El CV es requerido");
            // validar que el archivo sea PDF
            if(formData.file && formData.file.type !== 'application/pdf') {
                error.push("El CV debe ser un archivo PDF");
            }
            break;

        case 2:
            if (volunteerType === 'staff') {
                if (!formData.volunteer_motivation || !formData.volunteer_motivation.trim()){
                    errors.push("La motivación es requerida");
                } 
            } else {
                // VALIDAR RPSTS DINAMICAS
                if (dynamicQuestions && dynamicQuestions.length > 0){
                    dynamicQuestions.forEach(question => {
                        const response = formData.responde?.fing(r => r.questionId === questionId);
                        if(!response || !response.reply) {
                            errors.push(`La respuesta a "${question.questionText}" es requerida`)
                        }
                    });
                }
            }
            break;

        case 3:
            if (volunteerType === 'asesoria') {
                // Validar que tenga al menos un horario seleccionado
                const hasSchedule = Object.values(formData.availability).some(day =>
                    Object.values(day).some(period => period)
                );
                if (!hasSchedule) errors.push("Debe seleccionar al menos un horario");
            }
            break;

        case 4:
            if (volunteerType === 'asesoria') {
                if (!formData.volunteer_motivation || !formData.volunteer_motivation.trim()){
                    error.push("La motivación es requerida");
                }
            }
            break;

        case 5:
            if (!formData.acceptTerms) errors.push("Debe aceptar los términos y condiciones");
            if (!formData.acceptDataPolicy) errors.push("Debe aceptar la política de datos");
            break;
    }

    return errors;
};