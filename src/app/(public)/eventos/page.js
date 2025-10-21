'use client';
import React from 'react';
import { Card } from 'primereact/card';

export default function EventosPage() {
  const eventos = [
    { titulo: 'Semana de la Inclusión', fecha: 'Marzo 2025', descripcion: 'Actividades culturales y académicas para promover la inclusión.' },
    { titulo: 'Capacitación Docente', fecha: 'Abril 2025', descripcion: 'Taller sobre herramientas digitales accesibles.' },
    { titulo: 'Foro de Accesibilidad', fecha: 'Junio 2025', descripcion: 'Espacio para discutir políticas de inclusión educativa.' },
  ];

  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ color: '#43b028' }}>Próximos Eventos</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {eventos.map((evento, i) => (
          <Card key={i} title={evento.titulo} subTitle={evento.fecha}>
            <p>{evento.descripcion}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
