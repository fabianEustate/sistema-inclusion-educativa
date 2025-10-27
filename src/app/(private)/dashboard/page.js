'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  // === Datos de ejemplo ===
  const barData = {
    labels: ['Motora', 'Visual', 'Cognitiva', 'Auditiva', 'Múltiple', 'Psicosocial', 'Sistémica'],
    datasets: [
      {
        label: 'Total Estudiantes',
        data: [100, 80, 60, 40, 30, 15, 10],
        backgroundColor: '#43b028'
      }
    ]
  };

  const pieData = {
    labels: ['Subsidiado', 'Contributivo', 'Especial'],
    datasets: [
      {
        data: [100, 76, 1],
        backgroundColor: ['#43b028', '#6fb71f', '#a8e063']
      }
    ]
  };

  const horizontalData = {
    labels: ['Ingenierías', 'Ciencias Sociales', 'Administrativas', 'Educación', 'Salud'],
    datasets: [
      {
        label: 'Facultades',
        backgroundColor: ['#43b028', '#6fb71f', '#a8e063', '#4caf50', '#81c784'],
        data: [60, 40, 30, 25, 20]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#333'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#333' },
        grid: { color: '#ddd' }
      },
      y: {
        ticks: { color: '#333' },
        grid: { color: '#ddd' }
      }
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Resumen General de Inclusión Educativa</h2>

      {/* === Indicadores principales === */}
      <div className={styles.stats}>
        {[
          { label: 'Total Estudiantes', value: 177 },
          { label: 'Promedio Académico', value: '3.25' },
          { label: '% Con Discapacidad', value: '17.70%' },
          { label: 'Estudiantes Activos', value: 149 },
          { label: '% Reciben Apoyo', value: '0.62%' }
        ].map((stat, i) => (
          <Card key={i} className={styles.statCard}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* === Gráficos === */}
      <div className={styles.charts}>
        <Card className={styles.chartCard}>
          <h4>Total Estudiantes por Discapacidad</h4>
          <Chart type="bar" data={barData} options={options} />
        </Card>

        <Card className={styles.chartCard}>
          <h4>Total Estudiantes por Tipo de Afiliación</h4>
          <Chart type="pie" data={pieData} />
        </Card>

        <Card className={styles.chartCard}>
          <h4>Total Estudiantes por Facultad</h4>
          <Chart type="bar" data={horizontalData} options={options} />
        </Card>
      </div>
    </div>
  );
}
