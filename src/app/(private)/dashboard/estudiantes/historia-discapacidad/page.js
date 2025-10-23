'use client';
import React, { useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import styles from './HistoriaDiscapacidad.module.css';

const HistoriadeDiscapacidad = () => {
  const [formData, setFormData] = useState({
    nombreApellidos: '',
    fechaNacimiento: '',
    identificacion: '',
    programa: '',
    direccion: '',
    conQuienVive: '',
    telefono: '',
    tipoDiscapacidad: '',
    estadoCivil: '',
    personaCargo: '',
    epsIps: '',
    agregarFamiliar: '',
    nombrePadre: '',
    nombreMadre: '',
    causaDiscapacidad: '',
    antecedentesPersonales: ''
  });

  const items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'historia de discapacidad' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };

  const tiposDiscapacidad = [
    'Física',
    'Visual',
    'Auditiva',
    'Cognitiva',
    'Mental/Psicosocial',
    'Múltiple',
    'Otra'
  ];

  const estadosCiviles = [
    'Soltero(a)',
    'Casado(a)',
    'Unión Libre',
    'Divorciado(a)',
    'Viudo(a)'
  ];

  const opcionesFamiliares = [
    'Padre',
    'Madre',
    'Ambos (Padre y Madre)'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    alert('Formulario guardado correctamente');
  };
  
  const handleClear = () => {
    setFormData({
      nombreApellidos: '',
      fechaNacimiento: '',
      identificacion: '',
      programa: '',
      direccion: '',
      conQuienVive: '',
      telefono: '',
      tipoDiscapacidad: '',
      estadoCivil: '',
      personaCargo: '',
      epsIps: '',
      agregarFamiliar: '',
      nombrePadre: '',
      nombreMadre: '',
      causaDiscapacidad: '',
      antecedentesPersonales: ''
    });
  };

  return (
    <div className={styles.container}>


      <div className={styles.formCard}>
      <div className={styles.header}>
        <h2>Historia de personas con discapacidad</h2>
      </div>
           <Divider />
        <div>
          <div className={styles.sectionHeader}>
            DATOS DEL ESTUDIANTE
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Nombre y Apellidos:
              </label>
              <input
                type="text"
                value={formData.nombreApellidos}
                onChange={(e) => handleInputChange('nombreApellidos', e.target.value)}
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Identificación:
              </label>
              <input
                type="text"
                value={formData.identificacion}
                onChange={(e) => handleInputChange('identificacion', e.target.value)}
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>
                Programa:
              </label>
              <input
                type="text"
                value={formData.programa}
                onChange={(e) => handleInputChange('programa', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.gridAsymmetric}>
            <div>
              <label className={styles.label}>
                Dirección:
              </label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>
                ¿Con quién vive?
              </label>
              <input
                type="text"
                value={formData.conQuienVive}
                onChange={(e) => handleInputChange('conQuienVive', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Teléfono:
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>
                Tipo de Discapacidad:
              </label>
              <select
                value={formData.tipoDiscapacidad}
                onChange={(e) => handleInputChange('tipoDiscapacidad', e.target.value)}
                className={styles.select}
              >
                <option value="">Seleccione...</option>
                {tiposDiscapacidad.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Estado Civil:
              </label>
              <select
                value={formData.estadoCivil}
                onChange={(e) => handleInputChange('estadoCivil', e.target.value)}
                className={styles.select}
              >
                <option value="">Seleccione...</option>
                {estadosCiviles.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.label}>
                Persona a Cargo:
              </label>
              <input
                type="text"
                value={formData.personaCargo}
                onChange={(e) => handleInputChange('personaCargo', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>
              EPS o IPS:
            </label>
            <input
              type="text"
              value={formData.epsIps}
              onChange={(e) => handleInputChange('epsIps', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>
              Agregar Padre o Madre:
            </label>
            <select
              value={formData.agregarFamiliar}
              onChange={(e) => handleInputChange('agregarFamiliar', e.target.value)}
              className={styles.select}
            >
              <option value="">Seleccione...</option>
              {opcionesFamiliares.map((opcion) => (
                <option key={opcion} value={opcion}>{opcion}</option>
              ))}
            </select>
          </div>

          {(formData.agregarFamiliar === 'Padre' || formData.agregarFamiliar === 'Ambos (Padre y Madre)') && (
            <div className={styles.formField}>
              <label className={styles.label}>
                Nombre Completo del Padre:
              </label>
              <input
                type="text"
                value={formData.nombrePadre}
                onChange={(e) => handleInputChange('nombrePadre', e.target.value)}
                className={styles.input}
                placeholder="Ingrese el nombre completo del padre"
              />
            </div>
          )}

          {(formData.agregarFamiliar === 'Madre' || formData.agregarFamiliar === 'Ambos (Padre y Madre)') && (
            <div className={styles.formField}>
              <label className={styles.label}>
                Nombre Completo de la Madre:
              </label>
              <input
                type="text"
                value={formData.nombreMadre}
                onChange={(e) => handleInputChange('nombreMadre', e.target.value)}
                className={styles.input}
                placeholder="Ingrese el nombre completo de la madre"
              />
            </div>
          )}

          <div className={styles.sectionHeader}>
            CAUSA DE LA DISCAPACIDAD
          </div>

          <div className={styles.formField}>
            <textarea
              value={formData.causaDiscapacidad}
              onChange={(e) => handleInputChange('causaDiscapacidad', e.target.value)}
              rows={5}
              className={styles.textarea}
              placeholder="Describa la causa de la discapacidad..."
            />
          </div>

          <div className={styles.sectionHeader}>
            ANTECEDENTES PERSONALES
          </div>

          <div className={styles.formField}>
            <textarea
              value={formData.antecedentesPersonales}
              onChange={(e) => handleInputChange('antecedentesPersonales', e.target.value)}
              rows={6}
              className={styles.textarea}
              placeholder="Describa los antecedentes personales relevantes..."
            />
          </div>

          {/* ======= BOTONES ======= */}
          <div className={styles.actions}>
            <Button
              label="Guardar"
              icon="pi pi-save"
              className="p-button-success"
              onClick={handleSubmit}
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-outlined"
              onClick={handleClear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriadeDiscapacidad;