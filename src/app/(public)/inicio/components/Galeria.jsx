'use client';
import React from 'react';
import { Carousel } from 'primereact/carousel';
import { motion } from 'framer-motion';
import styles from './Galeria.module.css';

export default function Galeria() {
const images = [
{ src: '/galeria1.jpg', alt: 'Estudiantes en la sala tiflológica' },
{ src: '/galeria2.jpg', alt: 'Equipo de bienestar institucional' },
{ src: '/galeria3.jpg', alt: 'Uso de impresora Braille' },
{ src: '/galeria4.jpg', alt: 'Software JAWS en acción' },
{ src: '/galeria5.jpg', alt: 'Escáner lector de documentos' },
];

const itemTemplate = (item) => (
<motion.div
className={styles.imageContainer}
whileHover={{ scale: 1.03 }}
transition={{ duration: 0.3 }}
>
<img src={item.src} alt={item.alt} className={styles.image} />
<div className={styles.caption}>{item.alt}</div>
</motion.div>
);

return (
<section id="galeria" className={styles.section} aria-labelledby="titulo-galeria">
<div className={styles.header}>
<h2 id="titulo-galeria" className={styles.title}>Galería</h2>
<div className={styles.line}></div>
</div>

  <div className={styles.carouselWrapper}>
    <Carousel
      value={images}
      numVisible={3}
      numScroll={1}
      itemTemplate={itemTemplate}
      circular
      autoplayInterval={5000}
      showIndicators={false}
      className={styles.carousel}
      aria-label="Carrusel de imágenes institucionales"
    />
  </div>
</section>


);
}