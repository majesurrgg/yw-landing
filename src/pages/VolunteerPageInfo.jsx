import React, { useEffect, useState } from "react";
import { listAreas } from "../services/areaService";

export default function VolunteerPageInfo() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await listAreas(); 
        const activas = data.filter((item) => item.isActive);
        setAreas(activas);
      } catch (error) {
        console.error("Error al cargar áreas:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div style={{ background: "#ededed", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "100%", height: 300, background: "#ccc", position: "relative" }}>
        <img
          src="/assets/volunteer.png"
          alt="Voluntariado"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "rgba(255,255,255,0.9)",
          padding: "12px 32px"
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#222" }}>Voluntariado</h1>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: "0 auto", background: "#fff", marginTop: 24, borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: "32px 24px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#d32f2f", marginBottom: 8 }}>¡Haz Voluntariado en Yachay Wasi!</h2>
        <p style={{ color: "#444", marginBottom: 12 }}>
          En Yachay Wasi, trabajamos para llevar educación de calidad a niños y adolescentes de comunidades vulnerables.<br />
          Buscamos voluntarios apasionados que deseen poner su conocimiento al servicio de nuestra misión.
        </p>
        <ul style={{ color: "#444", marginBottom: 24, paddingLeft: 18 }}>
          <li>¿Te gustaría ser parte del staff o asesor? Tenemos dos tipos de voluntariado para ti:</li>
          <li>Voluntariado Staff</li>
          <li>Voluntariado Asesores (Yaku Asesores)</li>
        </ul>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#222", margin: "32px 0 16px" }}>Áreas de Voluntariado</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 18
        }}>
          {areas.map((area) => (
            <div key={area.id} style={{
              background: "#fafafa",
              borderRadius: 8,
              borderTop: "4px solid #d32f2f",
              boxShadow: "0 1px 4px #0001",
              padding: "18px 16px",
              marginBottom: 8,
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <h4 style={{ fontWeight: 700, color: "#d32f2f", fontSize: 15, marginBottom: 6 }}>{area.name}</h4>
                <p style={{ color: "#444", fontSize: 14 }}>{area.description}</p>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href="#" style={{ color: "#1976d2", fontWeight: 600, fontSize: 13, textDecoration: "underline" }}>Explorar más &gt;&gt;</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}