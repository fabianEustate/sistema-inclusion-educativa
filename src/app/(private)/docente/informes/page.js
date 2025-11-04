'use client';

import { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import styles from './informes.module.css';

export default function InformesPage() {
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Estado para el formulario de registro
  const [formData, setFormData] = useState({
    corte: '',
    nota: '',
    observacion: '',
    id_detalle: '',
    fecha_registro: new Date(),
    fecha_ultima_actualizacion: new Date(),
    activo: true
  });

  // Estado para la tabla de informes
  const [informes, setInformes] = useState([
    {
      oid_informe: 1,
      corte: 1,
      nota: 4.5,
      observacion: 'Excelente desempeño en el primer corte',
      id_detalle: 'DTL001',
      fecha_registro: new Date('2025-02-15'),
      fecha_ultima_actualizacion: new Date('2025-02-15'),
      activo: true
    },
    {
      oid_informe: 2,
      corte: 2,
      nota: 3.8,
      observacion: 'Buen avance, necesita mejorar en trabajos grupales',
      id_detalle: 'DTL002',
      fecha_registro: new Date('2025-05-20'),
      fecha_ultima_actualizacion: new Date('2025-05-22'),
      activo: true
    }
  ]);

  // Estado para modales
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedInforme, setSelectedInforme] = useState(null);
  const [editData, setEditData] = useState({});

  // Estado para filtros
  const [globalFilter, setGlobalFilter] = useState('');

  // Opciones para el dropdown de corte
  const corteOptions = [
    { label: 'Corte 1', value: 1 },
    { label: 'Corte 2', value: 2 },
    { label: 'Corte 3', value: 3 }
  ];

  // Manejo del formulario
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.corte || !formData.nota) {
      toast.current.show({
        severity: 'warn',
        summary: 'Campos requeridos',
        detail: 'Por favor complete los campos obligatorios',
        life: 3000
      });
      return;
    }

    const nuevoInforme = {
      oid_informe: informes.length + 1,
      ...formData,
      fecha_registro: new Date(),
      fecha_ultima_actualizacion: new Date()
    };

    setInformes([...informes, nuevoInforme]);
    
    toast.current.show({
      severity: 'success',
      summary: 'Informe registrado',
      detail: 'El informe ha sido guardado exitosamente',
      life: 3000
    });

    // Limpiar formulario
    setFormData({
      corte: '',
      nota: '',
      observacion: '',
      id_detalle: '',
      fecha_registro: new Date(),
      fecha_ultima_actualizacion: new Date(),
      activo: true
    });

    // Cambiar a la pestaña de consulta
    setActiveIndex(1);
  };

  const handleCancel = () => {
    setFormData({
      corte: '',
      nota: '',
      observacion: '',
      id_detalle: '',
      fecha_registro: new Date(),
      fecha_ultima_actualizacion: new Date(),
      activo: true
    });
  };

  // Acciones de la tabla
  const handleViewDetail = (informe) => {
    setSelectedInforme(informe);
    setShowDetailDialog(true);
  };

  const handleEdit = (informe) => {
    setEditData({ ...informe });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedInformes = informes.map(inf => 
      inf.oid_informe === editData.oid_informe 
        ? { ...editData, fecha_ultima_actualizacion: new Date() }
        : inf
    );
    
    setInformes(updatedInformes);
    setShowEditDialog(false);
    
    toast.current.show({
      severity: 'success',
      summary: 'Informe actualizado',
      detail: 'Los cambios han sido guardados',
      life: 3000
    });
  };

  const handleDelete = (informe) => {
    confirmDialog({
      message: '¿Está seguro que desea eliminar este informe?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        setInformes(informes.filter(inf => inf.oid_informe !== informe.oid_informe));
        toast.current.show({
          severity: 'success',
          summary: 'Informe eliminado',
          detail: 'El informe ha sido eliminado correctamente',
          life: 3000
        });
      }
    });
  };

  // Columnas de la tabla
  const actionBodyTemplate = (rowData) => {
    return (
      <div className={styles.actionButtons}>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-text"
          onClick={() => handleViewDetail(rowData)}
          tooltip="Ver detalle"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-text"
          onClick={() => handleEdit(rowData)}
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => handleDelete(rowData)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const dateBodyTemplate = (rowData, field) => {
    return new Date(rowData[field]).toLocaleDateString('es-ES');
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={rowData.activo ? styles.statusActive : styles.statusInactive}>
        {rowData.activo ? 'Activo' : 'Inactivo'}
      </span>
    );
  };

  // Header de la tabla
  const tableHeader = (
    <div className={styles.tableHeader}>
      <h3 className={styles.tableTitle}>Listado de Informes</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar informes..."
        />
      </span>
    </div>
  );

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className={styles.headerSection}>
        <h2 className={styles.mainTitle}>Gestión de Informes Docentes</h2>
        <p className={styles.subtitle}>
          Registre y consulte los informes de corte académico de los estudiantes
        </p>
      </div>

      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        {/* PESTAÑA 1: REGISTRAR INFORME */}
        <TabPanel header="Registrar Informe" leftIcon="pi pi-file-edit">
          <Card className={styles.card}>
            <h3 className={styles.sectionTitle}>Nuevo Informe de Corte</h3>
            <Divider />

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                {/* Fila 1 */}
                <div className={styles.formField}>
                  <label htmlFor="corte" className={styles.label}>
                    Corte <span className={styles.required}>*</span>
                  </label>
                  <Dropdown
                    id="corte"
                    value={formData.corte}
                    options={corteOptions}
                    onChange={(e) => handleInputChange('corte', e.value)}
                    placeholder="Seleccione el corte"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="nota" className={styles.label}>
                    Nota <span className={styles.required}>*</span>
                  </label>
                  <InputNumber
                    id="nota"
                    value={formData.nota}
                    onValueChange={(e) => handleInputChange('nota', e.value)}
                    mode="decimal"
                    minFractionDigits={1}
                    maxFractionDigits={2}
                    min={0}
                    max={5}
                    placeholder="0.0"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="id_detalle" className={styles.label}>
                    ID Detalle
                  </label>
                  <InputText
                    id="id_detalle"
                    value={formData.id_detalle}
                    onChange={(e) => handleInputChange('id_detalle', e.target.value)}
                    placeholder="Ej: DTL001"
                    className={styles.input}
                  />
                </div>

                {/* Fila 2 - Campo completo */}
                <div className={styles.formFieldFull}>
                  <label htmlFor="observacion" className={styles.label}>
                    Observación
                  </label>
                  <InputTextarea
                    id="observacion"
                    value={formData.observacion}
                    onChange={(e) => handleInputChange('observacion', e.target.value)}
                    rows={4}
                    placeholder="Escriba aquí las observaciones sobre el desempeño del estudiante..."
                    className={styles.textarea}
                  />
                </div>
              </div>

              <Divider />

              <div className={styles.formActions}>
                <Button
                  type="button"
                  label="Cancelar"
                  icon="pi pi-times"
                  className="p-button-secondary"
                  onClick={handleCancel}
                />
                <Button
                  type="submit"
                  label="Guardar Informe"
                  icon="pi pi-check"
                  className="p-button-success"
                />
              </div>
            </form>
          </Card>
        </TabPanel>

        {/* PESTAÑA 2: CONSULTAR INFORMES */}
        <TabPanel header="Consultar Informes" leftIcon="pi pi-list">
          <Card className={styles.card}>
            <DataTable
              value={informes}
              paginator
              rows={10}
              dataKey="oid_informe"
              globalFilter={globalFilter}
              header={tableHeader}
              emptyMessage="No se encontraron informes"
              className={styles.dataTable}
              responsiveLayout="scroll"
            >
              <Column field="oid_informe" header="ID" sortable style={{ width: '80px' }} />
              <Column field="corte" header="Corte" sortable style={{ width: '100px' }} />
              <Column field="nota" header="Nota" sortable style={{ width: '100px' }} />
              <Column field="id_detalle" header="ID Detalle" sortable />
              <Column field="observacion" header="Observación" style={{ minWidth: '250px' }} />
              <Column 
                field="fecha_registro" 
                header="Fecha Registro" 
                body={(rowData) => dateBodyTemplate(rowData, 'fecha_registro')}
                sortable 
              />
              <Column 
                field="activo" 
                header="Estado" 
                body={statusBodyTemplate}
                sortable 
                style={{ width: '100px' }}
              />
              <Column 
                header="Acciones" 
                body={actionBodyTemplate} 
                exportable={false}
                style={{ width: '150px' }}
              />
            </DataTable>
          </Card>
        </TabPanel>
      </TabView>

      {/* MODAL DE DETALLE */}
      <Dialog
        header="Detalle del Informe"
        visible={showDetailDialog}
        style={{ width: '600px' }}
        onHide={() => setShowDetailDialog(false)}
        modal
      >
        {selectedInforme && (
          <div className={styles.detailContent}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID Informe:</span>
              <span className={styles.detailValue}>{selectedInforme.oid_informe}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Corte:</span>
              <span className={styles.detailValue}>Corte {selectedInforme.corte}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Nota:</span>
              <span className={styles.detailValue}>{selectedInforme.nota}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID Detalle:</span>
              <span className={styles.detailValue}>{selectedInforme.id_detalle || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Observación:</span>
              <span className={styles.detailValue}>{selectedInforme.observacion || 'Sin observaciones'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Fecha Registro:</span>
              <span className={styles.detailValue}>
                {new Date(selectedInforme.fecha_registro).toLocaleString('es-ES')}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Última Actualización:</span>
              <span className={styles.detailValue}>
                {new Date(selectedInforme.fecha_ultima_actualizacion).toLocaleString('es-ES')}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Estado:</span>
              <span className={selectedInforme.activo ? styles.statusActive : styles.statusInactive}>
                {selectedInforme.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        )}
      </Dialog>

      {/* MODAL DE EDICIÓN */}
      <Dialog
        header="Editar Informe"
        visible={showEditDialog}
        style={{ width: '600px' }}
        onHide={() => setShowEditDialog(false)}
        modal
      >
        <div className={styles.editForm}>
          <div className={styles.formField}>
            <label htmlFor="edit_corte" className={styles.label}>Corte</label>
            <Dropdown
              id="edit_corte"
              value={editData.corte}
              options={corteOptions}
              onChange={(e) => setEditData({ ...editData, corte: e.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="edit_nota" className={styles.label}>Nota</label>
            <InputNumber
              id="edit_nota"
              value={editData.nota}
              onValueChange={(e) => setEditData({ ...editData, nota: e.value })}
              mode="decimal"
              minFractionDigits={1}
              maxFractionDigits={2}
              min={0}
              max={5}
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="edit_id_detalle" className={styles.label}>ID Detalle</label>
            <InputText
              id="edit_id_detalle"
              value={editData.id_detalle}
              onChange={(e) => setEditData({ ...editData, id_detalle: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="edit_observacion" className={styles.label}>Observación</label>
            <InputTextarea
              id="edit_observacion"
              value={editData.observacion}
              onChange={(e) => setEditData({ ...editData, observacion: e.target.value })}
              rows={4}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formActions}>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={() => setShowEditDialog(false)}
            />
            <Button
              label="Guardar Cambios"
              icon="pi pi-check"
              className="p-button-success"
              onClick={handleSaveEdit}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}