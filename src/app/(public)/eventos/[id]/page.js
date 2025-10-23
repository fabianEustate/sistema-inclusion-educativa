'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import styles from '../Eventos.module.css';

export default function DetalleEvento() {
  const { id } = useParams();

  return (
    <main className={styles.container}>
      <h1>Detalle del Evento #{id}</h1>
      <p>Próximamente se mostrará la información completa del evento seleccionado.</p>
    </main>
  );
}
