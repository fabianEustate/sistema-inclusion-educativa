'use client';
import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../globals.css';
import '@/styles/variables.css';
import AccessibilityMenu from '@/components/accessibility/AccessibilityMenu';

export default function PublicLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ backgroundColor: '#f4f4f9', fontFamily: 'Poppins, sans-serif' }}>
        <header
          style={{
            backgroundColor: '#43b028',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0 }}>Sistema de Inclusión Educativa</h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <a href="/inicio" style={{ color: 'white', textDecoration: 'none' }}>Inicio</a>
            <a href="/eventos" style={{ color: 'white', textDecoration: 'none' }}>Eventos</a>
            <a href="/noticias" style={{ color: 'white', textDecoration: 'none' }}>Noticias</a>
            <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Ingresar</a>
          </nav>
        </header>

        <main style={{ minHeight: 'calc(100vh - 60px)', padding: '2rem' }}>
          {children}
        </main>

        <footer
          style={{
            backgroundColor: '#6fb71f',
            color: 'white',
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          Universidad Popular del Cesar — Sistema de Inclusión Educativa © 2025
        </footer>
        <AccessibilityMenu />
      </body>
    </html>
  );
}
