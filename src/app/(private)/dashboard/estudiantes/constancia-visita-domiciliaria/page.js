'use client';
import React, { useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import DireccionModal from './direccion-modal-component';
import { formatearFecha } from '../../../../../components/common/date-formatter-component';
import styles from '../../../../../styles/Constancia.Visita.module.css';

export default function VisitaDomiciliariaPage() {
  const [formData, setFormData] = useState({
    fecha: null,
    nombres: '',
    estamento: '',
    programa: '',
    facultad: '',
    dependencia: '',
    personaContactada: '',
    parentesco: '',
    horaInicio: null,
    horaFinalizacion: null,
    observaciones: '',
    personaAtiende: '',
    profesionalRealiza: ''
  });

  const [direccionData, setDireccionData] = useState(null);
  const [showDireccionModal, setShowDireccionModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveDireccion = (direccion) => {
    setDireccionData(direccion);
  };

  const handleGuardar = () => {
    const dataToSave = {
      ...formData,
      direccion: direccionData,
      fecha: formData.fecha ? formData.fecha.toISOString() : null,
      horaInicio: formData.horaInicio ? formData.horaInicio.toISOString() : null,
      horaFinalizacion: formData.horaFinalizacion ? formData.horaFinalizacion.toISOString() : null
    };
    console.log('Datos del formulario:', dataToSave);
    console.log('Datos de dirección:', direccionData);
    // Aquí irá la lógica para guardar
  };

  const handleCancelar = () => {
    setFormData({
      fecha: null,
      nombres: '',
      estamento: '',
      programa: '',
      facultad: '',
      dependencia: '',
      personaContactada: '',
      parentesco: '',
      horaInicio: null,
      horaFinalizacion: null,
      observaciones: '',
      personaAtiende: '',
      profesionalRealiza: ''
    });
    setDireccionData(null);
  };
  const items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'Constancia de Visita Domiciliaria' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2 className={styles.title}>Constancia de Visita Domiciliaria</h2>
        <Divider />
        <div className={styles.formGrid}>
          {/* Fecha */}
          <div className={styles.fieldSmall}>
            <label htmlFor="fecha" className={styles.label}>
              Fecha <span className={styles.required}>*</span>
            </label>
            <div className={styles.dateWrapper}>
              <Calendar
                id="fecha"
                value={formData.fecha}
                onChange={(e) => handleInputChange('fecha', e.value)}
                dateFormat="dd/mm/yy"
                showIcon
                className={styles.inputDate}
              />
              {formData.fecha && (
                <div className={styles.fechaFormateada}>
                  {formatearFecha(formData.fecha)}
                </div>
              )}
            </div>
          </div>

          {/* Nombres */}
          <div className={styles.fieldLarge}>
            <label htmlFor="nombres" className={styles.label}>
              Nombres <span className={styles.required}>*</span>
            </label>
            <InputText
              id="nombres"
              value={formData.nombres}
              onChange={(e) => handleInputChange('nombres', e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Dirección */}
          <div className={styles.fieldFull}>
            <label className={styles.label}>
              Dirección donde se realiza la visita <span className={styles.required}>*</span>
            </label>
            <div className={styles.direccionContainer}>
              <div className={styles.direccionDisplay}>
                {direccionData ? (
                  <div className={styles.direccionText}>
                    <i className="pi pi-map-marker" style={{ marginRight: '0.5rem' }}></i>
                    {direccionData.direccion_completa}
                  </div>
                ) : (
                  <div className={styles.direccionPlaceholder}>
                    <i className="pi pi-map-marker" style={{ marginRight: '0.5rem' }}></i>
                    No se ha agregado una dirección
                  </div>
                )}
              </div>
              <Button
                label={direccionData ? "Editar" : "Agregar"}
                icon={direccionData ? "pi pi-pencil" : "pi pi-plus"}
                onClick={() => setShowDireccionModal(true)}
                className={styles.direccionButton}
              />
            </div>
          </div>

          {/* Estamento */}
          <div className={styles.fieldFull}>
            <label className={styles.label}>
              Estamento <span className={styles.required}>*</span>
            </label>
            <div className={styles.radioGroup}>
              <div className={styles.radioItem}>
                <RadioButton
                  inputId="estudiante"
                  name="estamento"
                  value="estudiante"
                  onChange={(e) => handleInputChange('estamento', e.value)}
                  checked={formData.estamento === 'estudiante'}
                />
                <label htmlFor="estudiante" className={styles.radioLabel}>Estudiante</label>
              </div>
              <div className={styles.radioItem}>
                <RadioButton
                  inputId="docente"
                  name="estamento"
                  value="docente"
                  onChange={(e) => handleInputChange('estamento', e.value)}
                  checked={formData.estamento === 'docente'}
                />
                <label htmlFor="docente" className={styles.radioLabel}>Docente</label>
              </div>
              <div className={styles.radioItem}>
                <RadioButton
                  inputId="funcionario"
                  name="estamento"
                  value="funcionario"
                  onChange={(e) => handleInputChange('estamento', e.value)}
                  checked={formData.estamento === 'funcionario'}
                />
                <label htmlFor="funcionario" className={styles.radioLabel}>Funcionario</label>
              </div>
            </div>
          </div>

          {/* Programa */}
          <div className={styles.fieldHalf}>
            <label htmlFor="programa" className={styles.label}>
              Programa <span className={styles.required}>*</span>
            </label>
            <InputText
              id="programa"
              value={formData.programa}
              onChange={(e) => handleInputChange('programa', e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Facultad */}
          <div className={styles.fieldHalf}>
            <label htmlFor="facultad" className={styles.label}>
              Facultad <span className={styles.required}>*</span>
            </label>
            <InputText
              id="facultad"
              value={formData.facultad}
              onChange={(e) => handleInputChange('facultad', e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Dependencia */}
          <div className={styles.fieldHalf}>
            <label htmlFor="dependencia" className={styles.label}>
              Dependencia
            </label>
            <InputText
              id="dependencia"
              value={formData.dependencia}
              onChange={(e) => handleInputChange('dependencia', e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Persona Contactada */}
          <div className={styles.fieldHalf}>
            <label htmlFor="personaContactada" className={styles.label}>
              Persona Contactada <span className={styles.required}>*</span>
            </label>
            <InputText
              id="personaContactada"
              value={formData.personaContactada}
              onChange={(e) => handleInputChange('personaContactada', e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Parentesco */}
          <div className={styles.fieldThird}>
            <label htmlFor="parentesco" className={styles.label}>
              Parentesco <span className={styles.required}>*</span>
            </label>
            <InputText
              id="parentesco"
              value={formData.parentesco}
              onChange={(e) => handleInputChange('parentesco', e.target.value)}
              className={styles.input}
            />
          </div>
          <div></div>
          {/* Hora Inicio */}
          <div className={styles.fieldThird}>
            <label htmlFor="horaInicio" className={styles.label}>
              Hora de Inicio <span className={styles.required}>*</span>
            </label>
            <Calendar
              id="horaInicio"
              value={formData.horaInicio}
              onChange={(e) => handleInputChange('horaInicio', e.value)}
              timeOnly
              hourFormat="12"
              showIcon
              className={styles.inputTime}
            />
            </div>
          <div>
            <label htmlFor="horaFinalizacion" className={styles.label}>
              Hora de Finalización <span className={styles.required}>*</span>
            </label>
            <Calendar
              id="horaFinalizacion"
              value={formData.horaFinalizacion}
              onChange={(e) => handleInputChange('horaFinalizacion', e.value)}
              timeOnly
              hourFormat="12"
              showIcon
              className={styles.inputTime}
            />
          </div>
        <div></div>
          {/* Firmas */}
          <div className={styles.fieldHalf}>
            <label htmlFor="personaAtiende" className={styles.label}>
              Persona que Atiende la Visita <span className={styles.required}>*</span>
            </label>
            <InputText
              id="personaAtiende"
              value={formData.personaAtiende}
              onChange={(e) => handleInputChange('personaAtiende', e.target.value)}
              className={styles.input}
              placeholder="Nombre completo"
            />
          </div>

          <div className={styles.fieldHalf}>
            <label htmlFor="profesionalRealiza" className={styles.label}>
              Profesional que Realiza la Visita <span className={styles.required}>*</span>
            </label>
            <InputText
              id="profesionalRealiza"
              value={formData.profesionalRealiza}
              onChange={(e) => handleInputChange('profesionalRealiza', e.target.value)}
              className={styles.input}
              placeholder="Nombre completo"
            />
          </div>
          {/* Observaciones */}
          <div className={styles.fieldFull}>
            <label htmlFor="observaciones" className={styles.label}>
              Observaciones <span className={styles.required}>*</span>
            </label>
            <InputTextarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => handleInputChange('observaciones', e.target.value)}
              rows={6}
              className={styles.textarea}
            />
          </div>

          
        </div>

        <Divider />

        {/* Botones de acción */}
        <div className={styles.buttonGroup}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className={styles.cancelButton}
            onClick={handleCancelar}
          />
          <Button
            label="Guardar"
            icon="pi pi-check"
            className={styles.saveButton}
            onClick={handleGuardar}
          />
        </div>
      </Card>

      <DireccionModal
        visible={showDireccionModal}
        onHide={() => setShowDireccionModal(false)}
        onSave={handleSaveDireccion}
        direccionInicial={direccionData}
      />
    </div>
  );
}