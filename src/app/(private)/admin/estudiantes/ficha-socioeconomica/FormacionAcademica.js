"use client";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import styles from "./FichaSocioeconomica.module.css";

export default function FormacionAcademica({ data, onChange }) {
  const [localData, setLocalData] = useState(data || {});

  const programasOptions = [
    // Facultad de Ciencias de la Salud
    {
      label: "Bacteriología y Laboratorio Clínico",
      value: "Bacteriología y Laboratorio Clínico",
    },
    { label: "Enfermería", value: "Enfermería" },
    { label: "Fisioterapia", value: "Fisioterapia" },
    { label: "Fonoaudiología", value: "Fonoaudiología" },
    {
      label: "Instrumentación Quirúrgica",
      value: "Instrumentación Quirúrgica",
    },
    { label: "Medicina", value: "Medicina" },
    // Facultad de Ingenierías y Tecnologías
    { label: "Ingeniería Agroindustrial", value: "Ingeniería Agroindustrial" },
    {
      label: "Ingeniería Ambiental y Sanitaria",
      value: "Ingeniería Ambiental y Sanitaria",
    },
    { label: "Ingeniería de Sistemas", value: "Ingeniería de Sistemas" },
    // Facultad de Ciencias Económicas y Contables
    {
      label: "Administración de Empresas",
      value: "Administración de Empresas",
    },
    { label: "Contaduría Pública", value: "Contaduría Pública" },
    { label: "Economía", value: "Economía" },
    // Otras Facultades
    {
      label: "Administración en Hotelería y Turismo",
      value: "Administración en Hotelería y Turismo",
    },
    { label: "Arquitectura", value: "Arquitectura" },
    { label: "Artes Contemporáneas", value: "Artes Contemporáneas" },
    { label: "Ciencias Humanas", value: "Ciencias Humanas" },
    { label: "Comunicaciones", value: "Comunicaciones" },
    { label: "Derecho", value: "Derecho" },
    { label: "Diseño", value: "Diseño" },
    {
      label: "Licenciaturas (varias, incluyendo Educación Infantil)",
      value: "Licenciaturas (varias, incluyendo Educación Infantil)",
    },
    { label: "Microbiología Industrial", value: "Microbiología Industrial" },
    { label: "Tecnología Agropecuaria", value: "Tecnología Agropecuaria" },
    { label: "Psicología", value: "Psicología" },
    // Postgrados
    {
      label: "Especialización en Gerencia en Salud",
      value: "Especialización en Gerencia en Salud",
    },
    {
      label:
        "Especialización en Sistemas de Calidad y Auditoría de Servicios de Salud",
      value:
        "Especialización en Sistemas de Calidad y Auditoría de Servicios de Salud",
    },
    {
      label: "Especialización en Finanzas",
      value: "Especialización en Finanzas",
    },
    {
      label: "Especialización en Pedagogía Ambiental",
      value: "Especialización en Pedagogía Ambiental",
    },
    {
      label: "Maestría en Gerencia en Salud",
      value: "Maestría en Gerencia en Salud",
    },
    {
      label:
        "Maestría en Sistemas de Calidad y Auditoría de Servicios de Salud",
      value:
        "Maestría en Sistemas de Calidad y Auditoría de Servicios de Salud",
    },
    { label: "Maestría en Finanzas", value: "Maestría en Finanzas" },
    {
      label: "Maestría en Pedagogía Ambiental",
      value: "Maestría en Pedagogía Ambiental",
    },
  ];

  const semestresOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
  ];

  // === Listas de opciones según el diccionario ===
  const nivelEducativoOptions = [
    { label: "Primaria incompleta", value: "Primaria incompleta" },
    { label: "Primaria completa", value: "Primaria completa" },
    { label: "Secundaria incompleta", value: "Secundaria incompleta" },
    { label: "Secundaria completa", value: "Secundaria completa" },
    { label: "Técnico/Tecnólogo", value: "Técnico/Tecnólogo" },
    { label: "Universitario", value: "Universitario" },
    { label: "Postgrado", value: "Postgrado" },
  ];

  const tipoColegioOptions = [
    { label: "Público", value: "Publico" },
    { label: "Privado", value: "Privado" },
    { label: "Mixto", value: "Mixto" },
  ];

  const jornadaOptions = [
    { label: "Mañana", value: "Mañana" },
    { label: "Tarde", value: "Tarde" },
    { label: "Noche", value: "Noche" },
    { label: "Virtual", value: "Virtual" },
  ];

  // === Listas de opciones según el diccionario ===
  const institucionesOptions = [
    {
      label: "Colegio Técnico Industrial Simona Duque",
      value: "Colegio Técnico Industrial Simona Duque",
    },
    {
      label: "Instituto Técnico Agrícola Valledupar",
      value: "Instituto Técnico Agrícola Valledupar",
    },
    {
      label: "Escuela Técnica de Comercio Valledupar",
      value: "Escuela Técnica de Comercio Valledupar",
    },
    {
      label: "Colegio Técnico Microempresario",
      value: "Colegio Técnico Microempresario",
    },
    {
      label: "Instituto Técnico Eloy Alfaro",
      value: "Instituto Técnico Eloy Alfaro",
    },
    {
      label: "Colegio Técnico Carmelita Correa de Valledupar",
      value: "Colegio Técnico Carmelita Correa de Valledupar",
    },
    {
      label: "Instituto Técnico Fundación Universitaria de Valledupar",
      value: "Instituto Técnico Fundación Universitaria de Valledupar",
    },
    { label: "Liceo Valledupar", value: "Liceo Valledupar" },
    { label: "Colegio Santander", value: "Colegio Santander" },
    {
      label: "Institución Educativa Guillermo León Valencia",
      value: "Institución Educativa Guillermo León Valencia",
    },
    {
      label: "Colegio Integral Campestre de Valledupar",
      value: "Colegio Integral Campestre de Valledupar",
    },
    {
      label: "Instituto Pedagogía Valleduparense",
      value: "Instituto Pedagogía Valleduparense",
    },
    { label: "Colegio La Inmaculada", value: "Colegio La Inmaculada" },
    {
      label: "Corporación Educativa Noroccidental",
      value: "Corporación Educativa Noroccidental",
    },
    {
      label: "Colegio Metropolitano de Valledupar",
      value: "Colegio Metropolitano de Valledupar",
    },
    {
      label: "Instituto Técnico Nacional de Comercio",
      value: "Instituto Técnico Nacional de Comercio",
    },
    {
      label: "Colegio Distrital José Consuegra",
      value: "Colegio Distrital José Consuegra",
    },
    {
      label: "Institución Educativa Rural la Cantera",
      value: "Institución Educativa Rural la Cantera",
    },
    {
      label: "Colegio Nocturno de Valledupar",
      value: "Colegio Nocturno de Valledupar",
    },
    { label: "Otro", value: "Otro" },
  ];

  // === Manejo de cambios locales ===
  const handleChange = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  return (
    <div className={styles.form}>
      <div className={styles.sectionTitle}>Formación Académica Actual</div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Programa actual</label>
          <Dropdown
            value={localData.programa_actual || ""}
            options={programasOptions}
            onChange={(e) => handleChange("programa_actual", e.value)}
            placeholder="Seleccione..."
            filter
          />
        </div>

        <div className={styles.field}>
          <label>Semestre actual</label>
          <Dropdown
            value={localData.semestre_actual || ""}
            options={semestresOptions}
            onChange={(e) => handleChange("semestre_actual", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Promedio académico</label>
          <InputNumber
            value={localData.promedio || null}
            onValueChange={(e) => handleChange("promedio", e.value)}
            mode="decimal"
            minFractionDigits={1}
            maxFractionDigits={2}
            min={0}
            max={5}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Institución educativa de procedencia</label>
          <Dropdown
            value={localData.institucion_procedencia || ""}
            options={institucionesOptions}
            onChange={(e) => handleChange("institucion_procedencia", e.value)}
            placeholder="Seleccione..."
            filter
          />
        </div>

        <div className={styles.field}>
          <label>Tipo de colegio</label>
          <Dropdown
            value={localData.tipo_colegio || ""}
            options={tipoColegioOptions}
            onChange={(e) => handleChange("tipo_colegio", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Jornada</label>
          <Dropdown
            value={localData.jornada || ""}
            options={jornadaOptions}
            onChange={(e) => handleChange("jornada", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Nivel educativo alcanzado</label>
          <Dropdown
            value={localData.nivel_educativo || ""}
            options={nivelEducativoOptions}
            onChange={(e) => handleChange("nivel_educativo", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Razón de elección del programa</label>
          <InputText
            value={localData.razon_eleccion || ""}
            onChange={(e) => handleChange("razon_eleccion", e.target.value)}
            maxLength={200}
          />
        </div>

        <div className={styles.fieldWide}>
          <label>Expectativas académicas</label>
          <InputText
            value={localData.expectativas || ""}
            onChange={(e) => handleChange("expectativas", e.target.value)}
            placeholder="Describa brevemente sus expectativas académicas"
            maxLength={300}
          />
        </div>
      </div>
    </div>
  );
}
