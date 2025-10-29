'use client';
import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { FileUpload } from 'primereact/fileupload';
import { useRouter } from 'next/navigation';
import styles from './Crear.usuario.module.css';

export default function RegistrarUsuarios() {
  const router = useRouter();
  const fileUploadRef = useRef(null);

  // Estados para usuarios
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    contrasenia: '',
    confirmar_contrasenia: '',
    id_persona: '',
    id_rol: null
  });

  // Estados para personas
  const [persona, setPersona] = useState({
    tipo_documento: '',
    identificacion: '',
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    correo_institucional: '',
    telefono: '',
    url_foto: ''
  });

  const [fotoPreview, setFotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Opciones de roles (valores numéricos)
  const roles = [
    { label: 'Administrador', value: 1 },
    { label: 'Coordinador', value: 2 },
    { label: 'Docente', value: 3 },
    { label: 'Psicólogo', value: 4 },
    { label: 'Estudiante', value: 5 }
  ];

  // Opciones de tipo de documento
  const tiposDocumento = [
    { label: 'Cédula de Ciudadanía', value: 'CC' },
    { label: 'Tarjeta de Identidad', value: 'TI' },
    { label: 'Cédula de Extranjería', value: 'CE' },
    { label: 'Pasaporte', value: 'PP' }
  ];

  const validateField = (field, value) => {
    let error = null;

    switch (field) {
      case 'tipo_documento':
        if (!value) {
          error = 'Debe seleccionar un tipo de documento';
        }
        break;

      case 'identificacion':
        if (!value) {
          error = 'La identificación es obligatoria';
        } else if (value.length < 6) {
          error = 'La identificación debe tener al menos 6 dígitos';
        }
        break;

      case 'nombres':
        if (!value || !value.trim()) {
          error = 'Los nombres son obligatorios';
        } else if (value.trim().length < 2) {
          error = 'Los nombres deben tener al menos 2 caracteres';
        }
        break;

      case 'primer_apellido':
        if (!value || !value.trim()) {
          error = 'El primer apellido es obligatorio';
        } else if (value.trim().length < 2) {
          error = 'El primer apellido debe tener al menos 2 caracteres';
        }
        break;

      case 'correo_institucional':
        if (!value) {
          error = 'El correo institucional es obligatorio';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Debe ingresar un correo válido';
          }
        }
        break;

      case 'telefono':
        if (!value) {
          error = 'El teléfono es obligatorio';
        } else if (value.length !== 10) {
          error = 'El teléfono debe tener 10 dígitos';
        }
        break;

      case 'nombre_usuario':
        if (!value) {
          error = 'El nombre de usuario es obligatorio';
        } else if (value.length < 4) {
          error = 'El nombre de usuario debe tener al menos 4 caracteres';
        }
        break;

      case 'contrasenia':
        if (!value) {
          error = 'La contraseña es obligatoria';
        } else if (value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        }
        break;

      case 'confirmar_contrasenia':
        if (!value) {
          error = 'Debe confirmar la contraseña';
        } else if (value !== usuario.contrasenia) {
          error = 'Las contraseñas no coinciden';
        }
        break;

      case 'id_rol':
        if (!value) {
          error = 'Debe seleccionar un rol';
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

  const handlePersonaChange = (e) => {
    const { name, value } = e.target;
    
    // Validaciones en tiempo real
    let newValue = value;
    
    // Solo letras y espacios para nombres y apellidos
    if (['nombres', 'primer_apellido', 'segundo_apellido'].includes(name)) {
      newValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    
    // Solo números para identificación y teléfono
    if (['identificacion', 'telefono'].includes(name)) {
      newValue = value.replace(/[^0-9]/g, '');
    }
    
    setPersona(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Marcar como tocado
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validar en tiempo real si ya fue tocado
    if (touched[name]) {
      validateField(name, newValue);
    }
  };

  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    
    // Validación de nombre de usuario: sin espacios y sin caracteres especiales
    let newValue = value;
    if (name === 'nombre_usuario') {
      newValue = value.replace(/[^a-zA-Z0-9._-]/g, '');
    }
    
    setUsuario(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Marcar como tocado
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validar en tiempo real si ya fue tocado
    if (touched[name]) {
      validateField(name, newValue);
    }

    // Si cambia la contraseña, revalidar confirmación
    if (name === 'contrasenia' && touched.confirmar_contrasenia) {
      validateField('confirmar_contrasenia', usuario.confirmar_contrasenia);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    const value = field.startsWith('id_') || field === 'tipo_documento' 
      ? (field === 'id_rol' ? usuario[field] : persona[field])
      : field.includes('contrasenia') || field === 'nombre_usuario'
      ? usuario[field]
      : persona[field];
      
    validateField(field, value);
  };

  const handleFileSelect = (e) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFotoPreview(event.target.result);
        setPersona(prev => ({
          ...prev,
          url_foto: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar tipo de documento
    if (!persona.tipo_documento) {
      newErrors.tipo_documento = 'Debe seleccionar un tipo de documento';
    }
    
    // Validar identificación
    if (!persona.identificacion) {
      newErrors.identificacion = 'La identificación es obligatoria';
    } else if (persona.identificacion.length < 6) {
      newErrors.identificacion = 'La identificación debe tener al menos 6 dígitos';
    }
    
    // Validar nombres
    if (!persona.nombres.trim()) {
      newErrors.nombres = 'Los nombres son obligatorios';
    } else if (persona.nombres.trim().length < 2) {
      newErrors.nombres = 'Los nombres deben tener al menos 2 caracteres';
    }
    
    // Validar primer apellido
    if (!persona.primer_apellido.trim()) {
      newErrors.primer_apellido = 'El primer apellido es obligatorio';
    } else if (persona.primer_apellido.trim().length < 2) {
      newErrors.primer_apellido = 'El primer apellido debe tener al menos 2 caracteres';
    }
    
    // Validar correo institucional
    if (!persona.correo_institucional) {
      newErrors.correo_institucional = 'El correo institucional es obligatorio';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(persona.correo_institucional)) {
        newErrors.correo_institucional = 'Debe ingresar un correo válido';
      }
    }
    
    // Validar teléfono
    if (!persona.telefono) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (persona.telefono.length !== 10) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }
    
    // Validar nombre de usuario
    if (!usuario.nombre_usuario) {
      newErrors.nombre_usuario = 'El nombre de usuario es obligatorio';
    } else if (usuario.nombre_usuario.length < 4) {
      newErrors.nombre_usuario = 'El nombre de usuario debe tener al menos 4 caracteres';
    }
    
    // Validar contraseña
    if (!usuario.contrasenia) {
      newErrors.contrasenia = 'La contraseña es obligatoria';
    } else if (usuario.contrasenia.length < 8) {
      newErrors.contrasenia = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (!usuario.confirmar_contrasenia) {
      newErrors.confirmar_contrasenia = 'Debe confirmar la contraseña';
    } else if (usuario.contrasenia !== usuario.confirmar_contrasenia) {
      newErrors.confirmar_contrasenia = 'Las contraseñas no coinciden';
    }
    
    // Validar rol
    if (!usuario.id_rol) {
      newErrors.id_rol = 'Debe seleccionar un rol';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = {
      tipo_documento: true,
      identificacion: true,
      nombres: true,
      primer_apellido: true,
      segundo_apellido: true,
      correo_institucional: true,
      telefono: true,
      nombre_usuario: true,
      contrasenia: true,
      confirmar_contrasenia: true,
      id_rol: true
    };
    setTouched(allTouched);

    // Validar formulario
    if (!validateForm()) {
      alert('Por favor, corrija los errores en el formulario');
      return;
    }

    // Preparar datos para enviar al backend
    const datosCompletos = {
      // Datos de persona
      persona: {
        tipo_documento: persona.tipo_documento,
        identificacion: persona.identificacion,
        nombres: persona.nombres,
        primer_apellido: persona.primer_apellido,
        segundo_apellido: persona.segundo_apellido,
        correo_institucional: persona.correo_institucional,
        telefono: persona.telefono,
        url_foto: persona.url_foto
      },
      // Datos de usuario
      usuario: {
        nombre_usuario: usuario.nombre_usuario,
        contrasenia: usuario.contrasenia,
        id_rol: usuario.id_rol
      }
    };

    console.log('Datos a enviar:', datosCompletos);
    
    // Aquí iría la llamada al backend
    // await dispatch(crearUsuario(datosCompletos));
    
    alert('Usuario registrado exitosamente');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2 className={styles.title}>Registrar Usuario</h2>
        <Divider />

        <form onSubmit={handleSubmit}>
          {/* Sección: Foto de Perfil */}
          <div className={styles.photoSection}>
            <div className={styles.photoContainer}>
              <div className={styles.photoCircle}>
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Preview" className={styles.photoPreview} />
                ) : (
                  <span className={styles.photoPlaceholder}>[ FOTO ]</span>
                )}
              </div>
              <FileUpload
                ref={fileUploadRef}
                mode="basic"
                name="foto"
                accept="image/*"
                maxFileSize={5000000}
                onSelect={handleFileSelect}
                chooseLabel="Seleccionar archivo"
                className={styles.fileUpload}
                auto
              />
              <span className={styles.fileUploadHint}>
                Sin archivos seleccionados<br />
                Máx 5MB. Recomendado cuadrada.
              </span>
            </div>
          </div>

          <Divider />

          {/* Sección: Información Personal - Primera Fila */}
          <div className={styles.section}>
            <div className={styles.gridTwoColumns}>
              <div className={styles.field}>
                <label htmlFor="tipo_documento" className={styles.label}>
                  Tipo de Documento <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="tipo_documento"
                  name="tipo_documento"
                  value={persona.tipo_documento}
                  options={tiposDocumento}
                  onChange={handlePersonaChange}
                  onBlur={() => handleBlur('tipo_documento')}
                  placeholder="Cédula de Ciudadanía"
                  className={`${styles.inputMedium} ${errors.tipo_documento && touched.tipo_documento ? styles.inputError : ''}`}
                  required
                />
                {errors.tipo_documento && touched.tipo_documento && (
                  <small className={styles.errorText}>{errors.tipo_documento}</small>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="identificacion" className={styles.label}>
                  Identificación <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="identificacion"
                  name="identificacion"
                  value={persona.identificacion}
                  onChange={handlePersonaChange}
                  onBlur={() => handleBlur('identificacion')}
                  placeholder="Ingrese número de identificación"
                  className={`${styles.inputMedium} ${errors.identificacion && touched.identificacion ? styles.inputError : ''}`}
                  required
                />
                {errors.identificacion && touched.identificacion && (
                  <small className={styles.errorText}>{errors.identificacion}</small>
                )}
              </div>
            </div>
            {/* Segunda Fila - 3 columnas */}
            <div className={styles.gridThreeColumns}>
              <div className={styles.field}>
                <label htmlFor="nombres" className={styles.label}>
                  Nombres <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="nombres"
                  name="nombres"
                  value={persona.nombres}
                  onChange={handlePersonaChange}
                  onBlur={() => handleBlur('nombres')}
                  placeholder="Ingrese nombres"
                  className={`${styles.input} ${errors.nombres && touched.nombres ? styles.inputError : ''}`}
                  required
                />
                {errors.nombres && touched.nombres && (
                  <small className={styles.errorText}>{errors.nombres}</small>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="primer_apellido" className={styles.label}>
                  Primer Apellido <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="primer_apellido"
                  name="primer_apellido"
                  value={persona.primer_apellido}
                  onChange={handlePersonaChange}
                  onBlur={() => handleBlur('primer_apellido')}
                  placeholder="Ingrese primer apellido"
                  className={`${styles.input} ${errors.primer_apellido && touched.primer_apellido ? styles.inputError : ''}`}
                  required
                />
                {errors.primer_apellido && touched.primer_apellido && (
                  <small className={styles.errorText}>{errors.primer_apellido}</small>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="segundo_apellido" className={styles.label}>
                  Segundo Apellido
                </label>
                <InputText
                  id="segundo_apellido"
                  name="segundo_apellido"
                  value={persona.segundo_apellido}
                  onChange={handlePersonaChange}
                  placeholder="Ingrese segundo apellido"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Tercera Fila - 2 columnas */}
            <div className={styles.gridTwoColumns}>
              <div className={styles.field}>
                <label htmlFor="correo_institucional" className={styles.label}>
                  Correo Institucional <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="correo_institucional"
                  name="correo_institucional"
                  type="email"
                  value={persona.correo_institucional}
                  onChange={handlePersonaChange}
                  onBlur={() => handleBlur('correo_institucional')}
                  placeholder="correo@institucion.edu.co"
                  className={`${styles.inputMedium} ${errors.correo_institucional && touched.correo_institucional ? styles.inputError : ''}`}
                  required
                />
                {errors.correo_institucional && touched.correo_institucional && (
                  <small className={styles.errorText}>{errors.correo_institucional}</small>
                )}
              </div>

              <div className={styles.phoneField}>
                <label htmlFor="telefono" className={styles.label}>
                  Teléfono <span className={styles.required}>*</span>
                </label>
                <div className={styles.phoneInputContainer}>
                  <span className={styles.phonePrefix}>+57</span>
                  <InputText
                    id="telefono"
                    name="telefono"
                    value={persona.telefono}
                    onChange={handlePersonaChange}
                    onBlur={() => handleBlur('telefono')}
                    placeholder="Ingrese teléfono"
                    className={`${styles.inputMedium} ${errors.telefono && touched.telefono ? styles.inputError : ''}`}
                    maxLength={10}
                    required
                  />
                </div>
                {errors.telefono && touched.telefono && (
                  <small className={styles.errorText}>{errors.telefono}</small>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* Sección: Datos de Usuario */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Datos de Usuario</h3>
            
            <div className={styles.gridThreeColumns}>
              <div className={styles.inputMedium}>
                <label htmlFor="nombre_usuario" className={styles.label}>
                  Nombre de Usuario <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="nombre_usuario"
                  name="nombre_usuario"
                  value={usuario.nombre_usuario}
                  onChange={handleUsuarioChange}
                  onBlur={() => handleBlur('nombre_usuario')}
                  placeholder="Ingrese nombre de usuario"
                  className={`${styles.inputMedium} ${errors.nombre_usuario && touched.nombre_usuario ? styles.inputError : ''}`}
                  required
                />
                {errors.nombre_usuario && touched.nombre_usuario && (
                  <small className={styles.errorText}>{errors.nombre_usuario}</small>
                )}
              </div>

              <div className={styles.inputMedium}>
                <label htmlFor="contrasenia" className={styles.label}>
                  Contraseña <span className={styles.required}>*</span>
                </label>
                <Password
                  id="contrasenia"
                  name="contrasenia"
                  value={usuario.contrasenia}
                  onChange={handleUsuarioChange}
                  onBlur={() => handleBlur('contrasenia')}
                  placeholder="Ingrese contraseña"
                  inputClassName={`${styles.inputMedium} ${errors.contrasenia && touched.contrasenia ? styles.inputError : ''}`}
                  toggleMask
                  feedback={false}
                  required
                />
                {errors.contrasenia && touched.contrasenia && (
                  <small className={styles.errorText}>{errors.contrasenia}</small>
                )}
              </div>

              <div className={styles.passfield}>
                <label htmlFor="confirmar_contrasenia" className={styles.label}>
                  Confirmar Contraseña <span className={styles.required}>*</span>
                </label>
                <Password
                  id="confirmar_contrasenia"
                  name="confirmar_contrasenia"
                  value={usuario.confirmar_contrasenia}
                  onChange={handleUsuarioChange}
                  onBlur={() => handleBlur('confirmar_contrasenia')}
                  placeholder="Confirme la contraseña"
                  inputClassName={`${styles.inputMedium} ${errors.confirmar_contrasenia && touched.confirmar_contrasenia ? styles.inputError : ''}`}
                  toggleMask
                  feedback={false}
                  required
                />
                {errors.confirmar_contrasenia && touched.confirmar_contrasenia && (
                  <small className={styles.errorText}>{errors.confirmar_contrasenia}</small>
                )}
              </div>
            </div>

            <div className={styles.gridSingleColumn}>
              <div className={styles.field}>
                <label htmlFor="id_rol" className={styles.label}>
                  Rol <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="id_rol"
                  name="id_rol"
                  value={usuario.id_rol}
                  options={roles}
                  onChange={handleUsuarioChange}
                  onBlur={() => handleBlur('id_rol')}
                  placeholder="Seleccione un rol"
                  className={`${styles.input} ${errors.id_rol && touched.id_rol ? styles.inputError : ''}`}
                  required
                />
                {errors.id_rol && touched.id_rol && (
                  <small className={styles.errorText}>{errors.id_rol}</small>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* Botones de acción */}
          <div className={styles.buttonContainer}>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className={styles.cancelButton}
              onClick={handleCancel}
              type="button"
            />
            <Button
              label="Guardar Usuario"
              icon="pi pi-check"
              className={styles.saveButton}
              type="submit"
            />
          </div>
        </form>
      </Card>
    </div>
  );
}