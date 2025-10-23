'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { motion } from 'framer-motion';
import styles from './MisionVision.module.css';

export default function MisionVision() {
return (
<section id="misionvision" className={styles.section} aria-labelledby="titulo-misionvision">
<div className={styles.header}>
<h2 id="titulo-misionvision" className={styles.title}>Misión y Visión</h2>
<div className={styles.line}></div>
</div>

  <div className={styles.cardsContainer}>
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className={styles.card}>
        <h3 className={styles.subtitle}>Misión</h3>
        <p>
          Promover el bienestar integral de los estudiantes mediante programas
          que fomenten la inclusión, la equidad y el desarrollo humano, asegurando
          un entorno académico accesible, saludable y participativo para toda la comunidad universitaria.
        </p>
      </Card>
    </motion.div>

    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Card className={styles.card}>
        <h3 className={styles.subtitle}>Visión</h3>
        <p>
          Ser una dependencia reconocida por liderar procesos de inclusión y bienestar
          institucional, generando impacto positivo en la formación integral y el desarrollo
          social de los estudiantes, docentes y colaboradores universitarios.
        </p>
      </Card>
    </motion.div>
  </div>
</section>


);
}