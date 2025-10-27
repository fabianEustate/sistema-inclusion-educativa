"use client";

import { useEffect, useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import styles from "./FichaSocioeconomica.module.css";

const LS_KEY = "ficha_socioeconomica_full_v1";

export default function FichaSocioeconomicaPage() {
  const emptyForm = {
    fechaDiligenciamiento: new Date(),
    // I. Identificación
    nombres: "",
    apellidos: "",
    tipoDocumento: "T.I.",
    numeroDocumento: "",
    correo: "",
    semestreActual: "",
    programa: "",
    fechaNacimiento: null,
    edad: null,
    lugarNacimiento: "",
    estadoCivil: "",
    genero: "",
    orientacionSexual: "",
    orientacionSexualOtro: "",
    direccion: "",
    barrio: "",
    telefono: "",
    estrato: null,
    numeroHermanos: null,
    puestoEntreHermanos: "",
    tienePersonasACargo: false,
    cuantasPersonasACargo: null,
    parentescoPersonasACargo: "",
    deptoFamiliaOrigen: "",
    municipioFamiliaOrigen: "",
    conviveCon: [],
    conviveConOtro: "",
    gruposVulnerables: [],
    gruposVulnerablesOtro: "",
    foto: null,
    fotoPreview: null,
    // II. Composición Familiar
    familiares: [],
    // III. Educación
    caracterColegio: "",
    jornadaColegio: "",
    enfasisColegio: "",
    otrosEstudios: "",
    otrosEstudiosCuales: "",
    otrosEstudiosFinalizo: "",
    otrosEstudiosPorqueNo: "",
    motivoCarrera: "",
    medioInformacion: "",
    // IV. Salud
    enfermedad: "",
    cualEnfermedad: "",
    tratamiento: "",
    porqueTratamiento: "",
    consultaPsicologica: "",
    motivoPsicologica: "",
    tratamientoPsico: "",
    porqueTratamientoPsico: "",
    dificultades: [],
    seguridadSocial: "",
    eps: "",
    calidadEps: "",
    sistemaActivo: "",
    porqueSistemaNo: "",
    bebe: "",
    frecuenciaBebe: "",
    fuma: "",
    frecuenciaFuma: "",
    vidaSexual: "",
    planifica: "",
    metodoPlanifica: "",
    porqueNoPlanifica: "",
    sustancia: "",
    cualSustancia: "",
    frecuenciaSustancia: "",
    // V. Dimensión Económica
    proveedorRecursos: "",
    fuentesIngreso: [],
    fuenteOtro: "",
    trabaja: "",
    horarioTrabajo: "",
    ingresoFamiliar: null,
    rangoIngreso: "",
    // VI. Dimensión Física y Ambiental
    tipoVivienda: "",
    tenencia: "",
    valorArriendo: null,
    hipoteca: "",
    valorHipoteca: null,
    familiasComparten: null,
    serviciosPublicos: [],
    // VII. Utilización del tiempo libre
    actividadesDentro: "",
    actividadesFuera: "",
    grupoInteres: "",
    tipoGrupo: [],
    grupoOtro: "",
    deseaGrupo: "",
    tipoDeseaGrupo: "",
    // VIII. Firma y Observaciones
    firmaEstudiante: "",
    nombreTrabajadora: "",
  };

  const [form, setForm] = useState(emptyForm);

  const tipoDocumentos = ["T.I.", "C.C.", "C.E.", "Pasaporte", "Otro"];
  const estadoCivilOptions = [
    { label: "Casado(a)", value: "Casado(a)" },
    { label: "Soltero(a)", value: "Soltero(a)" },
    { label: "Unión libre", value: "Union libre" },
    { label: "Separado(a)", value: "Separado(a)" },
    { label: "Viudo(a)", value: "Viudo(a)" },
  ];
  const generoOptions = [
    { label: "M", value: "M" },
    { label: "F", value: "F" },
    { label: "Otro", value: "O" },
  ];

  const estratos = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
  ];

  const conviveOptions = [
    { label: "Familia de origen", value: "Familia de origen" },
    { label: "Cónyuge", value: "Cónyuge" },
    { label: "Solo", value: "Solo" },
    { label: "Amigos y/o compañeros", value: "Amigos y/o compañeros" },
    { label: "Parientes", value: "Parientes" },
    { label: "Familia de su cónyuge", value: "Familia de su cónyuge" },
    { label: "Pensión", value: "Pensión" },
    { label: "Otro", value: "Otro" },
  ];

  const vulnerabilidadOptions = [
    { label: "Negritudes", value: "Negritudes" },
    { label: "Desplazado", value: "Desplazado" },
    { label: "Indígena", value: "Indígena" },
    { label: "Desmovilizado", value: "Desmovilizado" },
    { label: "Persona en condición de discapacidad", value: "Discapacidad" },
    { label: "Madre cabeza de familia", value: "Madre cabeza de familia" },
    {
      label: "Víctima del conflicto armado",
      value: "Víctima conflicto armado",
    },
    { label: "Otro", value: "Otro" },
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.fechaDiligenciamiento) {
          parsed.fechaDiligenciamiento = new Date(parsed.fechaDiligenciamiento);
        }
        setForm((prev) => ({ ...prev, ...parsed, foto: null }));
      }
    } catch (err) {
      console.warn("No se pudo cargar borrador", err);
    }
  }, []);

  useEffect(() => {
    if (!form.fechaNacimiento) {
      setForm((prev) => ({ ...prev, edad: null }));
      return;
    }
    try {
      const diff = Date.now() - new Date(form.fechaNacimiento).getTime();
      const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      setForm((prev) => ({ ...prev, edad: age }));
    } catch (err) {
      console.warn("Error calculando edad", err);
    }
  }, [form.fechaNacimiento]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayOption = (arrayField, value) => {
    setForm((prev) => {
      const arr = prev[arrayField] || [];
      const has = arr.includes(value);
      return {
        ...prev,
        [arrayField]: has ? arr.filter((x) => x !== value) : [...arr, value],
      };
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen supera 5MB. Seleccione otra.");
      return;
    }
    const url = URL.createObjectURL(file);
    if (form.fotoPreview) URL.revokeObjectURL(form.fotoPreview);
    setForm((prev) => ({ ...prev, foto: file, fotoPreview: url }));
  };

  const items = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Estudiantes", url: "/dashboard/estudiantes/informacion" },
    { label: "Ficha Socioeconómica" },
  ];
  const home = { icon: "pi pi-home", url: "/dashboard" };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Ficha Socioeconómica</h2>
        <BreadCrumb model={items} home={home} />
      </div>

      <Divider />

      <Card className={styles.card}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.photoHeader}>
            <div className={styles.photoWrapper}>
              {form.fotoPreview ? (
                <img
                  alt="foto estudiante"
                  src={form.fotoPreview || "/placeholder.svg"}
                  className={styles.photoPreview}
                />
              ) : (
                <div className={styles.photoPlaceholder}>[ FOTO ]</div>
              )}
            </div>

            <div className={styles.photoControls}>
              <input
                id="foto"
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
              />
              <small className={styles.helperText}>
                Máx 5MB. Recomendado cuadrada.
              </small>
            </div>
          </div>

          <div className={styles.fieldWide}>
            <label className={styles.label}>Fecha de diligenciamiento</label>
            <Calendar
              value={form.fechaDiligenciamiento}
              dateFormat="dd/mm/yy"
              showIcon
              disabled
            />
          </div>

          <Divider />

          {/* SECCIÓN I: IDENTIFICACIÓN */}
          <h3 className={styles.sectionTitle}>I. Identificación</h3>
          <div className={styles.formGrid}>
            <div className={styles.fieldWide}>
              <label className={styles.label}>Nombres</label>
              <InputText
                value={form.nombres}
                onChange={(e) => updateField("nombres", e.target.value)}
                placeholder="Nombres"
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>Apellidos</label>
              <InputText
                value={form.apellidos}
                onChange={(e) => updateField("apellidos", e.target.value)}
                placeholder="Apellidos"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Documento de identidad (tipo)
              </label>
              <Dropdown
                value={form.tipoDocumento}
                options={tipoDocumentos}
                onChange={(e) => updateField("tipoDocumento", e.value)}
                placeholder="Seleccione"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Número de documento</label>
              <InputText
                value={form.numeroDocumento}
                onChange={(e) => updateField("numeroDocumento", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Correo electrónico</label>
              <InputText
                value={form.correo}
                onChange={(e) => updateField("correo", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Semestre actual</label>
              <InputText
                value={form.semestreActual}
                onChange={(e) => updateField("semestreActual", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Programa</label>
              <InputText
                value={form.programa}
                onChange={(e) => updateField("programa", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Fecha de nacimiento</label>
              <Calendar
                value={form.fechaNacimiento}
                onChange={(e) => updateField("fechaNacimiento", e.value)}
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Edad</label>
              <InputNumber
                value={form.edad}
                onValueChange={(e) => updateField("edad", e.value)}
                disabled
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Lugar de nacimiento</label>
              <InputText
                value={form.lugarNacimiento}
                onChange={(e) => updateField("lugarNacimiento", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Estado civil</label>
              <Dropdown
                value={form.estadoCivil}
                options={estadoCivilOptions}
                onChange={(e) => updateField("estadoCivil", e.value)}
                placeholder="Seleccione"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Género</label>
              <Dropdown
                value={form.genero}
                options={generoOptions}
                onChange={(e) => updateField("genero", e.value)}
                placeholder="Seleccione"
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Se reconoce como (orientación sexual)
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="orientacion"
                    value="Heterosexual"
                    checked={form.orientacionSexual === "Heterosexual"}
                    onChange={() =>
                      updateField("orientacionSexual", "Heterosexual")
                    }
                  />{" "}
                  Heterosexual
                </label>
                <label>
                  <input
                    type="radio"
                    name="orientacion"
                    value="Homosexual"
                    checked={form.orientacionSexual === "Homosexual"}
                    onChange={() =>
                      updateField("orientacionSexual", "Homosexual")
                    }
                  />{" "}
                  Homosexual
                </label>
                <label>
                  <input
                    type="radio"
                    name="orientacion"
                    value="Bisexual"
                    checked={form.orientacionSexual === "Bisexual"}
                    onChange={() =>
                      updateField("orientacionSexual", "Bisexual")
                    }
                  />{" "}
                  Bisexual
                </label>
                <label>
                  <input
                    type="radio"
                    name="orientacion"
                    value="Otro"
                    checked={form.orientacionSexual === "Otro"}
                    onChange={() => updateField("orientacionSexual", "Otro")}
                  />{" "}
                  Otro
                </label>
              </div>
              {form.orientacionSexual === "Otro" && (
                <InputText
                  value={form.orientacionSexualOtro}
                  onChange={(e) =>
                    updateField("orientacionSexualOtro", e.target.value)
                  }
                  placeholder="¿Cuál?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Dirección de residencia</label>
              <InputText
                value={form.direccion}
                onChange={(e) => updateField("direccion", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Barrio</label>
              <InputText
                value={form.barrio}
                onChange={(e) => updateField("barrio", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>No. Teléfono</label>
              <InputText
                value={form.telefono}
                onChange={(e) => updateField("telefono", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Estrato Socioeconómico</label>
              <Dropdown
                value={form.estrato}
                options={estratos}
                onChange={(e) => updateField("estrato", e.value)}
                placeholder="Seleccione"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Número de hermanos (incluido Ud.)
              </label>
              <InputNumber
                value={form.numeroHermanos}
                onValueChange={(e) => updateField("numeroHermanos", e.value)}
                showButtons
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Lugar que ocupa entre los hermanos
              </label>
              <InputText
                value={form.puestoEntreHermanos}
                onChange={(e) =>
                  updateField("puestoEntreHermanos", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>Tiene personas a cargo</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="personasacargo"
                    checked={!form.tienePersonasACargo}
                    onChange={() => updateField("tienePersonasACargo", false)}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="personasacargo"
                    checked={form.tienePersonasACargo}
                    onChange={() => updateField("tienePersonasACargo", true)}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.tienePersonasACargo && (
                <div className={styles.conditionalFields}>
                  <InputNumber
                    value={form.cuantasPersonasACargo}
                    onValueChange={(e) =>
                      updateField("cuantasPersonasACargo", e.value)
                    }
                    showButtons
                    placeholder="¿Cuántas?"
                  />
                  <InputText
                    value={form.parentescoPersonasACargo}
                    onChange={(e) =>
                      updateField("parentescoPersonasACargo", e.target.value)
                    }
                    placeholder="Parentesco"
                  />
                </div>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Dónde reside su familia de origen - Departamento
              </label>
              <InputText
                value={form.deptoFamiliaOrigen}
                onChange={(e) =>
                  updateField("deptoFamiliaOrigen", e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Municipio</label>
              <InputText
                value={form.municipioFamiliaOrigen}
                onChange={(e) =>
                  updateField("municipioFamiliaOrigen", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>Actualmente vive con</label>
              <div className={styles.checkboxGroup}>
                {conviveOptions.map((o) => (
                  <label key={o.value}>
                    <input
                      type="checkbox"
                      checked={form.conviveCon.includes(o.value)}
                      onChange={() => toggleArrayOption("conviveCon", o.value)}
                    />{" "}
                    {o.label}
                  </label>
                ))}
              </div>
              {form.conviveCon.includes("Otro") && (
                <InputText
                  value={form.conviveConOtro}
                  onChange={(e) =>
                    updateField("conviveConOtro", e.target.value)
                  }
                  placeholder="¿Cuál?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Pertenece a alguno de los siguientes grupos vulnerables
              </label>
              <div className={styles.checkboxGroup}>
                {vulnerabilidadOptions.map((o) => (
                  <label key={o.value}>
                    <input
                      type="checkbox"
                      checked={form.gruposVulnerables.includes(o.value)}
                      onChange={() =>
                        toggleArrayOption("gruposVulnerables", o.value)
                      }
                    />{" "}
                    {o.label}
                  </label>
                ))}
              </div>
              {form.gruposVulnerables.includes("Otro") && (
                <InputText
                  value={form.gruposVulnerablesOtro}
                  onChange={(e) =>
                    updateField("gruposVulnerablesOtro", e.target.value)
                  }
                  placeholder="¿Cuál?"
                  className={styles.conditionalInput}
                />
              )}
            </div>
          </div>

          <Divider />

          {/* SECCIÓN II: COMPOSICIÓN FAMILIAR */}
          <h3 className={styles.sectionTitle}>II. Composición Familiar</h3>
          <div className={styles.familyContainer}>
            <div className={styles.familyHeader}>
              <Button
                type="button"
                label="Agregar integrante"
                icon="pi pi-plus"
                onClick={() => {
                  if ((form.familiares || []).length >= 10)
                    return alert("Máximo 10 familiares permitidos.");
                  const nuevos = [
                    ...(form.familiares || []),
                    {
                      nombre: "",
                      parentesco: "",
                      edad: "",
                      ocupacion: "",
                      escolaridad: "",
                      telefono: "",
                      ingreso: "",
                    },
                  ];
                  setForm({ ...form, familiares: nuevos });
                }}
              />
            </div>

            <div className={styles.familyTable}>
              {(form.familiares || []).length === 0 && (
                <p className={styles.noData}>
                  No hay familiares registrados aún.
                </p>
              )}

              {(form.familiares || []).map((f, i) => (
                <div key={i} className={styles.familyRow}>
                  <div className={styles.familyCell}>
                    <InputText
                      value={f.nombre}
                      placeholder="Nombre y apellido"
                      onChange={(e) => {
                        const nuevos = [...form.familiares];
                        nuevos[i].nombre = e.target.value;
                        setForm({ ...form, familiares: nuevos });
                      }}
                    />
                  </div>
                  <div className={styles.familyCell}>
                    <InputText
                      value={f.parentesco}
                      placeholder="Parentesco"
                      onChange={(e) => {
                        const nuevos = [...form.familiares];
                        nuevos[i].parentesco = e.target.value;
                        setForm({ ...form, familiares: nuevos });
                      }}
                    />
                  </div>
                  <div className={styles.familyCellSmall}>
                    <InputNumber
                      value={f.edad}
                      placeholder="Edad"
                      onValueChange={(e) => {
                        const nuevos = [...form.familiares];
                        nuevos[i].edad = e.value;
                        setForm({ ...form, familiares: nuevos });
                      }}
                      showButtons
                      min={0}
                      max={120}
                    />
                  </div>
                  <div className={styles.familyCell}>
                    <InputText
                      value={f.ocupacion}
                      placeholder="Ocupación"
                      onChange={(e) => {
                        const nuevos = [...form.familiares];
                        nuevos[i].ocupacion = e.target.value;
                        setForm({ ...form, familiares: nuevos });
                      }}
                    />
                  </div>
                  <div className={styles.familyCell}>
                    <InputText
                      value={f.escolaridad}
                      placeholder="Escolaridad"
                      onChange={(e) => {
                        const nuevos = [...form.familiares];
                        nuevos[i].escolaridad = e.target.value;
                        setForm({ ...form, familiares: nuevos });
                      }}
                    />
                  </div>
                  <div className={styles.familyCell}>
                    <InputText
                      value={f.telefono}
                      placeholder="N° Teléfono"
                      onChange={(e) => {
                        const nuevos = [...form.familiares];
                        nuevos[i].telefono = e.target.value;
                        setForm({ ...form, familiares: nuevos });
                      }}
                    />
                  </div>
                  <div className={styles.familyCell}>
                    <InputNumber
                      value={f.ingreso}
                      placeholder="Ingreso mensual"
                      onValueChange={(e) => {
                        const nuevos = [...form.familiares];
                        nuevos[i].ingreso = e.value;
                        setForm({ ...form, familiares: nuevos });
                      }}
                      mode="currency"
                      currency="COP"
                      locale="es-CO"
                    />
                  </div>
                  <div className={styles.familyCellAction}>
                    <Button
                      icon="pi pi-trash"
                      className="p-button-danger p-button-rounded p-button-text"
                      onClick={() => {
                        const nuevos = form.familiares.filter(
                          (_, idx) => idx !== i
                        );
                        setForm({ ...form, familiares: nuevos });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* SECCIÓN III: EDUCACIÓN */}
          <h3 className={styles.sectionTitle}>III. Educación</h3>
          <div className={styles.formGrid}>
            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Carácter del colegio donde terminó secundaria
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="caracterColegio"
                    value="Oficial"
                    checked={form.caracterColegio === "Oficial"}
                    onChange={() => updateField("caracterColegio", "Oficial")}
                  />{" "}
                  Oficial
                </label>
                <label>
                  <input
                    type="radio"
                    name="caracterColegio"
                    value="Privado"
                    checked={form.caracterColegio === "Privado"}
                    onChange={() => updateField("caracterColegio", "Privado")}
                  />{" "}
                  Privado
                </label>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Jornada</label>
              <InputText
                value={form.jornadaColegio || ""}
                onChange={(e) => updateField("jornadaColegio", e.target.value)}
                placeholder="Mañana, tarde, noche..."
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>Énfasis</label>
              <InputText
                value={form.enfasisColegio || ""}
                onChange={(e) => updateField("enfasisColegio", e.target.value)}
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Ha realizado otros estudios?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="otrosEstudios"
                    checked={form.otrosEstudios === "No"}
                    onChange={() => updateField("otrosEstudios", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="otrosEstudios"
                    checked={form.otrosEstudios === "Sí"}
                    onChange={() => updateField("otrosEstudios", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>

              {form.otrosEstudios === "Sí" && (
                <div className={styles.conditionalFields}>
                  <label className={styles.label}>¿Cuáles?</label>
                  <InputText
                    value={form.otrosEstudiosCuales || ""}
                    onChange={(e) =>
                      updateField("otrosEstudiosCuales", e.target.value)
                    }
                  />
                  <label className={styles.label}>¿Finalizó?</label>
                  <div className={styles.checkboxGroup}>
                    <label>
                      <input
                        type="radio"
                        name="otrosEstudiosFinalizo"
                        checked={form.otrosEstudiosFinalizo === "Sí"}
                        onChange={() =>
                          updateField("otrosEstudiosFinalizo", "Sí")
                        }
                      />{" "}
                      Sí
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="otrosEstudiosFinalizo"
                        checked={form.otrosEstudiosFinalizo === "No"}
                        onChange={() =>
                          updateField("otrosEstudiosFinalizo", "No")
                        }
                      />{" "}
                      No
                    </label>
                  </div>
                  {form.otrosEstudiosFinalizo === "No" && (
                    <InputText
                      value={form.otrosEstudiosPorqueNo || ""}
                      onChange={(e) =>
                        updateField("otrosEstudiosPorqueNo", e.target.value)
                      }
                      placeholder="¿Por qué?"
                    />
                  )}
                </div>
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Por qué escogió la carrera que cursa en la UPC?
              </label>
              <InputTextarea
                autoResize
                rows={2}
                value={form.motivoCarrera || ""}
                onChange={(e) => updateField("motivoCarrera", e.target.value)}
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Por qué medio se enteró de los programas de la Universidad
                Popular del Cesar?
              </label>
              <InputTextarea
                autoResize
                rows={2}
                value={form.medioInformacion || ""}
                onChange={(e) =>
                  updateField("medioInformacion", e.target.value)
                }
              />
            </div>
          </div>

          <Divider />

          {/* SECCIÓN IV: SALUD */}
          <h3 className={styles.sectionTitle}>IV. Salud</h3>
          <div className={styles.formGrid}>
            <div className={styles.fieldWide}>
              <label className={styles.label}>¿Padece alguna enfermedad?</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="enfermedad"
                    checked={form.enfermedad === "No"}
                    onChange={() => updateField("enfermedad", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="enfermedad"
                    checked={form.enfermedad === "Sí"}
                    onChange={() => updateField("enfermedad", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.enfermedad === "Sí" && (
                <InputText
                  value={form.cualEnfermedad || ""}
                  onChange={(e) =>
                    updateField("cualEnfermedad", e.target.value)
                  }
                  placeholder="¿Cuál?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Recibe tratamiento médico?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="tratamiento"
                    checked={form.tratamiento === "No"}
                    onChange={() => updateField("tratamiento", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="tratamiento"
                    checked={form.tratamiento === "Sí"}
                    onChange={() => updateField("tratamiento", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.tratamiento === "Sí" && (
                <InputText
                  value={form.porqueTratamiento || ""}
                  onChange={(e) =>
                    updateField("porqueTratamiento", e.target.value)
                  }
                  placeholder="¿Por qué?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Ha estado en consulta psicológica?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="consultaPsicologica"
                    checked={form.consultaPsicologica === "No"}
                    onChange={() => updateField("consultaPsicologica", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="consultaPsicologica"
                    checked={form.consultaPsicologica === "Sí"}
                    onChange={() => updateField("consultaPsicologica", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.consultaPsicologica === "Sí" && (
                <InputText
                  value={form.motivoPsicologica || ""}
                  onChange={(e) =>
                    updateField("motivoPsicologica", e.target.value)
                  }
                  placeholder="Motivo de consulta"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Recibe tratamiento psicológico?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="tratamientoPsico"
                    checked={form.tratamientoPsico === "No"}
                    onChange={() => updateField("tratamientoPsico", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="tratamientoPsico"
                    checked={form.tratamientoPsico === "Sí"}
                    onChange={() => updateField("tratamientoPsico", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.tratamientoPsico === "Sí" && (
                <InputText
                  value={form.porqueTratamientoPsico || ""}
                  onChange={(e) =>
                    updateField("porqueTratamientoPsico", e.target.value)
                  }
                  placeholder="¿Por qué?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Presenta alguna dificultad a nivel de?
              </label>
              <div className={styles.checkboxGroup}>
                {[
                  "Auditivo",
                  "Visual",
                  "De lenguaje",
                  "Motriz",
                  "Relaciones personales",
                ].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={(form.dificultades || []).includes(item)}
                      onChange={() => toggleArrayOption("dificultades", item)}
                    />{" "}
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>Tipo de seguridad social</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="seguridadSocial"
                    value="Subsidiado"
                    checked={form.seguridadSocial === "Subsidiado"}
                    onChange={() =>
                      updateField("seguridadSocial", "Subsidiado")
                    }
                  />{" "}
                  Subsidiado
                </label>
                <label>
                  <input
                    type="radio"
                    name="seguridadSocial"
                    value="Contributivo"
                    checked={form.seguridadSocial === "Contributivo"}
                    onChange={() =>
                      updateField("seguridadSocial", "Contributivo")
                    }
                  />{" "}
                  Contributivo
                </label>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Nombre de la EPS</label>
              <InputText
                value={form.eps || ""}
                onChange={(e) => updateField("eps", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>En calidad de</label>
              <Dropdown
                value={form.calidadEps || ""}
                options={[
                  { label: "Cotizante", value: "Cotizante" },
                  { label: "Beneficiario", value: "Beneficiario" },
                ]}
                onChange={(e) => updateField("calidadEps", e.value)}
                placeholder="Seleccione"
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>¿Su sistema está activo?</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="sistemaActivo"
                    checked={form.sistemaActivo === "Sí"}
                    onChange={() => updateField("sistemaActivo", "Sí")}
                  />{" "}
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    name="sistemaActivo"
                    checked={form.sistemaActivo === "No"}
                    onChange={() => updateField("sistemaActivo", "No")}
                  />{" "}
                  No
                </label>
              </div>
              {form.sistemaActivo === "No" && (
                <InputText
                  value={form.porqueSistemaNo || ""}
                  onChange={(e) =>
                    updateField("porqueSistemaNo", e.target.value)
                  }
                  placeholder="¿Por qué?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>¿Bebe?</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="bebe"
                    checked={form.bebe === "No"}
                    onChange={() => updateField("bebe", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="bebe"
                    checked={form.bebe === "Sí"}
                    onChange={() => updateField("bebe", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.bebe === "Sí" && (
                <InputText
                  value={form.frecuenciaBebe || ""}
                  onChange={(e) =>
                    updateField("frecuenciaBebe", e.target.value)
                  }
                  placeholder="¿Con qué frecuencia?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>¿Fuma?</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="fuma"
                    checked={form.fuma === "No"}
                    onChange={() => updateField("fuma", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="fuma"
                    checked={form.fuma === "Sí"}
                    onChange={() => updateField("fuma", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.fuma === "Sí" && (
                <InputText
                  value={form.frecuenciaFuma || ""}
                  onChange={(e) =>
                    updateField("frecuenciaFuma", e.target.value)
                  }
                  placeholder="¿Con qué frecuencia?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>¿Tiene vida sexual activa?</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="vidaSexual"
                    checked={form.vidaSexual === "No"}
                    onChange={() => updateField("vidaSexual", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="vidaSexual"
                    checked={form.vidaSexual === "Sí"}
                    onChange={() => updateField("vidaSexual", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>

              {form.vidaSexual === "Sí" && (
                <div className={styles.conditionalFields}>
                  <label className={styles.label}>¿Planifica?</label>
                  <div className={styles.checkboxGroup}>
                    <label>
                      <input
                        type="radio"
                        name="planifica"
                        checked={form.planifica === "No"}
                        onChange={() => updateField("planifica", "No")}
                      />{" "}
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="planifica"
                        checked={form.planifica === "Sí"}
                        onChange={() => updateField("planifica", "Sí")}
                      />{" "}
                      Sí
                    </label>
                  </div>

                  {form.planifica === "Sí" && (
                    <InputText
                      value={form.metodoPlanifica || ""}
                      onChange={(e) =>
                        updateField("metodoPlanifica", e.target.value)
                      }
                      placeholder="¿Qué método utiliza?"
                    />
                  )}
                  {form.planifica === "No" && (
                    <InputText
                      value={form.porqueNoPlanifica || ""}
                      onChange={(e) =>
                        updateField("porqueNoPlanifica", e.target.value)
                      }
                      placeholder="¿Por qué no?"
                    />
                  )}
                </div>
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Consume alguna sustancia psicoactiva?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="sustancia"
                    checked={form.sustancia === "No"}
                    onChange={() => updateField("sustancia", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="sustancia"
                    checked={form.sustancia === "Sí"}
                    onChange={() => updateField("sustancia", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.sustancia === "Sí" && (
                <div className={styles.conditionalFields}>
                  <InputText
                    value={form.cualSustancia || ""}
                    onChange={(e) =>
                      updateField("cualSustancia", e.target.value)
                    }
                    placeholder="¿Cuál(es)?"
                  />
                  <InputText
                    value={form.frecuenciaSustancia || ""}
                    onChange={(e) =>
                      updateField("frecuenciaSustancia", e.target.value)
                    }
                    placeholder="¿Con qué frecuencia?"
                  />
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* SECCIÓN V: DIMENSIÓN ECONÓMICA */}
          <h3 className={styles.sectionTitle}>V. Dimensión Económica</h3>
          <div className={styles.formGrid}>
            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Quién provee los recursos para sus estudios y sostenimiento?
              </label>
              <InputText
                value={form.proveedorRecursos || ""}
                onChange={(e) =>
                  updateField("proveedorRecursos", e.target.value)
                }
                placeholder="Especifique nombre o relación"
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Fuentes principales de ingreso
              </label>
              <div className={styles.checkboxGroup}>
                {[
                  "Padre",
                  "Madre",
                  "Ambos",
                  "Ingresos propios",
                  "Ayuda familiar",
                  "Otro",
                ].map((opt) => (
                  <label key={opt}>
                    <input
                      type="checkbox"
                      checked={(form.fuentesIngreso || []).includes(opt)}
                      onChange={() => toggleArrayOption("fuentesIngreso", opt)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
              {form.fuentesIngreso?.includes("Otro") && (
                <InputText
                  value={form.fuenteOtro || ""}
                  onChange={(e) => updateField("fuenteOtro", e.target.value)}
                  placeholder="¿Cuál?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Usted trabaja actualmente?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="trabaja"
                    checked={form.trabaja === "No"}
                    onChange={() => updateField("trabaja", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="trabaja"
                    checked={form.trabaja === "Sí"}
                    onChange={() => updateField("trabaja", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>

              {form.trabaja === "Sí" && (
                <InputText
                  value={form.horarioTrabajo || ""}
                  onChange={(e) =>
                    updateField("horarioTrabajo", e.target.value)
                  }
                  placeholder="¿En qué horario?"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Ingreso familiar mensual (en pesos)
              </label>
              <InputNumber
                value={form.ingresoFamiliar || ""}
                onValueChange={(e) => updateField("ingresoFamiliar", e.value)}
                mode="currency"
                currency="COP"
                locale="es-CO"
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>Rango de ingreso familiar</label>
              <div className={styles.checkboxGroup}>
                {[
                  "Menos de un salario mínimo",
                  "Entre uno y tres salarios mínimos",
                  "Entre tres y cinco salarios mínimos",
                  "Más de cinco salarios mínimos",
                ].map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name="rangoIngreso"
                      checked={form.rangoIngreso === opt}
                      onChange={() => updateField("rangoIngreso", opt)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* SECCIÓN VI: DIMENSIÓN FÍSICA Y AMBIENTAL */}
          <h3 className={styles.sectionTitle}>
            VI. Dimensión Física y Ambiental
          </h3>
          <div className={styles.formGrid}>
            <div className={styles.fieldWide}>
              <label className={styles.label}>Tipo de vivienda</label>
              <div className={styles.checkboxGroup}>
                {["Casa", "Apartamento", "Habitación", "Casalote"].map(
                  (opt) => (
                    <label key={opt}>
                      <input
                        type="radio"
                        name="tipoVivienda"
                        checked={form.tipoVivienda === opt}
                        onChange={() => updateField("tipoVivienda", opt)}
                      />{" "}
                      {opt}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>Tenencia</label>
              <div className={styles.checkboxGroup}>
                {["Propia", "Familiar", "Arrendada"].map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name="tenencia"
                      checked={form.tenencia === opt}
                      onChange={() => updateField("tenencia", opt)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {form.tenencia === "Arrendada" && (
              <div className={styles.field}>
                <label className={styles.label}>Valor del arriendo</label>
                <InputNumber
                  value={form.valorArriendo || ""}
                  onValueChange={(e) => updateField("valorArriendo", e.value)}
                  mode="currency"
                  currency="COP"
                  locale="es-CO"
                />
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label}>¿Tiene hipoteca?</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="hipoteca"
                    checked={form.hipoteca === "No"}
                    onChange={() => updateField("hipoteca", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="hipoteca"
                    checked={form.hipoteca === "Sí"}
                    onChange={() => updateField("hipoteca", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.hipoteca === "Sí" && (
                <InputNumber
                  value={form.valorHipoteca || ""}
                  onValueChange={(e) => updateField("valorHipoteca", e.value)}
                  mode="currency"
                  currency="COP"
                  locale="es-CO"
                  placeholder="Valor de hipoteca"
                  className={styles.conditionalInput}
                />
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Número de familias que comparten la vivienda
              </label>
              <InputNumber
                value={form.familiasComparten || ""}
                onValueChange={(e) => updateField("familiasComparten", e.value)}
                showButtons
                min={1}
                max={10}
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Servicios públicos con que cuenta la vivienda
              </label>
              <div className={styles.checkboxGroup}>
                {["Agua", "Gas", "Luz", "Alcantarillado", "Teléfono"].map(
                  (opt) => (
                    <label key={opt}>
                      <input
                        type="checkbox"
                        checked={(form.serviciosPublicos || []).includes(opt)}
                        onChange={() =>
                          toggleArrayOption("serviciosPublicos", opt)
                        }
                      />{" "}
                      {opt}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* SECCIÓN VII: UTILIZACIÓN DEL TIEMPO LIBRE */}
          <h3 className={styles.sectionTitle}>
            VII. Utilización del tiempo libre
          </h3>
          <div className={styles.formGrid}>
            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Actividades que realiza en su tiempo libre dentro de la
                Universidad
              </label>
              <InputTextarea
                autoResize
                rows={2}
                value={form.actividadesDentro || ""}
                onChange={(e) =>
                  updateField("actividadesDentro", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Actividades que realiza fuera de la Universidad
              </label>
              <InputTextarea
                autoResize
                rows={2}
                value={form.actividadesFuera || ""}
                onChange={(e) =>
                  updateField("actividadesFuera", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Pertenece a algún grupo de interés dentro o fuera de la
                Universidad?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="grupoInteres"
                    checked={form.grupoInteres === "No"}
                    onChange={() => updateField("grupoInteres", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="grupoInteres"
                    checked={form.grupoInteres === "Sí"}
                    onChange={() => updateField("grupoInteres", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>

              {form.grupoInteres === "Sí" && (
                <div className={styles.conditionalFields}>
                  <div className={styles.checkboxGroup}>
                    {[
                      "Cultural",
                      "Deportivo",
                      "Político",
                      "De estudio",
                      "Ecológico",
                      "Otro",
                    ].map((opt) => (
                      <label key={opt}>
                        <input
                          type="checkbox"
                          checked={(form.tipoGrupo || []).includes(opt)}
                          onChange={() => toggleArrayOption("tipoGrupo", opt)}
                        />{" "}
                        {opt}
                      </label>
                    ))}
                  </div>
                  {form.tipoGrupo?.includes("Otro") && (
                    <InputText
                      value={form.grupoOtro || ""}
                      onChange={(e) => updateField("grupoOtro", e.target.value)}
                      placeholder="¿Cuál?"
                    />
                  )}
                </div>
              )}
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                ¿Le gustaría pertenecer a algún grupo de la universidad?
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="deseaGrupo"
                    checked={form.deseaGrupo === "No"}
                    onChange={() => updateField("deseaGrupo", "No")}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="deseaGrupo"
                    checked={form.deseaGrupo === "Sí"}
                    onChange={() => updateField("deseaGrupo", "Sí")}
                  />{" "}
                  Sí
                </label>
              </div>
              {form.deseaGrupo === "Sí" && (
                <InputText
                  value={form.tipoDeseaGrupo || ""}
                  onChange={(e) =>
                    updateField("tipoDeseaGrupo", e.target.value)
                  }
                  placeholder="¿De qué tipo?"
                  className={styles.conditionalInput}
                />
              )}
            </div>
          </div>

          <Divider />

          {/* SECCIÓN VIII: FIRMA Y OBSERVACIONES */}
          <h3 className={styles.sectionTitle}>VIII. Firma y Observaciones</h3>
          <div className={styles.formGrid}>
            <div className={styles.fieldWide}>
              <label className={styles.label}>Firma del estudiante</label>
              <InputText
                value={form.firmaEstudiante || ""}
                onChange={(e) => updateField("firmaEstudiante", e.target.value)}
                placeholder="Nombre o firma digital"
              />
            </div>

            <div className={styles.fieldWide}>
              <label className={styles.label}>
                Nombre de la trabajadora social
              </label>
              <InputText
                value={form.nombreTrabajadora || ""}
                onChange={(e) =>
                  updateField("nombreTrabajadora", e.target.value)
                }
              />
            </div>
          </div>

          <Divider />

          {/* BOTONES DE ACCIÓN */}
          <div className={styles.actions}>
            <Button
              label="Guardar borrador"
              icon="pi pi-save"
              type="button"
              onClick={() => {
                localStorage.setItem(LS_KEY, JSON.stringify(form));
                alert("Ficha guardada localmente");
              }}
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-outlined"
              type="button"
              onClick={() => {
                if (confirm("¿Seguro que deseas limpiar la ficha?")) {
                  setForm(emptyForm);
                  localStorage.removeItem(LS_KEY);
                }
              }}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
