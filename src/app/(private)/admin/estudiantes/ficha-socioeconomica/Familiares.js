"use client";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import styles from "./FichaSocioeconomica.module.css";

export default function Familiares({ data, onChange }) {
  const [familiares, setFamiliares] = useState(data || []);

  // Opciones de parentesco según diccionario
  const parentescos = [
    { label: "Madre", value: "madre" },
    { label: "Padre", value: "padre" },
    { label: "Hermano/a", value: "hermano" },
    { label: "Abuelo/a", value: "abuelo" },
    { label: "Tío/a", value: "tio" },
    { label: "Otro", value: "otro" },
  ];

  // === Funciones de control ===
  const handleAdd = () => {
    const nuevo = {
      nombre_familiar: "",
      parentesco: "",
      edad: "",
      nivel_educativo: "",
      ocupacion: "",
      ingreso_mensual: "",
      tipo_vinculacion: "",
    };
    const updated = [...familiares, nuevo];
    setFamiliares(updated);
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = familiares.filter((_, i) => i !== index);
    setFamiliares(updated);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...familiares];
    updated[index][field] = value;
    setFamiliares(updated);
    onChange(updated);
  };

  return (
    <div className={styles.form}>
      <div className={styles.sectionTitle}>Composición Familiar</div>

      <div className={styles.familyContainer}>
        <div className={styles.familyHeader}>
          <Button
            icon="pi pi-plus"
            label="Agregar familiar"
            className="p-button-success"
            onClick={handleAdd}
          />
        </div>

        {/* Tabla dinámica de familiares */}
        {familiares.length > 0 ? (
          <div className={styles.familyTable}>
            {familiares.map((familiar, index) => (
              <div key={index} className={styles.familyRow}>
                <div className={styles.familyCell}>
                  <InputText
                    placeholder="Nombre completo"
                    value={familiar.nombre_familiar || ""}
                    onChange={(e) =>
                      handleChange(index, "nombre_familiar", e.target.value)
                    }
                  />
                </div>

                <div className={styles.familyCell}>
                  <Dropdown
                    value={familiar.parentesco || ""}
                    options={parentescos}
                    onChange={(e) => handleChange(index, "parentesco", e.value)}
                    placeholder="Parentesco"
                  />
                </div>

                <div className={styles.familyCellSmall}>
                  <InputText
                    placeholder="Edad"
                    value={familiar.edad || ""}
                    onChange={(e) =>
                      handleChange(index, "edad", e.target.value)
                    }
                  />
                </div>

                <div className={styles.familyCell}>
                  <InputText
                    placeholder="Nivel educativo"
                    value={familiar.nivel_educativo || ""}
                    onChange={(e) =>
                      handleChange(index, "nivel_educativo", e.target.value)
                    }
                  />
                </div>

                <div className={styles.familyCell}>
                  <InputText
                    placeholder="Ocupación"
                    value={familiar.ocupacion || ""}
                    onChange={(e) =>
                      handleChange(index, "ocupacion", e.target.value)
                    }
                  />
                </div>

                <div className={styles.familyCell}>
                  <InputText
                    placeholder="Ingreso mensual"
                    value={familiar.ingreso_mensual || ""}
                    onChange={(e) =>
                      handleChange(index, "ingreso_mensual", e.target.value)
                    }
                  />
                </div>

                <div className={styles.familyCell}>
                  <InputText
                    placeholder="Tipo de vinculación"
                    value={familiar.tipo_vinculacion || ""}
                    onChange={(e) =>
                      handleChange(index, "tipo_vinculacion", e.target.value)
                    }
                  />
                </div>

                <div className={styles.familyCellAction}>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-rounded"
                    onClick={() => handleRemove(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noData}>No se han agregado familiares.</div>
        )}
      </div>
    </div>
  );
}
