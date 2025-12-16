'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './reportes.module.css';
// Constantes globales basadas en el diccionario de datos del sistema
const GLOBAL_CONSTANTS = {
  // Tipos de observaciones según el sistema (basado en la tabla OBSERVACIONES)
  TIPOS_OBSERVACION: [
    { label: 'Académico', value: 'academico' },
    { label: 'Psicológico', value: 'psicologico' },
    { label: 'Tutoría', value: 'tutoria' },
    { label: 'Comportamiento', value: 'comportamiento' },
    { label: 'Salud', value: 'salud' },
    { label: 'Inclusión', value: 'inclusion' },
    { label: 'Otro', value: 'otro' }
  ],
  // Cargos de quienes pueden hacer observaciones (basado en ASISTENTES_REUNION)
  CARGOS_PERSONA: [
    { label: 'Docente', value: 'docente' },
    { label: 'Tutor', value: 'tutor' },
    { label: 'Psicólogo', value: 'psicologo' },
    { label: 'Coordinador', value: 'coordinador' },
    { label: 'Administrativo', value: 'administrativo' },
    { label: 'Estudiante', value: 'estudiante' }
  ],
  // Niveles de urgencia para observaciones
  NIVELES_URGENCIA: [
    { label: 'Baja', value: 'baja', severity: 'success' },
    { label: 'Media', value: 'media', severity: 'warning' },
    { label: 'Alta', value: 'alta', severity: 'danger' },
    { label: 'Crítica', value: 'critica', severity: 'danger' }
  ],
  // Estados de la observación
  ESTADOS_OBSERVACION: [
    { label: 'Pendiente', value: 'pendiente', severity: 'warning' },
    { label: 'En Proceso', value: 'en_proceso', severity: 'info' },
    { label: 'Resuelto', value: 'resuelto', severity: 'success' },
    { label: 'Cerrado', value: 'cerrado', severity: 'secondary' }
  ],
  // Cortes académicos (basado en la tabla OBSERVACIONES)
  CORTES_ACADEMICOS: [
    { label: 'Primer Corte', value: 1 },
    { label: 'Segundo Corte', value: 2 },
    { label: 'Tercer Corte', value: 3 }
  ],
  // Lugares de tutoría (basado en la tabla TUTORIAS)
  LUGARES_TUTORIA: [
    { label: 'Aula', value: 'aula' },
    { label: 'Biblioteca', value: 'biblioteca' },
    { label: 'Sala Virtual', value: 'sala_virtual' },
    { label: 'Oficina', value: 'oficina' },
    { label: 'Laboratorio', value: 'laboratorio' }
  ],
  // Estados de tutoría (basado en la tabla TUTORIAS)
  ESTADOS_TUTORIA: [
    { label: 'Programada', value: 'programada', severity: 'info' },
    { label: 'Realizada', value: 'realizada', severity: 'success' },
    { label: 'Cancelada', value: 'cancelada', severity: 'danger' }
  ]
};
// Datos de ejemplo para observaciones (basado en tabla OBSERVACIONES)
const OBSERVACIONES_EJEMPLO = [
  {
    id_observacion: 1,
    corte: 2,
    comentario: 'El estudiante muestra dificultades significativas en el entendimiento de conceptos básicos de álgebra.Se recomienda tutoría adicional.',
    id_tutoria: 8,
    fecha_registro: '2024-01-15T10:30:00',
    fecha_ultima_actualizacion: '2024-01-20T14:25:00',
    activo_observaciones: true,
    // Campos adicionales para el frontend
    id_persona_reporta: 101,
    nombre_reporta: 'María González',
    cargo_reporta: 'docente',
    id_estudiante: 1001,
    nombre_estudiante: 'Carlos Rodríguez',
    tipo_observacion: 'academico',
    asunto: 'Bajo rendimiento en matemáticas',
    urgencia: 'media',
    estado: 'en_proceso',
    acciones_tomadas: 'Se asignó tutoría semanal con el profesor de apoyo',
    recomendaciones: 'Reforzar conceptos básicos y realizar ejercicios prácticos'
  },
  {
    id_observacion: 2,
    corte: 1,
    comentario: 'La estudiante presenta síntomas de ansiedad previo a exámenes, con afectación en su desempeño.',
    id_tutoria: 9,
    fecha_registro: '2024-01-18T09:15:00',
    fecha_ultima_actualizacion: '2024-01-18T09:15:00',
    activo_observaciones: true,
    // Campos adicionales para el frontend
    id_persona_reporta: 102,
    nombre_reporta: 'Dr. Roberto Silva',
    cargo_reporta: 'psicologo',
    id_estudiante: 1002,
    nombre_estudiante: 'Ana Martínez',
    tipo_observacion: 'psicologico',
    asunto: 'Ansiedad académica',
    urgencia: 'alta',
    estado: 'pendiente',
    acciones_tomadas: 'Primera sesión de terapia realizada',
    recomendaciones: 'Continuar con sesiones semanales y técnicas de relajación'
  },
  {
    id_observacion: 3,
    corte: 2,
    comentario: 'El estudiante ha mostrado mejoría significativa en las sesiones de tutoría. Se evidencia mayor comprensión de los temas.',
    id_tutoria: 10,
    fecha_registro: '2024-01-22T16:45:00',
    fecha_ultima_actualizacion: '2024-01-25T11:20:00',
    activo_observaciones: true,
    // Campos adicionales para el frontend
    id_persona_reporta: 103,
    nombre_reporta: 'Lic. Laura Pérez',
    cargo_reporta: 'tutor',
    id_estudiante: 1001,
    nombre_estudiante: 'Carlos Rodríguez',
    tipo_observacion: 'tutoria',
    asunto: 'Progreso en tutorías',
    urgencia: 'baja',
    estado: 'resuelto',
    acciones_tomadas: 'Sesiones de tutoría completadas satisfactoriamente',
    recomendaciones: 'Mantener seguimiento mensual'
  }
];
// Datos de estudiantes de ejemplo (basado en el sistema general)
const ESTUDIANTES_EJEMPLO = [
  {
    id_estudiante: 1001,
    id_persona: 201,
    nombres: 'Carlos Alberto',
    primer_apellido: 'Rodríguez',
    segundo_apellido: 'Gómez',
    identificacion: '1234567890',
    tipo_documento: 'CC',
    discapacidades: [
      { id_discapacidad: 1, nombre_discapacidad: 'Discalculia' },
      { id_discapacidad: 3, nombre_discapacidad: 'TDAH' }
    ],
    programa: 'Ingeniería de Sistemas',
    facultad: 'Ingenierías y Tecnologías',
    semestre_actual: 4,
    activo_estudiante: true
  },
  {
    id_estudiante: 1002,
    id_persona: 202,
    nombres: 'Ana María',
    primer_apellido: 'Martínez',
    segundo_apellido: 'López',
    identificacion: '0987654321',
    tipo_documento: 'CC',
    discapacidades: [
      { id_discapacidad: 2, nombre_discapacidad: 'Ansiedad Generalizada' }
    ],
    programa: 'Psicología',
    facultad: 'Ciencias de la Salud',
    semestre_actual: 3,
    activo_estudiante: true
  }
];
// Datos de ejemplo para tutorías (basado en tabla TUTORIAS)
const TUTORIAS_EJEMPLO = [
  {
    id_tutoria: 8,
    tema_tutoria: 'Refuerzo en Matemáticas Aplicadas',
    descripcion_tutoria: 'Revisión de ejercicios del parcial y estrategias de estudio.',
    fecha_tutoria: '2024-01-15',
    hora_inicio_tutoria: '08:00',
    hora_fin_tutoria: '09:30',
    lugar_tutoria: 'biblioteca',
    estado_tutoria: 'realizada',
    id_tutor: 7,
    id_estudiante: 1001,
    fecha_registro: '2024-01-15T10:00:00',
    fecha_ultima_actualizacion: '2024-01-16T11:00:00',
    activo_tutoria: true
  }
];
export default function ReportesPage() {
  const [observaciones, setObservaciones] = useState([]);
  const [observacionesFiltradas, setObservacionesFiltradas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [tutorias, setTutorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstudiante, setFiltroEstudiante] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [observacionSeleccionada, setObservacionSeleccionada] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [vistaEstudiante, setVistaEstudiante] = useState(false);
  const previewRef = useRef(null);
  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);
  const cargarDatos = () => {
    try {
      setLoading(true);
      // En producción, estos datos vendrían de APIs
      setObservaciones(OBSERVACIONES_EJEMPLO);
      setObservacionesFiltradas(OBSERVACIONES_EJEMPLO);
      setEstudiantes(ESTUDIANTES_EJEMPLO);
      setTutorias(TUTORIAS_EJEMPLO);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };
  // Filtrar observaciones
  useEffect(() => {
    filtrarObservaciones();
  }, [filtroEstudiante, busqueda, observaciones]);
  const filtrarObservaciones = () => {
    let filtered = [...observaciones];
    // Filtrar por estudiante seleccionado
    if (filtroEstudiante) {
      filtered = filtered.filter(obs =>
        obs.id_estudiante.toString() === filtroEstudiante
      );
    }
    // Filtrar por búsqueda
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      filtered = filtered.filter(obs =>
        obs.nombre_estudiante?.toLowerCase().includes(searchLower) ||
        obs.nombre_reporta?.toLowerCase().includes(searchLower) ||
        obs.asunto?.toLowerCase().includes(searchLower) ||
        obs.comentario?.toLowerCase().includes(searchLower) ||
        obs.id_estudiante?.toString().includes(searchLower)
      );
    }
    // Ordenar por fecha (más recientes primero)
    filtered.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro));
    setObservacionesFiltradas(filtered);
  };
  // Función para seleccionar estudiante y mostrar su información
  const seleccionarEstudiante = (estudianteId) => {
    const estudiante = estudiantes.find(est => est.id_estudiante.toString() === estudianteId);
    setEstudianteSeleccionado(estudiante);
    setVistaEstudiante(true);
    setFiltroEstudiante(estudianteId);
  };
  // Función para obtener etiqueta de cargo
  const getCargoLabel = (cargo) => {
    const cargoObj = GLOBAL_CONSTANTS.CARGOS_PERSONA.find(c => c.value
      === cargo);
    return cargoObj ? cargoObj.label : cargo;
  };
  // Función para obtener etiqueta de tipo de observación
  const getTipoObservacionLabel = (tipo) => {
    const tipoObj = GLOBAL_CONSTANTS.TIPOS_OBSERVACION.find(t => t.value
      === tipo);
    return tipoObj ? tipoObj.label : tipo;
  };
  // Función para obtener badge de urgencia
  const getUrgenciaBadge = (urgencia) => {
    const urgenciaObj = GLOBAL_CONSTANTS.NIVELES_URGENCIA.find(u =>
      u.value === urgencia);
    return (
      <Badge
        value={urgenciaObj?.label || urgencia}
        severity={urgenciaObj?.severity || 'info'}
      />
    );
  };
  // Función para obtener badge de estado
  const getEstadoBadge = (estado) => {
    const estadoObj = GLOBAL_CONSTANTS.ESTADOS_OBSERVACION.find(e =>
      e.value === estado);
    return (
      <Badge
        value={estadoObj?.label || estado}
        severity={estadoObj?.severity || 'info'}
      />
    );
  };
  // Formatear fecha
  const formatFecha = (fecha) => {
    if (!fecha) return 'Fecha no definida';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  // Ver detalles de la observación
  const verDetallesObservacion = (observacion) => {
    setObservacionSeleccionada(observacion);
    setDialogVisible(true);
  };
  // Generar PDF de la observación
  const generarPDF = async () => {
    if (!previewRef.current) {
      alert('No se puede generar el PDF. Por favor, recargue la página e intente nuevamente.');
      return;
    }
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // Margen
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // Agregar logo de la universidad (placeholder)
      pdf.setFillColor(0, 117, 0);
      pdf.rect(0, 0, pageWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.text('UNIVERSIDAD POPULAR DEL CESAR', pageWidth / 2, 12, {
        align: 'center'
      });
      // Agregar contenido
      pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);
      const nombreArchivo =
        `Observacion_${observacionSeleccionada?.id_observacion}_${observacionSeleccionada?.
          nombre_estudiante}.pdf`;
      pdf.save(nombreArchivo);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, intente nuevamente.');
    }
  };
  // Template para acciones de la tabla
  const accionesTemplate = (rowData) => {
    return (
      <div className={styles.accionesContainer}>
        <Button
          icon="pi pi-eye"
          className={styles.botonVer}
          tooltip="Ver detalles"
          tooltipOptions={{ position: 'top' }}
          onClick={() => verDetallesObservacion(rowData)}
        />
      </div>
    );
  };
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ProgressSpinner />
        <p>Cargando observaciones...</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sistema de Observaciones Estudiantiles</h1>
      <p className={styles.subtitle}>
        Gestión y seguimiento de observaciones académicas, psicológicas y de tutoría
      </p>
      <Divider className={styles.divider} />
      {/* Filtros y Búsqueda */}
      <Card className={styles.filtrosCard}>
        <div className={styles.filtrosContent}>
          <h3 className={styles.filtrosTitle}>Filtros y Búsqueda</h3>
          <div className={styles.filtrosGrid}>
            <div className={styles.filtroGroup}>
              <label className={styles.filtroLabel}>Buscar por nombre o ID</label>
              <InputText
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre, ID, asunto..."
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filtroGroup}>
              <label className={styles.filtroLabel}>Filtrar por estudiante</label>
              <Dropdown
                value={filtroEstudiante}
                onChange={(e) => {
                  setFiltroEstudiante(e.value);
                  if (e.value) {
                    seleccionarEstudiante(e.value);
                  } else {
                    setVistaEstudiante(false);
                    setEstudianteSeleccionado(null);
                  }
                }}
                options={[
                  { label: 'Todos los estudiantes', value: '' },
                  ...estudiantes.map(est => ({
                    label: `${est.nombres} ${est.primer_apellido} - ${est.identificacion}`,
                    value: est.id_estudiante.toString()
                  }))
                ]}
                placeholder="Seleccionar estudiante"
                className={styles.filtroDropdown}
              />
            </div>
            <div className={styles.filtroGroup}>
              <Button
                label="Limpiar Filtros"
                icon="pi pi-refresh"
                className={styles.limpiarButton}
                onClick={() => {
                  setFiltroEstudiante('');
                  setBusqueda('');
                  setVistaEstudiante(false);
                  setEstudianteSeleccionado(null);
                }}
              />
            </div>
          </div>
        </div>
      </Card>
      {/* Vista de Estudiante Seleccionado */}
      {vistaEstudiante && estudianteSeleccionado && (
        <Card className={styles.estudianteCard}>
          <div className={styles.estudianteHeader}>
            <h3>Información del Estudiante</h3>
            <Button
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => {
                setVistaEstudiante(false);
                setEstudianteSeleccionado(null);
                setFiltroEstudiante('');
              }}
            />
          </div>
          <Divider />
          <div className={styles.estudianteInfo}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <strong>Nombre completo:</strong>
                <span>{estudianteSeleccionado.nombres}
                  {estudianteSeleccionado.primer_apellido}
                  {estudianteSeleccionado.segundo_apellido}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Documento:</strong>
                <span>{estudianteSeleccionado.tipo_documento}
                  {estudianteSeleccionado.identificacion}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Programa:</strong>
                <span>{estudianteSeleccionado.programa}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Facultad:</strong>
                <span>{estudianteSeleccionado.facultad}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Semestre:</strong>
                <span>{estudianteSeleccionado.semestre_actual}</span>
              </div>
            </div>
            <div className={styles.discapacidadesSection}>
              <h4>Condiciones o Discapacidades</h4>
              {estudianteSeleccionado.discapacidades &&
                estudianteSeleccionado.discapacidades.length > 0 ? (
                <div className={styles.discapacidadesList}>
                  {estudianteSeleccionado.discapacidades.map((disc, index) => (
                    <Badge
                      key={index}
                      value={disc.nombre_discapacidad}
                      severity="info"
                      className={styles.discapacidadBadge}
                    />
                  ))}
                </div>
              ) : (
                <Message severity="info" text="No se han registrado condiciones o
discapacidades" />
              )}
            </div>
          </div>
          {/* Tabla de observaciones del estudiante */}
          <Divider />
          <h4>Observaciones del Estudiante</h4>
          <DataTable
            value={observacionesFiltradas}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            className={styles.tablaObservaciones}
          >
            <Column field="fecha_registro" header="Fecha" body={(rowData) =>
              formatFecha(rowData.fecha_registro)} />
            <Column field="nombre_reporta" header="Reportado por" />
            <Column field="cargo_reporta" header="Cargo" body={(rowData) =>
              getCargoLabel(rowData.cargo_reporta)} />
            <Column field="tipo_observacion" header="Tipo" body={(rowData) =>
              getTipoObservacionLabel(rowData.tipo_observacion)} />
            <Column field="asunto" header="Asunto" />
            <Column field="urgencia" header="Urgencia" body={(rowData) =>
              getUrgenciaBadge(rowData.urgencia)} />
            <Column field="estado" header="Estado" body={(rowData) =>
              getEstadoBadge(rowData.estado)} />
            <Column body={accionesTemplate} header="Acciones" />
          </DataTable>
        </Card>
      )}
      {/* Tabla Principal de Observaciones (solo se muestra cuando no hay estudiante
seleccionado) */}
      {!vistaEstudiante && (
        <Card>
          <div className={styles.tablaHeader}>
            <h3>Observaciones Generales</h3>
            <small>Total: {observacionesFiltradas.length} observación(es)</small>
          </div>
          {observacionesFiltradas.length === 0 ? (
            <div className={styles.emptyState}>
              <i className="pi pi-inbox" style={{ fontSize: '3rem', color: '#ddd' }}></i>
              <h3>No se encontraron observaciones</h3>
              <p>No hay observaciones que coincidan con los filtros aplicados.</p>
            </div>
          ) : (
            <DataTable
              value={observacionesFiltradas}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 20, 50]}
              className={styles.tablaPrincipal}
            >
              <Column field="fecha_registro" header="Fecha" body={(rowData) =>
                formatFecha(rowData.fecha_registro)} sortable />
              <Column field="nombre_reporta" header="Reportado por" sortable />
              <Column field="cargo_reporta" header="Cargo" body={(rowData) =>
                getCargoLabel(rowData.cargo_reporta)} sortable />
              <Column field="nombre_estudiante" header="Estudiante" sortable />
              <Column field="tipo_observacion" header="Tipo" body={(rowData) =>
                getTipoObservacionLabel(rowData.tipo_observacion)} sortable />
              <Column field="asunto" header="Asunto" sortable />
              <Column field="urgencia" header="Urgencia" body={(rowData) =>
                getUrgenciaBadge(rowData.urgencia)} sortable />
              <Column field="estado" header="Estado" body={(rowData) =>
                getEstadoBadge(rowData.estado)} sortable />
              <Column body={accionesTemplate} header="Acciones" />
            </DataTable>
          )}
        </Card>
      )}
      {/* Dialog de Detalles de la Observación */}
      <Dialog
        header={`Observación #${observacionSeleccionada?.id_observacion}`}
        visible={dialogVisible}
        style={{ width: '60vw', maxWidth: '800px' }}
        onHide={() => setDialogVisible(false)}
        className={styles.detalleDialog}
      >
        {observacionSeleccionada && (
          <div className={styles.detalleContent}>
            {/* Vista para PDF */}
            <div ref={previewRef} className={styles.pdfPreview}>
              <div className={styles.pdfHeader}>
                <h2>UNIVERSIDAD POPULAR DEL CESAR</h2>
                <h3>Sistema de Inclusión Educativa</h3>
                <h4>OBSERVACIÓN ESTUDIANTIL</h4>
              </div>
              <div className={styles.pdfContent}>
                <div className={styles.seccion}>
                  <h5>Información General</h5>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <strong>Número de Observación:</strong>
                      {observacionSeleccionada.id_observacion}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Corte Académico:</strong> {observacionSeleccionada.corte}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Fecha:</strong>
                      {formatFecha(observacionSeleccionada.fecha_registro)}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Estudiante:</strong> {observacionSeleccionada.nombre_estudiante}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Reportado por:</strong>
                      {observacionSeleccionada.nombre_reporta}
                      ({getCargoLabel(observacionSeleccionada.cargo_reporta)})
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Tipo de Observación:</strong>
                      {getTipoObservacionLabel(observacionSeleccionada.tipo_observacion)}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Nivel de Urgencia:</strong>
                      {getTipoObservacionLabel(observacionSeleccionada.urgencia)}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Estado:</strong>
                      {getTipoObservacionLabel(observacionSeleccionada.estado)}
                    </div>
                  </div>
                </div>
                <Divider />
                <div className={styles.seccion}>
                  <h5>Asunto</h5>
                  <p className={styles.asunto}>{observacionSeleccionada.asunto}</p>
                </div>
                <div className={styles.seccion}>
                  <h5>Comentario Detallado</h5>
                  <p
                    className={styles.descripcion}>{observacionSeleccionada.comentario}</p>
                </div>
                {observacionSeleccionada.acciones_tomadas && (
                  <div className={styles.seccion}>
                    <h5>Acciones Tomadas</h5>
                    <p>{observacionSeleccionada.acciones_tomadas}</p>
                  </div>
                )}
                {observacionSeleccionada.recomendaciones && (
                  <div className={styles.seccion}>
                    <h5>Recomendaciones</h5>
                    <p>{observacionSeleccionada.recomendaciones}</p>
                  </div>
                )}
                <div className={styles.pdfFooter}>
                  <p>Generado el: {new Date().toLocaleDateString('es-ES')}</p>
                  <p>Sistema de Inclusión Educativa - Universidad Popular del Cesar</p>
                </div>
              </div>
            </div>
            {/* Botones de acción */}
            <div className={styles.dialogActions}>
              <Button
                label="Descargar PDF"
                icon="pi pi-download"
                className={styles.pdfButton}
                onClick={generarPDF}
              />
              <Button
                label="Cerrar"
                icon="pi pi-times"
                className={styles.cerrarButton}
                onClick={() => setDialogVisible(false)}
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}