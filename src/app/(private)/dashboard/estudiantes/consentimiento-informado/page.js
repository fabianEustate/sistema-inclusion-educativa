'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import jsPDF from 'jspdf';
import styles from './consentimiento.module.css';


const LS_KEY = "consentimiento_informado";

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
    firmaEstudiante: null,
    firmaEstudiantePreview: null,
    firmaProfesional1: null,
    firmaProfesional1Preview: null,
    firmaProfesional2: null,
    firmaProfesional2Preview: null,
  });

  const isFormValid = () => {
  // Validar campos obligatorios según TU estructura
  const camposLlenos = 
    form.nombres && form.nombres.trim() !== '' &&
    form.documento && form.documento.trim() !== '' &&
    form.acepta === true;

  // Validar que las 3 firmas estén cargadas
  const firmasValidas = 
    form.firmaEstudiante !== null &&
    form.firmaProfesional1 !== null &&
    form.firmaProfesional2 !== null;

  return camposLlenos && firmasValidas;
};


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

 // Handler para firma del ESTUDIANTE
const handleFirmaEstudianteChange = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    alert("El archivo supera 5MB. Seleccione otro.");
    return;
  }
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    alert("Solo se permiten imágenes (JPG, PNG, GIF).");
    return;
  }
  
  if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file);
    if (form.firmaEstudiantePreview) URL.revokeObjectURL(form.firmaEstudiantePreview);
    setForm((prev) => ({ 
      ...prev, 
      firmaEstudiante: file, 
      firmaEstudiantePreview: url
    }));
  }
};

// Handler para firma del PROFESIONAL 1
const handleFirmaProfesional1Change = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    alert("El archivo supera 5MB. Seleccione otro.");
    return;
  }
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    alert("Solo se permiten imágenes (JPG, PNG, GIF).");
    return;
  }
  
  if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file);
    if (form.firmaProfesional1Preview) URL.revokeObjectURL(form.firmaProfesional1Preview);
    setForm((prev) => ({ 
      ...prev, 
      firmaProfesional1: file, 
      firmaProfesional1Preview: url
    }));
  }
};

// Handler para firma del PROFESIONAL 2
const handleFirmaProfesional2Change = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    alert("El archivo supera 5MB. Seleccione otro.");
    return;
  }
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    alert("Solo se permiten imágenes (JPG, PNG, GIF).");
    return;
  }
  
  if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file);
    if (form.firmaProfesional2Preview) URL.revokeObjectURL(form.firmaProfesional2Preview);
    setForm((prev) => ({ 
      ...prev, 
      firmaProfesional2: file, 
      firmaProfesional2Preview: url
    }));
  }
};

const limpiarFormulario = () => {
  if (confirm("¿Estás seguro de que deseas limpiar todo el formulario?")) {
    // Liberar URLs de las 3 firmas
    if (form.firmaEstudiantePreview) URL.revokeObjectURL(form.firmaEstudiantePreview);
    if (form.firmaProfesional1Preview) URL.revokeObjectURL(form.firmaProfesional1Preview);
    if (form.firmaProfesional2Preview) URL.revokeObjectURL(form.firmaProfesional2Preview);
    
    // Resetear con un objeto nuevo
    setForm({
      nombres: '',
      documento: '',
      fecha: new Date(),
      procesos: {},
      acepta: false,
      firmaEstudiante: null,
      firmaEstudiantePreview: null,
      firmaProfesional1: null,
      firmaProfesional1Preview: null,
      firmaProfesional2: null,
      firmaProfesional2Preview: null,
    });
    
    localStorage.removeItem(LS_KEY);
    
    // Limpiar inputs file de las 3 firmas
    const firmaEstInput = document.getElementById('firmaEstudiante');
    const firmaProf1Input = document.getElementById('firmaProfesional1');
    const firmaProf2Input = document.getElementById('firmaProfesional2');
    if (firmaEstInput) firmaEstInput.value = '';
    if (firmaProf1Input) firmaProf1Input.value = '';
    if (firmaProf2Input) firmaProf2Input.value = '';
    
    alert("Formulario limpiado exitosamente");
  }
  };

  const items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'Consentimiento Informado' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };

const generarPDF = async () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  let y = 20;

  // Función helper para dibujar tablas
  const drawTable = (startY, rows, colWidths) => {
    let currentY = startY;
    rows.forEach(row => {
      let x = margin;
      const maxHeight = Math.max(...row.map(cell => cell.height || 8));
      
      row.forEach((cell, i) => {
        // Dibujar borde
        doc.rect(x, currentY, colWidths[i], maxHeight);
        
        // Configurar fuente
        doc.setFontSize(cell.fontSize || 9);
        doc.setFont("helvetica", cell.bold ? "bold" : "normal");
        
        // Agregar texto con word wrap
        const lines = doc.splitTextToSize(cell.text, colWidths[i] - 3);
        doc.text(lines, x + 1.5, currentY + 5);
        
        x += colWidths[i];
      });
      currentY += maxHeight;
    });
    return currentY;
  };

  // Función mejorada para agregar imagen de firma (solo imágenes)
  const addSignatureImage = async (file) => {
    if (!file) return null;
    
    // Solo procesar si es una imagen
    if (file.type.startsWith('image/')) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    }
    return null;
  };

  // ============ PÁGINA 1 ============
  
  // Encabezado con logos simulados (texto)
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Universidad Popular del Cesar", margin, y);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("Bienestar", margin, y + 5);
  doc.text("Institucional", margin, y + 9);
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("La UPC", pageWidth - margin - 20, y);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("es de todos!", pageWidth - margin - 20, y + 5);

  // Título principal
  y = 35;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("CONSENTIMIENTO INFORMADO", pageWidth / 2, y, { align: 'center' });

  // Fecha
  y = 50;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const fechaFormateada = form.fecha ? new Date(form.fecha).toLocaleDateString('es-ES') : '_________________';
  doc.text(`Fecha: ${fechaFormateada}`, margin, y);

  // Tabla de DATOS GENERALES
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("DATOS GENERALES", pageWidth / 2, y, { align: 'center' });
  
  y += 5;
  const datosRows = [
    [
      { text: 'Nombres y Apellidos', bold: true, fontSize: 9 },
      { text: form.nombres || '', fontSize: 9 }
    ],
    [
      { text: 'Documento de Identidad', bold: true, fontSize: 9 },
      { text: form.documento || '', fontSize: 9 }
    ]
  ];
  y = drawTable(y, datosRows, [55, pageWidth - margin * 2 - 55]);

  // Sección CONSENTIMIENTO
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("CONSENTIMIENTO", pageWidth / 2, y, { align: 'center' });
  
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const consentText = `Yo, ${form.nombres || '_____________________'}, identificado con la cédula de ciudadanía N° ${form.documento || '__________'}, autorizo al equipo de trabajo de Educación Inclusiva e Intercultural, del programa de Bienestar Institucional de la Universidad Popular del Cesar, para que lleven a cabo todo lo relacionado con el proceso de acompañamiento y seguimiento. Señalar con una (x) si autoriza o no el proceso contemplado con la línea a cabo.`;
  
  const textLines = doc.splitTextToSize(consentText, pageWidth - margin * 2);
  textLines.forEach(line => {
    doc.text(line, margin, y);
    y += 4.5;
  });

  // Tabla de PROCESOS
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("PROCESOS", pageWidth / 2, y, { align: 'center' });
  
  y += 5;
  const procesosHeaders = [
    [
      { text: 'SÍ', bold: true, fontSize: 9, height: 7 },
      { text: 'NO', bold: true, fontSize: 9, height: 7 },
      { text: '', bold: true, fontSize: 9, height: 7 }
    ]
  ];
  y = drawTable(y, procesosHeaders, [12, 12, pageWidth - margin * 2 - 24]);
  
  // Filas de procesos
  const procesosData = [
    { label: 'Valoración psicológica', key: 'valoracion' },
    { label: 'Entrevista', key: 'entrevista' },
    { label: 'Visita Domiciliaria', key: 'visita' },
    { label: 'Aplicación de pruebas psicológicas', key: 'pruebas' },
    { label: 'Verificación y validación de datos', key: 'verificacion' }
  ];
  
  const procesosRows = procesosData.map(proc => [
    { text: form.procesos[proc.key] === true ? 'X' : '', fontSize: 10, height: 7 },
    { text: form.procesos[proc.key] === false ? 'X' : '', fontSize: 10, height: 7 },
    { text: proc.label, fontSize: 9, height: 7 }
  ]);
  
  y = drawTable(y, procesosRows, [12, 12, pageWidth - margin * 2 - 24]);

  // Nota
  y += 6;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  const nota = "Nota: La Universidad Popular del Cesar garantiza la confidencialidad del presente proceso";
  doc.text(nota, margin, y);

  // Observaciones Adicionales
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Observaciones Adicionales:", margin, y);
  
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  
  const observaciones = [
    "• Su participación es libre y voluntaria",
    "• Su participación no genera riesgo a su salud y bienestar. Cualquier daño demostrable ocasionado a su bienestar físico así como a sus propiedades, es responsabilidad de los profesionales; por tanto, al suceder este tipo de incidentes, usted tiene derecho a la restitución de sus derechos",
    "• Sus datos y resultados serán usados de manera confidencial, según lo exige el artículo 2 numeral 6 de la Ley 1090 de 2006 al rol del psicólogo. La única excepción a esta confidencialidad, según lo contempla por ejemplo el artículo 23 de la Ley 1090 de 2006, es cuando alguna autoridad judicial competente por ejemplo, fiscalía) solicita a los profesionales del equipo de educación inclusiva e intercultural de la Universidad Popular del Cesar..."
  ];
  
  observaciones.forEach(obs => {
    const obsLines = doc.splitTextToSize(obs, pageWidth - margin * 2 - 3);
    obsLines.forEach(line => {
      if (y > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin + 2, y);
      y += 4;
    });
    y += 1;
  });

  // ============ PÁGINA 2 - FIRMAS ============
  doc.addPage();
  y = 30;

  // Cargar todas las firmas (solo imágenes)
  const [imgEstudiante, imgProf1, imgProf2] = await Promise.all([
    addSignatureImage(form.firmaEstudiante),
    addSignatureImage(form.firmaProfesional1),
    addSignatureImage(form.firmaProfesional2)
  ]);

  // FIRMA DEL PARTICIPANTE (ESTUDIANTE)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("FIRMA PARTICIPANTE", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text("C.C.", margin, y + 5);
  
  if (imgEstudiante) {
    try {
      doc.addImage(imgEstudiante, 'JPEG', margin, y + 2, 45, 15);
    } catch (error) {
      console.error('Error al agregar firma estudiante:', error);
    }
  }
  
  doc.line(margin, y + 20, pageWidth - margin, y + 20);
  y += 35;

  // FIRMA DEL PROFESIONAL 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("FIRMA DEL PROFESIONAL", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text("C.C.", margin, y + 5);
  
  if (imgProf1) {
    try {
      doc.addImage(imgProf1, 'JPEG', margin, y + 2, 45, 15);
    } catch (error) {
      console.error('Error al agregar firma profesional 1:', error);
    }
  }
  
  doc.line(margin, y + 20, pageWidth - margin, y + 20);
  y += 35;

  // FIRMA DEL PROFESIONAL 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("FIRMA DEL PROFESIONAL", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text("C.C.", margin, y + 5);
  
  if (imgProf2) {
    try {
      doc.addImage(imgProf2, 'JPEG', margin, y + 2, 45, 15);
    } catch (error) {
      console.error('Error al agregar firma profesional 2:', error);
    }
  }
  
  doc.line(margin, y + 20, pageWidth - margin, y + 20);

  // Footer
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("www.unicesar.edu.co", pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text("Balneario Hurtado Vía a Patillal, PBX (5) 5843000", pageWidth / 2, pageHeight - 10, { align: 'center' });
  doc.text("Líneas de atención al ciudadano: 018000 976 202", pageWidth / 2, pageHeight - 5, { align: 'center' });

  // Generar y descargar el PDF
  const fileName = `Consentimiento_${form.documento || 'documento'}_${Date.now()}.pdf`;
  doc.save(fileName);
};

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

           { /*Firmas */}

            {/* FIRMA DEL ESTUDIANTE */}
            <div className={styles.fieldWide}>
              <label className={styles.label}>Firma Digital del Estudiante</label>
              <div className={styles.photoHeader}>
                <div className={styles.photoWrapper}>
                  {form.firmaEstudiantePreview ? (
                    <img
                      alt="Firma Digital del Estudiante"
                      src={form.firmaEstudiantePreview}
                      className={styles.photoPreview}
                    />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                    </div>
                  )}
                </div>
                <div className={styles.photoControls}>
                  <input
                    id="firmaEstudiante"
                    type="file"
                    accept="image/*"
                    onChange={handleFirmaEstudianteChange}
                    style={{ display: 'none' }}
                  />
                  
                  <label htmlFor="firmaEstudiante" className={styles.uploadButton}>
                    <i className="pi pi-upload"></i> Seleccionar archivo
                  </label>
                  
                  <small className={styles.helperText}>Imágenes. Máx 5MB.</small>
                </div>
              </div>
            </div>

            {/* FIRMA DEL PROFESIONAL 1 */}
            <div className={styles.fieldWide}>
              <label className={styles.label}>Firma Digital del Profesional </label>
              <div className={styles.photoHeader}>
                <div className={styles.photoWrapper}>
                  {form.firmaProfesional1Preview ? (
                    <img
                      alt="Firma Digital del Profesional 1"
                      src={form.firmaProfesional1Preview}
                      className={styles.photoPreview}
                    />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                    </div>
                  )}
        </div>
                <div className={styles.photoControls}>
                  <input
                    id="firmaProfesional1"
                    type="file"
                    accept="image/*"
                    onChange={handleFirmaProfesional1Change}
                    style={{ display: 'none' }}
                  />
                  
                  <label htmlFor="firmaProfesional1" className={styles.uploadButton}>
                    <i className="pi pi-upload"></i> Seleccionar archivo
                  </label>
                  
                  <small className={styles.helperText}>Imágenes. Máx 5MB.</small>
                </div>
              </div>
        </div>

            {/* FIRMA DEL PROFESIONAL 2 */}
            <div className={styles.fieldWide}>
              <label className={styles.label}>Firma Digital del Profesional </label>
              <div className={styles.photoHeader}>
                <div className={styles.photoWrapper}>
                  {form.firmaProfesional2Preview ? (
                    <img
                      alt="Firma Digital del Profesional 2"
                      src={form.firmaProfesional2Preview}
                      className={styles.photoPreview}
                    />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                    </div>
                  )}
                </div>
                <div className={styles.photoControls}>
                  <input
                    id="firmaProfesional2"
                    type="file"
                    accept="image/*"
                    onChange={handleFirmaProfesional2Change}
                    style={{ display: 'none' }}
                  />
                  
                  <label htmlFor="firmaProfesional2" className={styles.uploadButton}>
                    <i className="pi pi-upload"></i> Seleccionar archivo
                  </label>
                  
                  <small className={styles.helperText}>Imágenes. Máx 5MB.</small>
                </div>
              </div>
        </div>

            { /*Firmas */}

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
            <Button
             label="Enviar"
             type="submit"
              disabled={!isFormValid()}
             tooltipOptions={{position:'top'}}
             onClick={() => {
              localStorage.setItem(LS_KEY, JSON.stringify(form));
                generarPDF();}}
              />
            <Button 
            label="Cancelar" 
            icon="pi pi-times"
            type="button" 
            className="p-button-danger p-button-outlined"
            onClick={limpiarFormulario} />
          </div>
        </form>
      </Card>
    </div>
  );
}