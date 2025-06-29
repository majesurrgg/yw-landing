import React from "react";

export default function AreaSection({ title, color, bg, areas, loading, emptyMsg, onAreaClick }) {
  return (
    <section>
      {/* titulo de la seccion */}
      <div className="font-bold text-base mb-2 rounded-t-lg px-4 py-2"
        style={{ color: color, backgroundColor: bg, borderTop: `5px solid ${color}` }}>
        {title}
      </div>

      {/** contenedor de las tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-gray-600 col-span-full">Cargando áreas...</p>
        ) : areas.length === 0 ? (
          <p className="text-gray-600 col-span-full">{emptyMsg}</p>
        ) : (
          // map que renderiza las áreas
          areas.map((area) => (
            <div key={area.id}
              className="rounded-lg shadow-md p-4 min-h-[100px] border-t-4 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-x1 hover:-translate-y-1"
              style={{ backgroundColor: bg, borderColor: color }}
              onClick={() => onAreaClick(area.id)} // <--añadimos el onclick aqui
            >
              <h4
                className="font-bold text-base mb-1.5"
                style={{ color: color }}
              >
                {area.name}
              </h4>

              <p className="text-sm text-gray-700">{area.description}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
