"use client";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import styles from "./FichaSocioeconomica.module.css";

export default function Hobbie({ data, onChange }) {
  const [localData, setLocalData] = useState(data || {});

  // === Manejo de cambios ===
  const handleChange = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  return (
    <div className={styles.form}>
      <div className={styles.sectionTitle}>Actividades y Participación</div>

      <div className={styles.formGrid}>
        {/* === Actividades dentro y fuera de la universidad === */}
        <div className={styles.fieldWide}>
          <label>Actividades dentro de la universidad</label>
          <InputText
            value={localData.actividades_dentro_universidad || ""}
            onChange={(e) =>
              handleChange("actividades_dentro_universidad", e.target.value)
            }
            placeholder="Ejemplo: Semillero, deporte, voluntariado..."
          />
        </div>

        <div className={styles.fieldWide}>
          <label>Actividades fuera de la universidad</label>
          <InputText
            value={localData.actividades_fuera_universidad || ""}
            onChange={(e) =>
              handleChange("actividades_fuera_universidad", e.target.value)
            }
            placeholder="Ejemplo: Trabajo, grupos artísticos, iglesia..."
          />
        </div>

        {/* === Participación actual en grupos === */}
        <div className={styles.field}>
          <label>¿Pertenece actualmente a algún grupo?</label>
          <Checkbox
            checked={localData.pertenece_grupo || false}
            onChange={(e) => handleChange("pertenece_grupo", e.checked)}
          />
        </div>

        {localData.pertenece_grupo && (
          <div className={styles.fieldWide}>
            <label>Tipo de grupo al que pertenece</label>
            <InputText
              value={localData.tipo_grupo || ""}
              onChange={(e) => handleChange("tipo_grupo", e.target.value)}
              placeholder="Ejemplo: Grupo cultural, deportivo, religioso..."
            />
          </div>
        )}

        {/* === Interés en participar en grupos === */}
        <div className={styles.field}>
          <label>¿Desea participar en algún grupo universitario?</label>
          <Checkbox
            checked={localData.desea_participar_grupo || false}
            onChange={(e) => handleChange("desea_participar_grupo", e.checked)}
          />
        </div>

        {localData.desea_participar_grupo && (
          <div className={styles.fieldWide}>
            <label>Tipo de grupo en el que le gustaría participar</label>
            <InputText
              value={localData.tipo_grupo_deseado || ""}
              onChange={(e) =>
                handleChange("tipo_grupo_deseado", e.target.value)
              }
              placeholder="Ejemplo: Ambiental, artístico, académico..."
            />
          </div>
        )}
      </div>
    </div>
  );
}
