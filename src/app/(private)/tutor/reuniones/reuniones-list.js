
'use client';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import styles from './reuniones.module.css';

export default function ReunionesList({ reuniones, loading, onEdit, onDelete, onConfirm, onViewActa }) {
  const fechaTemplate = (rowData, field) => {
    if (!rowData[field]) return '-';
    const fecha = new Date(rowData[field]);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusTemplate = (rowData) => {
    const statusClass = rowData.estado === 'Programada' ? styles.programada : styles.realizada;
    return <span className={`${styles.statusBadge} ${statusClass}`}>{rowData.estado}</span>;
  };

  const accionesTemplate = (rowData) => {
    return (
      <div className={styles.actionsCell}>
        <Button
          icon="pi pi-pencil"
          className={`p-button-warning p-button-sm ${styles.actionButton}`}
          tooltip="Editar reunión"
          onClick={() => onEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className={`p-button-danger p-button-sm ${styles.actionButton}`}
          tooltip="Eliminar reunión"
          onClick={() => onDelete(rowData.id)}
        />
        {rowData.estado === 'Programada' && (
          <Button
            icon="pi pi-check-square"
            className={`p-button-success p-button-sm ${styles.actionButton}`}
            tooltip="Confirmar Asistencia"
            onClick={() => onConfirm(rowData)}
          />
        )}
        {rowData.estado === 'Realizada' && (
          <Button
            icon="pi pi-file"
            className={`p-button-info p-button-sm ${styles.actionButton}`}
            tooltip="Ver Acta"
            onClick={() => onViewActa(rowData)}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.tableContainer} ${loading ? styles.loading : ''}`}>
      <div className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>
          <i className="pi pi-list"></i>
          Reuniones Registradas ({reuniones.length})
        </h2>
      </div>

      <DataTable
        value={reuniones}
        loading={loading}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50]}
        emptyMessage="No se encontraron reuniones"
        responsiveLayout="scroll"
      >
        <Column
          field="fechaReunion"
          header="Fecha Reunión"
          body={(rowData) => fechaTemplate(rowData, 'fechaReunion')}
          sortable
          style={{ minWidth: '150px' }}
        />
        <Column field="estado" header="Estado" body={statusTemplate} sortable style={{ minWidth: '120px' }} />
        <Column field="resumen" header="Resumen" sortable style={{ minWidth: '300px' }} />
        <Column
          field="fecha_registro"
          header="Fecha Registro"
          body={(rowData) => fechaTemplate(rowData, 'fecha_registro')}
          sortable
          style={{ minWidth: '150px' }}
        />
        <Column header="Acciones" body={accionesTemplate} style={{ minWidth: '180px', textAlign: 'center' }} />
      </DataTable>
    </div>
  );
}
