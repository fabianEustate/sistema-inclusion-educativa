"use client";
import { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Messages } from "primereact/messages";
import styles from "./FichaSocioeconomica.module.css";

import { buscarTiposDocumento } from "@/services/personas/personas_service";
import geonamesService from "@/services/geonames/geonames_service";

export default function DatosPersonales({ data, onChange }) {
  const [localData, setLocalData] = useState(data || {});
  const [preview, setPreview] = useState(null);
  const msgs = useRef(null);

  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [tipoViaOptions, setTipoViaOptions] = useState([]);
  const [tipoLugarOptions, setTipoLugarOptions] = useState([]);
  const [paisOptions, setPaisOptions] = useState([]);
  const [departamentoOptions, setDepartamentoOptions] = useState([]);
  const [ciudadOptions, setCiudadOptions] = useState([]);

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

  // ============================
  // CARGAR CATÁLOGOS INICIALES
  // ============================
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1) Cargar catálogos independientes
        const [tiposViaResp, tiposLugarResp] = await Promise.all([
          geonamesService.getTiposVia(),
          geonamesService.getTiposLugar(),
        ]);

        setTipoViaOptions((tiposViaResp?.tipos_via || []).map(v => ({ label: v, value: v })));
        setTipoLugarOptions((tiposLugarResp?.tipos_lugar || []).map(v => ({ label: v, value: v })));

        // 2) Ahora sí cargar paises, pero sin romper lo anterior
        try {
          const paisesResp = await geonamesService.getPaises();
          const paisesArr = paisesResp?.data || paisesResp || [];
          setPaisOptions(
            paisesArr.map((p) => ({
              label: p.nombre,//p.name,
              value: { nombre: p.nombre, countryCode: p.countryCode, geonameId: p.geonameId },
            }))
          );
        } catch (e) {
          console.error("Error cargando países:", e);
        }

        // 3) TIPOS DOCUMENTO siempre abajo porque depende de la API anterior
        const tiposDocResp = await buscarTiposDocumento();
        const tiposDocArr = tiposDocResp?.tipos_documento || [];
        setTipoDocumentoOptions(
          tiposDocArr.map(t => ({ label: t.description, value: t.code }))
        );

      } catch (err) {
        console.error("Error general cargando catálogos:", err);
      }
    };

    loadData();
  }, []);

   useEffect(() => {
    const loadPaises = async () => {
      try {
        const paisesArr = await geonamesService.getPaises();

        const options = paisesArr.map((p) => ({
          label: p.nombre,
          value: {
            nombre: p.nombre,
            countryCode: p.countryCode,
            geonameId: p.geonameId, // ✔ nombre correcto
          },
        }));

        setPaisOptions(options);

        // Si ya hay país en localData, sincronizarlo con la opción exacta
        if (localData.pais) {
          const match = options.find(
            (o) => o.value.countryCode === localData.pais.countryCode
          );

          if (match) {
            setLocalData((prev) => ({ ...prev, pais: match.value }));
          }
        }
      } catch (err) {
        console.error("Error cargando países:", err);
      }
    };

    loadPaises();
  }, []);        
  
  // --------------------------------------------------------------
  // 🏛 Cargar departamentos cuando cambia el país
  // --------------------------------------------------------------
  useEffect(() => {
    const loadDepartamentos = async () => {
      if (!localData.pais) return;

      const geonameId =
        localData.pais.geonameId || // ✔ nombre correcto
        localData.pais.geoname_id ||
        localData.pais?.raw?.geoname_id;

      if (!geonameId) return;

      try {
        const deps = await geonamesService.getDepartamentos(geonameId);
        const options = deps.map((d) => ({
          label: d.nombre,
          value: {
            nombre: d.nombre,
            geonameId: d.geonameId,
            adminCode: d.adminCode1,  // ← nombre correcto del backend
            //adminCode: d.adminCode || d.admin_code,  // ← SE AGREGA ESTO
          },
        }));


        setDepartamentoOptions(options);

        // Si ya hay un departamento seleccionado, sincronizarlo
        if (localData.departamento) {
          const match = options.find(
            (o) => o.value.nombre === localData.departamento.nombre
          );

          if (match) {
            setLocalData((prev) => ({
              ...prev,
              departamento: match.value,
            }));
          }
        }
      } catch (err) {
        console.error("Error cargando departamentos:", err);
      }
    };

    loadDepartamentos();
  }, [localData.pais]);
  // --------------------------------------------------------------
  // 🏙 Cargar ciudades cuando cambia el departamento
  // --------------------------------------------------------------
  // ============================
// CARGAR CIUDADES
// ============================
  // ============================
// CARGAR CIUDADES
// ============================
  useEffect(() => {
    if (!localData?.departamento || !localData?.pais) return;

    const loadCiudades = async () => {
      try {
        const countryCode =
          localData.pais.countryCode || localData.pais.country_code;

        /*const adminCode =
          localData.departamento.adminCode ||
          localData.departamento.admin_code;*/
          const adminCode = localData.departamento.adminCode;  // ✔


        if (!countryCode || !adminCode) {
          console.warn("Faltan datos para cargar ciudades:", {
            countryCode,
            adminCode,
          });
          return;
        }

        console.log("CARGANDO CIUDADES:", { countryCode, adminCode });

        const ciudadesResp = await geonamesService.getCiudades(
          countryCode,
          adminCode
        );

        const ciudadesArr = Array.isArray(ciudadesResp) ? ciudadesResp : [];

        setCiudadOptions(
          ciudadesArr.map((c) => ({
            label: c.nombre,
            value: {
              geonameId: c.geonameId,
              nombre: c.nombre,
            },
          }))
        );
      } catch (err) {
        console.error("Error cargando ciudades:", err);
      }
    };

    loadCiudades();
  }, [localData?.departamento]);




  // ============================
  // ACTUALIZACIÓN GENERAL
  // ============================
  const handleChange = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange?.(updated);
  };

  const handleAddressChange = (key, value) => {
    const updatedAddress = { ...(localData.direccion || {}), [key]: value };
    handleChange("direccion", updatedAddress);
  };

  // ============================
  // FOTO
  // ============================
  const handleImageUpload = (event) => {
    const file = event.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      handleChange("foto", e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const direccion = localData.direccion || {};

  // ============================
  // RENDER
  // ============================
  return (
    <div className={styles.form}>
      <Messages ref={msgs} />

      {/* FOTO */}
      <div className={styles.photoHeader}>
        <div className={styles.photoWrapper}>
          {preview ? (
            <img src={preview} className={styles.photoPreview} />
          ) : (
            <span className={styles.photoPlaceholder}>Foto del estudiante</span>
          )}
        </div>

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

      {/* TIPO DOCUMENTO */}
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

      {/* DEMOGRÁFICOS */}
      <div className={styles.sectionTitle}>Datos Demográficos</div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Sexo</label>
          <Dropdown
            value={localData.sexo}
            options={sexoOptions}
            onChange={(e) => handleChange("sexo", e.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Fecha de nacimiento</label>
          <Calendar
            value={localData.fecha_nacimiento}
            onChange={(e) => handleChange("fecha_nacimiento", e.value)}
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>

        <div className={styles.field}>
          <label>Estado civil</label>
          <Dropdown
            value={localData.estado_civil}
            options={estadoCivilOptions}
            onChange={(e) => handleChange("estado_civil", e.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Correo electrónico</label>
          <InputText
            type="email"
            value={localData.correo}
            onChange={(e) => handleChange("correo", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Teléfono</label>
          <InputText
            type="tel"
            value={localData.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            maxLength={10}
          />
        </div>
      </div>

      {/* DIRECCIÓN */}
      <div className={styles.sectionTitle}>Dirección de Residencia</div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Nombre del lugar</label>
          <InputText
            value={direccion.nombre_lugar}
            onChange={(e) => handleAddressChange("nombre_lugar", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Tipo de lugar</label>
          <Dropdown
            value={direccion.tipo_lugar}
            options={tipoLugarOptions}
            onChange={(e) => handleAddressChange("tipo_lugar", e.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Tipo de vía</label>
          <Dropdown
            value={direccion.tipos_via}
            options={tipoViaOptions}
            onChange={(e) => handleAddressChange("tipos_via", e.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Número vía principal</label>
          <InputText
            value={direccion.numero_via_principal}
            onChange={(e) =>
              handleAddressChange("numero_via_principal", e.target.value)
            }
          />
        </div>

        <div className={styles.field}>
          <label>Letra vía principal</label>
          <InputText
            value={direccion.letra_via_principal}
            onChange={(e) =>
              handleAddressChange("letra_via_principal", e.target.value)
            }
          />
        </div>

        <div className={styles.field}>
          <label>Número vía secundaria</label>
          <InputText
            value={direccion.numero_via_secundaria}
            onChange={(e) =>
              handleAddressChange("numero_via_secundaria", e.target.value)
            }
          />
        </div>

        <div className={styles.field}>
          <label>Número puerta</label>
          <InputText
            value={direccion.numero_puerta}
            onChange={(e) =>
              handleAddressChange("numero_puerta", e.target.value)
            }
          />
        </div>

        <div className={styles.fieldWide}>
          <label>Complemento</label>
          <InputText
            value={direccion.complemento}
            onChange={(e) => handleAddressChange("complemento", e.target.value)}
          />
        </div>

        <div className={styles.fieldWide}>
          <label>Referencia</label>
          <InputText
            value={direccion.referencia}
            onChange={(e) => handleAddressChange("referencia", e.target.value)}
          />
        </div>

        {/* PAÍS */}
        <div className={styles.field}>
          <label>País</label>
           <Dropdown
            value={localData.pais}
            options={paisOptions}
            onChange={(e) => handleChange("pais", e.value)}
            placeholder="Seleccione un país"
            className="w-full"
          />
        </div>

        {/* CIUDAD */}
        <div className={styles.field}>
          <label>Ciudad</label>
            <Dropdown
            value={localData.ciudad}
            options={ciudadOptions}
            onChange={(e) => handleChange("ciudad", e.value)}
            placeholder="Seleccione una ciudad"
            className="w-full"
            disabled={!localData.departamento}
          />
        </div>

        {/* DEPARTAMENTO */}
        <div className={styles.field}>
          <label>Departamento</label>
           
          <Dropdown
            value={localData.departamento}
            options={departamentoOptions}
            onChange={(e) => handleChange("departamento", e.value)}
            placeholder="Seleccione un departamento"
            className="w-full"
            disabled={!localData.pais}
          />
        </div>

        <div className={styles.field}>
          <label>Barrio</label>
          <InputText
            value={direccion.barrio}
            onChange={(e) => handleAddressChange("barrio", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
