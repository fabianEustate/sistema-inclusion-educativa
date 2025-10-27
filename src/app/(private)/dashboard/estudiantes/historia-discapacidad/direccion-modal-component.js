import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import styles from './Direccion.Modal.module.css';

export default function DireccionModal({ visible, onHide, onSave, direccionInicial = null }) {
  const [direccionData, setDireccionData] = useState(direccionInicial || {
    nombre_lugar: '',
    tipo_lugar: '',
    tipo_via: '',
    numero_via_principal: '',
    letra_via_principal: '',
    numero_via_secundaria: '',
    numero_puerta: '',
    complemento: '',
    referencia: '',
    barrio: '',
    ciudad: '',
    departamento: '',
    pais: 'Colombia'
  });

  const tiposLugar = [
    { label: 'Casa', value: 'casa' },
    { label: 'Apartamento', value: 'apartamento' },
    { label: 'Oficina', value: 'oficina' },
    { label: 'Finca', value: 'finca' },
    { label: 'Otro', value: 'otro' }
  ];

  const tiposVia = [
    { label: 'Calle', value: 'calle' },
    { label: 'Carrera', value: 'carrera' },
    { label: 'Avenida', value: 'avenida' },
    { label: 'Diagonal', value: 'diagonal' },
    { label: 'Transversal', value: 'transversal' },
    { label: 'Circular', value: 'circular' },
    { label: 'Autopista', value: 'autopista' },
    { label: 'Vía', value: 'via' }
  ];

  const handleChange = (field, value) => {
    setDireccionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGuardar = () => {
    const direccionCompleta = construirDireccionTexto(direccionData);
    onSave({
      ...direccionData,
      direccion_completa: direccionCompleta,
      fecha_registro: new Date().toISOString()
    });
    onHide();
  };

  const construirDireccionTexto = (data) => {
    let direccion = '';
    
    if (data.tipo_via && data.numero_via_principal) {
      direccion = `${data.tipo_via} ${data.numero_via_principal}`;
      if (data.letra_via_principal) direccion += data.letra_via_principal;
      if (data.numero_via_secundaria) direccion += ` #${data.numero_via_secundaria}`;
      if (data.numero_puerta) direccion += `-${data.numero_puerta}`;
    }
    
    if (data.complemento) direccion += ` ${data.complemento}`;
    if (data.barrio) direccion += `, ${data.barrio}`;
    if (data.ciudad) direccion += `, ${data.ciudad}`;
    if (data.departamento) direccion += `, ${data.departamento}`;
    if (data.pais) direccion += `, ${data.pais}`;
    
    return direccion || 'Dirección no especificada';
  };

  const footer = (
    <div className={styles.footer}>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={onHide}
        className={styles.cancelButton}
      />
      <Button
        label="Guardar Dirección"
        icon="pi pi-check"
        onClick={handleGuardar}
        className={styles.saveButton}
      />
    </div>
  );

  return (
    <Dialog
      header="Agregar Dirección"
      visible={visible}
      onHide={onHide}
      footer={footer}
      style={{ width: '800px' }}
      breakpoints={{ '960px': '90vw' }}
    >
      <div className={styles.formGrid}>
        {/* Nombre del lugar */}
        <div className={styles.fieldFull}>
          <label htmlFor="nombre_lugar" className={styles.label}>
            Nombre del Lugar
          </label>
          <InputText
            id="nombre_lugar"
            value={direccionData.nombre_lugar}
            onChange={(e) => handleChange('nombre_lugar', e.target.value)}
            placeholder="Ej: Mi casa, Oficina principal"
            className={styles.input}
          />
        </div>

        {/* Tipo de lugar */}
        <div className={styles.fieldHalf}>
          <label htmlFor="tipo_lugar" className={styles.label}>
            Tipo de Lugar <span className={styles.required}>*</span>
          </label>
          <Dropdown
            id="tipo_lugar"
            value={direccionData.tipo_lugar}
            options={tiposLugar}
            onChange={(e) => handleChange('tipo_lugar', e.value)}
            placeholder="Seleccione"
            className={styles.input}
          />
        </div>

        {/* Tipo de vía */}
        <div className={styles.fieldHalf}>
          <label htmlFor="tipo_via" className={styles.label}>
            Tipo de Vía <span className={styles.required}>*</span>
          </label>
          <Dropdown
            id="tipo_via"
            value={direccionData.tipo_via}
            options={tiposVia}
            onChange={(e) => handleChange('tipo_via', e.value)}
            placeholder="Seleccione"
            className={styles.input}
          />
        </div>

        {/* Número vía principal */}
        <div className={styles.fieldThird}>
          <label htmlFor="numero_via_principal" className={styles.label}>
            Número Vía Principal <span className={styles.required}>*</span>
          </label>
          <InputText
            id="numero_via_principal"
            value={direccionData.numero_via_principal}
            onChange={(e) => handleChange('numero_via_principal', e.target.value)}
            placeholder="Ej: 15"
            className={styles.input}
          />
        </div>

        {/* Letra vía principal */}
        <div className={styles.fieldThird}>
          <label htmlFor="letra_via_principal" className={styles.label}>
            Letra
          </label>
          <InputText
            id="letra_via_principal"
            value={direccionData.letra_via_principal}
            onChange={(e) => handleChange('letra_via_principal', e.target.value)}
            placeholder="Ej: A, B"
            className={styles.input}
            maxLength={2}
          />
        </div>

        {/* Número vía secundaria */}
        <div className={styles.fieldThird}>
          <label htmlFor="numero_via_secundaria" className={styles.label}>
            # Vía Secundaria
          </label>
          <InputText
            id="numero_via_secundaria"
            value={direccionData.numero_via_secundaria}
            onChange={(e) => handleChange('numero_via_secundaria', e.target.value)}
            placeholder="Ej: 32"
            className={styles.input}
          />
        </div>

        {/* Número puerta */}
        <div className={styles.fieldThird}>
          <label htmlFor="numero_puerta" className={styles.label}>
            Número Puerta
          </label>
          <InputText
            id="numero_puerta"
            value={direccionData.numero_puerta}
            onChange={(e) => handleChange('numero_puerta', e.target.value)}
            placeholder="Ej: 45"
            className={styles.input}
          />
        </div>

        {/* Complemento */}
        <div className={styles.fieldTwoThirds}>
          <label htmlFor="complemento" className={styles.label}>
            Complemento
          </label>
          <InputText
            id="complemento"
            value={direccionData.complemento}
            onChange={(e) => handleChange('complemento', e.target.value)}
            placeholder="Ej: Apto 301, Interior 5, Torre B"
            className={styles.input}
          />
        </div>

        {/* Referencia */}
        <div className={styles.fieldFull}>
          <label htmlFor="referencia" className={styles.label}>
            Referencia
          </label>
          <InputText
            id="referencia"
            value={direccionData.referencia}
            onChange={(e) => handleChange('referencia', e.target.value)}
            placeholder="Ej: Cerca al parque principal"
            className={styles.input}
          />
        </div>

        {/* Barrio */}
        <div className={styles.fieldHalf}>
          <label htmlFor="barrio" className={styles.label}>
            Barrio <span className={styles.required}>*</span>
          </label>
          <InputText
            id="barrio"
            value={direccionData.barrio}
            onChange={(e) => handleChange('barrio', e.target.value)}
            placeholder="Ej: Centro"
            className={styles.input}
          />
        </div>

        {/* Ciudad */}
        <div className={styles.fieldHalf}>
          <label htmlFor="ciudad" className={styles.label}>
            Ciudad <span className={styles.required}>*</span>
          </label>
          <InputText
            id="ciudad"
            value={direccionData.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            placeholder="Ej: Valledupar"
            className={styles.input}
          />
        </div>

        {/* Departamento */}
        <div className={styles.fieldHalf}>
          <label htmlFor="departamento" className={styles.label}>
            Departamento <span className={styles.required}>*</span>
          </label>
          <InputText
            id="departamento"
            value={direccionData.departamento}
            onChange={(e) => handleChange('departamento', e.target.value)}
            placeholder="Ej: Cesar"
            className={styles.input}
          />
        </div>

        {/* País */}
        <div className={styles.fieldHalf}>
          <label htmlFor="pais" className={styles.label}>
            País <span className={styles.required}>*</span>
          </label>
          <InputText
            id="pais"
            value={direccionData.pais}
            onChange={(e) => handleChange('pais', e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Vista previa */}
        <div className={styles.fieldFull}>
          <label className={styles.label}>Vista Previa de la Dirección</label>
          <div className={styles.preview}>
            {construirDireccionTexto(direccionData)}
          </div>
        </div>
      </div>
    </Dialog>
  );
}