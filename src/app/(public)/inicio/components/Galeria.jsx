'use client';
import React from 'react';
import styles from '../Inicio.module.css';

export default function Galeria() {
  const imgs = [
    '/gallery1.jpg',
    '/gallery2.jpg',
    '/gallery3.jpg',
  ];

  return (
    <section className={styles.section}>
      <h2>Galería</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1rem' }}>
        {imgs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Galería ${idx}`}
            className={styles.imagenGaleria} // Aplica la clase CSS
          />
        ))}
      </div>
    </section>
  );
}
