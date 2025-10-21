'use client';

import React, { useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';
import styles from './FichaSocioeconomica.module.css';

export default function FichaSocioeconomicaPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    estrato: null,
    direccion: '',
  });

  const estratos = [
    { label: '1 - Bajo bajo', value: 1 },
    { label: '2 - Bajo', value: 2 },
    { label: '3 - Medio bajo', value: 3 },
    { label: '4 - Medio', value: 4 },
    { label: '5 - Medio alto', value: 5 },
    { label: '6 - Alto', value: 6 },
  ];

  const items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'Ficha Socioeconómica' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = () => {
    console.log('Datos guardados:', formData);
    // TODO: lógica para guardar los datos (por ejemplo, vía servicio Firebase o API)
  };

  const handleCancel = () => {
    setFormData({ nombre: '', documento: '', estrato: null, direccion: '' });
  };

  return (
    <div className={styles.container}>
      {/* ======= ENCABEZADO ======= */}
      <div className={styles.header}>
        <h2>Ficha Socioeconómica</h2>
        <BreadCrumb model={items} home={home} />
      </div>

      <Divider />

      {/* ======= CONTENIDO ======= */}
      <Card className={styles.card}>
        <h3>Información del Estudiante</h3>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="nombre">Nombre completo</label>
            <InputText
              id="nombre"
              value={formData.nombre}
              onChange={(e) => handleInputChange(e, 'nombre')}
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="documento">Documento</label>
            <InputText
              id="documento"
              value={formData.documento}
              onChange={(e) => handleInputChange(e, 'documento')}
              placeholder="Ej. 123456789"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="estrato">Estrato</label>
            <Dropdown
              id="estrato"
              value={formData.estrato}
              options={estratos}
              onChange={(e) => handleInputChange(e, 'estrato')}
              placeholder="Seleccione"
            />
          </div>

          <div className={styles.fieldWide}>
            <label htmlFor="direccion">Dirección</label>
            <InputText
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleInputChange(e, 'direccion')}
              placeholder="Ej. Calle 10 #20-30"
            />
          </div>
        </div>

        <Divider />

        {/* ======= BOTONES ======= */}
        <div className={styles.actions}>
          <Button
            label="Guardar"
            icon="pi pi-save"
            className="p-button-success"
            onClick={handleSave}
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-outlined"
            onClick={handleCancel}
          />
        </div>
      </Card>
    </div>
  );
}
