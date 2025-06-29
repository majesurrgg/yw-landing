// función del componente: 
// 1. leer el ID del área de la URL usando el hook useParams
// 2. usar useEffect para hacer petición a nuestro nuevo endpoint GET
// /api/areas/:areaId
// 3. guardar el área recibida en un estado
// 4. renderizar:
// si area.subAreas tiene elementos, mostrar lista de de subáreas
// si area.subAreas esta vacio, muestra detalles del área misma

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// importamos de apiService.js
import { getSubAreaById } from '../services/areaService';

export default function VolunteerDetailPage() {
    // 1. Leer el ID de la SUB-ÁREA de la URL
    const { subAreaId } = useParams();
    const [puesto, setPuesto] = useState(null); // 'puesto' es un nombre más descriptivo
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 2. Función para buscar los detalles del puesto (sub-área)
        const fetchPuestoDetails = async () => {
            if (!subAreaId) return; // No hacer nada si no hay ID

            setLoading(true);
            try {
                // Usamos la función correcta del servicio que llama a GET /api/subareas/:id
                const data = await getSubAreaById(subAreaId);
                setPuesto(data);
            } catch (error) {
                console.error(`Error al cargar la sub-área con ID ${subAreaId}:`, error);
                setPuesto(null); // Limpiar en caso de error
            } finally {
                setLoading(false);
            }
        };

        fetchPuestoDetails();
    }, [subAreaId]); // El efecto se ejecuta si el ID en la URL cambia

    if (loading) {
        return <div className="text-center p-10 text-xl">Cargando...</div>;
    }

    if (!puesto) {
        return <div className="text-center p-10 text-xl">Puesto de voluntariado no encontrado.</div>;
    }

    // Función auxiliar para mostrar las listas de texto de forma bonita
    const renderListFromString = (text) => {
        if (!text) return <p className="text-gray-500">No especificado.</p>;
        // Asumimos que los items en el texto están separados por saltos de línea o un carácter como '*'
        return (
            <ul className="space-y-2">
                {text.split(/[\n*]/).map((line, index) =>
                    line.trim() && <li key={index} className="flex items-start"><span className="mr-2 mt-1 text-blue-500">&#10003;</span><span>{line.trim()}</span></li>
                )}
            </ul>
        );
    };

    // 4. Renderizar los detalles del puesto (la sub-área)
    return (
        <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                    <Link to="/volunteerPageInfo" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Volver a todas las oportunidades</Link>

                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{puesto.name}</h1>
                        <p className="text-md text-gray-600 mt-2">{puesto.description}</p>
                    </div>

                    <div className="space-y-8">
                        <DetailSection title="Funciones">
                            {renderListFromString(puesto.functions)}
                        </DetailSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <DetailSection title="Conocimientos y Estudios">
                                {renderListFromString(puesto.knowledgeAndStudies)}
                            </DetailSection>
                            <DetailSection title="Conocimientos Adicionales">
                                {renderListFromString(puesto.additionalKnowledge)}
                            </DetailSection>
                            <DetailSection title="Habilidades Tecnológicas">
                                {renderListFromString(puesto.technologicalSkills)}
                            </DetailSection>
                            <DetailSection title="Competencias Comunicacionales">
                                {renderListFromString(puesto.communicationSkills)}
                            </DetailSection>
                        </div>

                        <DetailSection title="Experiencia Requerida">
                            <p className="text-gray-700">{puesto.experience || 'No especificada.'}</p>
                        </DetailSection>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                        <button className="bg-yellow-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg">
                            Postular
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente auxiliar para unificar estilos de las secciones
const DetailSection = ({ title, children }) => (
    <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <div className="text-gray-700 text-base">
            {children}
        </div>
    </div>
);