'use client';
import React from 'react';
import { Card } from 'primereact/card';
import styles from '../Inicio.module.css';

export default function Herramientas() {
  const tools = [
    { icon: 'pi pi-eye-slash', name: 'Línea Braille', desc: 'Traduce el texto digital a Braille en tiempo real.' },
    { icon: 'pi pi-print', name: 'Impresora Braille', desc: 'Convierte documentos de texto en formato Braille.' },
    { icon: 'pi pi-volume-up', name: 'Software lector', desc: 'Facilita la lectura de pantalla para personas con discapacidad visual.' },
  ];

  return (
    <section className={styles.section}>
      <h2>Herramientas Tiflológicas</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {tools.map((t, i) => (
          <Card key={i} className={styles.card}>
            <i className={t.icon} style={{ fontSize: '2rem', color: '#43b028' }}></i>
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
