'use client';
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import DireccionModal from './direccion-modal-component';
import styles from './styleshistoria/HistoriaDiscapacidad.module.css';
import DescargarPDFDiscapacidad from './DescargarPDFDiscapacidad';
import { 
  validateForm, 
  validateField, 
  procesarTelefono 
} from './validar.model';

const HistoriadeDiscapacidad = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    tipo_documento: '',
    identificacion: '',
    nombre_facultad: '',
    programa: '',
    id_direccion: '',
    con_quien_vive: '',
    telefono: '',
    nombre_discapacidad: '',
    otra_discapacidad: '',
    estado_civil: '',
    nombre_persona_a_cargo: '',
    epsIps: '',
    agregarFamiliar: '',
    nombrePadre: '',
    nombreMadre: '',
    causaDiscapacidad: '',
    antecedentesPersonales: ''
  });

  const [errors, setErrors] = useState({});
  const [showDireccionModal, setShowDireccionModal] = useState(false);

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
  
  const tiposID = [
    'Cédula de Ciudadanía',
    'Tarjeta de Identidad',
    'Cédula de Extranjería',
    'Pasaporte',
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

  // Programas académicos organizados por facultad
  const programasPorFacultad = {
    'FACULTAD CIENCIAS ADMINISTRATIVAS CONTABLES Y ECONÓMICAS – FACE': [
      'ADMINISTRACIÓN DE EMPRESAS',
      'ADMINISTRACIÓN DE EMPRESAS TURÍSTICAS Y HOTELERAS',
      'COMERCIO INTERNACIONAL',
      'CONTADURÍA PÚBLICA',
      'ECONOMÍA'
    ],
    'FACULTAD DE BELLAS ARTES': [
      'LICENCIATURA EN ARTES',
      'MÚSICA'
    ],
    'FACULTAD DE DERECHO, CIENCIAS POLÍTICAS Y SOCIALES': [
      'SOCIOLOGÍA',
      'DERECHO'
    ],
    'FACULTAD DE CIENCIAS BÁSICAS': [
      'MICROBIOLOGÍA'
    ],
    'FACULTAD DE INGENIERÍAS Y TECNOLOGÍAS': [
      'INGENIERÍA AMBIENTAL Y SANITARIA',
      'INGENIERÍA DE SISTEMAS',
      'INGENIERÍA ELECTRÓNICA',
      'INGENIERÍA AGROINDUSTRIAL'
    ],
    'FACULTAD CIENCIAS DE LA SALUD': [
      'ENFERMERÍA',
      'FISIOTERAPIA',
      'INSTRUMENTACIÓN QUIRÚRGICA'
    ],
    'FACULTAD DE EDUCACIÓN': [
      'LICENCIATURA EN CIENCIAS NATURALES Y EDUCACIÓN AMBIENTAL',
      'LICENCIATURA EN LITERATURA Y LENGUA CASTELLANA',
      'LICENCIATURA EN MATEMÁTICAS',
      'LICENCIATURA EN ESPAÑOL E INGLÉS',
      'LICENCIATURA EN EDUCACIÓN FÍSICA, RECREACIÓN Y DEPORTES'
    ]
  };

  // Obtener lista de facultades
  const facultades = Object.keys(programasPorFacultad);

  // Obtener programas según la facultad seleccionada
  const programasDisponibles = formData.nombre_facultad ? programasPorFacultad[formData.nombre_facultad] : [];

  const handleInputChange = (field, value) => {
    // Si se cambia la facultad, resetear el programa
    if (field === 'nombre_facultad') {
      setFormData(prev => ({
        ...prev,
        nombre_facultad: value,
        programa: '' // Limpiar el programa cuando cambie la facultad
      }));
      const newErrors = { ...errors };
      delete newErrors.nombre_facultad;
      delete newErrors.programa;
      setErrors(newErrors);
      return;
    }

    // Validar el campo
    const { isValid, errors: newErrors } = validateField(field, value, errors);
    setErrors(newErrors);

    // Caso especial para teléfono: procesar autocompletado
    if (field === 'telefono' && isValid) {
      const telefonoProcesado = procesarTelefono(value);
      if (telefonoProcesado !== value) {
        // Si se autocompletó, actualizar con el valor procesado
        setFormData(prev => ({
          ...prev,
          [field]: telefonoProcesado
        }));
        return;
      }
    }

    // Solo actualizar si es válido
    if (isValid) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = () => {
    const { isValid, errors: validationErrors } = validateForm(formData);
    
    if (isValid) {
      console.log('Datos del formulario:', formData);
      alert('Formulario guardado correctamente');
    } else {
      setErrors(validationErrors);
      alert('Por favor, complete todos los campos obligatorios correctamente');
    }
  };
  
  const handleClear = () => {
    setFormData({
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      fecha_nacimiento: '',
      tipo_documento: '',
      identificacion: '',
      nombre_facultad: '',
      programa: '',
      id_direccion: '',
      con_quien_vive: '',
      telefono: '',
      nombre_discapacidad: '',
      otra_discapacidad: '',
      estado_civil: '',
      nombre_persona_a_cargo: '',
      epsIps: '',
      agregarFamiliar: '',
      nombrePadre: '',
      nombreMadre: '',
      causaDiscapacidad: '',
      antecedentesPersonales: ''
    });
    setErrors({});
  };

  // Función para manejar la dirección desde el modal
  const handleDireccionSave = (datoDireccion) => {
    // Guardar la dirección completa en el campo
    setFormData(prev => ({
      ...prev,
      id_direccion: datoDireccion.direccion_completa
    }));
    setShowDireccionModal(false);
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
                Nombres: <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="text"
                value={formData.nombres}
                onChange={(e) => handleInputChange('nombres', e.target.value)}
                className={`${styles.input} ${errors.nombres ? styles.inputError : ''}`}
              />
              {errors.nombres && <span className={styles.errorText}>{errors.nombres}</span>}
            </div>

            <div>
              <label className={styles.label}>
                Primer Apellido: <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="text"
                value={formData.primer_apellido}
                onChange={(e) => handleInputChange('primer_apellido', e.target.value)}
                className={`${styles.input} ${errors.primer_apellido ? styles.inputError : ''}`}
              />
              {errors.primer_apellido && <span className={styles.errorText}>{errors.primer_apellido}</span>}
              <label className={styles.label}>
                Segundo Apellido (opcional):
              </label>
              <input
                type="text"
                value={formData.segundo_apellido}
                onChange={(e) => handleInputChange('segundo_apellido', e.target.value)}
                className={`${styles.input} ${errors.segundo_apellido ? styles.inputError : ''}`}
              />
              {errors.segundo_apellido && <span className={styles.errorText}>{errors.segundo_apellido}</span>}
            </div>
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Identificación: <span style={{color: 'red'}}>*</span>
              </label>
              <select
                value={formData.tipo_documento}
                onChange={(e) => handleInputChange('tipo_documento', e.target.value)}
                className={`${styles.select} ${errors.tipo_documento ? styles.inputError : ''}`}
              >
                <option value="">Seleccione...</option>
                {tiposID.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
              {errors.tipo_documento && <span className={styles.errorText}>{errors.tipo_documento}</span>}
              
              {formData.tipo_documento && (
                <>
                  <input
                    type="text"
                    value={formData.identificacion}
                    onChange={(e) => handleInputChange('identificacion', e.target.value)}
                    className={`${styles.input} ${errors.identificacion ? styles.inputError : ''}`}
                    style={{marginTop: '8px'}}
                  />
                  {errors.identificacion && <span className={styles.errorText}>{errors.identificacion}</span>}
                </>
              )}
            </div>

            <div>
              <label className={styles.label}>
                Fecha de Nacimiento: <span style={{color: 'red'}}>*</span>
              </label>
              <div className="p-inputgroup">
                <Calendar
                  inputId="fecha_nacimiento"
                  value={formData.fecha_nacimiento ? new Date(formData.fecha_nacimiento) : null}
                  onChange={(e) => {
                    const date = e.value;
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      handleInputChange('fecha_nacimiento', `${year}-${month}-${day}`);
                    } else {
                      handleInputChange('fecha_nacimiento', '');
                    }
                  }}
                  dateFormat="dd/mm/yy"
                  showIcon
                  maxDate={new Date()}
                  yearNavigator
                  yearRange="1920:2024"
                  monthNavigator
                  className={`${errors.fecha_nacimiento ? 'p-invalid' : ''}`}
                  inputStyle={{width: '100%'}}
                />
              </div>
              {errors.fecha_nacimiento && <span className={styles.errorText}>{errors.fecha_nacimiento}</span>}
            </div>
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Facultad: <span style={{color: 'red'}}>*</span>
              </label>
              <select
                value={formData.nombre_facultad}
                onChange={(e) => handleInputChange('nombre_facultad', e.target.value)}
                className={`${styles.select} ${errors.nombre_facultad ? styles.inputError : ''}`}
              >
                <option value="">Seleccione una facultad...</option>
                {facultades.map((facultad) => (
                  <option key={facultad} value={facultad}>{facultad}</option>
                ))}
              </select>
              {errors.nombre_facultad && <span className={styles.errorText}>{errors.nombre_facultad}</span>}
            </div>

            <div>
              <label className={styles.label}>
                Programa: <span style={{color: 'red'}}>*</span>
              </label>
              <select
                value={formData.programa}
                onChange={(e) => handleInputChange('programa', e.target.value)}
                className={`${styles.select} ${errors.programa ? styles.inputError : ''}`}
                disabled={!formData.nombre_facultad}
              >
                <option value="">
                  {formData.nombre_facultad ? 'Seleccione un programa...' : 'Primero seleccione una facultad'}
                </option>
                {programasDisponibles.map((programa) => (
                  <option key={programa} value={programa}>{programa}</option>
                ))}
              </select>
              {errors.programa && <span className={styles.errorText}>{errors.programa}</span>}
            </div>
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Dirección: <span style={{color: 'red'}}>*</span>
              </label>
              <div style={{display: 'flex', gap: '8px', alignItems: 'flex-start'}}>
                <input
                  type="text"
                  value={formData.id_direccion}
                  className={`${styles.input} ${errors.id_direccion ? styles.inputError : ''}`}
                  style={{flex: 1}}
                  disabled
                  readOnly
                />
                <Button
                  icon="pi pi-map-marker"
                  className="p-button-outlined p-button-secondary"
                  onClick={() => setShowDireccionModal(true)}
                  type="button"
                  tooltip="Constructor de dirección"
                  tooltipOptions={{ position: 'top' }}
                  style={{height: '44px'}}
                />
              </div>
              {errors.id_direccion && <span className={styles.errorText}>{errors.id_direccion}</span>}
            </div>

            <div>
              <label className={styles.label}>
                ¿Con quién vive? <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="text"
                value={formData.con_quien_vive}
                onChange={(e) => handleInputChange('con_quien_vive', e.target.value)}
                className={`${styles.input} ${errors.con_quien_vive ? styles.inputError : ''}`}
              />
              {errors.con_quien_vive && <span className={styles.errorText}>{errors.con_quien_vive}</span>}
            </div>
          </div>

          {/* Modal de Dirección */}
          <DireccionModal
            visible={showDireccionModal}
            onHide={() => setShowDireccionModal(false)}
            onSave={handleDireccionSave}
            direccionInicial={formData.id_direccion ? {
              direccion_completa: formData.id_direccion
            } : null}
          />

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Teléfono: <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className={`${styles.input} ${errors.telefono ? styles.inputError : ''}`}
              />
              <small style={{fontSize: '11px', color: '#666', display: 'block', marginTop: '4px'}}>
                {formData.telefono.startsWith('+57') 
                  ? '✓ Número colombiano detectado'
                  : 'Los números colombianos se autocompletarán con +57'}
              </small>
              {errors.telefono && <span className={styles.errorText}>{errors.telefono}</span>}
            </div>

            <div>
              <label className={styles.label}>
                Tipo de Discapacidad: <span style={{color: 'red'}}>*</span>
              </label>
              <select
                value={formData.nombre_discapacidad}
                onChange={(e) => handleInputChange('nombre_discapacidad', e.target.value)}
                className={`${styles.select} ${errors.nombre_discapacidad ? styles.inputError : ''}`}
              >
                <option value="">Seleccione...</option>
                {tiposDiscapacidad.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              {errors.nombre_discapacidad && <span className={styles.errorText}>{errors.nombre_discapacidad}</span>}
              
              {formData.nombre_discapacidad === 'Otra' && (
                <>
                  <label className={styles.label} style={{marginTop: '12px'}}>
                    Especifique la discapacidad: <span style={{color: 'red'}}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.otra_discapacidad}
                    onChange={(e) => handleInputChange('otra_discapacidad', e.target.value)}
                    className={`${styles.input} ${errors.otra_discapacidad ? styles.inputError : ''}`}
   
                  />
                  {errors.otra_discapacidad && <span className={styles.errorText}>{errors.otra_discapacidad}</span>}
                </>
              )}
            </div>
          </div>

          <div className={styles.gridTwoColumns}>
            <div>
              <label className={styles.label}>
                Estado Civil: <span style={{color: 'red'}}>*</span>
              </label>
              <select
                value={formData.estado_civil}
                onChange={(e) => handleInputChange('estado_civil', e.target.value)}
                className={`${styles.select} ${errors.estado_civil ? styles.inputError : ''}`}
              >
                <option value="">Seleccione...</option>
                {estadosCiviles.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
              {errors.estado_civil && <span className={styles.errorText}>{errors.estado_civil}</span>}
            </div>

            <div>
              <label className={styles.label}>
                Persona a Cargo: <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="text"
                value={formData.nombre_persona_a_cargo}
                onChange={(e) => handleInputChange('nombre_persona_a_cargo', e.target.value)}
                className={`${styles.input} ${errors.nombre_persona_a_cargo ? styles.inputError : ''}`}
              />
              {errors.nombre_persona_a_cargo && <span className={styles.errorText}>{errors.nombre_persona_a_cargo}</span>}
            </div>
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>
              EPS o IPS: <span style={{color: 'red'}}>*</span>
            </label>
            <input
              type="text"
              value={formData.epsIps}
              onChange={(e) => handleInputChange('epsIps', e.target.value)}
              className={`${styles.input} ${errors.epsIps ? styles.inputError : ''}`}
            />
            {errors.epsIps && <span className={styles.errorText}>{errors.epsIps}</span>}
          </div>

          <div className={styles.sectionHeader}>
            CAUSA DE LA DISCAPACIDAD
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>
              <span style={{color: 'red'}}>*</span>
            </label>
            <textarea
              value={formData.causaDiscapacidad}
              onChange={(e) => handleInputChange('causaDiscapacidad', e.target.value)}
              rows={5}
              className={`${styles.textarea} ${errors.causaDiscapacidad ? styles.inputError : ''}`}
            />
            {errors.causaDiscapacidad && <span className={styles.errorText}>{errors.causaDiscapacidad}</span>}
          </div>

          <div className={styles.sectionHeader}>
            ANTECEDENTES PERSONALES
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>
              <span style={{color: 'red'}}>*</span>
            </label>
            <textarea
              value={formData.antecedentesPersonales}
              onChange={(e) => handleInputChange('antecedentesPersonales', e.target.value)}
              rows={6}
              className={`${styles.textarea} ${errors.antecedentesPersonales ? styles.inputError : ''}`}
            />
            {errors.antecedentesPersonales && <span className={styles.errorText}>{errors.antecedentesPersonales}</span>}
          </div>

          <div className={styles.actions}>
            <DescargarPDFDiscapacidad formData={formData} />
            <Button
              label="Guardar"
              icon="pi pi-save"
              className="p-button-success"
              onClick={handleSubmit}
            />
            <Button
              label="Limpiar"
              icon="pi pi-trash"
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