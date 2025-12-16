'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

export default function AnalyticsPage() {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Estudiantes registrados',
        data: [30, 45, 60, 50, 70],
        backgroundColor: '#43b028',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#333',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#333' },
        grid: { color: '#ddd' },
      },
      y: {
        ticks: { color: '#333' },
        grid: { color: '#ddd' },
      },
    },
  };

  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ color: '#43b028' }}>Panel de Análisis</h2>
      <p>Visualiza las métricas de participación e inclusión en el sistema.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        <Card title="Estudiantes Registrados" subTitle="Primer semestre 2025">
          <div style={{ height: '250px' }}>
            <Chart type="bar" data={data} options={options} />
          </div>
        </Card>

        <Card title="Participación por Programa" subTitle="Distribución general">
          <p>Próximamente se mostrarán gráficas de distribución por carrera.</p>
        </Card>
      </div>
    </section>
  );
}
