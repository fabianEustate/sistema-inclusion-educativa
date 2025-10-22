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

  return (
    <nav
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
        height: '80px',
      }}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          style={{
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            lineHeight: '1.5',

          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
