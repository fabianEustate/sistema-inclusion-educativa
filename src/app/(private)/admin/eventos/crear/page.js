'use client';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { validarEvento } from './eventoValidador';
import styles from './evento.module.css';

const CrearEvento = ({ eventoInicial = null, onGuardar, onCancelar }) => {
  const toast = useRef(null);
  
  const [formData, setFormData] = useState({
    tipo_asistencia: eventoInicial?.tipo_asistencia || '',
    tema: eventoInicial?.tema || '',
    objetivo: eventoInicial?.objetivo || '',
    fecha: eventoInicial?.fecha ? new Date(eventoInicial.fecha) : null,
    descripcion: eventoInicial?.descripcion || '',
    categoria: eventoInicial?.categoria || '',
    estado: eventoInicial?.estado || 'Programado',
    id_usuario: eventoInicial?.id_usuario || '',
    id_direccion: eventoInicial?.id_direccion || ''
  });

  const [errors, setErrors] = useState({});

  const tiposAsistencia = [
    { label: 'Presencial', value: 'Presencial' },
    { label: 'Virtual', value: 'Virtual' },
    { label: 'Híbrida', value: 'Híbrida' }
  ];

  const categorias = [
    { label: 'Académico', value: 'Académico' },
    { label: 'Cultural', value: 'Cultural' },
    { label: 'Social', value: 'Social' }
  ];

  const estados = [
    { label: 'Programado', value: 'Programado' },
    { label: 'Realizado', value: 'Realizado' },
    { label: 'Cancelado', value: 'Cancelado' }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validarEvento(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      const eventoData = {
        ...formData,
        fecha: formData.fecha.toISOString(),
        id_usuario: parseInt(formData.id_usuario),
        id_direccion: parseInt(formData.id_direccion),
        activo: true,
        fecha_registro: new Date().toISOString(),
        fecha_ultima_actualizacion: new Date().toISOString()
      };

      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: eventoInicial ? 'Evento actualizado correctamente' : 'Evento creado correctamente',
        life: 3000
      });

      if (onGuardar) {
        onGuardar(eventoData);
      }

      if (!eventoInicial) {
        setFormData({
          tipo_asistencia: '',
          tema: '',
          objetivo: '',
          fecha: null,
          descripcion: '',
          categoria: '',
          estado: 'Programado',
          id_usuario: '',
          id_direccion: ''
        });
        setErrors({});
      }
    } else {
      setErrors(validationErrors);
      toast.current.show({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'Por favor corrija los errores en el formulario',
        life: 3000
      });
    }
  };

  return (
    <div className={styles.contenedor}>
      <Toast ref={toast} />
      <Card 
        title={eventoInicial ? 'Editar Evento' : 'Crear Nuevo Evento'} 
        className={styles.cardFormulario}
      >
        <div className="p-fluid">
          <div className="grid">
            <div className="col-12 md:col-6">
              <div className={styles.campo}>
                <label htmlFor="tipo_asistencia" className={styles.label}>
                  Tipo de Asistencia <span className={styles.requerido}>*</span>
                </label>
                <Dropdown
                  id="tipo_asistencia"
                  value={formData.tipo_asistencia}
                  options={tiposAsistencia}
                  onChange={(e) => handleInputChange('tipo_asistencia', e.value)}
                  placeholder="Seleccione tipo de asistencia"
                  className={errors.tipo_asistencia ? 'p-invalid' : ''}
                />
                {errors.tipo_asistencia && (
                  <small className={styles.error}>{errors.tipo_asistencia}</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className={styles.campo}>
                <label htmlFor="categoria" className={styles.label}>
                  Categoría <span className={styles.requerido}>*</span>
                </label>
                <Dropdown
                  id="categoria"
                  value={formData.categoria}
                  options={categorias}
                  onChange={(e) => handleInputChange('categoria', e.value)}
                  placeholder="Seleccione categoría"
                  className={errors.categoria ? 'p-invalid' : ''}
                />
                {errors.categoria && (
                  <small className={styles.error}>{errors.categoria}</small>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className={styles.campo}>
                <label htmlFor="tema" className={styles.label}>
                  Tema <span className={styles.requerido}>*</span>
                </label>
                <InputText
                  id="tema"
                  value={formData.tema}
                  onChange={(e) => handleInputChange('tema', e.target.value)}
                  placeholder="Ej: Inclusión educativa y accesibilidad"
                  maxLength={150}
                  className={errors.tema ? 'p-invalid' : ''}
                />
                <div className={styles.contadorCaracteres}>
                  {formData.tema.length}/150 caracteres
                </div>
                {errors.tema && (
                  <small className={styles.error}>{errors.tema}</small>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className={styles.campo}>
                <label htmlFor="descripcion" className={styles.label}>
                  Descripción <span className={styles.requerido}>*</span>
                </label>
                <InputTextarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  placeholder="Breve resumen del evento"
                  rows={3}
                  maxLength={255}
                  className={errors.descripcion ? 'p-invalid' : ''}
                />
                <div className={styles.contadorCaracteres}>
                  {formData.descripcion.length}/255 caracteres
                </div>
                {errors.descripcion && (
                  <small className={styles.error}>{errors.descripcion}</small>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className={styles.campo}>
                <label htmlFor="objetivo" className={styles.label}>
                  Objetivo <span className={styles.requerido}>*</span>
                </label>
                <InputTextarea
                  id="objetivo"
                  value={formData.objetivo}
                  onChange={(e) => handleInputChange('objetivo', e.target.value)}
                  placeholder="Propósito general del evento"
                  rows={4}
                  className={errors.objetivo ? 'p-invalid' : ''}
                />
                {errors.objetivo && (
                  <small className={styles.error}>{errors.objetivo}</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className={styles.campo}>
                <label htmlFor="fecha" className={styles.label}>
                  Fecha y Hora <span className={styles.requerido}>*</span>
                </label>
                <Calendar
                  id="fecha"
                  value={formData.fecha}
                  onChange={(e) => handleInputChange('fecha', e.value)}
                  showTime
                  hourFormat="24"
                  dateFormat="yy-mm-dd"
                  placeholder="Seleccione fecha y hora"
                  className={errors.fecha ? 'p-invalid' : ''}
                  minDate={new Date()}
                />
                {errors.fecha && (
                  <small className={styles.error}>{errors.fecha}</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className={styles.campo}>
                <label htmlFor="estado" className={styles.label}>
                  Estado <span className={styles.requerido}>*</span>
                </label>
                <Dropdown
                  id="estado"
                  value={formData.estado}
                  options={estados}
                  onChange={(e) => handleInputChange('estado', e.value)}
                  placeholder="Seleccione estado"
                  className={errors.estado ? 'p-invalid' : ''}
                />
                {errors.estado && (
                  <small className={styles.error}>{errors.estado}</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className={styles.campo}>
                <label htmlFor="id_usuario" className={styles.label}>
                  ID Usuario Responsable <span className={styles.requerido}>*</span>
                </label>
                <InputText
                  id="id_usuario"
                  value={formData.id_usuario}
                  onChange={(e) => handleInputChange('id_usuario', e.target.value)}
                  placeholder="Ej: 10"
                  keyfilter="int"
                  className={errors.id_usuario ? 'p-invalid' : ''}
                />
                {errors.id_usuario && (
                  <small className={styles.error}>{errors.id_usuario}</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className={styles.campo}>
                <label htmlFor="id_direccion" className={styles.label}>
                  ID Dirección <span className={styles.requerido}>*</span>
                </label>
                <InputText
                  id="id_direccion"
                  value={formData.id_direccion}
                  onChange={(e) => handleInputChange('id_direccion', e.target.value)}
                  placeholder="Ej: 4"
                  keyfilter="int"
                  className={errors.id_direccion ? 'p-invalid' : ''}
                />
                {errors.id_direccion && (
                  <small className={styles.error}>{errors.id_direccion}</small>
                )}
              </div>
            </div>
          </div>

          <div className={styles.botonesContainer}>
            {onCancelar && (
              <Button
                label="Cancelar"
                icon="pi pi-times"
                severity="secondary"
                onClick={onCancelar}
                className={styles.botonCancelar}
              />
            )}
            <Button
              label={eventoInicial ? 'Actualizar' : 'Guardar Evento'}
              icon="pi pi-check"
              onClick={handleSubmit}
              className={styles.botonGuardar}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CrearEvento;