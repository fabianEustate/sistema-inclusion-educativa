"use client";
import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Messages } from "primereact/messages";
import styles from "./FichaSocioeconomica.module.css";

export default function DatosPersonales({ data, onChange }) {
  const [localData, setLocalData] = useState(data || {});
  const [preview, setPreview] = useState(null);
  const msgs = useRef(null);

  const departamentosOptions = [
    { label: "Amazonas", value: "Amazonas" },
    { label: "Antioquia", value: "Antioquia" },
    { label: "Arauca", value: "Arauca" },
    { label: "Atlántico", value: "Atlántico" },
    { label: "Bolívar", value: "Bolívar" },
    { label: "Boyacá", value: "Boyacá" },
    { label: "Caldas", value: "Caldas" },
    { label: "Caquetá", value: "Caquetá" },
    { label: "Cauca", value: "Cauca" },
    { label: "Cesar", value: "Cesar" },
    { label: "Chocó", value: "Chocó" },
    { label: "Córdoba", value: "Córdoba" },
    { label: "Cundinamarca", value: "Cundinamarca" },
    { label: "Guainía", value: "Guainía" },
    { label: "Guaviare", value: "Guaviare" },
    { label: "Huila", value: "Huila" },
    { label: "La Guajira", value: "La Guajira" },
    { label: "Magdalena", value: "Magdalena" },
    { label: "Meta", value: "Meta" },
    { label: "Nariño", value: "Nariño" },
    { label: "Norte de Santander", value: "Norte de Santander" },
    { label: "Putumayo", value: "Putumayo" },
    { label: "Quindío", value: "Quindío" },
    { label: "Risaralda", value: "Risaralda" },
    { label: "Santander", value: "Santander" },
    { label: "Sucre", value: "Sucre" },
    { label: "Tolima", value: "Tolima" },
    { label: "Valle del Cauca", value: "Valle del Cauca" },
    { label: "Vaupés", value: "Vaupés" },
    { label: "Vichada", value: "Vichada" },
    { label: "Distrito Capital", value: "Distrito Capital" },
  ];

  const ciudadesOptions = [
    { label: "Bogotá", value: "Bogotá" },
    { label: "Medellín", value: "Medellín" },
    { label: "Cali", value: "Cali" },
    { label: "Barranquilla", value: "Barranquilla" },
    { label: "Cartagena", value: "Cartagena" },
    { label: "Cúcuta", value: "Cúcuta" },
    { label: "Bucaramanga", value: "Bucaramanga" },
    { label: "Valledupar", value: "Valledupar" },
    { label: "Manizales", value: "Manizales" },
    { label: "Pereira", value: "Pereira" },
    { label: "Armenia", value: "Armenia" },
    { label: "Ibagué", value: "Ibagué" },
    { label: "Neiva", value: "Neiva" },
    { label: "Pasto", value: "Pasto" },
    { label: "Popayán", value: "Popayán" },
    { label: "Villavicencio", value: "Villavicencio" },
    { label: "Santa Marta", value: "Santa Marta" },
    { label: "Riohacha", value: "Riohacha" },
    { label: "Quibdó", value: "Quibdó" },
    { label: "Montería", value: "Montería" },
    { label: "Tunja", value: "Tunja" },
    { label: "Florencia", value: "Florencia" },
    { label: "Mitú", value: "Mitú" },
    { label: "Inírida", value: "Inírida" },
    { label: "Puerto Carreño", value: "Puerto Carreño" },
    { label: "Yopal", value: "Yopal" },
    { label: "San Andrés", value: "San Andrés" },
    { label: "Leticia", value: "Leticia" },
    { label: "Puerto Guzmán", value: "Puerto Guzmán" },
    { label: "Arauca", value: "Arauca" },
    { label: "Magangué", value: "Magangué" },
    { label: "Fundadores", value: "Fundadores" },
    { label: "San Pablo", value: "San Pablo" },
  ];

  // Listas de opciones (valores exactos según el diccionario)
  const tipoDocumentoOptions = [
    { label: "Cédula de ciudadanía", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "Cédula de extranjería", value: "CE" },
    { label: "Permiso de Protección Temporal", value: "PPT" },
    { label: "Permiso Especial de Permanencia", value: "PEP" },
    { label: "Pasaporte", value: "PAS" },
    { label: "Número de Identificación Tributaria", value: "NIT" },
    { label: "Carné Diplomático", value: "CD" },
    { label: "Número Único de Identificación Personal", value: "NUIP" },
  ];

  const sexoOptions = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
    { label: "Otro", value: "O" },
  ];

  const estadoCivilOptions = [
    { label: "Soltero(a)", value: "Soltero(a)" },
    { label: "Casado(a)", value: "Casado(a)" },
    { label: "Unión libre", value: "Union libre" },
    { label: "Divorciado(a)", value: "Divorciado(a)" },
    { label: "Viudo(a)", value: "Viudo(a)" },
  ];

  const tipoViaOptions = [
    { label: "Calle", value: "Calle" },
    { label: "Carrera", value: "Carrera" },
    { label: "Diagonal", value: "Diagonal" },
    { label: "Transversal", value: "Transversal" },
  ];

  const tipoLugarOptions = [
    { label: "Casa", value: "Casa" },
    { label: "Apartamento", value: "Apartamento" },
    { label: "Sede", value: "Sede" },
  ];

  const paisOptions = [{ label: "Colombia", value: "Colombia" }];

  // Manejo de cambios locales
  const handleChange = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  // Manejo de dirección
  const handleAddressChange = (addressField, value) => {
    const direccion = localData.direccion || {};
    const updatedAddress = { ...direccion, [addressField]: value };
    handleChange("direccion", updatedAddress);
  };

  // Manejo de foto
  const handleImageUpload = (event) => {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        handleChange("foto", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Inicializar dirección como objeto si viene vacía
  const direccion = localData.direccion || {};

  return (
    <div className={styles.form}>
      <Messages ref={msgs} />

      <div className={styles.photoHeader}>
        <div className={styles.photoWrapper}>
          {preview ? (
            <img
              src={preview || "/placeholder.svg"}
              alt="Foto estudiante"
              className={styles.photoPreview}
            />
          ) : (
            <span className={styles.photoPlaceholder}>Foto del estudiante</span>
          )}
        </div>
        <div className={styles.photoControls}>
          <FileUpload
            name="foto"
            mode="basic"
            accept="image/*"
            chooseLabel="Subir foto"
            auto
            customUpload
            uploadHandler={handleImageUpload}
          />
        </div>
      </div>

      <div className={styles.sectionTitle}>Datos de Identificación</div>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Tipo de documento</label>
          <Dropdown
            value={localData.tipo_documento || ""}
            options={tipoDocumentoOptions}
            onChange={(e) => handleChange("tipo_documento", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Número de documento</label>
          <InputText
            value={localData.numero_documento || ""}
            onChange={(e) => handleChange("numero_documento", e.target.value)}
            maxLength={15}
          />
        </div>

        <div className={styles.field}>
          <label>Primer nombre</label>
          <InputText
            value={localData.primer_nombre || ""}
            onChange={(e) => handleChange("primer_nombre", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Segundo nombre</label>
          <InputText
            value={localData.segundo_nombre || ""}
            onChange={(e) => handleChange("segundo_nombre", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Primer apellido</label>
          <InputText
            value={localData.primer_apellido || ""}
            onChange={(e) => handleChange("primer_apellido", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Segundo apellido</label>
          <InputText
            value={localData.segundo_apellido || ""}
            onChange={(e) => handleChange("segundo_apellido", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.sectionTitle}>Datos Demográficos</div>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Sexo</label>
          <Dropdown
            value={localData.sexo || ""}
            options={sexoOptions}
            onChange={(e) => handleChange("sexo", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Fecha de nacimiento</label>
          <Calendar
            value={localData.fecha_nacimiento || null}
            onChange={(e) => handleChange("fecha_nacimiento", e.value)}
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>

        <div className={styles.field}>
          <label>Estado civil</label>
          <Dropdown
            value={localData.estado_civil || ""}
            options={estadoCivilOptions}
            onChange={(e) => handleChange("estado_civil", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Correo electrónico</label>
          <InputText
            type="email"
            value={localData.correo || ""}
            onChange={(e) => handleChange("correo", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Teléfono</label>
          <InputText
            type="tel"
            value={localData.telefono || ""}
            onChange={(e) => handleChange("telefono", e.target.value)}
            maxLength={10}
          />
        </div>
      </div>

      <div className={styles.sectionTitle}>Dirección de Residencia</div>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Nombre del lugar</label>
          <InputText
            value={direccion.nombre_lugar || ""}
            onChange={(e) =>
              handleAddressChange("nombre_lugar", e.target.value)
            }
            maxLength={100}
          />
        </div>

        <div className={styles.field}>
          <label>Tipo de lugar</label>
          <Dropdown
            value={direccion.tipo_lugar || ""}
            options={tipoLugarOptions}
            onChange={(e) => handleAddressChange("tipo_lugar", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Tipo de vía</label>
          <Dropdown
            value={direccion.tipo_via || ""}
            options={tipoViaOptions}
            onChange={(e) => handleAddressChange("tipo_via", e.value)}
            placeholder="Seleccione..."
          />
        </div>

        <div className={styles.field}>
          <label>Número vía principal</label>
          <InputText
            value={direccion.numero_via_principal || ""}
            onChange={(e) =>
              handleAddressChange("numero_via_principal", e.target.value)
            }
            maxLength={10}
          />
        </div>

        <div className={styles.field}>
          <label>Letra vía principal</label>
          <InputText
            value={direccion.letra_via_principal || ""}
            onChange={(e) =>
              handleAddressChange("letra_via_principal", e.target.value)
            }
            maxLength={3}
          />
        </div>

        <div className={styles.field}>
          <label>Número vía secundaria</label>
          <InputText
            value={direccion.numero_via_secundaria || ""}
            onChange={(e) =>
              handleAddressChange("numero_via_secundaria", e.target.value)
            }
            maxLength={10}
          />
        </div>

        <div className={styles.field}>
          <label>Número puerta</label>
          <InputText
            value={direccion.numero_puerta || ""}
            onChange={(e) =>
              handleAddressChange("numero_puerta", e.target.value)
            }
            maxLength={10}
          />
        </div>

        <div className={styles.fieldWide}>
          <label>Complemento</label>
          <InputText
            value={direccion.complemento || ""}
            onChange={(e) => handleAddressChange("complemento", e.target.value)}
            maxLength={100}
          />
        </div>

        <div className={styles.fieldWide}>
          <label>Referencia</label>
          <InputText
            value={direccion.referencia || ""}
            onChange={(e) => handleAddressChange("referencia", e.target.value)}
            maxLength={100}
          />
        </div>

        <div className={styles.field}>
          <label>Barrio</label>
          <InputText
            value={direccion.barrio || ""}
            onChange={(e) => handleAddressChange("barrio", e.target.value)}
            maxLength={50}
          />
        </div>

        <div className={styles.field}>
          <label>Ciudad</label>
          <Dropdown
            value={direccion.ciudad || ""}
            options={ciudadesOptions}
            onChange={(e) => handleAddressChange("ciudad", e.value)}
            placeholder="Seleccione..."
            filter
          />
        </div>

        <div className={styles.field}>
          <label>Departamento</label>
          <Dropdown
            value={direccion.departamento || ""}
            options={departamentosOptions}
            onChange={(e) => handleAddressChange("departamento", e.value)}
            placeholder="Seleccione..."
            filter
          />
        </div>

        <div className={styles.field}>
          <label>País</label>
          <Dropdown
            value={direccion.pais || ""}
            options={paisOptions}
            onChange={(e) => handleAddressChange("pais", e.value)}
            placeholder="Seleccione..."
          />
        </div>
      </div>
    </div>
  );
}
