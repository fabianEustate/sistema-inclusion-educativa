'use client';
import React from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import styles from './Layout.module.css';

export default function Topbar({ onToggleSidebar }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '0.8rem 1.5rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* ====== Botón para colapsar/expandir el sidebar ====== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button
          icon="pi pi-bars"
          className="p-button-rounded p-button-text p-button-plain"
          style={{
            color: '#43b028',
            fontSize: '1.2rem',
          }}
          onClick={onToggleSidebar}
          tooltip="Mostrar / ocultar menú"
          tooltipOptions={{ position: 'bottom' }}
        />
        <h3 style={{ margin: 0, color: '#43b028' }}>Sistema de Inclusión Educativa</h3>
      </div>

      {/* ====== Información de usuario ====== */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar icon="pi pi-user" shape="circle" />
        <span style={{ marginLeft: '0.5rem', color: '#333' }}>Usuario</span>
      </div>
    </header>
  );
}
