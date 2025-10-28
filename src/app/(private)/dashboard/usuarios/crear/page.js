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
  const [errorContrasenia, setErrorContrasenia] = useState('');

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

  const handlePersonaChange = (e) => {
    const { name, value } = e.target;
    setPersona(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar contraseñas
    if (name === 'confirmar_contrasenia' || name === 'contrasenia') {
      if (name === 'confirmar_contrasenia') {
        if (value !== usuario.contrasenia) {
          setErrorContrasenia('Las contraseñas no coinciden');
        } else {
          setErrorContrasenia('');
        }
      }
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (usuario.contrasenia !== usuario.confirmar_contrasenia) {
      setErrorContrasenia('Las contraseñas no coinciden');
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
                  placeholder="Cédula de Ciudadanía"
                  className={styles.inputMedium}
                  required
                />
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
                  placeholder="Ingrese número de identificación"
                  className={styles.inputMedium}
                  required
                />
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
                  placeholder="Ingrese nombres"
                  className={styles.input}
                  required
                />
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
                  placeholder="Ingrese primer apellido"
                  className={styles.input}
                  required
                />
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
                  placeholder="correo@institucion.edu.co"
                  className={styles.inputMedium}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="telefono" className={styles.label}>
                  Teléfono <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="telefono"
                  name="telefono"
                  value={persona.telefono}
                  onChange={handlePersonaChange}
                  placeholder="Ingrese teléfono"
                  className={styles.inputMedium}
                  required
                />
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
                  placeholder="Ingrese nombre de usuario"
                  className={styles.inputMedium}
                  required
                />
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
                  placeholder="Ingrese contraseña"
                  inputClassName={styles.inputMedium}
                  toggleMask
                  feedback={false}
                  required
                />
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
                  placeholder="Confirme la contraseña"
                  inputClassName={errorContrasenia ? `${styles.inputMedium} ${styles.inputError}` : styles.inputMedium}
                  toggleMask
                  feedback={false}
                  required
                />
                {errorContrasenia && (
                  <small className={styles.errorText}>{errorContrasenia}</small>
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
                  placeholder="Seleccione un rol"
                  className={styles.input}
                  required
                />
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
              disabled={!!errorContrasenia}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}