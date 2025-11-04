'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import styles from './verestudiante.module.css';

export default function VerEstudiantesDocente() {
  const [docenteInfo, setDocenteInfo] = useState(null);
  const [materiasConEstudiantes, setMateriasConEstudiantes] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');

  // Cargar información del docente autenticado y sus materias
  useEffect(() => {
    cargarDatosDocente();
  }, []);

  const cargarDatosDocente = async () => {
    setLoading(true);
    
    try {
      // TODO: Obtener ID del docente autenticado desde tu contexto de autenticación
      // const docenteId = tuContextoAuth.idDocente;
      
      // TODO: Llamar a tu API real
      // const response = await fetch(`/api/docentes/${docenteId}/materias-estudiantes`);
      // const data = await response.json();
      
      // setDocenteInfo(data.docente);
      // setMateriasConEstudiantes(data.materias);
      // setLoading(false);
      
    } catch (error) {
      console.error('Error al cargar datos del docente:', error);
      setLoading(false);
    }
  };

  const totalEstudiantes = materiasConEstudiantes.reduce(
    (sum, materia) => sum + materia.total_estudiantes, 
    0
  );

  const totalMateriasActivas = materiasConEstudiantes.filter(m => m.total_estudiantes > 0).length;

  // Template para la columna de código con badge
  const codigoTemplate = (rowData) => {
    return (
      <div className={styles.codigoContainer}>
        <span className={styles.codigoBadge}>{rowData.codigo}</span>
        <span className={styles.grupo}>Grupo {rowData.grupo}</span>
      </div>
    );
  };

  // Template para el contador de estudiantes
  const estudiantesTemplate = (rowData) => {
    return (
      <div className={styles.countContainer}>
        <Badge value={rowData.total_estudiantes} severity="success" size="large" />
        <span className={styles.countLabel}>estudiantes</span>
      </div>
    );
  };

  // Template para la expansión de filas (detalle de estudiantes)
  const rowExpansionTemplate = (data) => {
    const estudiantesActivos = data.estudiantes.filter(e => e.activo).length;
    const estudiantesInactivos = data.estudiantes.filter(e => !e.activo).length;

    return (
      <div className={styles.expansionContainer}>
        <div className={styles.expansionHeader}>
          <h4 className={styles.expansionTitle}>
            Estudiantes inscritos en {data.nombre}
          </h4>
          <div className={styles.expansionStats}>
            <Badge value={`${estudiantesActivos} Activos`} severity="success" />
            {estudiantesInactivos > 0 && (
              <Badge value={`${estudiantesInactivos} Inactivos`} severity="danger" />
            )}
          </div>
        </div>
        <DataTable 
          value={data.estudiantes} 
          className={styles.estudiantesTable}
          paginator 
          rows={10}
          emptyMessage="No hay estudiantes registrados"
          sortField="nombre"
          sortOrder={1}
        >
          <Column field="codigo" header="Código" sortable style={{ width: '150px' }} />
          <Column field="nombre" header="Nombre Completo" sortable />
          <Column 
            field="activo" 
            header="Estado" 
            body={(rowData) => (
              <Badge 
                value={rowData.activo ? 'Activo' : 'Inactivo'} 
                severity={rowData.activo ? 'success' : 'danger'}
              />
            )}
            sortable
            style={{ width: '120px' }}
          />
        </DataTable>
      </div>
    );
  };

  // Header con búsqueda
  const tableHeader = (
    <div className={styles.tableHeader}>
      <h3 className={styles.tableTitle}>Mis Materias Asignadas</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText 
          value={globalFilter} 
          onChange={(e) => setGlobalFilter(e.target.value)} 
          placeholder="Buscar materia..." 
          className={styles.searchInput}
        />
      </span>
    </div>
  );

  // Skeleton para carga
  const skeletonTemplate = () => {
    return (
      <div className={styles.skeletonContainer}>
        <Skeleton width="100%" height="3rem" className="mb-2" />
        <Skeleton width="100%" height="3rem" className="mb-2" />
        <Skeleton width="100%" height="3rem" />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Card className={styles.mainCard}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              <i className="pi pi-users" style={{ marginRight: '0.5rem' }}></i>
              Mis Estudiantes
            </h2>
            {docenteInfo && (
              <p className={styles.subtitle}>
                Bienvenido(a), <strong>{docenteInfo.nombre_completo}</strong>
              </p>
            )}
          </div>
          <button 
            className={styles.refreshButton}
            onClick={cargarDatosDocente}
            disabled={loading}
          >
            <i className="pi pi-refresh"></i>
            Actualizar
          </button>
        </div>

        {loading ? (
          skeletonTemplate()
        ) : (
          <>
            <div className={styles.statsSection}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="pi pi-book"></i>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{totalMateriasActivas}</span>
                  <span className={styles.statLabel}>Materias Activas</span>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="pi pi-users"></i>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{totalEstudiantes}</span>
                  <span className={styles.statLabel}>Estudiantes Totales</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="pi pi-chart-bar"></i>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>
                    {totalMateriasActivas > 0 ? Math.round(totalEstudiantes / totalMateriasActivas) : 0}
                  </span>
                  <span className={styles.statLabel}>Promedio por Materia</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <DataTable
                value={materiasConEstudiantes}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id_materia"
                className={styles.mainTable}
                emptyMessage="No tienes materias asignadas"
                header={tableHeader}
                globalFilter={globalFilter}
                paginator
                rows={10}
                sortField="nombre"
                sortOrder={1}
              >
                <Column expander style={{ width: '3rem' }} />
                <Column 
                  field="codigo" 
                  header="Código / Grupo" 
                  body={codigoTemplate}
                  sortable
                  style={{ width: '180px' }}
                />
                <Column 
                  field="nombre" 
                  header="Materia" 
                  sortable
                  style={{ minWidth: '250px' }}
                />
                <Column 
                  field="programa" 
                  header="Programa" 
                  sortable
                  style={{ minWidth: '200px' }}
                />
                <Column 
                  header="N° Estudiantes" 
                  body={estudiantesTemplate}
                  sortable
                  field="total_estudiantes"
                  style={{ width: '180px' }}
                />
              </DataTable>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}