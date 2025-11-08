"use client";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import styles from "./FichaSocioeconomica.module.css";

export default function AmbienteResidencial({ data, onChange }) {
  const [localData, setLocalData] = useState(data || {});

  // === Opciones de vivienda y servicios según diccionario ===
  const tipoViviendaOptions = [
    { label: "Casa", value: "Casa" },
    { label: "Apartamento", value: "Apartamento" },
    { label: "Habitación", value: "Habitación" },
    { label: "Otro", value: "Otro" },
  ];

  const tenenciaOptions = [
    { label: "Propia", value: "Propia" },
    { label: "Familiar", value: "Familiar" },
    { label: "Arrendada", value: "Arrendada" },
    { label: "En comodato", value: "En comodato" },
    { label: "Otra", value: "Otra" },
  ];

  const serviciosOptions = [
    "Energía eléctrica",
    "Agua potable",
    "Alcantarillado",
    "Gas natural",
    "Internet",
    "Telefonía fija",
    "Recolección de basuras",
  ];

  const numeroFamiliasOptions = [
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

  // === Manejo de cambios ===
  const handleChange = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  // === Manejo de servicios públicos ===
  const toggleServicio = (servicio) => {
    const servicios = localData.servicios_publicos || [];
    const exists = servicios.includes(servicio);
    const updated = exists
      ? servicios.filter((s) => s !== servicio)
      : [...servicios, servicio];
    handleChange("servicios_publicos", updated);
  };

  return (
    <div className={styles.form}>
      <div className={styles.sectionTitle}>Ambiente Residencial</div>

      <div className={styles.formGrid}>
        {/* === Tipo y tenencia de vivienda === */}
        <div className={styles.field}>
          <label>Tipo de vivienda</label>
          <Dropdown
            value={localData.tipo_vivienda || ""}
            options={tipoViviendaOptions}
            onChange={(e) => handleChange("tipo_vivienda", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Tenencia de la vivienda</label>
          <Dropdown
            value={localData.tenencia || ""}
            options={tenenciaOptions}
            onChange={(e) => handleChange("tenencia", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        {/* === Valores económicos === */}
        {localData.tenencia === "Arrendada" && (
          <div className={styles.field}>
            <label>Valor del arriendo (en pesos)</label>
            <InputNumber
              value={localData.valor_arriendo || null}
              onValueChange={(e) => handleChange("valor_arriendo", e.value)}
              mode="currency"
              currency="COP"
              locale="es-CO"
              min={0}
            />
          </div>
        )}

        {localData.tenencia === "Propia" && (
          <>
            <div className={styles.field}>
              <label>¿Está hipotecada?</label>
              <Checkbox
                checked={localData.hipoteca || false}
                onChange={(e) => handleChange("hipoteca", e.checked)}
              />
            </div>

            {localData.hipoteca && (
              <div className={styles.field}>
                <label>Valor de la hipoteca (en pesos)</label>
                <InputNumber
                  value={localData.valor_hipoteca || null}
                  onValueChange={(e) => handleChange("valor_hipoteca", e.value)}
                  mode="currency"
                  currency="COP"
                  locale="es-CO"
                  min={0}
                />
              </div>
            )}
          </>
        )}

        <div className={styles.field}>
          <label>Número de familias que habitan la vivienda</label>
          <Dropdown
            value={localData.numero_familias_vivienda || ""}
            options={numeroFamiliasOptions}
            onChange={(e) => handleChange("numero_familias_vivienda", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.fieldWide}>
          <label>Servicios públicos con los que cuenta</label>
          <div className={styles.checkboxGroup}>
            {serviciosOptions.map((serv) => (
              <label key={serv}>
                <Checkbox
                  checked={(localData.servicios_publicos || []).includes(serv)}
                  onChange={() => toggleServicio(serv)}
                />
                {serv}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.fieldWide}>
          <label>Observaciones adicionales</label>
          <InputText
            value={localData.observaciones_residencia || ""}
            onChange={(e) =>
              handleChange("observaciones_residencia", e.target.value)
            }
            placeholder="Ejemplo: Condiciones del entorno, estado de la vivienda..."
          />
        </div>
      </div>
    </div>
  );
}
