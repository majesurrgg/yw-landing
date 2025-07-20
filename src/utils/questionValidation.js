export const validateDynamicQuestions = (questions, responses) => {
    const errors = [];

    questions.forEach(question => {
        const response = responses.find(r => r.questionId === question.id);

        if (!response || !response.reply) {
            errors.push(`La pregunta "${question.questionText}" es requerida`);
            return;
        }

        // Validaciones específicas por tipo
        switch (question.type) {
            case 'FILE_UPLOAD':
                if (!(response.reply instanceof File)) {
                    errors.push(`Debe subir un archivo para: ${question.questionText}`);
                }
                break;

            case 'CHECKBOX':
                if (!Array.isArray(response.reply) || response.reply.length === 0) {
                    errors.push(`Debe seleccionar al menos una opción para: ${question.questionText}`);
                }
                break;

            case 'NUMBER':
                if (isNaN(response.reply) || response.reply < 0) {
                    errors.push(`Debe ingresar un número válido para: ${question.questionText}`);
                }
                break;

            case 'TEXT':
            case 'TEXTAREA':
                if (typeof response.reply !== 'string' || response.reply.trim().length === 0) {
                    errors.push(`Debe completar el campo: ${question.questionText}`);
                }
                break;
        }
    });

    return errors;
};