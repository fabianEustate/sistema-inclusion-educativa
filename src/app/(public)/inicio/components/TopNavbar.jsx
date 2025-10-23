'use client';
import React from 'react';
import styles from '../Inicio.module.css';
import Link from 'next/link';

export default function TopNavbar() {
  return (
    <header
      style={{
        backgroundColor: '#f4f4f9',
        padding: '0.7rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <img src="/logo.png" alt="Logo Universidad Popular del Cesar" width={45} height={45} />
        <span style={{ fontWeight: '600', color: '#43b028' }}>Universidad Popular del Cesar</span>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/">Inicio</Link>
        <Link href="/public/eventos">Eventos</Link>
        <Link href="/public/noticias">Noticias</Link>
        <Link href="/login">Entrar</Link>
      </nav>
    </header>
  );
}
