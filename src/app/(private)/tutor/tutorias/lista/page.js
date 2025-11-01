'use client'; 
import React, { useState, useEffect, useRef } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column'; 
import { Button } from 'primereact/button'; 
import { Dropdown } from 'primereact/dropdown'; 
import { InputText } from 'primereact/inputtext'; 
import { Toast } from 'primereact/toast'; 
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import styles from './listaTutorias.module.css'; 
export default function ListaTutorias() { 
const router = useRouter(); 
const toast = useRef(null); 
const [tutorias, setTutorias] = useState([]); 
const [loading, setLoading] = useState(true); 
const [filtroEstudiante, setFiltroEstudiante] = useState(''); 
const [filtroEstado, setFiltroEstado] = useState(''); 
const [globalFilter, setGlobalFilter] = useState(''); 
// Estados para los filtros 
const estadosTutoria = [ 
    { label: 'Todos los estados', value: '' }, 
    { label: 'Programada', value: 'Programada' }, 
    { label: 'Realizada', value: 'Realizada' }, 
    { label: 'Cancelada', value: 'Cancelada' } 
  ]; 
 
  // Cargar tutorías del localStorage al iniciar 
  useEffect(() => { 
    cargarTutorias(); 
  }, []); 
 
  const cargarTutorias = () => { 
    setLoading(true); 
    try { 
      // Simular carga de datos (en producción vendría de una API) 
      setTimeout(() => { 
        const tutoriasGuardadas = JSON.parse(localStorage.getItem('tutorias')) || []; 
        setTutorias(tutoriasGuardadas); 
        setLoading(false); 
      }, 500); 
    } catch (error) { 
      console.error('Error al cargar tutorías:', error); 
      setLoading(false); 
    } 
  }; 
 
  // Filtrar tutorías según los criterios 
  const tutoriasFiltradas = tutorias.filter(tutoria => { 
    const coincideEstudiante = filtroEstudiante === '' ||  
      tutoria.id_estudiante?.toLowerCase().includes(filtroEstudiante.toLowerCase()); 
    const coincideEstado = filtroEstado === '' || tutoria.estado_tutoria === filtroEstado; 
    const coincideBusqueda = globalFilter === '' ||  
      Object.values(tutoria).some(value =>  
        value && value.toString().toLowerCase().includes(globalFilter.toLowerCase()) 
      ); 
     
    return coincideEstudiante && coincideEstado && coincideBusqueda; 
  }); 
 
  const cambiarEstadoTutoria = (id, nuevoEstado) => { 
    confirmDialog({ 
      message: `¿Estás seguro de que quieres cambiar el estado a "${nuevoEstado}"?`, 
      header: 'Confirmar cambio de estado', 
      icon: 'pi pi-exclamation-triangle', 
      accept: () => { 
        const tutoriasActualizadas = tutorias.map(tutoria => 
          tutoria.id === id ? { ...tutoria, estado_tutoria: nuevoEstado } : tutoria 
        ); 
         
        setTutorias(tutoriasActualizadas); 
        localStorage.setItem('tutorias', JSON.stringify(tutoriasActualizadas)); 
         
        toast.current.show({ 
          severity: 'success', 
          summary: 'Estado actualizado', 
          detail: `La tutoría ahora está ${nuevoEstado.toLowerCase()}`, 
          life: 3000 
        }); 
      } 
    }); 
  }; 
 
  const accionesTemplate = (rowData) => { 
    return ( 
      <div className={styles.actionsCell}> 
        {rowData.estado_tutoria !== 'Realizada' && ( 
          <Button 
            icon="pi pi-check" 
            className={`p-button-success p-button-sm ${styles.actionButton}`} 
            tooltip="Marcar como realizada" 
            tooltipOptions={{ position: 'top' }} 
            onClick={() => cambiarEstadoTutoria(rowData.id, 'Realizada')} 
          /> 
        )} 
        {rowData.estado_tutoria !== 'Cancelada' && ( 
          <Button 
            icon="pi pi-times" 
            className={`p-button-danger p-button-sm ${styles.actionButton}`} 
            tooltip="Cancelar tutoría" 
            tooltipOptions={{ position: 'top' }} 
            onClick={() => cambiarEstadoTutoria(rowData.id, 'Cancelada')} 
          /> 
        )} 
        {rowData.estado_tutoria !== 'Programada' && ( 
          <Button 
            icon="pi pi-refresh" 
            className={`p-button-warning p-button-sm ${styles.actionButton}`} 
            tooltip="Re-programar" 
            tooltipOptions={{ position: 'top' }} 
            onClick={() => cambiarEstadoTutoria(rowData.id, 'Programada')} 
          /> 
        )} 
      </div> 
    ); 
  }; 
 
  const estadoTemplate = (rowData) => { 
    let claseEstilo = ''; 
    switch (rowData.estado_tutoria) { 
      case 'Programada': 
        claseEstilo = styles.statusProgramada; 
        break; 
      case 'Realizada': 
        claseEstilo = styles.statusRealizada; 
        break; 
      case 'Cancelada': 
        claseEstilo = styles.statusCancelada; 
        break; 
      default: 
        claseEstilo = styles.statusProgramada; 
    } 
 
    return ( 
      <span className={`${styles.statusBadge} ${claseEstilo}`}> 
        {rowData.estado_tutoria} 
      </span> 
    ); 
  }; 
 
  const fechaTemplate = (rowData) => { 
    if (!rowData.fecha_tutoria) return '-'; 
    const fecha = new Date(rowData.fecha_tutoria); 
    return fecha.toLocaleDateString('es-ES'); 
  }; 
 
  const horaTemplate = (rowData, campo) => { 
    if (!rowData[campo]) return '-'; 
    const hora = new Date(rowData[campo]); 
    return hora.toLocaleTimeString('es-ES', {  
      hour: '2-digit',  
      minute: '2-digit'  
    }); 
  }; 
 
  const crearNuevaTutoria = () => { 
    router.push('/tutor/tutorias/crear'); 
  }; 
 
  const limpiarFiltros = () => { 
    setFiltroEstudiante(''); 
    setFiltroEstado(''); 
    setGlobalFilter(''); 
  }; 
 
  return ( 
    <div className={styles.container}> 
      <Toast ref={toast} /> 
      <ConfirmDialog /> 
       
      <div className={styles.content}> 
        <div className={styles.header}> 
          <h1 className={styles.title}>Lista de Tutorías</h1> 
          <div className={styles.actions}> 
            <Button 
              label="Nueva Tutoría" 
              icon="pi pi-plus" 
              className={styles.submitButton} 
              onClick={crearNuevaTutoria} 
            /> 
          </div> 
        </div> 
 
        {/* Filtros */} 
        <div className={styles.filters}> 
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>Buscar en todos los campos</label> 
            <InputText 
              value={globalFilter} 
              onChange={(e) => setGlobalFilter(e.target.value)} 
              placeholder="Buscar..." 
            /> 
          </div> 
           
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>Filtrar por estudiante</label> 
            <InputText 
              value={filtroEstudiante} 
              onChange={(e) => setFiltroEstudiante(e.target.value)} 
              placeholder="Nombre del estudiante" 
            /> 
          </div> 
           
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>Filtrar por estado</label> 
            <Dropdown 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.value)} 
              options={estadosTutoria} 
              optionLabel="label" 
              placeholder="Seleccionar estado" 
            /> 
          </div> 
           
          <div className={styles.filterGroup}> 
            <label className={styles.filterLabel}>&nbsp;</label> 
            <Button 
              label="Limpiar filtros" 
              icon="pi pi-filter-slash" 
              className="p-button-outlined" 
              onClick={limpiarFiltros} 
            /> 
          </div> 
        </div> 
 
        <div className={`${styles.tableContainer} ${loading ? styles.loading : ''}`}> 
          <div className={styles.tableHeader}> 
            <h2 className={styles.tableTitle}> 
              <i className="pi pi-list"></i> 
              Tutorías Registradas ({tutoriasFiltradas.length}) 
            </h2> 
          </div> 
 
          <DataTable 
            value={tutoriasFiltradas} 
            loading={loading} 
            paginator 
            rows={10} 
            rowsPerPageOptions={[5, 10, 20, 50]} 
            emptyMessage="No se encontraron tutorías" 
            globalFilter={globalFilter} 
            responsiveLayout="scroll" 
          > 
            <Column field="tema_tutoria" header="Tema" sortable style={{ minWidth: '200px' 
}} /> 
            <Column field="id_estudiante" header="Estudiante" sortable style={{ minWidth: 
'150px' }} /> 
            <Column field="id_tutor" header="Tutor" sortable style={{ minWidth: '150px' }} 
/> 
            <Column  
              field="fecha_tutoria"  
              header="Fecha"  
              sortable  
              body={fechaTemplate} 
              style={{ minWidth: '120px' }}  
            /> 
            <Column  
              header="Hora Inicio"  
              body={(rowData) => horaTemplate(rowData, 'hora_inicio_tutoria')} 
              style={{ minWidth: '100px' }}  
            /> 
            <Column  
              header="Hora Fin"  
              body={(rowData) => horaTemplate(rowData, 'hora_fin_tutoria')} 
              style={{ minWidth: '100px' }}  
            /> 
            <Column field="lugar_tutoria" header="Lugar" sortable style={{ minWidth: 
'150px' }} /> 
            <Column  
              field="estado_tutoria"  
              header="Estado"  
              sortable  
              body={estadoTemplate} 
              style={{ minWidth: '130px' }}  
            /> 
            <Column  
              header="Acciones"  
              body={accionesTemplate} 
              style={{ minWidth: '150px', textAlign: 'center' }}  
            /> 
          </DataTable> 
        </div> 
      </div> 
    </div> 
  ); 
} 