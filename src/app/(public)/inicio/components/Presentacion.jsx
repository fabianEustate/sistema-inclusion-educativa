'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Presentacion.module.css';

export default function Presentacion() {
return (
<section id="presentacion" className={styles.section} aria-labelledby="titulo-presentacion" >
{/* ======= TÍTULO ======= */}
<div className={styles.header}>
<h2 id="titulo-presentacion" className={styles.title}>
Presentación
</h2>
<div className={styles.line}></div>
</div>

  {/* ======= CONTENIDO ======= */}
  <div className={styles.content}>
    {/* Imagen con animación */}
    <motion.div
      className={styles.imageContainer}
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <img
        src="/bienestar.jpg"
        alt="Fotografía ilustrativa del área de Bienestar Institucional"
        className={styles.image}
      />
    </motion.div>

    {/* Card con animación */}
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      viewport={{ once: true }}
    >
      <p>
        La Oficina de Bienestar Institucional promueve el desarrollo integral de
        los estudiantes mediante programas que fortalecen la inclusión, la
        participación y la accesibilidad. Su objetivo es garantizar la igualdad
        de oportunidades y el bienestar de toda la comunidad universitaria,
        impulsando un entorno académico inclusivo, equitativo y participativo.
      </p>
    </motion.div>
  </div>
</section>


);
}