'use client';
import React from 'react';

export default function GreenMenu() {
  const items = [
    { label: 'Presentación', href: '#presentacion' },
    { label: 'Misión y Visión', href: '#mision' },
    { label: 'Objetivo', href: '#objetivo' },
    { label: 'Herramientas', href: '#herramientas' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });

      // 🔹 Mueve el foco visual y de lector al título de la sección
      const focusable = target.querySelector('h2, h3, [tabindex]');
      if (focusable) {
        focusable.setAttribute('tabindex', '-1');
        focusable.focus({ preventScroll: true });
      }
    }
  };

  return (
    <nav
      aria-label="Navegación por secciones de la página"
      style={{
        backgroundColor: '#43b028',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        padding: '0.8rem',
        position: 'sticky',
        top: '65px',
        zIndex: 999,
        height: '60px',
      }}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          style={{
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            lineHeight: '1.5',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.textDecoration = 'underline')}
          onBlur={(e) => (e.target.style.textDecoration = 'none')}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
