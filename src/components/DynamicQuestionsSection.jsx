import { useMemo } from 'react';

// Componente para manejar archivos
const FileUploadInput = ({ question, currentResponse, onFileResponse }) => (
    <div>
        <input
            type="file"
            onChange={(e) => onFileResponse(question.id, e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
            accept=".pdf,.doc,.docx,.mp4,.mov"
            required
        />
        {currentResponse?.reply && (
            <p className="text-sm text-gray-500 mt-2">
                Archivo seleccionado: {currentResponse.reply.name}
            </p>
        )}
    </div>
);

// Componente para select con opciones dinámicas
const SelectInput = ({ question, currentResponse, onResponse }) => {
    const selectOptions = useMemo(() => {
        const questionText = question.questionText.toLowerCase();

        if (questionText.includes('taller')) {
            return ['Teatro', 'Danza', 'Música', 'Oratoria'];
        }
        if (questionText.includes('asignatura')) {
            return ['Matemática', 'Comunicación', 'Ciencias', 'Inglés'];
        }

        // Opciones por defecto
        return ['Sí', 'No'];
    }, [question.questionText]);

    return (
        <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={currentResponse?.reply || ''}
            onChange={(e) => onResponse(question.id, e.target.value)}
            required
        >
            <option value="" disabled>Selecciona una opción</option>
            {selectOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    );
};

// Componente para radio buttons con opciones dinámicas
const RadioInput = ({ question, currentResponse, onResponse }) => {
    const radioOptions = useMemo(() => {
        const questionText = question.questionText.toLowerCase();

        if (questionText.includes('beneficiarios')) {
            return ['1', '2', '3'];
        }
        if (questionText.includes('puesto')) {
            return ['Yaku bienestar: Facilitador psicoeducativo'];
        }
        if (questionText.includes('psicología')) {
            return ['Sí, tengo formación académica', 'Sí, tengo experiencia', 'Ambas', 'No'];
        }

        // Opciones por defecto
        return ['Sí', 'No'];
    }, [question.questionText]);

    return (
        <div className="flex flex-col space-y-2">
            {radioOptions.map(opt => (
                <label key={opt} className="flex items-center">
                    <input
                        type="radio"
                        name={`question_${question.id}`}
                        value={opt}
                        checked={currentResponse?.reply === opt}
                        onChange={(e) => onResponse(question.id, e.target.value)}
                        className="mr-2 h-4 w-4 text-blue-600"
                        required
                    />
                    {opt}
                </label>
            ))}
        </div>
    );
};

// Componente para checkbox con múltiples selecciones
const CheckboxInput = ({ question, currentResponse, onResponse }) => {
    const checkboxOptions = useMemo(() => {
        const questionText = question.questionText.toLowerCase();

        if (questionText.includes('asignatura')) {
            return ['Matemática', 'Comunicación', 'Ciencias', 'Inglés'];
        }
        if (questionText.includes('habilidad')) {
            return ['Comunicación', 'Liderazgo', 'Trabajo en equipo', 'Organización'];
        }

        return [];
    }, [question.questionText]);

    const handleCheckboxChange = (option) => {
        const currentValues = Array.isArray(currentResponse?.reply) ? currentResponse.reply : [];
        const newValues = currentValues.includes(option)
            ? currentValues.filter(val => val !== option)
            : [...currentValues, option];

        onResponse(question.id, newValues);
    };

    const selectedValues = Array.isArray(currentResponse?.reply) ? currentResponse.reply : [];

    return (
        <div className="flex flex-col space-y-2">
            {checkboxOptions.map(opt => (
                <label key={opt} className="flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedValues.includes(opt)}
                        onChange={() => handleCheckboxChange(opt)}
                        className="mr-2 h-4 w-4 text-blue-600 rounded"
                    />
                    {opt}
                </label>
            ))}
        </div>
    );
};

// Componente para input numérico
const NumberInput = ({ question, currentResponse, onResponse }) => (
    <input
        type="number"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={currentResponse?.reply || ''}
        onChange={(e) => onResponse(question.id, e.target.value)}
        min="0"
        required
    />
);

// Componente para textarea (texto largo)
const TextareaInput = ({ question, currentResponse, onResponse }) => (
    <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        rows="4"
        value={currentResponse?.reply || ''}
        onChange={(e) => onResponse(question.id, e.target.value)}
        placeholder="Escribe tu respuesta aquí..."
        required
    />
);

// Componente para input de texto corto
const TextInput = ({ question, currentResponse, onResponse }) => (
    <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={currentResponse?.reply || ''}
        onChange={(e) => onResponse(question.id, e.target.value)}
        placeholder="Escribe tu respuesta aquí..."
        required
    />
);

// Factory para crear el input correcto según el tipo
const QuestionInputFactory = ({ question, currentResponse, onResponse, onFileResponse }) => {
    const inputComponents = {
        'FILE_UPLOAD': FileUploadInput,
        'SELECT': SelectInput,
        'RADIO': RadioInput,
        'CHECKBOX': CheckboxInput,
        'NUMBER': NumberInput,
        'TEXTAREA': TextareaInput,
        'TEXT': TextInput
    };

    const InputComponent = inputComponents[question.type] || TextareaInput;

    // Para FILE_UPLOAD necesitamos un handler especial
    if (question.type === 'FILE_UPLOAD') {
        return (
            <InputComponent
                question={question}
                currentResponse={currentResponse}
                onFileResponse={onFileResponse}
            />
        );
    }

    return (
        <InputComponent
            question={question}
            currentResponse={currentResponse}
            onResponse={onResponse}
        />
    );
};

// Componente individual para cada pregunta
const QuestionItem = ({ question, formData, onResponse, onFileResponse }) => {
    const currentResponse = formData.responses.find(r => r.questionId === question.id);

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">
                {question.questionText}
                {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <QuestionInputFactory
                question={question}
                currentResponse={currentResponse}
                onResponse={onResponse}
                onFileResponse={onFileResponse}
            />

            {question.helpText && (
                <p className="text-sm text-gray-500 mt-1">{question.helpText}</p>
            )}
        </div>
    );
};

// Componente principal para las preguntas dinámicas
export default function DynamicQuestionsSection({
    questions,
    formData,
    onResponse,
    onFileResponse
}) {
    if (!questions || questions.length === 0) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                    Preguntas Específicas del Puesto
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-500">
                        No hay preguntas específicas para este puesto.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Preguntas Específicas del Puesto
            </h2>

            <div className="space-y-6">
                {questions.map((question) => (
                    <QuestionItem
                        key={question.id}
                        question={question}
                        formData={formData}
                        onResponse={onResponse}
                        onFileResponse={onFileResponse}
                    />
                ))}
            </div>
        </div>
    );
}
