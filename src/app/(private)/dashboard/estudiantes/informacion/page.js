"use client";

import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import styles from './Informacion.module.css';

export default function Page() {
  // Estado de búsqueda
  const [queryNombre, setQueryNombre] = useState('');
  const [queryDocumento, setQueryDocumento] = useState('');

  // Datos de ejemplo (reemplazar con fetch a tu API)
  const alumnos = [
    { id: 1, nombres: 'Juan', apellidos: 'Pérez', documento: '1234567890', enfermedad: 'Asma' },
    { id: 2, nombres: 'María', apellidos: 'García', documento: '1098765432', enfermedad: 'Diabetes' },
    { id: 3, nombres: 'Carlos', apellidos: 'López', documento: '1020304050', enfermedad: 'Ninguna' },
    { id: 4, nombres: 'Ana', apellidos: 'Torres', documento: '1122334455', enfermedad: 'Miopía' },
   
  ];

  const resultados = useMemo(() => {
    const nombre = queryNombre.trim().toLowerCase();
    const doc = queryDocumento.trim();
    return alumnos.filter(a => {
      const fullName = `${a.nombres} ${a.apellidos}`.toLowerCase();
      const matchNombre = !nombre || fullName.includes(nombre);
      const matchDoc = !doc || a.documento.includes(doc);
      return matchNombre && matchDoc;
    });
  }, [queryNombre, queryDocumento]);

const abrirPDFPredeterminado = () => {
  const TEMPLATE_URL = '/ficha_estudiante.pdf';
  const win = window.open(TEMPLATE_URL, '_blank');
  if (!win) {
    const link = document.createElement('a');
    link.href = TEMPLATE_URL;
    link.download = 'ficha_estudiante.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


  const items = [
    { label: 'Dashboard', url: '/dashboard' },
  { label: 'Estudiantes', url: '/dashboard/estudiantes/informacion' },
    { label: 'Información' },
  ];

  const home = { icon: 'pi pi-home', url: '/dashboard' };

  return (
    <div className={styles.container}>
      {/* ======= ENCABEZADO ======= */}
      <div className={styles.header}>
        <h2>Información del Estudiante</h2>
        <BreadCrumb model={items} home={home} />
      </div>

      <Divider />

      {/* ======= CONTENIDO ======= */}
      <Card className={styles.card}>
        <form>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="buscaNombre">Buscar por Nombre</label>
              <InputText
                id="buscaNombre"
                value={queryNombre}
                onChange={(e) => setQueryNombre(e.target.value)}
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="buscaDoc">Buscar por Cédula</label>
              <InputText
                id="buscaDoc"
                value={queryDocumento}
                onChange={(e) => setQueryDocumento(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={10}
                placeholder="Ej. 1234567890"
              />
            </div>
          </div>
        </form>

        <Divider />

        <DataTable
          value={resultados}
          emptyMessage="No se encontraron alumnos con esos criterios"
          paginator rows={10}
          responsiveLayout="scroll"
        >
          <Column field="nombres" header="Nombres" sortable></Column>
          <Column field="apellidos" header="Apellidos" sortable></Column>
          <Column field="documento" header="Cédula" sortable></Column>
          <Column field="enfermedad" header="Enfermedad" sortable></Column>
          <Column
            header="Documento"
            body={(row) => (
              <Button
                label="Descargar"
                icon="pi pi-download"
                className="p-button-sm"
                onClick={() => abrirPDFPredeterminado()}
              />
            )}
          ></Column>
        </DataTable>
      </Card>
    </div>
  );
}
