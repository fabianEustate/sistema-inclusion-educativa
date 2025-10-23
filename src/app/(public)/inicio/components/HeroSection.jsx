'use client';
import React from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
return (
<section className={styles.hero} role="banner" aria-label="Bienestar Institucional - Inclusión Educativa" >
{/* Capa oscura superpuesta */}
<div className={styles.overlay} aria-hidden="true"></div>

  {/* Contenido centrado */}
  <div className={styles.content}>
    <h1 className={styles.title}>BIENESTAR INSTITUCIONAL</h1>
    <h2 className={styles.subtitle}>INCLUSIÓN EDUCATIVA</h2>
  </div>
</section>


);
}