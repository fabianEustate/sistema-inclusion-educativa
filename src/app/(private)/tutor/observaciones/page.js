'use client'; 
import React, { useState, useEffect, useRef } from 'react'; 
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column'; 
import { Button } from 'primereact/button'; 
import { Dropdown } from 'primereact/dropdown'; 
import { InputText } from 'primereact/inputtext'; 
import { InputTextarea } from 'primereact/inputtextarea'; 
import { Toast } from 'primereact/toast'; 
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { Card } from 'primereact/card'; 
import { useForm, Controller } from 'react-hook-form'; 
import jsPDF from 'jspdf'; 
import styles from './observaciones.module.css'; 
export default function Observaciones() { 
const toast = useRef(null); 
const [observaciones, setObservaciones] = useState([]); 
const [tutorias, setTutorias] = useState([]); 
const [loading, setLoading] = useState(true); 
const [showForm, setShowForm] = useState(false); 
const [editingId, setEditingId] = useState(null); 
  // Filtros 
  const [filtroEstudiante, setFiltroEstudiante] = useState(''); 
  const [filtroCorte, setFiltroCorte] = useState(''); 
  const [filtroTutoria, setFiltroTutoria] = useState(''); 
 
  // Exportación - Solo PDF 
  const [corteExport, setCorteExport] = useState(''); 
 
  // Opciones de cortes académicos 
  const cortesAcademicos = [ 
    { label: 'Todos los cortes', value: '' }, 
    { label: 'Corte 1', value: '1' }, 
    { label: 'Corte 2', value: '2' }, 
    { label: 'Corte 3', value: '3' } 
  ]; 
 
  const defaultValues = { 
    corte: '', 
    comentario: '', 
    id_tutoria: '' 
  }; 
 
  const { 
    control, 
    formState: { errors }, 
    handleSubmit, 
    reset, 
    setValue 
  } = useForm({ defaultValues }); 
 
  // Cargar datos al iniciar 
  useEffect(() => { 
    cargarDatos(); 
  }, []); 
 
  const cargarDatos = () => { 
    setLoading(true); 
    try { 
      setTimeout(() => { 
        const observacionesGuardadas = JSON.parse(localStorage.getItem('observaciones')) || 
[]; 
        const tutoriasGuardadas = JSON.parse(localStorage.getItem('tutorias')) || []; 
         
        setObservaciones(observacionesGuardadas); 
        setTutorias(tutoriasGuardadas); 
        setLoading(false); 
      }, 500); 
    } catch (error) { 
      console.error('Error al cargar datos:', error); 
      setLoading(false); 
    } 
  }; 
 
  // Filtrar observaciones 
  const observacionesFiltradas = observaciones.filter(obs => { 
    const tutoria = tutorias.find(t => t.id === obs.id_tutoria); 
    const estudiante = tutoria?.id_estudiante || ''; 
     
    const coincideEstudiante = filtroEstudiante === '' ||  
      estudiante.toLowerCase().includes(filtroEstudiante.toLowerCase()); 
    const coincideCorte = filtroCorte === '' || obs.corte.toString() === filtroCorte; 
    const coincideTutoria = filtroTutoria === '' || obs.id_tutoria.toString() === filtroTutoria; 
     
    return coincideEstudiante && coincideCorte && coincideTutoria; 
  }); 
 
  // Obtener tutorias para dropdown 
  const opcionesTutorias = tutorias.map(tutoria => ({ 
    label: `${tutoria.tema_tutoria} - ${tutoria.id_estudiante}`, 
    value: tutoria.id 
  })); 
 
  const onSubmit = async (data) => { 
    try { 
      if (editingId) { 
        // Editar observación existente 
        const observacionesActualizadas = observaciones.map(obs => 
          obs.id === editingId  
            ? {  
                ...obs,  
                ...data, 
                fecha_ultima_actualizacion: new Date().toISOString() 
              } 
            : obs 
        ); 
         
        setObservaciones(observacionesActualizadas); 
        localStorage.setItem('observaciones', JSON.stringify(observacionesActualizadas)); 
         
        toast.current.show({ 
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'Observación actualizada correctamente', 
          life: 3000 
        }); 
      } else { 
        // Crear nueva observación 
        const nuevaObservacion = { 
          id: Date.now(), 
          corte: parseInt(data.corte), 
          comentario: data.comentario, 
          id_tutoria: data.id_tutoria, 
          fecha_registro: new Date().toISOString(), 
          fecha_ultima_actualizacion: new Date().toISOString(), 
          Activo_observaciones: true 
        }; 
 
        const observacionesActualizadas = [...observaciones, nuevaObservacion]; 
        setObservaciones(observacionesActualizadas); 
        localStorage.setItem('observaciones', JSON.stringify(observacionesActualizadas)); 
 
        toast.current.show({ 
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'Observación creada correctamente', 
          life: 3000 
        }); 
      } 
 
      resetForm(); 
    } catch (error) { 
      console.error('Error al guardar observación:', error); 
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'No se pudo guardar la observación', 
        life: 3000 
      }); 
    } 
  }; 
 
  const editarObservacion = (observacion) => { 
    setValue('corte', observacion.corte.toString()); 
    setValue('comentario', observacion.comentario); 
    setValue('id_tutoria', observacion.id_tutoria); 
    setEditingId(observacion.id); 
    setShowForm(true); 
  }; 
 
  const eliminarObservacion = (id) => { 
    confirmDialog({ 
      message: '¿Estás seguro de que quieres eliminar esta observación?', 
      header: 'Confirmar eliminación', 
      icon: 'pi pi-exclamation-triangle', 
      accept: () => { 
        const observacionesActualizadas = observaciones.filter(obs => obs.id !== id); 
        setObservaciones(observacionesActualizadas); 
        localStorage.setItem('observaciones', JSON.stringify(observacionesActualizadas)); 
         
        toast.current.show({ 
          severity: 'success', 
          summary: 'Eliminado', 
          detail: 'Observación eliminada correctamente', 
          life: 3000 
        }); 
      } 
    }); 
  }; 
 
  const resetForm = () => { 
    reset(defaultValues); 
    setEditingId(null); 
    setShowForm(false); 
  }; 
 
  // Función para generar y descargar PDF sin autoTable 
  const exportarObservacionesPDF = () => { 
    if (!corteExport) { 
      toast.current.show({ 
        severity: 'warn', 
        summary: 'Selecciona un corte', 
        detail: 'Por favor selecciona un corte académico para exportar', 
        life: 3000 
      }); 
      return; 
    } 
 
    const observacionesExport = observaciones.filter(obs =>  
      obs.corte.toString() === corteExport 
    ); 
 
    if (observacionesExport.length === 0) { 
      toast.current.show({ 
        severity: 'warn', 
        summary: 'Sin datos', 
        detail: 'No hay observaciones para el corte seleccionado', 
        life: 3000 
      }); 
      return; 
    } 
 
    try { 
      // Crear PDF 
      const pdf = new jsPDF(); 
       
      // Configuración inicial 
      const pageWidth = pdf.internal.pageSize.getWidth(); 
      const margin = 15; 
      let yPosition = margin; 
       
      // Título 
      pdf.setFontSize(18); 
      pdf.setTextColor(46, 125, 50); // Verde 
      pdf.text('Sistema de Inclusión Educativa', pageWidth / 2, yPosition, { align: 'center' }); 
      yPosition += 10; 
       
      pdf.setFontSize(14); 
      pdf.setTextColor(102, 102, 102); // Gris 
      pdf.text(`Observaciones Académicas - Corte ${corteExport}`, pageWidth / 2, yPosition, 
{ align: 'center' }); 
      yPosition += 8; 
       
      pdf.setFontSize(10); 
      pdf.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, pageWidth / 2, 
yPosition, { align: 'center' }); 
      yPosition += 15; 
 
      // Encabezados de tabla 
      pdf.setFontSize(10); 
      pdf.setTextColor(255, 255, 255); 
      pdf.setFillColor(67, 176, 40); // Verde 
       
      // Rectángulos para encabezados 
      pdf.rect(margin, yPosition, 40, 8, 'F'); 
      pdf.rect(margin + 40, yPosition, 40, 8, 'F'); 
      pdf.rect(margin + 80, yPosition, 70, 8, 'F'); 
      pdf.rect(margin + 150, yPosition, 35, 8, 'F'); 
       
      // Texto de encabezados 
      pdf.text('Estudiante', margin + 2, yPosition + 5); 
      pdf.text('Tutoría', margin + 42, yPosition + 5); 
      pdf.text('Comentario', margin + 82, yPosition + 5); 
      pdf.text('Fecha', margin + 152, yPosition + 5); 
       
      yPosition += 10; 
 
      // Datos de la tabla 
      pdf.setTextColor(0, 0, 0); 
      pdf.setFontSize(8); 
 
      observacionesExport.forEach((obs, index) => { 
        const tutoria = tutorias.find(t => t.id === obs.id_tutoria); 
        const estudiante = tutoria?.id_estudiante || 'N/A'; 
        const temaTutoria = tutoria?.tema_tutoria || 'N/A'; 
        const fechaRegistro = obs.fecha_registro ?  
          new Date(obs.fecha_registro).toLocaleDateString('es-ES') : 'N/A'; 
         
        // Verificar si necesita nueva página 
        if (yPosition > 270) { 
          pdf.addPage(); 
          yPosition = margin; 
           
          // Redibujar encabezados en nueva página 
          pdf.setFillColor(67, 176, 40); 
          pdf.rect(margin, yPosition, 40, 8, 'F'); 
          pdf.rect(margin + 40, yPosition, 40, 8, 'F'); 
          pdf.rect(margin + 80, yPosition, 70, 8, 'F'); 
          pdf.rect(margin + 150, yPosition, 35, 8, 'F'); 
           
          pdf.setTextColor(255, 255, 255); 
          pdf.text('Estudiante', margin + 2, yPosition + 5); 
          pdf.text('Tutoría', margin + 42, yPosition + 5); 
          pdf.text('Comentario', margin + 82, yPosition + 5); 
          pdf.text('Fecha', margin + 152, yPosition + 5); 
           
          yPosition += 10; 
          pdf.setTextColor(0, 0, 0); 
        } 
 
        // Alternar color de fondo para filas 
        if (index % 2 === 0) { 
          pdf.setFillColor(245, 245, 245); 
          pdf.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F'); 
        } 
 
        // Texto de datos (truncado si es muy largo) 
        const estudianteTrunc = estudiante.length > 20 ? estudiante.substring(0, 20) + '...' : 
estudiante; 
        const tutoriaTrunc = temaTutoria.length > 20 ? temaTutoria.substring(0, 20) + '...' : 
temaTutoria; 
        const comentarioTrunc = obs.comentario.length > 30 ? obs.comentario.substring(0, 
30) + '...' : obs.comentario; 
 
        pdf.text(estudianteTrunc, margin + 2, yPosition + 5); 
        pdf.text(tutoriaTrunc, margin + 42, yPosition + 5); 
        pdf.text(comentarioTrunc, margin + 82, yPosition + 5); 
        pdf.text(fechaRegistro, margin + 152, yPosition + 5); 
         
        yPosition += 8; 
      }); 
 
      // Pie de página 
      const finalY = yPosition + 10; 
      pdf.setFontSize(10); 
      pdf.setTextColor(102, 102, 102); 
      pdf.text(`Total de observaciones: ${observacionesExport.length}`, margin, finalY); 
      pdf.text('Sistema de Inclusión Educativa - Universidad del Cesár', pageWidth / 2, finalY 
+ 6, { align: 'center' }); 
 
      // Descargar PDF 
      pdf.save(`Observaciones_Corte_${corteExport}.pdf`); 
 
      toast.current.show({ 
        severity: 'success', 
        summary: 'PDF Generado', 
        detail: `Observaciones del corte ${corteExport} exportadas correctamente`, 
        life: 3000 
      }); 
 
    } catch (error) { 
      console.error('Error al generar PDF:', error); 
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'No se pudo generar el PDF', 
        life: 3000 
      }); 
    } 
  }; 
 
  // Templates para DataTable 
  const estudianteTemplate = (rowData) => { 
    const tutoria = tutorias.find(t => t.id === rowData.id_tutoria); 
    return tutoria?.id_estudiante || 'N/A'; 
  }; 
 
  const tutoriaTemplate = (rowData) => { 
    const tutoria = tutorias.find(t => t.id === rowData.id_tutoria); 
    return tutoria?.tema_tutoria || 'N/A'; 
  }; 
 
  const corteTemplate = (rowData) => { 
    return <span className={styles.corteBadge}>Corte {rowData.corte}</span>; 
  }; 
 
  const fechaTemplate = (rowData) => { 
    if (!rowData.fecha_registro) return '-'; 
    const fecha = new Date(rowData.fecha_registro); 
    return fecha.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    }); 
  }; 
 
  const accionesTemplate = (rowData) => { 
    return ( 
      <div className={styles.actionsCell}> 
        <Button 
          icon="pi pi-pencil" 
          className={`p-button-warning p-button-sm ${styles.actionButton}`} 
          tooltip="Editar observación" 
          onClick={() => editarObservacion(rowData)} 
        /> 
        <Button 
          icon="pi pi-trash" 
          className={`p-button-danger p-button-sm ${styles.actionButton}`} 
          tooltip="Eliminar observación" 
          onClick={() => eliminarObservacion(rowData.id)} 
        /> 
      </div> 
    ); 
  }; 
 
  return ( 
    <div className={styles.container}> 
      <Toast ref={toast} /> 
      <ConfirmDialog /> 
       
      <div className={styles.content}> 
        <div className={styles.header}> 
          <h1 className={styles.title}>Registro de Observaciones</h1> 
          <div className={styles.actions}> 
            <Button 
              label="Nueva Observación" 
              icon="pi pi-plus" 
              className={styles.submitButton} 
              onClick={() => setShowForm(true)} 
            /> 
          </div> 
        </div> 
 
        {/* Formulario de Observación */} 
        {showForm && ( 
          <div className={styles.formContainer}> 
            <div className={styles.formHeader}> 
              <h2 className={styles.formTitle}> 
                <i className="pi pi-comment"></i> 
                {editingId ? 'Editar Observación' : 'Nueva Observación'} 
              </h2> 
            </div> 
 
            <div className={styles.formContent}> 
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid"> 
                <div className={styles.formGrid}> 
                  {/* Corte Académico */} 
                  <div className={styles.field}> 
                    <label htmlFor="corte" className={`${styles.label} ${styles.required}`}> 
                      Corte Académico 
                    </label> 
                    <Controller 
                      name="corte" 
                      control={control} 
                      rules={{ required: 'El corte académico es obligatorio' }} 
                      render={({ field, fieldState }) => ( 
                        <Dropdown 
                          id={field.name} 
                          {...field} 
                          options={[ 
                            { label: 'Corte 1', value: '1' }, 
                            { label: 'Corte 2', value: '2' }, 
                            { label: 'Corte 3', value: '3' } 
                          ]} 
                          optionLabel="label" 
                          placeholder="Seleccione el corte" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                        /> 
                      )} 
                    /> 
                    {errors.corte && <small className="p
error">{errors.corte.message}</small>} 
                  </div> 
 
                  {/* Tutoría */} 
                  <div className={styles.field}> 
                    <label htmlFor="id_tutoria" className={`${styles.label} 
${styles.required}`}> 
                      Tutoría Relacionada 
                    </label> 
                    <Controller 
                      name="id_tutoria" 
                      control={control} 
                      rules={{ required: 'La tutoría es obligatoria' }} 
                      render={({ field, fieldState }) => ( 
                        <Dropdown 
                          id={field.name} 
                          {...field} 
                          options={opcionesTutorias} 
                          optionLabel="label" 
                          placeholder="Seleccione la tutoría" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                        /> 
                      )} 
                    /> 
                    {errors.id_tutoria && <small className="p
error">{errors.id_tutoria.message}</small>} 
                  </div> 
                </div> 
 
                {/* Comentario */} 
                <div className={styles.field}> 
                  <label htmlFor="comentario" className={`${styles.label} 
${styles.required}`}> 
                    Comentario / Observación 
                  </label> 
                  <Controller 
                    name="comentario" 
                    control={control} 
                    rules={{  
                      required: 'El comentario es obligatorio', 
                      maxLength: { 
                        value: 225, 
                        message: 'El comentario no puede exceder 225 caracteres' 
                      } 
                    }} 
                    render={({ field, fieldState }) => ( 
                      <InputTextarea 
                        id={field.name} 
                        {...field} 
                        rows={4} 
                        placeholder="Ingrese el comentario o observación sobre el progreso 
académico del estudiante..." 
                        className={fieldState.error ? 'p-invalid' : ''} 
                        style={{ width: '100%' }} 
                      /> 
                    )} 
                  /> 
                  {errors.comentario && <small className="p
error">{errors.comentario.message}</small>} 
                  <small className={styles.helpText}> 
                    Máximo 225 caracteres. Caracteres usados: 
{control._formValues.comentario?.length || 0}/225 
                  </small> 
                </div> 
 
                {/* Botones del formulario */} 
                <div className={styles.actionsRow}> 
                  <Button 
                    type="button" 
                    label="Cancelar" 
                    icon="pi pi-times" 
                    className={styles.cancelButton} 
                    onClick={resetForm} 
                  /> 
                  <Button 
                    type="submit" 
                    label={editingId ? 'Actualizar' : 'Guardar Observación'} 
                    icon="pi pi-check" 
                    className={styles.submitButton} 
                  /> 
                </div> 
              </form> 
            </div> 
          </div> 
        )} 
 
        {/* Sección de Exportación - Solo PDF */} 
        <div className={styles.exportSection}> 
          <div className={styles.exportHeader}> 
            <h3 className={styles.exportTitle}> 
              <i className="pi pi-file-pdf"></i> 
              Exportar Observaciones en PDF 
            </h3> 
          </div> 
           
          <div className={styles.exportOptions}> 
            <div className={styles.filterGroup}> 
              <label className={styles.filterLabel}>Corte Académico a Exportar</label> 
              <Dropdown 
                value={corteExport} 
                onChange={(e) => setCorteExport(e.value)} 
                options={cortesAcademicos.filter(c => c.value !== '')} 
                optionLabel="label" 
                placeholder="Seleccione corte a exportar" 
              /> 
            </div> 
             
            <div className={styles.filterGroup}> 
              <label className={styles.filterLabel}>&nbsp;</label> 
              <Button 
                label="Exportar PDF" 
                icon="pi pi-file-pdf" 
                className={styles.submitButton} 
                onClick={exportarObservacionesPDF} 
              /> 
            </div> 
          </div> 
        </div> 
 
        {/* Filtros */} 
        <div className={styles.filters}> 
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>Filtrar por estudiante</label> 
            <InputText 
              value={filtroEstudiante} 
              onChange={(e) => setFiltroEstudiante(e.target.value)} 
              placeholder="Nombre del estudiante" 
            /> 
          </div> 
           
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>Filtrar por corte</label> 
            <Dropdown 
              value={filtroCorte} 
              onChange={(e) => setFiltroCorte(e.value)} 
              options={cortesAcademicos} 
              optionLabel="label" 
              placeholder="Todos los cortes" 
            /> 
          </div> 
           
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>Filtrar por tutoría</label> 
            <Dropdown 
              value={filtroTutoria} 
              onChange={(e) => setFiltroTutoria(e.value)} 
              options={[{ label: 'Todas las tutorías', value: '' }, ...opcionesTutorias]} 
              optionLabel="label" 
              placeholder="Todas las tutorías" 
            /> 
          </div> 
           
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>&nbsp;</label> 
            <Button 
              label="Limpiar filtros" 
              icon="pi pi-filter-slash" 
              className="p-button-outlined" 
              onClick={() => { 
                setFiltroEstudiante(''); 
                setFiltroCorte(''); 
                setFiltroTutoria(''); 
              }} 
            /> 
          </div> 
        </div> 
 
        {/* Tabla de Observaciones */} 
        <div className={`${styles.tableContainer} ${loading ? styles.loading : ''}`}> 
          <div className={styles.tableHeader}> 
            <h2 className={styles.tableTitle}> 
              <i className="pi pi-list"></i> 
              Observaciones Registradas ({observacionesFiltradas.length}) 
            </h2> 
          </div> 
 
          <DataTable 
            value={observacionesFiltradas} 
            loading={loading} 
            paginator 
            rows={10} 
            rowsPerPageOptions={[5, 10, 20, 50]} 
            emptyMessage="No se encontraron observaciones" 
            responsiveLayout="scroll" 
          > 
            <Column field="corte" header="Corte" body={corteTemplate} sortable style={{ 
minWidth: '100px' }} /> 
            <Column header="Estudiante" body={estudianteTemplate} sortable style={{ 
minWidth: '150px' }} /> 
            <Column header="Tutoría" body={tutoriaTemplate} sortable style={{ minWidth: 
'200px' }} /> 
            <Column field="comentario" header="Comentario" sortable style={{ minWidth: 
'300px' }} /> 
            <Column field="fecha_registro" header="Fecha Registro" body={fechaTemplate} 
sortable style={{ minWidth: '150px' }} /> 
            <Column header="Acciones" body={accionesTemplate} style={{ minWidth: 
'120px', textAlign: 'center' }} /> 
          </DataTable> 
        </div> 
      </div> 
    </div> 
  ); 
}