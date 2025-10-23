'use client';
import React, { useEffect } from 'react';
import styles from './Inicio.module.css';
//import TopNavbar from './components/TopNavbar';
import GreenMenu from './components/GreenMenu';
import HeroSection from './components/HeroSection';
import Presentacion from './components/Presentacion';
import MisionVision from './components/MisionVision';
import Objetivo from './components/Objetivo';
import Herramientas from './components/Herramientas';
import Galeria from './components/Galeria';
import Contacto from './components/Contacto';

export default function InicioPage() {
  // Smooth scroll
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <>
      {/*<TopNavbar />*/}
      
      <main className={styles.main}>
        <HeroSection />
        <GreenMenu />
        <section id="presentacion"><Presentacion /></section>
        <section id="mision"><MisionVision /></section>
        <section id="objetivo"><Objetivo /></section>
        <section id="herramientas"><Herramientas /></section>
        <section id="galeria"><Galeria /></section>
        <section id="contacto"><Contacto /></section>
      </main>
    </>
  );
}
