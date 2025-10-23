'use client';
import React from 'react';
import styles from './Contacto.module.css';

export default function Contacto() {
const info = [
{ icon: 'pi pi-phone', title: 'Teléfono', desc: '+57 605 588 5592\nExtensión: 1114' },
{ icon: 'pi pi-user', title: 'Director de Departamento', desc: 'Álvaro Agustín Oñate Bowen' },
{ icon: 'pi pi-envelope', title: 'Correo', desc: 'inclusion@unicesar.edu.co' },
{ icon: 'pi pi-map-marker', title: 'Ubicación', desc: 'Sede Sabanas - Bloque Administrativo Piso 2, Oficina 203' },
];

return (
<section id="contacto" className={styles.section} aria-labelledby="titulo-contacto">
<div className={styles.header}>
<h2 id="titulo-contacto" className={styles.title}>Información de Contacto</h2>
<div className={styles.line}></div>
</div>

  <div className={styles.cardsContainer}>
    {info.map((item, idx) => (
      <div key={idx} className={styles.card}>
        <i className={`${item.icon} ${styles.icon}`} aria-hidden="true"></i>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    ))}
  </div>
</section>


);
}