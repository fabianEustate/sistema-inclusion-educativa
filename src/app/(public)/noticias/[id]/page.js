'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import styles from '../Noticias.module.css';

export default function DetalleNoticia() {
  const { id } = useParams();

  return (
    <main className={styles.container}>
      <h1>Detalle de la Noticia #{id}</h1>
      <p>Próximamente se mostrará el contenido completo de la noticia seleccionada.</p>
    </main>
  );
}
