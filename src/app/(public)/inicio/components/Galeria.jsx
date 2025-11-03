'use client';
import React, { useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { motion } from 'framer-motion';
import styles from './Galeria.module.css';

export default function Galeria() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    { src: '/galeria1.jpg', alt: 'Estudiantes en la sala tiflológica' },
    { src: '/galeria2.jpg', alt: 'Equipo de bienestar institucional' },
    { src: '/galeria3.jpg', alt: 'Uso de impresora Braille' },
    { src: '/galeria4.jpg', alt: 'Software JAWS en acción' },
    { src: '/galeria5.jpg', alt: 'Escáner lector de documentos' },
  ];

  const itemTemplate = (item, index) => (
    <motion.div
      className={styles.imageContainer}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      role="group"
      aria-roledescription="imagen de galería"
      aria-label={`${item.alt} (${index + 1} de ${images.length})`}
    >
      <img
        src={item.src}
        alt={item.alt}
        className={styles.image}
        aria-hidden={index !== activeIndex} // solo la visible será leída
      />
      <div className={styles.caption}>{item.alt}</div>
    </motion.div>
  );

  return (
    <section
      id="galeria"
      className={styles.section}
      aria-labelledby="titulo-galeria"
      role="region"
    >
      <div className={styles.header}>
        <h2 id="titulo-galeria" className={styles.title}>
          Galería
        </h2>
        <div className={styles.line}></div>
      </div>

      <div className={styles.carouselWrapper}>
        <Carousel
          value={images}
          numVisible={3}
          numScroll={1}
          itemTemplate={itemTemplate}
          circular
          autoplayInterval={null}
          showIndicators={false}
          className={styles.carousel}
          aria-label="Carrusel de imágenes institucionales"
          onPageChange={(e) => setActiveIndex(e.page)} // actualiza el índice activo
          prevIcon={
            <span
              className="pi pi-chevron-left"
              aria-label="Imagen anterior"
              role="button"
            ></span>
          }
          nextIcon={
            <span
              className="pi pi-chevron-right"
              aria-label="Imagen siguiente"
              role="button"
            ></span>
          }
        />
      </div>
    </section>
  );
}
