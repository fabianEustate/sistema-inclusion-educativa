"use client";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import styles from "./FichaSocioeconomica.module.css";

export default function DatosClinicos({ data, onChange }) {
  const [localData, setLocalData] = useState(data || {});

  // === Listas de opciones predefinidas según diccionario ===
  const tipoSeguridadSocial = [
    { label: "Subsidiado", value: "Subsidiado" },
    { label: "Contributivo", value: "Contributivo" },
    { label: "Especial", value: "Especial" },
    { label: "Otro", value: "Otro" },
  ];

  // === Listas de opciones específicas para Valledupar ===
  const ipsEpsOptions = [
    { label: "Comfacesar", value: "Comfacesar" },
    { label: "EPS Salud Comfacesar", value: "EPS Salud Comfacesar" },
    {
      label: "Fondo de Pasivo Social de Comfacesar",
      value: "Fondo de Pasivo Social de Comfacesar",
    },
    {
      label: "Caja de Compensación Familiar del Cesar",
      value: "Caja de Compensación Familiar del Cesar",
    },
    { label: "EPS Avanzsalud", value: "EPS Avanzsalud" },
    { label: "Mutual Ser", value: "Mutual Ser" },
    { label: "EPS Sura", value: "EPS Sura" },
    { label: "Clínica Las Américas", value: "Clínica Las Américas" },
    { label: "Clínica de Valledupar", value: "Clínica de Valledupar" },
    {
      label: "Hospital Dr. Elías Canchado Bocanegra",
      value: "Hospital Dr. Elías Canchado Bocanegra",
    },
    { label: "Clínica San Rafael", value: "Clínica San Rafael" },
    { label: "Centro de Salud Galenia", value: "Centro de Salud Galenia" },
    { label: "IPS Valledupar Centro", value: "IPS Valledupar Centro" },
    {
      label: "Asociación Colombiana de Medicina Integral",
      value: "Asociación Colombiana de Medicina Integral",
    },
    { label: "Colsanitas", value: "Colsanitas" },
    { label: "Emssanar", value: "Emssanar" },
    { label: "Capresoca", value: "Capresoca" },
    { label: "Salud Total", value: "Salud Total" },
    { label: "Otro", value: "Otro" },
  ];

  const calidadAfiliacionOptions = [
    { label: "Cotizante", value: "Cotizante" },
    { label: "Beneficiario", value: "Beneficiario" },
    { label: "Subsidiado", value: "Subsidiado" },
    { label: "Afiliado especial", value: "Afiliado especial" },
    { label: "Pensionado", value: "Pensionado" },
  ];

  // === Manejo de cambios ===
  const handleChange = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  return (
    <div className={styles.form}>
      <div className={styles.sectionTitle}>Datos Clínicos y de Salud</div>

      <div className={styles.formGrid}>
        {/* === Discapacidad === */}
        <div className={styles.field}>
          <label>¿Padece alguna discapacidad?</label>
          <Checkbox
            checked={localData.padece_discapacidad || false}
            onChange={(e) => handleChange("padece_discapacidad", e.checked)}
          />
        </div>

        {localData.padece_discapacidad && (
          <>
            <div className={styles.field}>
              <label>Tipo de discapacidad</label>
              <InputText
                value={localData.otra_discapacidad || ""}
                onChange={(e) =>
                  handleChange("otra_discapacidad", e.target.value)
                }
                placeholder="Ejemplo: Visual, auditiva, motora..."
              />
            </div>

            <div className={styles.fieldWide}>
              <label>Causa de la discapacidad</label>
              <InputTextarea
                rows={2}
                value={localData.causa_discapacidad || ""}
                onChange={(e) =>
                  handleChange("causa_discapacidad", e.target.value)
                }
              />
            </div>
          </>
        )}

        <div className={styles.fieldWide}>
          <label>Historia médica relevante</label>
          <InputTextarea
            rows={2}
            value={localData.historia_medica || ""}
            onChange={(e) => handleChange("historia_medica", e.target.value)}
            placeholder="Describa enfermedades o antecedentes importantes"
          />
        </div>

        {/* === Tratamiento médico === */}
        <div className={styles.field}>
          <label>¿Recibe tratamiento médico?</label>
          <Checkbox
            checked={localData.recibe_tratamiento_medico || false}
            onChange={(e) =>
              handleChange("recibe_tratamiento_medico", e.checked)
            }
          />
        </div>

        {localData.recibe_tratamiento_medico && (
          <div className={styles.fieldWide}>
            <label>Motivo del tratamiento médico</label>
            <InputTextarea
              rows={2}
              value={localData.motivo_tratamiento_medico || ""}
              onChange={(e) =>
                handleChange("motivo_tratamiento_medico", e.target.value)
              }
            />
          </div>
        )}

        {/* === Consulta o tratamiento psicológico === */}
        <div className={styles.field}>
          <label>¿Asiste a consulta psicológica?</label>
          <Checkbox
            checked={localData.consulta_psicologica || false}
            onChange={(e) => handleChange("consulta_psicologica", e.checked)}
          />
        </div>

        {localData.consulta_psicologica && (
          <div className={styles.fieldWide}>
            <label>Motivo de la consulta psicológica</label>
            <InputTextarea
              rows={2}
              value={localData.motivo_consulta || ""}
              onChange={(e) => handleChange("motivo_consulta", e.target.value)}
            />
          </div>
        )}

        <div className={styles.field}>
          <label>¿Está en tratamiento psicológico?</label>
          <Checkbox
            checked={localData.tratamiento_psicologico || false}
            onChange={(e) => handleChange("tratamiento_psicologico", e.checked)}
          />
        </div>

        {localData.tratamiento_psicologico && (
          <div className={styles.fieldWide}>
            <label>Motivo del tratamiento psicológico</label>
            <InputTextarea
              rows={2}
              value={localData.motivo_tratamiento_psicologico || ""}
              onChange={(e) =>
                handleChange("motivo_tratamiento_psicologico", e.target.value)
              }
            />
          </div>
        )}

        {/* === Seguridad social === */}
        <div className={styles.field}>
          <label>Tipo de seguridad social</label>
          <Dropdown
            value={localData.tipo_seguridad_social || ""}
            options={tipoSeguridadSocial}
            onChange={(e) => handleChange("tipo_seguridad_social", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Nombre de IPS / EPS</label>
          <Dropdown
            value={localData.ips_eps || ""}
            options={ipsEpsOptions}
            onChange={(e) => handleChange("ips_eps", e.value)}
            placeholder="Seleccione..."
            filter
          />
        </div>

        <div className={styles.field}>
          <label>Calidad de afiliación</label>
          <Dropdown
            value={localData.calidad_afiliacion || ""}
            options={calidadAfiliacionOptions}
            onChange={(e) => handleChange("calidad_afiliacion", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        {/* === Hábitos y estilo de vida === */}
        <div className={styles.field}>
          <label>¿Consume alcohol?</label>
          <Checkbox
            checked={localData.toma_alcohol || false}
            onChange={(e) => handleChange("toma_alcohol", e.checked)}
          />
        </div>

        {localData.toma_alcohol && (
          <div className={styles.field}>
            <label>Frecuencia de consumo</label>
            <InputText
              value={localData.frecuencia_toma || ""}
              onChange={(e) => handleChange("frecuencia_toma", e.target.value)}
              placeholder="Ejemplo: Ocasional, semanal..."
            />
          </div>
        )}

        <div className={styles.field}>
          <label>¿Fuma?</label>
          <Checkbox
            checked={localData.fuma || false}
            onChange={(e) => handleChange("fuma", e.checked)}
          />
        </div>

        {localData.fuma && (
          <div className={styles.field}>
            <label>Frecuencia de fumar</label>
            <InputText
              value={localData.frecuencia_fuma || ""}
              onChange={(e) => handleChange("frecuencia_fuma", e.target.value)}
            />
          </div>
        )}

        <div className={styles.field}>
          <label>¿Vida sexual activa?</label>
          <Checkbox
            checked={localData.vida_sexual_activa || false}
            onChange={(e) => handleChange("vida_sexual_activa", e.checked)}
          />
        </div>

        {localData.vida_sexual_activa && (
          <>
            <div className={styles.field}>
              <label>¿Planifica actualmente?</label>
              <Checkbox
                checked={localData.planifica || false}
                onChange={(e) => handleChange("planifica", e.checked)}
              />
            </div>

            {!localData.planifica && (
              <div className={styles.field}>
                <label>Motivo por el cual no planifica</label>
                <InputText
                  value={localData.motivo_no_planifica || ""}
                  onChange={(e) =>
                    handleChange("motivo_no_planifica", e.target.value)
                  }
                />
              </div>
            )}

            {localData.planifica && (
              <div className={styles.field}>
                <label>Método de planificación</label>
                <InputText
                  value={localData.metodo_planificacion || ""}
                  onChange={(e) =>
                    handleChange("metodo_planificacion", e.target.value)
                  }
                />
              </div>
            )}
          </>
        )}

        <div className={styles.field}>
          <label>¿Consume sustancias psicoactivas?</label>
          <Checkbox
            checked={localData.consume_sustancias || false}
            onChange={(e) => handleChange("consume_sustancias", e.checked)}
          />
        </div>

        {localData.consume_sustancias && (
          <>
            <div className={styles.field}>
              <label>Tipo de sustancias</label>
              <InputText
                value={localData.tipo_sustancias || ""}
                onChange={(e) =>
                  handleChange("tipo_sustancias", e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label>Frecuencia de consumo</label>
              <InputText
                value={localData.frecuencia_consumo || ""}
                onChange={(e) =>
                  handleChange("frecuencia_consumo", e.target.value)
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
