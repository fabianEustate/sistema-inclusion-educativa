'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import styles from '@/styles/Dashboard.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Panel Principal</h2>
      <p>Selecciona una opción del menú para comenzar.</p>
      <Divider />

      <div className={styles.cards}>
        <Card title="Estudiantes registrados" subTitle="Semestre 2025-1">
          <p>132 estudiantes activos.</p>
        </Card>

        <Card title="Docentes capacitados" subTitle="2025">
          <p>27 docentes completaron formación inclusiva.</p>
        </Card>

        <Card title="Eventos próximos" subTitle="Esta semana">
          <p>3 actividades de inclusión programadas.</p>
        </Card>
      </div>
    </div>
  );
}
