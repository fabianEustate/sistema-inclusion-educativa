'use client';
import React from 'react';
import styles from '../Inicio.module.css';

export default function Presentacion() {
  return (
    <section className={styles.section}>
      <h2>Presentación</h2>
      <p style={{ maxWidth: '900px', margin: 'auto', fontSize: '1.1rem' }}>
        La Oficina de Bienestar Institucional, a través del área de Inclusión Educativa,
        busca garantizar que todos los estudiantes tengan acceso equitativo a los recursos
        académicos, promoviendo la diversidad y la igualdad de oportunidades.
      </p>
    </section>
  );
}
