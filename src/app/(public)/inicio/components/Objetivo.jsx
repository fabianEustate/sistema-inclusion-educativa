'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Objetivo.module.css';

export default function Objetivo() {
return (
<section id="objetivo" className={styles.section} aria-labelledby="titulo-objetivo">
<div className={styles.header}>
<h2 id="titulo-objetivo" className={styles.title}>Objetivo</h2>
<div className={styles.line}></div>
</div>

  <div className={styles.content}>
    <motion.div
      className={styles.textContainer}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p>
        Fortalecer el bienestar universitario a través de estrategias inclusivas, 
        programas psicosociales y espacios de participación que promuevan 
        la accesibilidad, el respeto por la diversidad y el desarrollo humano 
        dentro de la comunidad académica.
      </p>
    </motion.div>

    <motion.div
      className={styles.iconsContainer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <div className={styles.iconItem}>
        <i className="pi pi-users"></i>
        <span>Inclusión</span>
      </div>
      <div className={styles.iconItem}>
        <i className="pi pi-heart"></i>
        <span>Bienestar</span>
      </div>
      <div className={styles.iconItem}>
        <i className="pi pi-globe"></i>
        <span>Diversidad</span>
      </div>
      <div className={styles.iconItem}>
        <i className="pi pi-graduation-cap"></i>
        <span>Desarrollo</span>
      </div>
    </motion.div>
  </div>
</section>


);
}