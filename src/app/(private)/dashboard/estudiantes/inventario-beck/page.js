'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import styles from './inventario-beck.module.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function InventarioBeckPage() {
  
  const sintomas = [
    { id: 1, nombre: "Adormecimiento o cosquilleo" },
    { id: 2, nombre: "Sentirse acalorado(a)" },
    { id: 3, nombre: "Debilidad en las piernas" },
    { id: 4, nombre: "Incapacidad para relajarse" },
    { id: 5, nombre: "Miedo de que suceda lo peor" },
    { id: 6, nombre: "Mareo" },
    { id: 7, nombre: "Taquicardia" },
    { id: 8, nombre: "Inquietud" },
    { id: 9, nombre: "Sentirse aterrorizado(a)" },
    { id: 10, nombre: "Nerviosismo" },
    { id: 11, nombre: "Sensación de ahogo" },
    { id: 12, nombre: "Manos temblorosas" },
    { id: 13, nombre: "Escalofríos" },
    { id: 14, nombre: "Miedo a perder el control" },
    { id: 15, nombre: "Dificultad para respirar" },
    { id: 16, nombre: "Miedo a morir" },
    { id: 17, nombre: "Sentirse asustado(a)" },
    { id: 18, nombre: "Indigestión o molestias estomacales" },
    { id: 19, nombre: "Pérdida de la conciencia, desmayo" },
    { id: 20, nombre: "Rostro sonrojado" },
    { id: 21, nombre: "Suduración(no debido al calor)" }
  ];

  const opciones = [
    { label: "0 - No ha estado presente", value: 0 },
    { label: "1 - Levemente, no me ha molestado mucho", value: 1 },
    { label: "2 - Moderadamente, ha sido molesto, pero lo he podido soportar", value: 2 },
    { label: "3 - Severamente, difícil de soportar", value: 3 }
  ];

  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    sexo: '',
    fecha: new Date(),
    respuestas: {}
  });

  const handleInput = (e) => {
    let value = e.target.value;
    
    if (e.target.name === 'nombre') {
      value = value.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
    }
    
    setForm({ ...form, [e.target.name]: value });
  };

  const handleRespuesta = (sintomaId, valor) => {
    setForm(prevForm => ({
      ...prevForm,
      respuestas: {
        ...prevForm.respuestas,
        [sintomaId]: valor
      }
    }));
  };

  const isFormValid = () => {
    const camposBasicos = form.nombre && 
                         form.edad && 
                         form.sexo && 
                         form.fecha;

    const todasLasRespuestas = sintomas.every(s => 
      form.respuestas[s.id] !== undefined
    );

    return camposBasicos && todasLasRespuestas;
  };

  const items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'Inventario de Beck' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };

  const generarPDF = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 12;
    let y = 10;

    // Encabezado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Universidad Popular del Cesar', margin, y);
    doc.text('La UPC', pageWidth - margin, y, { align: 'right' });
    y += 8;
    doc.setFontSize(12);
    doc.text('INVENTARIO DE ANSIEDAD DE BECK', pageWidth / 2, y, { align: 'center' });

    // Datos generales
    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const putLine = (label, value, x, width) => {
      const text = `${label}`;
      doc.text(text, x, y);
      const lx = x + doc.getTextWidth(text) + 2;
      doc.line(lx, y + 0.6, x + width, y + 0.6);
      if (value) doc.text(String(value), lx + 1, y);
    };
    putLine('Nombre:', form.nombre, margin, pageWidth - margin * 2 - 60);
    putLine('Edad:', form.edad, pageWidth - margin - 55, 16);
    putLine('Sexo:', form.sexo, pageWidth - margin - 35, 16);
    y += 8;
    putLine('Fecha:', form.fecha ? new Date(form.fecha).toLocaleDateString('es-ES') : '', margin, 60);

    // Instrucciones
    y += 8;
    const instrucciones = [
      'Abajo encontrará una lista de síntomas comunes de ansiedad. Marque cuánto le ha molestado',
      'cada síntoma durante la semana pasada, incluyendo hoy.'
    ];
    instrucciones.forEach(line => { doc.text(line, margin, y); y += 5; });
    const leyenda = ['0 No ha estado presente','1 Levemente','2 Moderadamente','3 Severamente'];
    doc.setFontSize(9);
    doc.text(leyenda.join('    '), margin, y);

    // Tabla de síntomas
    y += 6;
    const head = [['No.', 'Síntoma', '0', '1', '2', '3']];
    const body = sintomas.map((s) => {
      const marc = [0,1,2,3].map(v => (form.respuestas[s.id] === v ? 'X' : ''));
      return [s.id, s.nombre, ...marc];
    });
    autoTable(doc, {
      head,
      body,
      startY: y,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [255,255,255], textColor: 0, fontStyle: 'bold' },
      columnStyles: { 0: { cellWidth: 10 }, 2: { halign: 'center' }, 3: { halign: 'center' }, 4: { halign: 'center' }, 5: { halign: 'center' } },
      margin: { left: margin, right: margin },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 6, { align: 'center' });
    }

    doc.save(`Inventario_Beck_${form.nombre || 'estudiante'}.pdf`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Inventario de Ansiedad de Beck</h2>
        <BreadCrumb model={items} home={home} />
      </div>

      <Divider />

      <Card className={styles.card}>
        <form>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="fecha">Fecha</label>
              <Calendar 
                id="fecha" 
                name="fecha" 
                value={form.fecha} 
                onChange={handleInput} 
                dateFormat="dd/mm/yy" 
                showIcon 
                readOnlyInput={true}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="nombre">Nombre</label>
              <InputText 
                id="nombre" 
                name="nombre" 
                value={form.nombre} 
                onChange={handleInput}
                placeholder='Ej. Juan Pérez'
                required 
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="edad">Edad</label>
              <InputText 
                id="edad" 
                name="edad" 
                value={form.edad}
                onChange={(e) => {
                  const value = e.target.value;
                  // Solo permite números y máximo 2 dígitos
                  if (/^\d{0,2}$/.test(value)) {
                    handleInput(e);
                  }
                }}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              maxLength={2}
              placeholder="Ej. 25"
                keyfilter="int"
                required 
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="sexo">Sexo</label>
              <Dropdown
                id="sexo"
                name="sexo"
                value={form.sexo}
                options={[
                  { label: 'Masculino', value: 'M' },
                  { label: 'Femenino', value: 'F' }
                ]}
                onChange={handleInput}
                required
              />
            </div>
          </div>

          <div className={styles.instrucciones}>
            <p>
              Abajo encontrará una lista de síntomas comunes de la ansiedad. 
              Por favor, lea cuidadosamente cada ítem e indique cuánto le ha molestado cada uno
              durante la semana pasada, INCLUYENDO EL DÍA DE HOY, marcando el número que identifique
              mejor la intensidad de los síntomas.
              
            </p>
            <ul>
              <li>(0)  No ha estado presente</li>
              <li>(1)  Levemente, no me ha molestado mucho</li>
              <li>(2)  Moderadamente, ha sido molesto, pero lo puedo soportar</li>
              <li>(3)  Severamente, díficil de soportar</li>
              </ul>
          </div>

          <div className={styles.tablaSintomas}>
            <table>
              <thead>
                <tr>
                  <th>Síntoma</th>
                  <th>Intensidad</th>
                </tr>
              </thead>
              <tbody>
                {sintomas.map((sintoma) => (
                  <tr key={sintoma.id}>
                    <td>{sintoma.nombre}</td>
                    <td>
                      <Dropdown
                        value={form.respuestas[sintoma.id]}
                        options={opciones}
                        onChange={(e) => handleRespuesta(sintoma.id, e.value)}
                        className={styles.dropdownRespuesta}
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Divider />

          <div className={styles.actions}>
            <Button 
              label="Descargar PDF" 
              type="button"
              disabled={!isFormValid()}
              onClick={generarPDF}
            />
            <Button 
              label="Cancelar" 
              type="button" 
              className="p-button-secondary" 
            />
          </div>
        </form>
      </Card>
    </div>
  );
}