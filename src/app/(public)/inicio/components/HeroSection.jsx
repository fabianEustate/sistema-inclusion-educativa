'use client';
import React from 'react';

export default function HeroSection() {
  return (
    <section
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '2rem 3rem',
          borderRadius: '10px',
        }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '700' }}>INCLUSIÓN EDUCATIVA</h1>
        <p>Facilitando el acceso, la igualdad y la participación en la educación superior.</p>
      </div>
    </section>
  );
}
