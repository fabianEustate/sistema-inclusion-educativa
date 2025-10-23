'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { motion } from 'framer-motion';
import styles from './Herramientas.module.css';

export default function Herramientas() {
const tools = [
{
icon: 'pi pi-print',
title: 'Impresora Braille',
description:
'Permite convertir textos digitales en impresiones en relieve para facilitar la lectura a personas con discapacidad visual.',
},
{
icon: 'pi pi-volume-up',
title: 'Escáner lector',
description:
'Transforma documentos impresos en archivos de audio mediante tecnología OCR, brindando acceso a la información escrita.',
},
{
icon: 'pi pi-desktop',
title: 'Software JAWS',
description:
'Lectura de pantalla avanzada que convierte el contenido visual en voz, permitiendo la navegación autónoma del sistema operativo.',
},
{
icon: 'pi pi-eye',
title: 'Software Magic',
description:
'Amplía y realza los elementos visuales en pantalla, facilitando el uso del computador a personas con baja visión.',
},
];

return (
<section id="herramientas" className={styles.section} aria-labelledby="titulo-herramientas">
<div className={styles.header}>
<h2 id="titulo-herramientas" className={styles.title}>Herramientas Inclusivas</h2>
<div className={styles.line}></div>
</div>

  <div className={styles.cardsContainer}>
    {tools.map((tool, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={styles.cardWrapper}
      >
        <Card className={styles.card}>
          <div className={styles.iconWrapper}>
            <i className={`${tool.icon} ${styles.icon}`}></i>
          </div>
          <h3>{tool.title}</h3>
          <p>{tool.description}</p>
        </Card>
      </motion.div>
    ))}
  </div>
</section>


);
}