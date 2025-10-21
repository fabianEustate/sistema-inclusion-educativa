'use client';
import React from 'react';
import { Card } from 'primereact/card';

export default function InicioPage() {
  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ color: '#43b028' }}>Bienvenido al Sistema de Inclusión Educativa</h2>
      <p>
        Este sistema tiene como propósito fortalecer los procesos de inclusión en la Universidad
        Popular del Cesar, promoviendo una educación equitativa y accesible para todos.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <Card title="Misión" subTitle="Nuestra razón de ser">
          <p>
            Fomentar la inclusión de estudiantes con discapacidad a través de estrategias tecnológicas y pedagógicas.
          </p>
        </Card>
        <Card title="Visión" subTitle="Hacia el futuro">
          <p>
            Ser un referente institucional en innovación educativa y accesibilidad en el 2030.
          </p>
        </Card>
      </div>
    </section>
  );
}
