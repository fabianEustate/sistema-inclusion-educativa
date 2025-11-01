'use client';
import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { FilterMatchMode } from 'primereact/api';
import CrearEvento from '../crear/page';
import styles from './listaEventos.module.css';

const ListaEventos = () => {
  const toast = useRef(null);
  const dt = useRef(null);

  // Estado para almacenar los eventos que vendrán del backend
  const [eventos, setEventos] = useState([]);

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tema: { value: null, matchMode: FilterMatchMode.CONTAINS },
    categoria: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tipo_asistencia: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  // Estados para el diálogo de crear/editar evento
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const abrirNuevoEvento = () => {
    setEventoSeleccionado(null);
    setMostrarDialogo(true);
  };

  const abrirEditarEvento = (evento) => {
    setEventoSeleccionado(evento);
    setMostrarDialogo(true);
  };

  const cerrarDialogo = () => {
    setMostrarDialogo(false);
    setEventoSeleccionado(null);
  };

const guardarEvento = (eventoData) => {
    if (eventoSeleccionado) {
      // Editar evento existente
      setEventos(eventos.map(e => 
        e.id_evento === eventoSeleccionado.id_evento 
          ? { ...eventoData, id_evento: eventoSeleccionado.id_evento }
          : e
      ));
      toast.current.show({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Evento actualizado correctamente',
        life: 3000
      });
    } else {
      // Crear nuevo evento
      // Si no hay eventos, empezar desde 1, si no, tomar el máximo + 1
      const nuevoId = eventos.length === 0 
        ? 1 
        : Math.max(...eventos.map(e => e.id_evento)) + 1;
      
      const nuevoEvento = {
        ...eventoData,
        id_evento: nuevoId
      };
      
      setEventos([...eventos, nuevoEvento]);
      toast.current.show({
        severity: 'success',
        summary: 'Creado',
        detail: 'Evento creado correctamente',
        life: 3000
      });
    }
    cerrarDialogo();
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fechaBodyTemplate = (rowData) => {
    return formatearFecha(rowData.fecha);
  };

  const getSeveridadEstado = (estado) => {
    switch (estado) {
      case 'Programado':
        return 'info';
      case 'Realizado':
        return 'success';
      case 'Cancelado':
        return 'danger';
      default:
        return null;
    }
  };

  const estadoBodyTemplate = (rowData) => {
    return <Tag value={rowData.estado} severity={getSeveridadEstado(rowData.estado)} />;
  };

  const getSeveridadCategoria = (categoria) => {
    switch (categoria) {
      case 'Académico':
        return 'primary';
      case 'Cultural':
        return 'warning';
      case 'Social':
        return 'success';
      default:
        return null;
    }
  };

  const categoriaBodyTemplate = (rowData) => {
    return <Tag value={rowData.categoria} severity={getSeveridadCategoria(rowData.categoria)} />;
  };

  const tipoAsistenciaBodyTemplate = (rowData) => {
    return (
      <span className={styles.badge}>
        <i className="pi pi-map-marker" style={{ marginRight: '0.5rem' }}></i>
        {rowData.tipo_asistencia}
      </span>
    );
  };

  const confirmarEliminar = (evento) => {
    confirmDialog({
      message: `¿Está seguro de eliminar el evento "${evento.tema}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: () => eliminarEvento(evento)
    });
  };

  const eliminarEvento = (evento) => {
    setEventos(eventos.filter(e => e.id_evento !== evento.id_evento));
    toast.current.show({
      severity: 'success',
      summary: 'Eliminado',
      detail: 'Evento eliminado correctamente',
      life: 3000
    });
  };

  const accionesBodyTemplate = (rowData) => {
    return (
      <div className={styles.accionesContainer}>
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          className={styles.botonVer}
          onClick={() => verDetalles(rowData)}
          tooltip="Ver detalles"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="success"
          className={styles.botonEditar}
          onClick={() => abrirEditarEvento(rowData)}
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmarEliminar(rowData)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const verDetalles = (evento) => {
    toast.current.show({
      severity: 'info',
      summary: 'Detalles del Evento',
      detail: `Evento: ${evento.tema}`,
      life: 3000
    });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nuevo Evento"
          icon="pi pi-plus"
          className={styles.botonNuevo}
          onClick={abrirNuevoEvento}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Exportar"
        icon="pi pi-upload"
        className={styles.botonExportar}
        onClick={exportCSV}
      />
    );
  };

  const header = (
    <div className={styles.headerTabla}>
      <h2 className={styles.titulo}>Gestión de Eventos</h2>
      <span className={styles.busqueda}>
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar eventos..."
        />
      </span>
    </div>
  );

  return (
    <div className={styles.contenedor}>
      <Toast ref={toast} />
      <ConfirmDialog />

      {/* Diálogo para crear/editar evento */}
      <Dialog
        visible={mostrarDialogo}
        style={{ width: '90vw', maxWidth: '1000px' }}
        onHide={cerrarDialogo}
        modal
        className={styles.dialogo}
      >
        <CrearEvento
          eventoInicial={eventoSeleccionado}
          onGuardar={guardarEvento}
          onCancelar={cerrarDialogo}
        />
      </Dialog>

      <div className={styles.tarjeta}>
        <Toolbar
          className={styles.toolbar}
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        />

        <DataTable
          ref={dt}
          value={eventos}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          dataKey="id_evento"
          filters={filters}
          filterDisplay="row"
          globalFilterFields={['tema', 'descripcion', 'categoria', 'estado', 'tipo_asistencia']}
          header={header}
          emptyMessage="No se encontraron eventos."
          className={styles.tabla}
          stripedRows
        >
          <Column
            field="id_evento"
            header="ID"
            sortable
            style={{ minWidth: '4rem' }}
          />
          <Column
            field="tema"
            header="Tema"
            sortable
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="tipo_asistencia"
            header="Tipo"
            body={tipoAsistenciaBodyTemplate}
            sortable
            style={{ minWidth: '10rem' }}
          />
          <Column
            field="categoria"
            header="Categoría"
            body={categoriaBodyTemplate}
            sortable
            style={{ minWidth: '8rem' }}
          />
          <Column
            field="fecha"
            header="Fecha"
            body={fechaBodyTemplate}
            sortable
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="estado"
            header="Estado"
            body={estadoBodyTemplate}
            sortable
            style={{ minWidth: '8rem' }}
          />
          <Column
            field="descripcion"
            header="Descripción"
            style={{ minWidth: '15rem' }}
          />
          <Column
            body={accionesBodyTemplate}
            exportable={false}
            header="Acciones"
            style={{ minWidth: '12rem' }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default ListaEventos;