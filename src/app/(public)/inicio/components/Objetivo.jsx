'use client';
import React from 'react';
import styles from '../Inicio.module.css';

export default function Objetivo() {
  return (
    <section className={styles.section}>
      <h2>Objetivo</h2>
      <p style={{ maxWidth: '800px', margin: 'auto', fontSize: '1.1rem' }}>
        Desarrollar estrategias institucionales que favorezcan la integración, participación y permanencia
        de los estudiantes con discapacidad dentro de la Universidad Popular del Cesar.
      </p>
    </section>
  );
}
