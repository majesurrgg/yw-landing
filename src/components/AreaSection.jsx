import React from "react";

export default function AreaSection({ title, color, bg, areas, loading, emptyMsg }) {
  return (
    <section>
      <div style={{
        fontWeight: 700,
        fontSize: 16,
        color,
        marginBottom: 10,
        borderTop: `5px solid ${color}`,
        borderRadius: "8px 8px 0 0",
        background: bg,
        padding: "8px 16px"
      }}>
        {title}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16
      }}>
        {loading ? (
          <p>Cargando áreas...</p>
        ) : areas.length === 0 ? (
          <p>{emptyMsg}</p>
        ) : (
          areas.map((area) => (
            <div key={area.id} style={{
              background: bg,
              borderRadius: 8,
              boxShadow: "0 1px 4px #0001",
              padding: 16,
              minHeight: 100,
              borderTop: `5px solid ${color}`
            }}>
              <h4 style={{ color, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{area.name}</h4>
              <p style={{ color: "#345", fontSize: 14 }}>{area.description}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
