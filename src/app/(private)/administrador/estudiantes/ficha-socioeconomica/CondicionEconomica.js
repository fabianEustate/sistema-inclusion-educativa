"use client";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import styles from "./FichaSocioeconomica.module.css";

export default function CondicionEconomica({ data, onChange }) {
  const [localData, setLocalData] = useState(data || {});

  // === Opciones de ingreso según rangos típicos en el diccionario ===
  const ingresosOptions = [
    { label: "Menos de 1 SMMLV", value: "Menos de 1 SMMLV" },
    { label: "Entre 1 y 2 SMMLV", value: "Entre 1 y 2 SMMLV" },
    { label: "Entre 2 y 3 SMMLV", value: "Entre 2 y 3 SMMLV" },
    { label: "Más de 3 SMMLV", value: "Más de 3 SMMLV" },
  ];

  // === Lista de proveedores de recursos económicos ===
  const proveedorOptions = [
    { label: "Padre", value: "Padre" },
    { label: "Madre", value: "Madre" },
    { label: "Ambos padres", value: "Ambos padres" },
    { label: "Abuelos", value: "Abuelos" },
    { label: "Tíos", value: "Tíos" },
    { label: "Hermanos", value: "Hermanos" },
    { label: "Pareja/Cónyuge", value: "Pareja/Cónyuge" },
    { label: "Propio", value: "Propio" },
    { label: "Otro familiar", value: "Otro familiar" },
    { label: "Amigos", value: "Amigos" },
  ];

  // === Manejo de cambios ===
  const handleChange = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  return (
    <div className={styles.form}>
      <div className={styles.sectionTitle}>Condición Económica y Laboral</div>

      <div className={styles.formGrid}>
        {/* === Proveedor de recursos === */}
        <div className={styles.field}>
          <label>Principal proveedor de recursos económicos</label>
          <Dropdown
            value={localData.proveedor_recursos || ""}
            options={proveedorOptions}
            onChange={(e) => handleChange("proveedor_recursos", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>¿Actualmente trabaja?</label>
          <Checkbox
            checked={localData.trabaja || false}
            onChange={(e) => handleChange("trabaja", e.checked)}
          />
        </div>

        {localData.trabaja && (
          <>
            <div className={styles.field}>
              <label>Ocupación / Actividad laboral</label>
              <InputText
                value={localData.ocupacion || ""}
                onChange={(e) => handleChange("ocupacion", e.target.value)}
                placeholder="Especifique su empleo o actividad"
              />
            </div>

            <div className={styles.field}>
              <label>Horario de trabajo</label>
              <InputText
                value={localData.horario_trabajo || ""}
                onChange={(e) =>
                  handleChange("horario_trabajo", e.target.value)
                }
                placeholder="Ejemplo: Medio tiempo, tiempo completo..."
              />
            </div>

            <div className={styles.field}>
              <label>Ingreso personal mensual (en pesos)</label>
              <InputNumber
                value={localData.ingreso_personal_mensual || null}
                onValueChange={(e) =>
                  handleChange("ingreso_personal_mensual", e.value)
                }
                mode="currency"
                currency="COP"
                locale="es-CO"
                min={0}
              />
            </div>
          </>
        )}

        {/* === Ingreso familiar === */}
        <div className={styles.field}>
          <label>Ingreso familiar mensual</label>
          <Dropdown
            value={localData.ingreso_familiar_mensual || ""}
            options={ingresosOptions}
            onChange={(e) => handleChange("ingreso_familiar_mensual", e.value)}
            placeholder="Seleccione un rango"
          />
        </div>

        {/* === Apoyos externos === */}
        <div className={styles.field}>
          <label>¿Recibe apoyo económico externo?</label>
          <Checkbox
            checked={localData.recibe_apoyo_externo || false}
            onChange={(e) => handleChange("recibe_apoyo_externo", e.checked)}
          />
        </div>

        {localData.recibe_apoyo_externo && (
          <>
            <div className={styles.field}>
              <label>Fuente de apoyo económico</label>
              <InputText
                value={localData.fuente_apoyo_externo || ""}
                onChange={(e) =>
                  handleChange("fuente_apoyo_externo", e.target.value)
                }
                placeholder="Ejemplo: Beca, familiar, institución..."
              />
            </div>

            <div className={styles.field}>
              <label>Valor aproximado del apoyo (en pesos)</label>
              <InputNumber
                value={localData.valor_apoyo_externo || null}
                onValueChange={(e) =>
                  handleChange("valor_apoyo_externo", e.value)
                }
                mode="currency"
                currency="COP"
                locale="es-CO"
                min={0}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
