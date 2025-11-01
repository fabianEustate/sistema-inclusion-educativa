'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import {FileUpload} from 'primereact/fileupload';
import styles from './consentimiento.module.css';

export default function ConsentimientoPage() {
  const procesos = [
    { label: 'Valoración psicológica', key: 'valoracion' },
    { label: 'Entrevista', key: 'entrevista' },
    { label: 'Visita Domiciliaria', key: 'visita' },
    { label: 'Aplicación de pruebas psicológicas', key: 'pruebas' },
    { label: 'Verificación y validación de datos', key: 'verificacion' },
  ];

  const [form, setForm] = useState({
    nombres: '',
    documento: '',
    fecha: new Date(),
    procesos: {},
    acepta: false,
  });

  const handleInput = (e) => {
    let value = e.target.value;
    
    // Si el campo es "nombres", capitaliza la primera letra de cada palabra
    if (e.target.name === 'nombres') {
      value = value.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
    }
    
    setForm({ ...form, [e.target.name]: value });
  };
  const handleProceso = (key, value) => {
  const updatedProcesos = {
    ...form.procesos,
    [key]: value
  };
  
  setForm(prevForm => ({
    ...prevForm,
    procesos: updatedProcesos
  }));
  };

  const isFormValid = () => {
    // Verifica campos básicos
   const camposBasicos = form.fecha && 
                        form.nombres && 
                        form.nombres.trim() !== '' && 
                        form.documento && 
                        form.documento.trim() !== '';

    // Verifica que todos los procesos tengan una selección
    const todosProcesosMarcados = procesos.every(proc => 
      form.procesos[proc.key] === true || form.procesos[proc.key] === false
    );

    // Verifica firma digital (ajusta según tus necesidades)
    const tieneArchivos = true; // Modifica esto según tu lógica de archivos

    return camposBasicos && 
          todosProcesosMarcados && 
          tieneArchivos && 
          form.acepta;
  };

  const onUpload = (event) => {
    // Maneja el archivo subido
    console.log('Archivo subido:', event.files[0]);
  };

  const items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'Consentimiento Informado' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };

  return (
    <div className={styles.container}>
      {/* ======= ENCABEZADO ======= */}
      <div className={styles.header}>
        <h2>Consentimiento Informado</h2>
        <BreadCrumb model={items} home={home} />
      </div>

      <Divider />
  
    
      {/* ======= CONTENIDO ======= */}
      <Card className={styles.card}>
        <form>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="fecha">Fecha</label>
              <Calendar id="fecha" name="fecha" 
              value={form.fecha} 
              onChange={handleInput} dateFormat="dd/mm/yy" 
              showIcon readOnlyInput={true}
               required/>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="nombres">Nombres y Apellidos</label>
              <InputText id="nombres" name="nombres" 
              value={form.nombres} 
              onChange={handleInput}
              placeholder='Ej. Juan Perez'
               required />
            </div>

           <div className={styles.field}>
              <label htmlFor="documento">Documento de Identidad</label>
              <InputText 
                id="documento" 
                name="documento" 
                value={form.documento} 
                placeholder='Ej. 1234567890'
                onChange={handleInput} 
                maxLength={10} 
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }} 
                required 
              />
            </div>
          </div>
          <div className={styles.consentimientoTexto}>
            <p>
              Yo, <span className={styles.dato}>{form.nombres || '__________'}</span>, identificado con la cédula de ciudadanía N° <span className={styles.dato}>{form.documento || '__________'}</span>,
              autorizo al equipo de trabajo de Educación inclusiva e Intercultural, del programa de Bienestar Institucional de la Universidad Popular del Cesar, para que lleven a cabo todo lo relacionado con el proceso de acompañamiento y seguimiento.
              <br />
              <i>Señalar con una (x) si autoriza o no el proceso contemplado que se llevará a cabo.</i>
            </p>
          </div>
          <div className={styles.tablaProcesos}>
            <table>
              <thead>
                <tr>
                  <th>SI</th>
                  <th>NO</th>
                  <th>PROCESOS</th>
                </tr>
              </thead>
              <tbody>
                {procesos.map((proc) => (
                  <tr key={proc.key}>
                    <td>
                      <Checkbox
                        checked={form.procesos[proc.key] === true}
                        onChange={() => handleProceso(proc.key, true)}
                        inputId={`si-${proc.key}`}
                        name={`si-${proc.key}`}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={form.procesos[proc.key] === false}
                        onChange={() => handleProceso(proc.key, false)}
                        inputId={`no-${proc.key}`}
                        name={`no-${proc.key}`}
                      />
                    </td>
                    <td>
                      <label htmlFor={`si-${proc.key}`}>{proc.label}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.nota}>
            <b>Nota:</b> La Universidad Popular del Cesar garantiza la confidencialidad del presente proceso.
          </div>
          <div className={styles.observaciones}>
            <b>Observaciones Adicionales:</b>
            <ul>
              <li>Su participación es libre y voluntaria.</li>
              <li>Su participación no genera riesgo a su salud y bienestar. Cualquier daño demostrable ocasionado a su bienestar físico o mental, así como a sus propiedades, es responsabilidad de los profesionales.</li>
              <li>Usted tiene derecho a pedir la restitución de sus derechos.</li>
              <li>Sus datos y resultados serán usados de manera confidencial, según la ley.</li>
              <li>La única excepción es si alguna autoridad judicial competente(por ejemplo, fiscalia) solicita a los profesionales 
                del equipo de educación inclusiva e intercultural de la Universidad Popular del Cesar
                el acceso a la información, o si hay inminencia de riesgo al bienestar físico o mental suyo.</li>
              <li>En cualquier instante usted puede acceder a su propia información, por medio
                de una solicitud previamente escrita.</li>
            </ul>
          </div>
          <div className={styles.field}>
            <label>Firma Digital del Estudiante (máximo 5MB)</label>
            <FileUpload
                mode="basic"
                name="firma"
                url="/api/upload" // Ajusta esto a tu endpoint real
                accept="image/*,.pdf"
                maxFileSize={5000000}
                chooseLabel="Seleccionar Firma"
                uploadLabel="Subir"
                cancelLabel="Cancelar"
                className={styles.fileUpload}
                onUpload={onUpload}
                auto
            />
        </div>
         <div className={styles.field}>
            <label>Firma Digital del Profesional (máximo 5MB)</label>
            <FileUpload
                mode="basic"
                name="firma"
                url="/api/upload" // Ajusta esto a tu endpoint real
                accept="image/*,.pdf"
                maxFileSize={5000000}
                chooseLabel="Seleccionar Firma"
                uploadLabel="Subir"
                cancelLabel="Cancelar"
                className={styles.fileUpload}
                onUpload={onUpload}
                auto
            />
        </div>

         <div className={styles.field}>
            <label>Firma Digital del Profesional (máximo 5MB)</label>
            <FileUpload
                mode="basic"
                name="firma"
                url="/api/upload" // Ajusta esto a tu endpoint real
                accept="image/*,.pdf"
                maxFileSize={5000000}
                chooseLabel="Seleccionar Firma"
                uploadLabel="Subir"
                cancelLabel="Cancelar"
                className={styles.fileUpload}
                onUpload={onUpload}
                auto
            />
        </div>
        <Divider />
          <div className={styles.field}>
            <Checkbox
              inputId="acepta"
              checked={form.acepta}
              onChange={e => setForm({ ...form, acepta: e.checked })}
              required
            />
            <label htmlFor="acepta" className={styles.labelCheckbox}>
              Acepto los términos y condiciones
            </label>
          </div>
          <Divider />

          <div className={styles.actions}>
            <Button label="Enviar"
             type="submit"
              disabled={!isFormValid()}
              tooltip={!isFormValid() ? "Complete todos los campos requeridos": ""} 
              tooltipOptions={{position:'top'}}/>
            <Button label="Cancelar" type="button" className="p-button-secondary" />
          </div>
        </form>
      </Card>
    </div>
  );
}