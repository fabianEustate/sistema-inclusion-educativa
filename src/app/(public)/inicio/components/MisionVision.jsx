'use client';
import React from 'react';
import styles from '../Inicio.module.css';

export default function MisionVision() {
  return (
    <section className={styles.section}>
      <h2>Misión y Visión</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <div className={styles.card} style={{ flex: '1 1 300px' }}>
          <h3>Misión</h3>
          <p>
            Garantizar la inclusión educativa y social de los estudiantes mediante programas
            y servicios que fomenten la equidad y la accesibilidad en la comunidad universitaria.
          </p>
        </div>
        <div className={styles.card} style={{ flex: '1 1 300px' }}>
          <h3>Visión</h3>
          <p>
            Ser un modelo institucional de inclusión en el ámbito educativo nacional, promoviendo
            la participación activa y autónoma de todos los estudiantes.
          </p>
        </div>
      </div>
    </section>
  );
}
