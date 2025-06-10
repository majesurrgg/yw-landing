import React, { useEffect, useState } from "react";
import { listAreas } from "../services/areaService";
import AreaSection from "../components/AreaSection";

export default function VolunteerPageInfo() {
  const [areaStaff, setAreaStaff] = useState([]);
  const [areaAsesory, setAreaAsesory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await listAreas();
        setAreaStaff(data.areaStaff.filter((item) => item.isActive));
        setAreaAsesory(data.areaAsesory.filter((item) => item.isActive));
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

  return (
    <div style={{ background: "#f7fafd", minHeight: "100vh" }}>
      <div style={{width: "100%",height: 350,background: "#b3c6e0",position: "relative",display: "flex",alignItems: "center",overflow: "hidden",}}>
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
        <div style={{position: "absolute",bottom: 0,left: "50%",transform: "translateX(-50%)",width: "60rem",maxWidth: "90%",background: "rgba(255, 255, 255, 0.52)",padding: "10px 28px",borderRadius: 8,boxShadow: "0 2px 6px rgba(0,0,0,0.1)",textAlign: "center"}}>
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
            <AreaSection
              title="Staff"
              color={styles.staff.color}
              bg={styles.staff.background}
              areas={areaStaff}
              loading={loading}
              emptyMsg="No hay áreas de staff activas."
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
    </div>
  );
}
