import { getAreaById, listAreasAsesories, listAreasStaff } from "../services/areaService";
import AreaSection from "../components/AreaSection";
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import FilterButtons from '../components/FilterButtons';

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

export default function VolunteerPageInfo() {
  const [areaStaff, setAreaStaff] = useState([]);
  const [areaAsesory, setAreaAsesory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  // estados para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null); // para guardar los datos del area clickeada (incl. sub-areas)
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const mainContentRef = useRef(null);



  useEffect(() => {
    const getData = async () => {
      try {
        const dataStaff = await listAreasStaff();
        const dataAsesories = await listAreasAsesories();

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

  const handleScrollToContent = () => {
    mainContentRef.current?.scrollIntoView({ begavior: 'smooth' });
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

  const styles = {
    staff: { color: "#d32f2f", background: "white" },
    asesory: { color: "#444", background: "#f4f7fb" },
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <HeroSection onScrollButtonClick={handleScrollToContent} />

      <main ref={mainContentRef} className="max-w-5xl mx-auto p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            ¡Haz Voluntariado en Yachay Wasi!
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            En Yachay Wasi, trabajamos para llevar educación de calidad a niños y adolescentes de comunidades vulnerables. Buscamos voluntarios apasionados que deseen poner su conocimiento al servicio de nuestra misión.
          </p>
        </div>

        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

        <div className="flex flex-col gap-8">
          {(filter === "all" || filter === "staff") && (
            <AreaSection
              title="Staff"
              color={styles.staff.color}
              bg={styles.staff.background}
              areas={areaStaff}
              loading={loading}
              emptyMsg="No hay áreas de staff activas."
              itemType="staff"
              onAreaClick={handleAreaClick}
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
              itemType="asesories"
            />
          )}
        </div>
      </main>

      {isModalOpen && (
        <SubAreaModal
          area={selectedArea}
          isLoading={isLoadingModal}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
