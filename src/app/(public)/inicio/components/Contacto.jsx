'use client';
import React from 'react';
import styles from '../Inicio.module.css';

export default function Contacto() {
  const info = [
    { icon: 'pi pi-phone', title: 'Teléfono', desc: '+57 605 588 5592\nExtensión: 1114' },
    { icon: 'pi pi-user', title: 'Director de Departamento', desc: 'Álvaro Agustín Oñate Bowen' },
    { icon: 'pi pi-envelope', title: 'Correo', desc: 'inclusion@unicesar.edu.co' },
    { icon: 'pi pi-map-marker', title: 'Ubicación', desc: 'Sede Sabanas - Bloque Administrativo Piso 2, Oficina 203' },
  ];

  return (
    <section className={styles.section}>
      <h2>Información de Contacto</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
        {info.map((item, idx) => (
          <div key={idx} className={styles.card} style={{ flex: '1 1 250px' }}>
            <i className={item.icon} style={{ fontSize: '2.5rem', color: '#43b028', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{item.title}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
