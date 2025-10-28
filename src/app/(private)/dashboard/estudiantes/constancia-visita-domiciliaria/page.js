'use client';
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';import dayjs from 'dayjs';
import 'dayjs/locale/es';
import DireccionModal from './direccion-modal-component';
import ConstanciaPDF from './constancia-pdf';
import { formatearFecha } from '../../../../../components/common/date-formatter-component';
import styles from '../../../../../styles/Constancia.Visita.module.css';

// Configurar dayjs en español
dayjs.locale('es');

// Datos de facultades y programas
const facultadesYProgramas = {
  'Facultad de Ingeniería': [
    'Ingeniería de Sistemas',
    'Ingeniería Civil',
    'Ingeniería Industrial',
    'Ingeniería Electrónica',
    'Ingeniería Mecánica'
  ],
  'Facultad de Ciencias de la Salud': [
    'Medicina',
    'Enfermería',
    'Fisioterapia',
    'Nutrición y Dietética',
    'Psicología'
  ],
  'Facultad de Ciencias Económicas y Administrativas': [
    'Administración de Empresas',
    'Contaduría Pública',
    'Economía',
    'Marketing',
    'Finanzas'
  ],
  'Facultad de Derecho': [
    'Derecho',
    'Ciencias Políticas'
  ],
  'Facultad de Educación': [
    'Licenciatura en Educación Infantil',
    'Licenciatura en Educación Básica',
    'Licenciatura en Lenguas Extranjeras',
    'Licenciatura en Matemáticas'
  ],
  'Facultad de Ciencias Humanas y Sociales': [
    'Sociología',
    'Trabajo Social',
    'Comunicación Social',
    'Antropología'
  ]
};

// Tema personalizado con colores verdes
const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      dark: '#45a049',
      light: '#81C784',
    },
  },
  components: {
    MuiClockPointer: {
      styleOverrides: {
        root: {
          backgroundColor: '#4CAF50',
        },
        thumb: {
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#4CAF50',
            color: 'white',
          },
        },
      },
    },
    MuiClock: {
      styleOverrides: {
        pin: {
          backgroundColor: '#4CAF50',
        },
      },
    },
  },
});

export default function VisitaDomiciliariaPage() {
  const [formData, setFormData] = useState({
    fecha_visita: null,
    nombres: '',
    estamento: '',
    programa: '',
    facultad: '',
    dependencia: '',
    persona_contactada: '',
    parentesco_contacto: '',
    hora_inicio: null,
    hora_fin: null,
    observaciones: '',
    persona_que_atiende: '',
    profesionales_visita: ''
  });

  const [direccionData, setDireccionData] = useState(null);
  const [showDireccionModal, setShowDireccionModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [touched, setTouched] = useState({});
  const [programasDisponibles, setProgramasDisponibles] = useState([]);
  const [showPDFModal, setShowPDFModal] = useState(false);

  // Función para validar que solo contenga letras, espacios y acentos
  const soloLetras = (texto) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    return regex.test(texto);
  };

  // Función para validar campos de texto (no vacíos y sin números)
  const validarCampoTexto = (valor) => {
    if (!valor || valor.trim() === '') {
      return 'Este campo es obligatorio';
    }
    if (!soloLetras(valor)) {
      return 'Este campo no puede contener números ni caracteres especiales';
    }
    if (valor.trim().length < 3) {
      return 'Debe contener al menos 3 caracteres';
    }
    return null;
  };

  // Función para validar observaciones
  const validarObservaciones = (valor) => {
    if (!valor || valor.trim() === '') {
      return 'Este campo es obligatorio';
    }
    if (valor.trim().length < 10) {
      return 'Las observaciones deben tener al menos 10 caracteres';
    }
    return null;
  };

  // Función para validar horas
  const validarHoras = (horaInicio, horaFin) => {
    if (!horaInicio) {
      return { hora_inicio: 'La hora de inicio es obligatoria' };
    }
    if (!horaFin) {
      return { hora_fin: 'La hora de finalización es obligatoria' };
    }
    
    // Validar que la hora de fin sea posterior a la de inicio
    if (horaInicio && horaFin) {
      if (horaFin.isBefore(horaInicio) || horaFin.isSame(horaInicio)) {
        return { 
          hora_fin: 'La hora de finalización debe ser posterior a la hora de inicio' 
        };
      }
    }
    
    return {};
  };

  const handleInputChange = (field, value) => {
    // Si es un campo de texto que no debe tener números
    const camposSoloTexto = [
      'nombres', 
      'persona_contactada', 
      'parentesco_contacto',
      'persona_que_atiende',
      'profesionales_visita'
    ];

    if (camposSoloTexto.includes(field)) {
      // Filtrar números y caracteres especiales en tiempo real
      if (value && !soloLetras(value)) {
        // No actualizar si contiene números o caracteres especiales
        return;
      }
    }

    // Si cambia la facultad, resetear el programa y actualizar programas disponibles
    if (field === 'facultad') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        programa: '' // Resetear programa al cambiar facultad
      }));
      setProgramasDisponibles(facultadesYProgramas[value] || []);
      
      // Marcar ambos campos como tocados
      setTouched(prev => ({
        ...prev,
        facultad: true,
        programa: false // Reset touched para programa
      }));
      
      // Validar facultad
      if (touched.facultad) {
        validateField(field, value);
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Marcar el campo como tocado
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validar el campo en tiempo real si ya fue tocado
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = null;

    switch (field) {
      case 'fecha_visita':
        if (!value) {
          error = 'La fecha es obligatoria';
        } else {
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          const fechaSeleccionada = new Date(value);
          fechaSeleccionada.setHours(0, 0, 0, 0);
          
          if (fechaSeleccionada > hoy) {
            error = 'No se puede seleccionar una fecha futura';
          }
        }
        break;

      case 'nombres':
      case 'persona_contactada':
      case 'parentesco_contacto':
      case 'persona_que_atiende':
      case 'profesionales_visita':
        error = validarCampoTexto(value);
        break;

      case 'programa':
      case 'facultad':
        if (!value) {
          error = `Debe seleccionar ${field === 'programa' ? 'un programa' : 'una facultad'}`;
        }
        break;

      case 'estamento':
        if (!value) {
          error = 'Debe seleccionar un estamento';
        }
        break;

      case 'observaciones':
        error = validarObservaciones(value);
        break;

      case 'hora_inicio':
      case 'hora_fin':
        const horaErrors = validarHoras(
          field === 'hora_inicio' ? value : formData.hora_inicio,
          field === 'hora_fin' ? value : formData.hora_fin
        );
        error = horaErrors[field] || null;
        
        // Si se valida hora_inicio, también revalidar hora_fin
        if (field === 'hora_inicio' && formData.hora_fin) {
          setErrors(prev => ({
            ...prev,
            hora_fin: horaErrors.hora_fin || null
          }));
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return error;
  };

  const handleSaveDireccion = (direccion) => {
    setDireccionData(direccion);
    setTouched(prev => ({
      ...prev,
      direccion: true
    }));
    
    if (errors.direccion) {
      setErrors(prev => ({
        ...prev,
        direccion: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar fecha
    if (!formData.fecha_visita) {
      newErrors.fecha_visita = 'La fecha es obligatoria';
    } else {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fechaSeleccionada = new Date(formData.fecha_visita);
      fechaSeleccionada.setHours(0, 0, 0, 0);
      
      if (fechaSeleccionada > hoy) {
        newErrors.fecha_visita = 'No se puede seleccionar una fecha futura';
      }
    }
    
    // Validar nombres
    const errorNombres = validarCampoTexto(formData.nombres);
    if (errorNombres) newErrors.nombres = errorNombres;
    
    // Validar dirección
    if (!direccionData) {
      newErrors.direccion = 'Debe agregar una dirección';
    }
    
    // Validar estamento
    if (!formData.estamento) {
      newErrors.estamento = 'Debe seleccionar un estamento';
    }
    
    // Validar facultad
    if (!formData.facultad) {
      newErrors.facultad = 'Debe seleccionar una facultad';
    }
    
    // Validar programa
    if (!formData.programa) {
      newErrors.programa = 'Debe seleccionar un programa';
    }
    
    // Validar persona contactada
    const errorPersonaContactada = validarCampoTexto(formData.persona_contactada);
    if (errorPersonaContactada) newErrors.persona_contactada = errorPersonaContactada;
    
    // Validar parentesco
    const errorParentesco = validarCampoTexto(formData.parentesco_contacto);
    if (errorParentesco) newErrors.parentesco_contacto = errorParentesco;
    
    // Validar horas
    const horaErrors = validarHoras(formData.hora_inicio, formData.hora_fin);
    Object.assign(newErrors, horaErrors);
    
    // Validar persona que atiende
    const errorPersonaAtiende = validarCampoTexto(formData.persona_que_atiende);
    if (errorPersonaAtiende) newErrors.persona_que_atiende = errorPersonaAtiende;
    
    // Validar profesional que realiza
    const errorProfesional = validarCampoTexto(formData.profesionales_visita);
    if (errorProfesional) newErrors.profesionales_visita = errorProfesional;
    
    // Validar observaciones
    const errorObservaciones = validarObservaciones(formData.observaciones);
    if (errorObservaciones) newErrors.observaciones = errorObservaciones;
    
    return newErrors;
  };

  const handleGuardar = () => {
    // Marcar todos los campos como tocados
    const allTouched = {
      fecha_visita: true,
      nombres: true,
      direccion: true,
      estamento: true,
      programa: true,
      facultad: true,
      persona_contactada: true,
      parentesco_contacto: true,
      hora_inicio: true,
      hora_fin: true,
      persona_que_atiende: true,
      profesionales_visita: true,
      observaciones: true,
    };
    setTouched(allTouched);

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowErrorMessage(true);
      
      // Scroll al primer error
      setTimeout(() => {
        const firstErrorElement = document.querySelector('.p-invalid') || 
                                  document.querySelector(`.${styles.direccionError}`) ||
                                  document.querySelector(`.${styles.radioGroupError}`);
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      // Ocultar mensaje después de 7 segundos
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 7000);
      
      return;
    }
    
    // Limpiar errores y mensaje
    setErrors({});
    setShowErrorMessage(false);
    
    // Abrir modal de PDF
    setShowPDFModal(true);
  };

  const handleCancelar = () => {
    setFormData({
      fecha_visita: null,
      nombres: '',
      estamento: '',
      programa: '',
      facultad: '',
      dependencia: '',
      persona_contactada: '',
      parentesco_contacto: '',
      hora_inicio: null,
      hora_fin: null,
      observaciones: '',
      persona_que_atiende: '',
      profesionales_visita: ''
    });
    setDireccionData(null);
    setErrors({});
    setTouched({});
    setShowErrorMessage(false);
    setProgramasDisponibles([]);
  };

  const items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'Constancia de Visita Domiciliaria' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };

  return (
    <ThemeProvider theme={greenTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <div className={styles.container}>
          <Card className={styles.card}>
            <h2 className={styles.title}>Constancia de Visita Domiciliaria</h2>
            <Divider />
            
            {showErrorMessage && (
              <Message 
                severity="error" 
                text="Por favor corrija los errores en el formulario antes de guardar" 
                style={{ width: '100%', marginBottom: '1rem' }}
              />
            )}

            <div className={styles.formGrid}>
              {/* Fecha */}
              <div className={styles.fieldSmall}>
                <label htmlFor="fecha_visita" className={styles.label}>
                  Fecha <span className={styles.required}>*</span>
                </label>
                <div className={styles.dateWrapper}>
                  <div className={`${styles.fechaFormateada} ${!formData.fecha_visita ? styles.empty : ''}`}>
                    {formData.fecha_visita ? formatearFecha(formData.fecha_visita) : 'No seleccionada'}
                  </div>
                  <Calendar
                    id="fecha_visita"
                    value={formData.fecha_visita}
                    onChange={(e) => handleInputChange('fecha_visita', e.value)}
                    onBlur={() => handleBlur('fecha_visita')}
                    dateFormat="dd/mm/yy"
                    showIcon
                    readOnlyInput
                    maxDate={new Date()}
                    placeholder="Seleccione una fecha"
                    className={`${styles.inputDate} ${errors.fecha_visita ? 'p-invalid' : ''}`}
                    inputClassName={styles.calendarInput}
                    appendTo="self"
                  />
                </div>
                {errors.fecha_visita && touched.fecha_visita && (
                  <small className={styles.errorText}>{errors.fecha_visita}</small>
                )}
              </div>

              {/* Nombres */}
              <div className={styles.fieldThird}>
                <label htmlFor="nombres" className={styles.label}>
                  Nombres <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="nombres"
                  value={formData.nombres}
                  onChange={(e) => handleInputChange('nombres', e.target.value)}
                  onBlur={() => handleBlur('nombres')}
                  className={`${styles.input} ${errors.nombres && touched.nombres ? 'p-invalid' : ''}`}
                  placeholder="Nombre completo"
                />
                {errors.nombres && touched.nombres && (
                  <small className={styles.errorText}>{errors.nombres}</small>
                )}
              </div>

              {/* Dirección */}
              <div className={styles.fieldFull}>
                <label className={styles.label}>
                  Dirección donde se realiza la visita <span className={styles.required}>*</span>
                </label>
                <div className={styles.direccionContainer}>
                  <div className={`${styles.direccionDisplay} ${errors.direccion && touched.direccion ? styles.direccionError : ''}`}>
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
                {errors.direccion && touched.direccion && (
                  <small className={styles.errorText}>{errors.direccion}</small>
                )}
              </div>

              {/* Estamento */}
              <div className={styles.fieldFull}>
                <label className={styles.label}>
                  Estamento <span className={styles.required}>*</span>
                </label>
                <div className={`${styles.radioGroup} ${errors.estamento && touched.estamento ? styles.radioGroupError : ''}`}>
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
                {errors.estamento && touched.estamento && (
                  <small className={styles.errorText}>{errors.estamento}</small>
                )}
              </div>

              {/* Facultad */}
              <div className={styles.fieldHalf}>
                <label htmlFor="facultad" className={styles.label}>
                  Facultad <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="facultad"
                  value={formData.facultad}
                  options={Object.keys(facultadesYProgramas)}
                  onChange={(e) => handleInputChange('facultad', e.value)}
                  onBlur={() => handleBlur('facultad')}
                  className={`${styles.dropdown} ${errors.facultad && touched.facultad ? 'p-invalid' : ''}`}
                  placeholder="Seleccione una facultad"
                />
                {errors.facultad && touched.facultad && (
                  <small className={styles.errorText}>{errors.facultad}</small>
                )}
              </div>

              {/* Programa */}
              <div className={styles.fieldHalf}>
                <label htmlFor="programa" className={styles.label}>
                  Programa <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="programa"
                  value={formData.programa}
                  options={programasDisponibles}
                  onChange={(e) => handleInputChange('programa', e.value)}
                  onBlur={() => handleBlur('programa')}
                  className={`${styles.dropdown} ${errors.programa && touched.programa ? 'p-invalid' : ''}`}
                  placeholder={formData.facultad ? "Seleccione un programa" : "Primero seleccione una facultad"}
                  disabled={!formData.facultad}
                />
                {errors.programa && touched.programa && (
                  <small className={styles.errorText}>{errors.programa}</small>
                )}
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
                  placeholder="Opcional"
                />
              </div>

              {/* Persona Contactada */}
              <div className={styles.fieldHalf}>
                <label htmlFor="persona_contactada" className={styles.label}>
                  Persona Contactada <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="persona_contactada"
                  value={formData.persona_contactada}
                  onChange={(e) => handleInputChange('persona_contactada', e.target.value)}
                  onBlur={() => handleBlur('persona_contactada')}
                  className={`${styles.input} ${errors.persona_contactada && touched.persona_contactada ? 'p-invalid' : ''}`}
                  placeholder="Nombre completo"
                />
                {errors.persona_contactada && touched.persona_contactada && (
                  <small className={styles.errorText}>{errors.persona_contactada}</small>
                )}
              </div>

              {/* Parentesco */}
              <div className={styles.fieldThird}>
                <label htmlFor="parentesco_contacto" className={styles.label}>
                  Parentesco <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="parentesco_contacto"
                  value={formData.parentesco_contacto}
                  onChange={(e) => handleInputChange('parentesco_contacto', e.target.value)}
                  onBlur={() => handleBlur('parentesco_contacto')}
                  className={`${styles.input} ${errors.parentesco_contacto && touched.parentesco_contacto ? 'p-invalid' : ''}`}
                  placeholder="Ej: Madre, Padre, Hermano"
                />
                {errors.parentesco_contacto && touched.parentesco_contacto && (
                  <small className={styles.errorText}>{errors.parentesco_contacto}</small>
                )}
              </div>
              <div></div>

              {/* Hora Inicio */}
              <div className={styles.fieldThird}>
                <label htmlFor="hora_inicio" className={styles.label}>
                  Hora de Inicio <span className={styles.required}>*</span>
                </label>
                <MobileTimePicker
                  value={formData.hora_inicio}
                  onChange={(newValue) => handleInputChange('hora_inicio', newValue)}
                  onClose={() => handleBlur('hora_inicio')}
                  ampm={true}
                  ampmInClock={true}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: errors.hora_inicio && touched.hora_inicio,
                      className: styles.muiTimePicker,
                    },
                    toolbar: {
                      sx: {
                        '& .MuiTypography-root': {
                          color: 'primary.main',
                        },
                      },
                    },
                    actionBar: {
                      actions: ['accept', 'cancel'],
                      sx: {
                        '& .MuiButton-root': {
                          color: 'primary.main',
                          fontWeight: 500,
                        },
                      },
                    },
                  }}
                  localeText={{
                    cancelButtonLabel: 'Cancelar',
                    okButtonLabel: 'Aceptar',
                  }}
                />
                {errors.hora_inicio && touched.hora_inicio && (
                  <small className={styles.errorText}>{errors.hora_inicio}</small>
                )}
              </div>

              <div className={styles.fieldThird}>
                <label htmlFor="hora_fin" className={styles.label}>
                  Hora de Finalización <span className={styles.required}>*</span>
                </label>
                <MobileTimePicker
                  value={formData.hora_fin}
                  onChange={(newValue) => handleInputChange('hora_fin', newValue)}
                  onClose={() => handleBlur('hora_fin')}
                  ampm={true}
                  ampmInClock={true}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: errors.hora_fin && touched.hora_fin,
                      className: styles.muiTimePicker,
                    },
                    toolbar: {
                      sx: {
                        '& .MuiTypography-root': {
                          color: 'primary.main',
                        },
                      },
                    },
                    actionBar: {
                      actions: ['accept', 'cancel'],
                      sx: {
                        '& .MuiButton-root': {
                          color: 'primary.main',
                          fontWeight: 500,
                        },
                      },
                    },
                  }}
                  localeText={{
                    cancelButtonLabel: 'Cancelar',
                    okButtonLabel: 'Aceptar',
                  }}
                />
                {errors.hora_fin && touched.hora_fin && (
                  <small className={styles.errorText}>{errors.hora_fin}</small>
                )}
              </div>
              <div></div>

              {/* Firmas */}
              <div className={styles.fieldHalf}>
                <label htmlFor="persona_que_atiende" className={styles.label}>
                  Persona que Atiende la Visita <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="persona_que_atiende"
                  value={formData.persona_que_atiende}
                  onChange={(e) => handleInputChange('persona_que_atiende', e.target.value)}
                  onBlur={() => handleBlur('persona_que_atiende')}
                  className={`${styles.input} ${errors.persona_que_atiende && touched.persona_que_atiende ? 'p-invalid' : ''}`}
                  placeholder="Nombre completo"
                />
                {errors.persona_que_atiende && touched.persona_que_atiende && (
                  <small className={styles.errorText}>{errors.persona_que_atiende}</small>
                )}
              </div>

              <div className={styles.fieldHalf}>
                <label htmlFor="profesionales_visita" className={styles.label}>
                  Profesional que Realiza la Visita <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="profesionales_visita"
                  value={formData.profesionales_visita}
                  onChange={(e) => handleInputChange('profesionales_visita', e.target.value)}
                  onBlur={() => handleBlur('profesionales_visita')}
                  className={`${styles.input} ${errors.profesionales_visita && touched.profesionales_visita ? 'p-invalid' : ''}`}
                  placeholder="Nombre completo"
                />
                {errors.profesionales_visita && touched.profesionales_visita && (
                  <small className={styles.errorText}>{errors.profesionales_visita}</small>
                )}
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
                  onBlur={() => handleBlur('observaciones')}
                  rows={6}
                  className={`${styles.textarea} ${errors.observaciones && touched.observaciones ? 'p-invalid' : ''}`}
                  placeholder="Describa los detalles de la visita (mínimo 10 caracteres)"
                />
                {errors.observaciones && touched.observaciones && (
                  <small className={styles.errorText}>{errors.observaciones}</small>
                )}
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
          {showPDFModal && (
            <ConstanciaPDF
              data={{
                ...formData,
                direccion: direccionData,
                fecha_visita: formData.fecha_visita ? formatearFecha(formData.fecha_visita) : '',
                hora_inicio: formData.hora_inicio ? formData.hora_inicio.format('hh:mm A') : '',
                hora_fin: formData.hora_fin ? formData.hora_fin.format('hh:mm A') : ''
              }}
              onClose={() => setShowPDFModal(false)}
            />
          )}
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}