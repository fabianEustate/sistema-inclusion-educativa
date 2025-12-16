"use client";
import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import styles from "./FichaSocioeconomica.module.css";

// Importamos todas las secciones existentes (no se cambia ningún nombre ni ruta)
import DatosPersonales from "./DatosPersonales";
import FormacionAcademica from "./FormacionAcademica";
import DatosClinicos from "./DatosClinicos";
import CondicionEconomica from "./CondicionEconomica";
import AmbienteResidencial from "./AmbienteResidencial";
import Familiares from "./Familiares";
import Hobbie from "./Hobbie";
import ResumenFicha from "./ResumenFicha";

export default function Page() {
  // Estado global para toda la ficha
  const [formData, setFormData] = useState({
    datos_personales: {},
    formacion_academica: {},
    datos_clinicos: {},
    condicion_economica: {},
    ambiente_residencial: {},
    familiares: {},
    hobbie: {},
  });

  // Control de pasos
  const [currentStep, setCurrentStep] = useState(0);

  // Función para actualizar datos de cada sección
  const handleSectionChange = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  // Avanzar y retroceder entre secciones
  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  // Envío final (se manejará luego hacia la API real)
  const handleSubmit = () => {
    console.log("Datos finales listos para enviar:", formData);
    // Aquí se podrá integrar el endpoint del backend
  };

  // Definimos las secciones del formulario en orden
  const steps = [
    {
      name: "Datos Personales",
      component: (
        <DatosPersonales
          data={formData.datos_personales}
          onChange={(data) => handleSectionChange("datos_personales", data)}
        />
      ),
    },
    {
      name: "Formación Académica",
      component: (
        <FormacionAcademica
          data={formData.formacion_academica}
          onChange={(data) => handleSectionChange("formacion_academica", data)}
        />
      ),
    },
    {
      name: "Datos Clínicos",
      component: (
        <DatosClinicos
          data={formData.datos_clinicos}
          onChange={(data) => handleSectionChange("datos_clinicos", data)}
        />
      ),
    },
    {
      name: "Condición Económica",
      component: (
        <CondicionEconomica
          data={formData.condicion_economica}
          onChange={(data) => handleSectionChange("condicion_economica", data)}
        />
      ),
    },
    {
      name: "Ambiente Residencial",
      component: (
        <AmbienteResidencial
          data={formData.ambiente_residencial}
          onChange={(data) => handleSectionChange("ambiente_residencial", data)}
        />
      ),
    },
    {
      name: "Familiares",
      component: (
        <Familiares
          data={formData.familiares}
          onChange={(data) => handleSectionChange("familiares", data)}
        />
      ),
    },
    {
      name: "Hobbies",
      component: (
        <Hobbie
          data={formData.hobbie}
          onChange={(data) => handleSectionChange("hobbie", data)}
        />
      ),
    },
    {
      name: "Resumen",
      component: <ResumenFicha formData={formData} onSubmit={handleSubmit} />,
    },
  ];

  // Sección actual a mostrar
  const current = steps[currentStep];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Ficha Socioeconómica</h2>
        <p>
          Paso {currentStep + 1} de {steps.length}: {current.name}
        </p>
      </div>

      <Card className={styles.card}>
        <div className={styles.form}>
          {current.component}

          <div className={styles.actions}>
            {currentStep > 0 && (
              <Button
                label="Atrás"
                icon="pi pi-arrow-left"
                className="p-button-secondary"
                onClick={handlePrevious}
              />
            )}

            {currentStep < steps.length - 1 && (
              <Button
                label="Continuar"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={handleNext}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

/** 
 * "use client"
import { useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import styles from "./FichaSocioeconomica.module.css"

// Importamos todas las secciones existentes (no se cambia ningún nombre ni ruta)
import DatosPersonales from "./DatosPersonales"
import FormacionAcademica from "./FormacionAcademica"
import DatosClinicos from "./DatosClinicos"
import CondicionEconomica from "./CondicionEconomica"
import AmbienteResidencial from "./AmbienteResidencial"
import Familiares from "./Familiares"
import Hobbie from "./Hobbie"
import ResumenFicha from "./ResumenFicha"

export default function Page() {
  // Estado global para toda la ficha
  const [formData, setFormData] = useState({
    datos_personales: {},
    formacion_academica: {},
    datos_clinicos: {},
    condicion_economica: {},
    ambiente_residencial: {},
    familiares: {},
    hobbie: {},
  })

  // Control de pasos
  const [currentStep, setCurrentStep] = useState(0)
  const [validationError, setValidationError] = useState("")

  // Función para actualizar datos de cada sección
  const handleSectionChange = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
    setValidationError("")
  }

  const validateSection = (section, data) => {
    const requiredFields = {
      datos_personales: [
        "tipo_documento",
        "numero_documento",
        "primer_nombre",
        "primer_apellido",
        "sexo",
        "fecha_nacimiento",
        "estado_civil",
        "correo",
        "telefono",
        "direccion",
      ],
      formacion_academica: [
        "programa_actual",
        "semestre_actual",
        "promedio",
        "institucion_procedencia",
        "tipo_colegio",
        "jornada",
        "nivel_educativo",
      ],
      datos_clinicos: ["tipo_seguridad_social", "ips_eps", "calidad_afiliacion"],
      condicion_economica: ["proveedor_recursos", "trabaja", "horario_trabajo", "ingreso_familiar_mensual"],
      ambiente_residencial: ["tipo_vivienda", "tenencia", "numero_familias_vivienda", "servicios_publicos"],
      familiares: [],
      hobbie: ["actividades_dentro_universidad", "actividades_fuera_universidad", "pertenece_grupo"],
    }

    const fieldsToCheck = requiredFields[section] || []
    const emptyFields = []

    for (const field of fieldsToCheck) {
      const value = data[field]
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0)
      ) {
        emptyFields.push(field)
      }
    }

    return emptyFields
  }

  // Avanzar y retroceder entre secciones
  const handleNext = () => {
    const currentSection = steps[currentStep]
    const emptyFields = validateSection(currentSection.id, formData[currentSection.id])

    if (emptyFields.length > 0) {
      setValidationError(`Por favor complete todos los campos obligatorios en esta sección.`)
      return
    }

    setValidationError("")
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => setCurrentStep((prev) => prev - 1)

  // Envío final (se manejará luego hacia la API real)
  const handleSubmit = () => {
    console.log("Datos finales listos para enviar:", formData)
    // Aquí se podrá integrar el endpoint del backend
  }

  // Definimos las secciones del formulario en orden
  const steps = [
    {
      id: "datos_personales",
      name: "Datos Personales",
      component: (
        <DatosPersonales
          data={formData.datos_personales}
          onChange={(data) => handleSectionChange("datos_personales", data)}
        />
      ),
    },
    {
      id: "formacion_academica",
      name: "Formación Académica",
      component: (
        <FormacionAcademica
          data={formData.formacion_academica}
          onChange={(data) => handleSectionChange("formacion_academica", data)}
        />
      ),
    },
    {
      id: "datos_clinicos",
      name: "Datos Clínicos",
      component: (
        <DatosClinicos
          data={formData.datos_clinicos}
          onChange={(data) => handleSectionChange("datos_clinicos", data)}
        />
      ),
    },
    {
      id: "condicion_economica",
      name: "Condición Económica",
      component: (
        <CondicionEconomica
          data={formData.condicion_economica}
          onChange={(data) => handleSectionChange("condicion_economica", data)}
        />
      ),
    },
    {
      id: "ambiente_residencial",
      name: "Ambiente Residencial",
      component: (
        <AmbienteResidencial
          data={formData.ambiente_residencial}
          onChange={(data) => handleSectionChange("ambiente_residencial", data)}
        />
      ),
    },
    {
      id: "familiares",
      name: "Familiares",
      component: <Familiares data={formData.familiares} onChange={(data) => handleSectionChange("familiares", data)} />,
    },
    {
      id: "hobbie",
      name: "Hobbies",
      component: <Hobbie data={formData.hobbie} onChange={(data) => handleSectionChange("hobbie", data)} />,
    },
    {
      id: "resumen",
      name: "Resumen",
      component: <ResumenFicha formData={formData} onSubmit={handleSubmit} />,
    },
  ]

  // Sección actual a mostrar
  const current = steps[currentStep]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Ficha Socioeconómica</h2>
        <p>
          Paso {currentStep + 1} de {steps.length}: {current.name}
        </p>
      </div>

      <Card className={styles.card}>
        <div className={styles.form}>
          {current.component}

          {validationError && (
            <div
              style={{
                color: "#d32f2f",
                marginBottom: "1rem",
                padding: "0.75rem",
                backgroundColor: "#ffebee",
                borderRadius: "4px",
                border: "1px solid #d32f2f",
              }}
            >
              {validationError}
            </div>
          )}

          <div className={styles.actions}>
            {currentStep > 0 && (
              <Button label="Atrás" icon="pi pi-arrow-left" className="p-button-secondary" onClick={handlePrevious} />
            )}

            {currentStep < steps.length - 1 && (
              <Button label="Continuar" icon="pi pi-arrow-right" iconPos="right" onClick={handleNext} />
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

*/
