'use client';
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import styles from './retiroVoluntario.module.css';
export default function Page() {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    programa: '',
    discapacidad: '',
    motivo: '',
    dia: '',
    mes: '',
    año: ''
  });
  const [errors, setErrors] = useState({});
  const programas = [
    { label: 'Ingeniería de Sistemas', value: 'ingenieria-sistemas' },
    { label: 'Medicina', value: 'medicina' },
    { label: 'Derecho', value: 'derecho' },
    { label: 'Administración de Empresas', value: 'administracion' },
    { label: 'Psicología', value: 'psicologia' },
    { label: 'Contaduría Pública', value: 'contaduria' }
  ];
  const condicionesDiscapacidad = [
    { label: 'Ninguna', value: 'ninguna' },
    { label: 'Física', value: 'fisica' },
    { label: 'Visual', value: 'visual' },
    { label: 'Auditiva', value: 'auditiva' },
    { label: 'Intelectual', value: 'intelectual' },
    { label: 'Psicosocial', value: 'psicosocial' },
    { label: 'Múltiple', value: 'multiple' }
  ];
  const meses = [
    { label: 'Enero', value: 'enero' },
    { label: 'Febrero', value: 'febrero' },
    { label: 'Marzo', value: 'marzo' },
    { label: 'Abril', value: 'abril' },
    { label: 'Mayo', value: 'mayo' },
    { label: 'Junio', value: 'junio' },
    { label: 'Julio', value: 'julio' },
    { label: 'Agosto', value: 'agosto' },
    { label: 'Septiembre', value: 'septiembre' },
    { label: 'Octubre', value: 'octubre' },
    { label: 'Noviembre', value: 'noviembre' },
    { label: 'Diciembre', value: 'diciembre' }
  ];
  // Validaciones
  const validateNombre = (nombre) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombre) return 'El nombre es obligatorio';
    if (!regex.test(nombre)) return 'El nombre solo puede contener letras y espacios';
    return '';
  };
  const validateDocumento = (documento) => {
    const regex = /^\d+$/;
    if (!documento) return 'El documento es obligatorio';
    if (!regex.test(documento)) return 'El documento solo puede contener números';
    if (documento.length > 10) return 'El documento no puede tener más de 10 dígitos';
    return '';
  };
  const validateDia = (dia) => {
    const regex = /^\d+$/;
    if (!dia) return 'El día es obligatorio';
    if (!regex.test(dia)) return 'El día solo puede contener números';
    const diaNum = parseInt(dia);
    if (diaNum < 1 || diaNum > 31) return 'El día debe estar entre 1 y 31';
    return '';
  };
  const validateAño = (año) => {
    const regex = /^\d+$/;
    if (!año) return 'El año es obligatorio';
    if (!regex.test(año)) return 'El año solo puede contener números';
    const añoNum = parseInt(año);
    const currentYear = new Date().getFullYear();
    if (añoNum < 2020 || añoNum > currentYear + 1) return `El año debe estar entre 2020 y
${currentYear + 1}`;
    return '';
  };
  const validateRequired = (value, fieldName) => {
    if (!value) return `El campo ${fieldName} es obligatorio`;
    return '';
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {
      nombre: validateNombre(formData.nombre),
      documento: validateDocumento(formData.documento),
      programa: validateRequired(formData.programa, 'programa académico'),
      discapacidad: validateRequired(formData.discapacidad, 'condición de discapacidad'),
      motivo: validateRequired(formData.motivo, 'motivo del retiro'),
      dia: validateDia(formData.dia),
      mes: validateRequired(formData.mes, 'mes'),
      año: validateAño(formData.año)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Lógica para guardar el formulario
      console.log('Datos del formulario válidos:', formData);
      alert('Formulario de retiro voluntario guardado exitosamente');
    } else {
      alert('Por favor, corrija los errores en el formulario');
    }
  };
  const handleCancel = () => {
    // Lógica para cancelar/limpiar el formulario
    setFormData({
      nombre: '',
      documento: '',
      programa: '',
      discapacidad: '',
      motivo: '',
      dia: '',
      mes: '',
      año: ''
    });
    setErrors({});
  };
  // Función para formatear documento (solo números)
  const handleDocumentoChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('documento', value);
  };
  // Función para formatear día (solo números, máximo 2 dígitos)
  const handleDiaChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    handleInputChange('dia', value);
  };
  // Función para formatear año (solo números, máximo 4 dígitos)
  const handleAñoChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    handleInputChange('año', value);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Retiro Voluntario del Programa</h1>
      <p className={styles.subtitle}>
        Complete el siguiente formulario para solicitar su retiro voluntario del Programa de
        Educación Inclusiva
      </p>
      <Divider className={styles.divider} />
      <div className={styles.formContainer}>
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            {/* Encabezado Universidad */}
            <div className={styles.universityHeader}>
              <h2 className={styles.universityTitle}>UNIVERSIDAD POPULAR DEL
                CESAR</h2>
              <h3 className={styles.programTitle}>PROGRAMA DE EDUCACIÓN
                INCLUSIVA E INTERCULTURAL</h3>
              <p className={styles.codeVersion}>CÓDIGO: VERSIÓN: 1 | PÁG. 1 de 1</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                {/* Campo Nombre */}
                <div className={styles.formField}>
                  <label className={styles.label}>Nombre Completo *</label>
                  <InputText
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Ingrese su nombre completo"
                    className={errors.nombre ? 'p-invalid' : ''}
                  />
                  {errors.nombre && (
                    <Message severity="error" text={errors.nombre} style={{
                      marginTop: '0.5rem'
                    }} />
                  )}
                </div>
                {/* Campo Documento */}
                <div className={styles.formField}>
                  <label className={styles.label}>Número de Documento *</label>
                  <InputText
                    value={formData.documento}
                    onChange={handleDocumentoChange}
                    placeholder="Solo números, máximo 10"
                    className={errors.documento ? 'p-invalid' : ''}
                  />
                  {errors.documento && (
                    <Message severity="error" text={errors.documento} style={{
                      marginTop:
                        '0.5rem'
                    }} />
                  )}
                </div>
                {/* Campo Programa */}
                <div className={styles.formField}>
                  <label className={styles.label}>Programa Académico *</label>
                  <Dropdown
                    value={formData.programa}
                    onChange={(e) => handleInputChange('programa', e.value)}
                    options={programas}
                    placeholder="Seleccione su programa"
                    className={errors.programa ? 'p-invalid' : ''}
                  />
                  {errors.programa && (
                    <Message severity="error" text={errors.programa} style={{
                      marginTop:
                        '0.5rem'
                    }} />
                  )}
                </div>
                {/* Campo Discapacidad */}
                <div className={styles.formField}>
                  <label className={styles.label}>Condición de Discapacidad *</label>
                  <Dropdown
                    value={formData.discapacidad}
                    onChange={(e) => handleInputChange('discapacidad', e.value)}
                    options={condicionesDiscapacidad}
                    placeholder="Seleccione condición"
                    className={errors.discapacidad ? 'p-invalid' : ''}
                  />
                  {errors.discapacidad && (
                    <Message severity="error" text={errors.discapacidad} style={{
                      marginTop:
                        '0.5rem'
                    }} />
                  )}
                </div>
                {/* Campo Motivo */}
                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label className={styles.label}>Motivo del Retiro *</label>
                  <InputTextarea
                    value={formData.motivo}
                    onChange={(e) => handleInputChange('motivo', e.target.value)}
                    placeholder="Describa detalladamente los motivos de su retiro voluntario del
programa..."
                    rows={4}
                    className={`${styles.textareaField} ${errors.motivo ? 'p-invalid' : ''}`}
                  />
                  {errors.motivo && (
                    <Message severity="error" text={errors.motivo} style={{
                      marginTop: '0.5rem'
                    }} />
                  )}
                </div>
                {/* Campo Día */}
                <div className={styles.formField}>
                  <label className={styles.label}>Día *</label>
                  <InputText
                    value={formData.dia}
                    onChange={handleDiaChange}
                    placeholder="DD (1-31)"
                    className={errors.dia ? 'p-invalid' : ''}
                  />
                  {errors.dia && (
                    <Message severity="error" text={errors.dia} style={{ marginTop: '0.5rem' }}
                    />
                  )}
                </div>
                {/* Campo Mes */}
                <div className={styles.formField}>
                  <label className={styles.label}>Mes *</label>
                  <Dropdown
                    value={formData.mes}
                    onChange={(e) => handleInputChange('mes', e.value)}
                    options={meses}
                    placeholder="Seleccione mes"
                    className={errors.mes ? 'p-invalid' : ''}
                  />
                  {errors.mes && (
                    <Message severity="error" text={errors.mes} style={{ marginTop: '0.5rem' }}
                    />
                  )}
                </div>
                {/* Campo Año */}
                <div className={styles.formField}>
                  <label className={styles.label}>Año *</label>
                  <InputText
                    value={formData.año}
                    onChange={handleAñoChange}
                    placeholder="AAAA"
                    className={errors.año ? 'p-invalid' : ''}
                  />
                  {errors.año && (
                    <Message severity="error" text={errors.año} style={{ marginTop: '0.5rem' }}
                    />
                  )}
                </div>
              </div>
              {/* Sección de firmas */}
              <div className={styles.signatureSection}>
                <h3 style={{ color: 'var(--green-primary)', marginBottom: '1rem' }}>
                  Para mayor constancia se firma en la ciudad de Valledupar
                </h3>
                <div className={styles.signatureGrid}>
                  <div className={styles.signatureField}>
                    <div className={styles.signatureLine}></div>
                    <div className={styles.signatureName}>NELLY ROSERO
                      CASTILLO</div>
                    <div className={styles.signatureRole}>Coordinadora Educación
                      Inclusiva</div>
                  </div>
                  <div className={styles.signatureField}>
                    <div className={styles.signatureLine}></div>
                    <div className={styles.signatureName}>ESTUDIANTE</div>
                    <div className={styles.signatureRole}>Firma del solicitante</div>
                  </div>
                </div>
              </div>
              {/* Información de contacto */}
              <div className={styles.footer}>
                <p>www.unicesar.edu.co</p>
                <p>Teléfono conmutador PBX: (+57 605 588 5592)</p>
                <p>Balneario Hurtado, Vía a Patillal</p>
                <p>Valledupar – Cesar, Colombia</p>
              </div>
              {/* Botones de acción */}
              <div className={styles.buttonGroup}>
                <Button
                  type="button"
                  label="Cancelar"
                  icon="pi pi-times"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                />
                <Button
                  type="submit"
                  label="Guardar Solicitud"
                  icon="pi pi-save"
                />
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}