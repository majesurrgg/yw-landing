// formValidation.js
export const validateStep = (step, formData, volunteerType, dynamicQuestions = []) => {

    const errors = [];

    switch (step) {
        case 1: // Datos personales
            if (!formData.name.trim()) errors.push("El nombre es requerido");
            if (!formData.lastname.trim()) errors.push("El apellido es requerido");
            // validar formato de email
            if (formData.email && formData.email.trim()){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    errors.push("El email no tiene un formato válido");
                }
            } 
            
            // telefono es requerido y debe tener 9 digitos(peru){
            if (!formData.phone_number || !formData.phone_number.trim()) {
                errors.push("El teléfono es requerido")
            } else {
                const phoneRegex = /^\d{9}$/;
                if(!phoneRegex.test(formData.phone_number)){
                    errors.push("El telefono debe tener 9 dígitos");
                }
            }
            // fecha de nacimiento no es requerida pero tiene que ser mayor de edad
            if (!formData.date_birth){
                errors.push("La fecha de nacimiento es requerida");
            } else {
                const year = parseInt(formData.date_birth.split('/')[0], 10);
                if(year >= 2008){
                    errors.push("No debes ser menor de edad");
                } else if (year <= 1965 && year >= 1925) {
                    errors.push("No debes ser mayor de edad");
                } else if (year <= 1925) {
                    errors.push("Ingresa una fecha válida");
                }
            }
            // dni es requerido y debe tener 8 digitos
            if (!formData.num_identification || !formData.num_identification.trim()) {
                errors.push("El número de identificación es requerido");
            } else {
                const dniRegex = /^\d{8}$/;
                if(!dniRegex.test(formData.num_identification)){
                    errors.push("El DNI debe tener 8 dígitos");
                }
            }

            if (!formData.file) errors.push("El CV es requerido");
            // validar que el archivo sea PDF
            if(formData.file && formData.file.type !== 'application/pdf') {
                errors.push("El CV debe ser un archivo PDF");
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
                    errors.push("La motivación es requerida");
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