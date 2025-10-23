'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Eventos.module.css';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function EventosPage() {
  const router = useRouter();

  const eventos = [
    {
      id: 1,
      titulo: 'SEMINARIO SOBRE LOS INDICADORES CLAVES DE GERENCIA FINANCIERA',
      fecha: '27 de octubre de 2025 | 7:00 p.m. - 9:00 p.m.',
      imagen: '/galeria1.jpg',
      modalidad: 'Virtual',
    },
    {
      id: 2,
      titulo: 'TALLER CONTRALORÍA A LA UNIVERSIDAD',
      fecha: '24 de octubre de 2025 | 8:00 a.m. - 12:00 p.m.',
      imagen: '/galeria2.jpg',
      modalidad: 'Presencial',
    },
    {
      id: 3,
      titulo: 'FRIJOL TOLERANTE A LA SEQUÍA: UN PANORAMA PATOGÉNICO EN EL CARIBE COLOMBIANO',
      fecha: '29 de octubre de 2025 | 6:00 p.m. - 8:00 p.m.',
      imagen: '/galeria3.jpg',
      modalidad: 'Virtual',
    },
   
  ];

  const irADetalle = (id) => {
    router.push(`/eventos/${id}`); 
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>EVENTOS UNICESAR</h1>
      <Divider />
      <div className={styles.grid}>
        {eventos.map((evento) => (
          <Card
            key={evento.id}
            className={styles.card}
            onClick={() => irADetalle(evento.id)}
            role="button"
            aria-label={`Ver detalles del evento ${evento.titulo}`} 
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && irADetalle(evento.id)}
          >
            <img
              src={evento.imagen}
              alt={`Imagen ilustrativa del evento ${evento.titulo}`} 
              className={styles.image}
            />
            <div className={styles.info}>
              <h3>{evento.titulo}</h3>
              <p className={styles.fecha}>{evento.fecha}</p>
              <span className={styles.modalidad}>{evento.modalidad}</span>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
