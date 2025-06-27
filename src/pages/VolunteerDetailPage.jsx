// función del componente: 
// 1. leer el ID del área de la URL usando el hook useParams
// 2. usar useEffect para hacer petición a nuestro nuevo endpoint GET
// /api/areas/:areaId
// 3. guardar el área recibida en un estado
// 4. renderizar:
// si area.subAreas tiene elementos, mostrar lista de de subáreas
// si area.subAreas esta vacio, muestra detalles del área misma

import React, { useEffet, useState } from 'react';
import { useParams } from 'react-router-dom';
// importamos de apiService.js
import { getAreaById } from '../services/areaService';

export default function VolunteerDetailPage() {
    const { areaId } = useParams(); // 1. Obtenemos el ID de la URL
    const [area, setArea] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArea = async () => {
            try {
                // 2. llamamos a la API
                const data = await getAreaById(areaId);
                setArea(data);
            } catch (error) {
                console.error("Error al cargar los detalles del área: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArea();
    }, [areaId]); // se ejecuta cada vez que el areaId cambie

    if (loading) {
        return <div>Cargando..</div>;
    }
    if (!area) {
        return <div>Área no encontrada.</div>;
    }

    // 4. Lógica de renderizado condicional
    const hasSubAreas = area.subAreas && area.subAreas.lenght > 0;

    return (
        <div>
            <h1>{area.name}</h1>

            {hasSubAreas ? (
                <div>
                    <h2>Elige un puesto de voluntariado:</h2>
                    <ul>
                        {area.subAreas.map(subArea => (
                            <li key={subArea.id}>
                                {/* Aqui cada subárea podría ser un link*/}
                                {subArea.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    {/* aqui va toda la maquetacion de la imagen 2*/}
                    {/* usando datos del objeto area*/}
                    <p><strong>Tiempo de voluntariado:</strong>{area.volunteerTime}</p>
                    <h3>Funciones:</h3>
                    <p>{area.functions}</p>
                    <h3>Conocimientos y Estudios</h3>
                    <p>{area.knowledgesAndStudies}</p>
                    <h3>Conocimientos Adicionales</h3>
                    <p>{area.knowledgeAditionals}</p>

                </div>
            )}
        </div>
    );
}
