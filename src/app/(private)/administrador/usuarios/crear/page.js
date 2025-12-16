"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import { useRouter } from "next/navigation";

import { crearPersona, buscarRoles, buscarTiposDocumento } from "@/services/personas/personas_service";
import { crearUsuario } from "@/services/usuarios/usuarios_service";

import styles from "./Crear.usuario.module.css";

export default function RegistrarUsuarios() {
  const router = useRouter();
  const fileUploadRef = useRef(null);

  // ==========================
  // ESTADOS
  // ==========================
  const [rolesBackend, setRolesBackend] = useState([]);
  const [tiposDocumentoBackend, setTiposDocumentoBackend] = useState([]);

  const [fotoPreview, setFotoPreview] = useState(null);
  const [errorContrasenia, setErrorContrasenia] = useState("");

  const [usuario, setUsuario] = useState({
    nombre_usuario: "",
    contrasenia: "",
    confirmar_contrasenia: "",
    id_rol: null,
  });

  const [persona, setPersona] = useState({
    tipo_documento: "",
    identificacion: "",
    nombres: "",
    primer_apellido: "",
    segundo_apellido: "",
    correo_institucional: "",
    telefono: "",
  });

  // ================================
  // CARGAR ROLES Y TIPOS DOCUMENTO
  // ================================
  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const data = await buscarRoles();
        const list = data.map((r) => ({
          label: r.nombre,
          value: r.id_rol,
        }));
        setRolesBackend(list);
      } catch (e) {
        console.error("Error cargando roles:", e);
      }
    };

    const cargarTiposDocumento = async () => {
      try {
        const data = await buscarTiposDocumento(); // <<<<<< NUEVO SERVICIO
        const list = data.tipos_documento.map((td) => ({
          label: td.description,
          value: td.code,
        }));
        setTiposDocumentoBackend(list);
      } catch (e) {
        console.error("Error cargando tipos de documento:", e);
      }
    };

    cargarRoles();
    cargarTiposDocumento();
  }, []);

  // ======================
  // HANDLERS
  // ======================
  const handlePersonaChange = (e) => {
    const { name, value } = e.target;
    setPersona((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;

    setUsuario((prev) => {
      const updated = { ...prev, [name]: value };

      // Validación: si ambos campos existen, comparar; si no, limpiar error.
      if (updated.contrasenia || updated.confirmar_contrasenia) {
        if (updated.contrasenia && updated.confirmar_contrasenia) {
          setErrorContrasenia(
            updated.contrasenia === updated.confirmar_contrasenia ? "" : "Las contraseñas no coinciden"
          );
        } else {
          // todavía falta uno de los dos: no mostrar error
          setErrorContrasenia("");
        }
      } else {
        setErrorContrasenia("");
      }

      return updated;
    });
  };


  // ======================
  // PREVIEW FOTO
  // ======================
  const handleFileSelect = (e) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFotoPreview(event.target.result);
        setPersona((prev) => ({
          ...prev,
          url_foto: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ======================
  // SUBMIT FORMULARIO
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.contrasenia !== usuario.confirmar_contrasenia) {
      setErrorContrasenia("Las contraseñas no coinciden");
      return;
    }

    try {
      // ======================================
      // 1️⃣ Construir payload EXACTO para PERSONA
      // ======================================
      const personaPayload = {
        correo_institucional: persona.correo_institucional,
        identificacion: persona.identificacion,
        nombres: persona.nombres,
        primer_apellido: persona.primer_apellido,
        segundo_apellido: persona.segundo_apellido,
        telefono: persona.telefono,
        tipo_documento: persona.tipo_documento,
      };

      console.log("📤 Enviando persona:", personaPayload);

      // Crear persona
      const personaCreada = await crearPersona(personaPayload);

      console.log("✅ Persona creada:", personaCreada);

      // ======================================
      // 2️⃣ Construir payload EXACTO para USUARIO
      // ======================================
      const usuarioPayload = {
        nombre_usuario: usuario.nombre_usuario,
        contrasenia: usuario.contrasenia,
        id_rol: usuario.id_rol,
        id_persona: personaCreada.id_persona, // viene del backend
        activo: true, // según especificación del endpoint
      };

      console.log("📤 Enviando usuario:", usuarioPayload);

      // Crear usuario
      await crearUsuario(usuarioPayload);

      alert("Usuario registrado exitosamente");
      router.push("/administrador/dashboard");

    } catch (error) {
      console.error("❌ Error al registrar:", error);
      alert("Error al registrar usuario");
    }
  };



  const handleCancel = () => router.back();

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2 className={styles.title}>Registrar Usuario</h2>
        <Divider />

        <form onSubmit={handleSubmit}>
          {/* FOTO */}
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
                accept="image/*"
                maxFileSize={5000000}
                onSelect={handleFileSelect}
                chooseLabel="Seleccionar archivo"
                className={styles.fileUpload}
              />

              <span className={styles.fileUploadHint}>
                Máx 5MB. Recomendado cuadrada.
              </span>
            </div>
          </div>

          <Divider />

          {/* DATOS PERSONALES */}
          <div className={styles.section}>

            <div className={styles.gridTwoColumns}>
              <div className={styles.field}>
                <label className={styles.label}>Tipo de Documento *</label>
                <Dropdown
                  name="tipo_documento"
                  value={persona.tipo_documento}
                  options={tiposDocumentoBackend}
                  onChange={handlePersonaChange}
                  placeholder="Seleccione"
                  className={styles.inputMedium}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Identificación *</label>
                <InputText
                  name="identificacion"
                  value={persona.identificacion}
                  onChange={handlePersonaChange}
                  className={styles.inputMedium}
                  required
                />
              </div>
            </div>

            {/* Nombres */}
            <div className={styles.gridThreeColumns}>
              <div className={styles.field}>
                <label className={styles.label}>Nombres *</label>
                <InputText
                  name="nombres"
                  value={persona.nombres}
                  onChange={handlePersonaChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Primer Apellido *</label>
                <InputText
                  name="primer_apellido"
                  value={persona.primer_apellido}
                  onChange={handlePersonaChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Segundo Apellido</label>
                <InputText
                  name="segundo_apellido"
                  value={persona.segundo_apellido}
                  onChange={handlePersonaChange}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Contacto */}
            <div className={styles.gridTwoColumns}>
              <div className={styles.field}>
                <label className={styles.label}>Correo Institucional *</label>
                <InputText
                  name="correo_institucional"
                  value={persona.correo_institucional}
                  onChange={handlePersonaChange}
                  className={styles.inputMedium}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Teléfono *</label>
                <InputText
                  name="telefono"
                  value={persona.telefono}
                  onChange={handlePersonaChange}
                  className={styles.inputMedium}
                  required
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* DATOS DE USUARIO */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Datos de Usuario</h3>

            <div className={styles.gridThreeColumns}>
              <div>
                <label className={styles.label}>Nombre de Usuario *</label>
                <InputText
                  name="nombre_usuario"
                  value={usuario.nombre_usuario}
                  onChange={handleUsuarioChange}
                  className={styles.inputMedium}
                  required
                />
              </div>

              <div>
                <label className={styles.label}>Contraseña *</label>
                <Password
                  name="contrasenia"
                  value={usuario.contrasenia}
                  onChange={handleUsuarioChange}
                  inputClassName={styles.inputMedium}
                  toggleMask
                  feedback={false}
                  required
                />
              </div>

              <div>
                <label className={styles.label}>Confirmar Contraseña *</label>
                <Password
                  name="confirmar_contrasenia"
                  value={usuario.confirmar_contrasenia}
                  onChange={handleUsuarioChange}
                  inputClassName={
                    errorContrasenia ? `${styles.inputMedium} ${styles.inputError}` : styles.inputMedium
                  }
                  toggleMask
                  feedback={false}
                  required
                />
                {errorContrasenia && (
                  <small className={styles.errorText}>{errorContrasenia}</small>
                )}
              </div>
            </div>

            {/* ROLES */}
            <div>
              <label className={styles.label}>Rol *</label>
              <Dropdown
                name="id_rol"
                value={usuario.id_rol}
                options={rolesBackend}
                onChange={handleUsuarioChange}
                placeholder="Seleccione un rol"
                className={styles.input}
                required
              />
            </div>
          </div>

          <Divider />

          {/* BOTONES */}
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
