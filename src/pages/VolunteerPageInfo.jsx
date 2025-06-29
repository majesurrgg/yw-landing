import { getAreaById, listAreasAsesories, listAreasStaff } from "../services/areaService";
import AreaSection from "../components/AreaSection";
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function VolunteerPageInfo() {
  const [areaStaff, setAreaStaff] = useState([]);
  const [areaAsesory, setAreaAsesory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  // estados para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null); // para guardar los datos del area clickeada (incl. sub-areas)
  const [isLoadingModal, setIsLoadingModal] = useState(false);



  useEffect(() => {
    const getData = async () => {
      try {
        const dataStaff = await listAreasStaff();
        const dataAsesories = await listAreasAsesories();
        console.log('Staff: ', dataStaff);
        console.log('Asesories: ', dataAsesories);

        // endpoint devuelve { staffAreas: [...]}
        setAreaStaff(dataStaff.staffAreas.filter((item) => item.isActive));
        // endpoint devuelve el array directamente, no un objeto que lo contiene
        setAreaAsesory(dataAsesories.filter((item) => item.isActive));


      } catch (error) {
        console.error("Error al cargar áreas:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const styles = {
    staff: { color: "#d32f2f", background: "white" },
    asesory: { color: "#444", background: "#f4f7fb" },
  };

  // abre modal
  const handleAreaClick = async (areaId) => {
    setIsModalOpen(true);
    setIsLoadingModal(true);
    try {
      //usaremos el endpoint que ya teniamos: getAreaById
      const data = await getAreaById(areaId); // esta funcion llama a GET /api/areas/:id
      setSelectedArea(data);
    } catch (error) {
      console.error("Error al obtener detalles del área", error);
      // cerrar el modal si hay un error
      setIsModalOpen(false);
    } finally {
      setIsLoadingModal(false);
    }
  };


  // componente modal
  const SubAreaModal = ({ area, onClose, isLoading }) => {
    if (!area) return null; // no mostrar nada si no hay área seleccionada

    return (
      // Fondo oscuro semi-transparente que cubre toda la pantalla
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">

        {/* Contenedor del modal */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          {/* Cabecera del Modal */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Puestos en {area.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times; {/* Esto es una 'X' elegante */}
            </button>
          </div>

          {/* Cuerpo del Modal */}
          <div className="p-6 overflow-y-auto">
            {isLoading ? (
              <p className="text-center text-gray-600">Cargando puestos...</p>
            ) : (
              <ul className="space-y-3">
                {area.subAreas && area.subAreas.length > 0 ? (
                  area.subAreas.map(sub => (
                    <li key={sub.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <span className="text-gray-700 font-medium">{sub.name}</span>
                      <Link
                        to={`/volunteerDetailPage/${sub.id}`}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="Ver detalles"
                      >

                        {/* Usaremos un SVG para el icono del ojo para que se vea bien siempre */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No hay puestos específicos para esta área por el momento.</p>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };
  /** Fin de Modal */

  return (
    <div style={{ background: "#f7fafd", minHeight: "100vh" }}>
      <div style={{ width: "100%", height: 350, background: "#b3c6e0", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", }}>
        <img
          src="/assets/volunteer.png"
          alt="Voluntariado"
          style={{
            objectFit: "cover",
            objectPosition: "center 37%",
            width: "100%",
            height: "100%",
          }}
        />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60rem", maxWidth: "90%", background: "rgba(255, 255, 255, 0.52)", padding: "10px 28px", borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#234", margin: 0 }}>
            Voluntariado
          </h1>
        </div>
      </div>


      <main style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "#f4f7fb",
        marginTop: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px #0001",
        padding: 20
      }}>
        <h2 style={{ fontSize: 19, fontWeight: 700, color: "#1976d2", marginBottom: 8 }}>
          ¡Haz Voluntariado en Yachay Wasi!
        </h2>

        <p style={{ color: "#345", marginBottom: 16 }}>
          En Yachay Wasi, trabajamos para llevar educación de calidad a niños y adolescentes de comunidades vulnerables.<br />
          Buscamos voluntarios apasionados que deseen poner su conocimiento al servicio de nuestra misión.
        </p>

        <div style={{ marginBottom: 20 }}>
          <label htmlFor="filter" style={{ marginRight: 10, fontWeight: 600 }}>Filtrar por tipo:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #b3c6e0",
              fontWeight: 600,
              background: "#eaf1fb"
            }}
          >
            <option value="all">Todos</option>
            <option value="staff">Staff</option>
            <option value="asesory">Asesores</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {(filter === "all" || filter === "staff") && (
            // conectamos onClick a las tarjetas de AreaSection
            <AreaSection
              title="Staff"
              color={styles.staff.color}
              bg={styles.staff.background}
              areas={areaStaff}
              loading={loading}
              emptyMsg="No hay áreas de staff activas."
              onAreaClick={handleAreaClick} // <-- pasamos la función como prop
            />
          )}
          {(filter === "all" || filter === "asesory") && (
            <AreaSection
              title="Asesores"
              color={styles.asesory.color}
              bg={styles.asesory.background}
              areas={areaAsesory}
              loading={loading}
              emptyMsg="No hay áreas de asesores activas."
            />
          )}
        </div>
      </main>

      {isModalOpen && (
        <SubAreaModal
          area={selectedArea}
          isLoading={isLoadingModal}
          onClose={() => setIsModalOpen(false)} />
      )}

    </div>
  );
}
