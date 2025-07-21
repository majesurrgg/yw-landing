
import React from 'react';
import { Link } from 'react-router-dom';

// Recibimos la prop 'itemType' para saber cómo comportarnos
export default function AreaSection({ title, color, bg, areas, loading, emptyMsg, itemType, onAreaClick }) {

  // Un componente interno para no repetir el diseño de la tarjeta.
  const Card = ({ area }) => (
    <div
      className="rounded shadow-md p-4 min-h-[100px] border-t-3 transition-all duration-300 ease-in-out h-full"
      style={{ backgroundColor: bg, borderColor: color }}
    >
      {/** añadir imagen del área */}
      {area.imageUrl && (
        <img
          src={area.imageUrl}
          alt={area.name}
          className="w-60 h-30 object-cover mx-auto mb-2 rounded-4xl"
        >
        </img>
      )}
      <h4 className="font-bold text-base mb-1.5" style={{ color: color }}>
        {area.name}
      </h4>
      <p className="text-sm text-gray-700">{area.description}</p>
    </div>
  );

  return (
    <section>
      <div className="font-bold text-base mb-2 rounded-t px-4 py-2" style={{ color: color, backgroundColor: bg, borderTop: `5px solid ${color}` }}>
        {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-gray-600 col-span-full">Cargando áreas...</p>
        ) : areas.length === 0 ? (
          <p className="text-gray-600 col-span-full">{emptyMsg}</p>
        ) : (
          areas.map((area) => {
            // Lógica condicional para el renderizado
            if (itemType === 'staff') {
              // Si es 'staff', usamos un div con onClick para abrir el modal
              return (
                <div
                  key={area.id}
                  className="cursor-pointer hover:shadow-xl hover:-translate-y-1 h-full"
                  onClick={() => onAreaClick(area.id)}
                >
                  <Card area={area} /> {/* Aquí pasamos la prop 'area' a Card */}
                </div>
              );
            } else {
              // Si es 'asesoria' (o cualquier otra cosa), usamos un Link directo
              return (
                <Link
                  key={area.id}
                  to={`/volunteerDetailPage/${area.id}`} // Link directo
                  className="hover:shadow-xl hover:-translate-y-1 block h-full"
                >
                  <Card area={area} /> {/* Aquí también pasamos la prop 'area' a Card */}
                </Link>
              );
            }
          })
        )}
      </div>
    </section>
  );
}