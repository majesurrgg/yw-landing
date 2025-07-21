
// formSubmission.js
export const prepareSubmissionData = (formData, volunteerType) => {
    const payload = new FormData();

    // 1. Campos básicos requeridos por el backend
    payload.append('name', formData.name || '');
    payload.append('lastName', formData.lastname || '');
    payload.append('birthDate', formData.date_birth || '');
    payload.append('phoneNumber', formData.phone_number || '');
    payload.append('email', formData.email || '');
    payload.append('typeIdentification', formData.type_identification || 'DNI');
    payload.append('numIdentification', formData.num_identification || '');
    payload.append('wasVoluntary', formData.was_voluntary ? 'true' : 'false');
    payload.append('volunteerMotivation', formData.volunteer_motivation || '');
    payload.append('idPostulationArea', formData.subAreaId || '');

    // Campos adicionales que espera el backend para asesores
    if (volunteerType === 'asesoria') {
        payload.append('experience', formData.experience ? 'true' : 'false');
        payload.append('advisoryCapacity', formData.advisoryCapacity || '5');
        payload.append('schoolGrades', formData.school_grades || 'Primaria (3° y 4° grado)');
        payload.append('quechuaLevel', formData.quechua_level || 'No lo hablo');
    }

    // 2. Mapear programsUniversity a los valores correctos del backend
    const programsUniversityMap = {
        'PRONABEC': 'Becario Pronabec',
        'UNIVAS': 'UNIVAS - UDEP',
        'UTEC': 'UTEC',
        'UCV': 'UCV',
        'UTP': 'UTP',
        'USIL': 'USIL',
        'NINGUNO': 'Ninguno'
    };
    const mappedProgram = programsUniversityMap[formData.programs_university] || 'Ninguno';
    payload.append('programsUniversity', mappedProgram);

    // 3. Mapear howDidYouFindUs a los valores correctos del backend
    const infoSourceMap = {
        'FACEBOOK': 'Facebook',
        'INSTAGRAM': 'Instagram',
        'LINKEDIN': 'LinkedIn',
        'TIKTOK': 'TikTok',
        'EMAIL': 'Correo electrónico',
        'BOLETIN_UTEC': 'Boletín UTEC',
        'PROA': 'Proa',
        'PRONABEC': 'Pronabec',
        'REFERENCIA': 'Referencia de un amigo/familia'
    };
    const mappedInfoSource = infoSourceMap[formData.how_did_you_find_us] || 'Facebook';
    payload.append('howDidYouFindUs', mappedInfoSource);

    // 4. Archivo CV (obligatorio)
    if (!formData.file || !(formData.file instanceof File)) {
        throw new Error("El archivo del CV es obligatorio y debe ser un archivo válido.");
    }
    payload.append('file', formData.file);

    // 5. Video (opcional para asesores)
    if (volunteerType === 'asesoria' && formData.video) {
        if (!(formData.video instanceof File)) {
            throw new Error("El video debe ser un archivo válido.");
        }
        payload.append('video', formData.video);
    }

    // 6. Procesar respuestas dinámicas (solo para asesores)
    if (volunteerType === 'asesoria' && formData.responses && formData.responses.length > 0) {
        //convertir respuestas a formato que el backend espera
        const processedResponses = formData.responses.map(response => {
            let processedReply = response.reply;

            // converitr arrays a string separados por comas
            if (Array.isArray(response.reply)) {
                processedReply = response.reply.join(',');
            }
            // convertir files a placeholder
            else if (response.reply instanceof File) {
                processedReply = `[FILE_UPLOAD]:${response.reply.name}`;
                // agregar el archivo por separado
                payload.append('video', response.reply);
            }
            return {
                questionId: response.questionId,
                response: processedReply
            }
        });
        // enviar como JSON string
        payload.append('responses', JSON.stringify(processedResponses));
        console.log('Respuestas procesadas:', JSON.stringify(processedResponses, null, 2));
    }

    // 7. Procesar horarios (solo para asesoría)
    if (volunteerType === 'asesoria') {
        const schedulesArray = [];

        for (const day in formData.availability) {
            const daySchedule = {
                dayOfWeek: '',
                period_time: '',
                period_time2: '',
                period_time3: ''
            }

            // mapear dias al formato esperado por el backend
            const dayMap = {
                'lunes': 'MONDAY',
                'martes': 'TUESDAY',
                'miercoles': 'WEDNESDAY',
                'jueves': 'THURSDAY',
                'viernes': 'FRIDAY',
                'sabado': 'SATURDAY',
                'domingo': 'SUNDAY'
            };
            daySchedule.dayOfWeek = dayMap[day];
            // procesar periodos
            const availability = formData.availability[day];
            const periods = [];

            if (availability.manana) periods.push('8-12');
            if (availability.tarde) periods.push('14-17');
            if (availability.noche) periods.push('18-22');



            /*const periods = formData.availability[day];
            if(formData.availability[day].manana) periods.push('8-12');
            if(formData.availability[day].tarde) periods.push('14-17');
            if(formData.availability[day].noche) periods.push('18-22');*/

            // asignar periodos a los campos correspondientes
            if (periods.length > 0) {
                daySchedule.period_time = periods[0] || '';
                daySchedule.period_time2 = periods[1] || '';
                daySchedule.period_time3 = periods[2] || '';

                schedulesArray.push(daySchedule);
            }
        }

        if (schedulesArray.length === 0) {
            throw new Error("Debe seleccionar al menos un horario de disponibilidad.");
        }
        // enviar como JSON string
        payload.append('schedule', JSON.stringify(schedulesArray));
        console.log('Horarios procesados:', JSON.stringify(schedulesArray, null, 2));
    }
    // a modo de debug mostramos lo que se envia
    console.log('=== Datos Enviados al backend ===');
    for (let [key, value] of payload.entries()) {
        if (value instanceof File) {
            console.log(`${key}: [FILE] ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}:`, value);
        }
    }
    console.log('=== Fin de Datos Enviados ===');
    return payload;
};


// Nueva función para validar antes del submit
export const validateSubmissionData = (formData, volunteerType, dynamicQuestions = []) => {
    const errors = [];

    // Validar archivos obligatorios
    if (!formData.file || !(formData.file instanceof File)) {
        errors.push("El CV es obligatorio");
    }

    // Validar video para asesores (si está presente)
    if (volunteerType === 'asesoria' && formData.video && !(formData.video instanceof File)) {
        errors.push("El video debe ser un archivo válido");
    }

    // Validar campos obligatorios básicos
    const requiredFields = [
        { field: 'name', message: 'El nombre es requerido' },
        { field: 'lastname', message: 'El apellido es requerido' },
        { field: 'email', message: 'El email es requerido' },
        { field: 'phone_number', message: 'El teléfono es requerido' },
        { field: 'date_birth', message: 'La fecha de nacimiento es requerida' },
        { field: 'num_identification', message: 'El número de identificación es requerido' },
        { field: 'volunteer_motivation', message: 'La motivación es requerida' }
    ];

    requiredFields.forEach(({ field, message }) => {
        if (!formData[field] || formData[field].toString().trim() === '') {
            errors.push(message);
        }
    });

    // Validar email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        errors.push("El email no tiene un formato válido");
    }

    // Validar typeIdentification
    const validIdentificationTypes = ['DNI', 'PASSPORT'];
    if (!validIdentificationTypes.includes(formData.type_identification)) {
        errors.push("El tipo de identificación debe ser DNI o PASSPORT");
    }

    // Validar programsUniversity
    const validPrograms = ['Pronabec', 'UNIVAS - UDEP', 'UTEC', 'UCV', 'UTP', 'USIL', 'Ninguno'];
    if (!validPrograms.includes(formData.programs_university)) {
        errors.push("Debe seleccionar un programa universitario válido");
    }

    // Validar howDidYouFindUs
    const validInfoSources = ['Facebook', 'Instagram', 'Linkedln', 'TikTok', 'Correo Electrónico', 'Boletín UTEC', 'Proa', 'Pronabec', 'Referencia de un amigo/familia'];
    if (!validInfoSources.includes(formData.how_did_you_find_us)) {
        errors.push("Debe seleccionar cómo se enteró de nosotros");
    }

    // Validar respuestas dinámicas
    if (dynamicQuestions.length > 0) {
        dynamicQuestions.forEach(question => {
            const response = formData.responses.find(r => r.questionId === question.id);
            if (!response || !response.reply) {
                errors.push(`La pregunta "${question.questionText}" es requerida`);
            }
        });
    }

    // Validar horarios para asesores
    if (volunteerType === 'asesoria') {
        const hasSchedule = Object.values(formData.availability).some(day =>
            Object.values(day).some(period => period)
        );
        if (!hasSchedule) {
            errors.push("Debe seleccionar al menos un horario de disponibilidad");
        }
    }

    // Validar términos y condiciones
    if (!formData.acceptTerms) {
        errors.push("Debe aceptar los términos y condiciones");
    }

    if (!formData.acceptDataPolicy) {
        errors.push("Debe aceptar la política de tratamiento de datos");
    }

    return errors;
};