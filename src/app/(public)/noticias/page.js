'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Noticias.module.css';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function NoticiasPage() {
  const router = useRouter();

  const noticias = [
    {
      id: 1,
      titulo: 'Bienestar Institucional inaugura nueva sala tiflológica',
      fecha: 'Publicado el 20 de octubre de 2025',
      categoria: 'Inclusión',
      imagen: '/galeria1.jpg',
    },
    {
      id: 2,
      titulo:
        'Estudiantes participaron en jornada de sensibilización sobre discapacidad visual',
      fecha: 'Publicado el 18 de octubre de 2025',
      categoria: 'Eventos',
      imagen: '/galeria2.jpg',
    },
    {
      id: 3,
      titulo: 'Nueva tecnología para impresión Braille llega a la universidad',
      fecha: 'Publicado el 15 de octubre de 2025',
      categoria: 'Innovación',
      imagen: '/galeria3.jpg',
    },
  ];

  const irADetalle = (id) => {
    router.push(`/noticias/${id}`); 
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>NOTICIAS UNICESAR</h1>
      <Divider />
      <div className={styles.grid}>
        {noticias.map((noticia) => (
          <Card
            key={noticia.id}
            className={styles.card}
            onClick={() => irADetalle(noticia.id)}
            role="button"
            aria-label={`Leer noticia: ${noticia.titulo}`} 
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && irADetalle(noticia.id)}
          >
            <img
              src={noticia.imagen}
              alt={`Imagen ilustrativa de la noticia ${noticia.titulo}`} 
              className={styles.image}
            />
            <div className={styles.info}>
              <span className={styles.categoria}>{noticia.categoria}</span>
              <h3>{noticia.titulo}</h3>
              <p className={styles.fecha}>{noticia.fecha}</p>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
