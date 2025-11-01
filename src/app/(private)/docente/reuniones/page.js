'use client';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styles from './reuniones.module.css';

export default function ReunionesDocente() {
  const toast = React.useRef(null);
  const [reuniones, setReuniones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showActasDialog, setShowActasDialog] = useState(false);
  const [showAsistentesDialog, setShowAsistentesDialog] = useState(false);
  const [selectedReunion, setSelectedReunion] = useState(null);
  const [confirmacion, setConfirmacion] = useState(false);
  const [observaciones, setObservaciones] = useState('');

  const reunionesFiltradas = reuniones.filter(r => {
    const reunionDate = new Date(r.fecha);
    return reunionDate.getMonth() === selectedDate.getMonth() &&
           reunionDate.getFullYear() === selectedDate.getFullYear();
  });

  const handleConfirmarAsistencia = (reunion) => {
    setSelectedReunion(reunion);
    setConfirmacion(reunion.mi_asistencia?.confirmacion || false);
    setObservaciones('');
    setShowConfirmDialog(true);
  };

  const handleGuardarAsistencia = () => {
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    const updatedReuniones = reuniones.map(r => {
      if (r.id_reunion === selectedReunion.id_reunion) {
        return {
          ...r,
          mi_asistencia: {
            ...r.mi_asistencia,
            confirmacion: confirmacion,
            fecha_ultima_actualizacion: fechaActual,
            observaciones: observaciones
          }
        };
      }
      return r;
    });
    
    setReuniones(updatedReuniones);
    
    toast.current.show({
      severity: confirmacion ? 'success' : 'info',
      summary: 'Asistencia Actualizada',
      detail: confirmacion 
        ? 'Has confirmado tu asistencia a la reunión' 
        : 'Has indicado que no asistirás',
      life: 3000
    });
    
    setShowConfirmDialog(false);
  };

  const handleVerActas = (reunion) => {
    setSelectedReunion(reunion);
    setShowActasDialog(true);
  };

  const handleVerAsistentes = (reunion) => {
    setSelectedReunion(reunion);
    setShowAsistentesDialog(true);
  };

  const dateTemplate = (date) => {
    const reunionesDelDia = reuniones.filter(r => {
      const rd = new Date(r.fecha);
      return rd.getDate() === date.day &&
             rd.getMonth() === date.month &&
             rd.getFullYear() === date.year;
    });

    if (reunionesDelDia.length > 0) {
      return (
        <div className={styles.dateWithIndicator}>
          {date.day}
          <div className={styles.dateIndicator} />
        </div>
      );
    }
    return date.day;
  };

  const estadoBodyTemplate = (rowData) => {
    const severity = {
      'programada': 'info',
      'realizada': 'success',
      'cancelada': 'danger'
    };
    return <Tag value={rowData.estado?.toUpperCase()} severity={severity[rowData.estado]} />;
  };

  const asistenciaBodyTemplate = (rowData) => {
    if (rowData.estado === 'realizada') {
      return <Tag value="COMPLETADA" severity="success" />;
    }
    return rowData.mi_asistencia?.confirmacion 
      ? <Tag value="CONFIRMADA" severity="success" icon="pi pi-check" />
      : <Tag value="PENDIENTE" severity="warning" icon="pi pi-clock" />;
  };

  const accionesBodyTemplate = (rowData) => {
    return (
      <div className={styles.actionButtons}>
        {rowData.estado === 'programada' && (
          <Button
            icon={rowData.mi_asistencia?.confirmacion ? "pi pi-pencil" : "pi pi-check"}
            className="p-button-rounded p-button-sm"
            severity={rowData.mi_asistencia?.confirmacion ? "secondary" : "success"}
            tooltip={rowData.mi_asistencia?.confirmacion ? "Modificar Asistencia" : "Confirmar Asistencia"}
            onClick={() => handleConfirmarAsistencia(rowData)}
          />
        )}
        <Button
          icon="pi pi-users"
          className="p-button-rounded p-button-sm p-button-secondary"
          tooltip="Ver Asistentes"
          onClick={() => handleVerAsistentes(rowData)}
        />
        {rowData.actas && rowData.actas.length > 0 && (
          <Button
            icon="pi pi-file"
            className="p-button-rounded p-button-sm p-button-info"
            tooltip="Ver Actas"
            onClick={() => handleVerActas(rowData)}
          />
        )}
      </div>
    );
  };

  const confirmacionAsistenteTemplate = (rowData) => {
    return rowData.confirmacion 
      ? <Tag value="SÍ" severity="success" icon="pi pi-check" />
      : <Tag value="NO" severity="danger" icon="pi pi-times" />;
  };

  const activoAsistenteTemplate = (rowData) => {
    return rowData.activo 
      ? <Tag value="ACTIVO" severity="success" />
      : <Tag value="INACTIVO" severity="danger" />;
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <div className={styles.grid}>
        {/* Calendario */}
        <div className={styles.calendarSection}>
          <Card className={styles.cardFull}>
            <div className={styles.cardHeader}>
              <i className="pi pi-calendar-plus"></i>
              <h3>Calendario</h3>
            </div>
            <Calendar
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value)}
              inline
              dateTemplate={dateTemplate}
              className={styles.calendar}
            />
            <Divider />
            <div className={styles.calendarInfo}>
              <p className={styles.monthLabel}>
                <strong>{selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</strong>
              </p>
              <p className={styles.reunionesCount}>
                <i className="pi pi-info-circle"></i>
                {reunionesFiltradas.length} reunión(es) programada(s)
              </p>
            </div>
          </Card>
        </div>

        {/* Próximas reuniones */}
        <div className={styles.proximasSection}>
          <Card className={styles.cardFull}>
            <div className={styles.cardHeader}>
              <i className="pi pi-clock"></i>
              <h3>Próximas Reuniones (7 días)</h3>
            </div>
            <div className={styles.proximasGrid}>
              {reuniones
                .filter(r => {
                  const diff = new Date(r.fecha) - new Date();
                  return r.estado === 'programada' && diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
                })
                .slice(0, 4)
                .map(reunion => (
                  <div key={reunion.id_reunion} className={styles.reunionCard}>
                    <p className={styles.reunionTitulo}>{reunion.titulo}</p>
                    <p className={styles.reunionDetalle}>
                      <i className="pi pi-calendar"></i>
                      {new Date(reunion.fecha).toLocaleDateString('es-ES')} - {new Date(reunion.fecha).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}
                    </p>
                    <p className={styles.reunionDetalle}>
                      <i className="pi pi-map-marker"></i>
                      {reunion.lugar}
                    </p>
                    <div className={styles.reunionFooter}>
                      {asistenciaBodyTemplate(reunion)}
                      <Button
                        icon="pi pi-check"
                        size="small"
                        className="p-button-sm"
                        onClick={() => handleConfirmarAsistencia(reunion)}
                        disabled={reunion.mi_asistencia?.confirmacion}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Lista de reuniones */}
      <Card className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <i className="pi pi-list"></i>
          <h3>Reuniones de {selectedDate.toLocaleDateString('es-ES', { month: 'long' })}</h3>
        </div>
        <DataTable
          value={reunionesFiltradas}
          paginator
          rows={10}
          loading={loading}
          emptyMessage="No hay reuniones programadas para este mes"
          size="small"
          stripedRows
        >
          <Column 
            field="fecha" 
            header="Fecha/Hora" 
            body={(rowData) => (
              <div className={styles.fechaCell}>
                <div>{new Date(rowData.fecha).toLocaleDateString('es-ES')}</div>
                <div className={styles.horaCell}>
                  {new Date(rowData.fecha).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}
                </div>
              </div>
            )}
            sortable
            style={{width: '120px'}}
          />
          <Column field="titulo" header="Título" sortable />
          <Column field="tipo" header="Tipo" sortable style={{width: '150px'}} />
          <Column field="lugar" header="Lugar" style={{width: '150px'}} />
          <Column header="Estado" body={estadoBodyTemplate} style={{width: '110px'}} />
          <Column header="Mi Asistencia" body={asistenciaBodyTemplate} style={{width: '120px'}} />
          <Column header="Acciones" body={accionesBodyTemplate} style={{width: '120px'}} />
        </DataTable>
      </Card>

      {/* Dialog Confirmar Asistencia */}
      <Dialog
        header="Confirmar Asistencia"
        visible={showConfirmDialog}
        style={{ width: '550px' }}
        onHide={() => setShowConfirmDialog(false)}
        footer={
          <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowConfirmDialog(false)} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={handleGuardarAsistencia} autoFocus />
          </div>
        }
      >
        {selectedReunion && (
          <div className={styles.dialogContent}>
            <div className={styles.dialogInfo}>
              <h3 className={styles.dialogTitulo}>{selectedReunion.titulo}</h3>
              <p className={styles.dialogText}><strong>Fecha:</strong> {new Date(selectedReunion.fecha).toLocaleString('es-ES')}</p>
              <p className={styles.dialogText}><strong>Lugar:</strong> {selectedReunion.lugar}</p>
              <p className={styles.dialogDescripcion}>{selectedReunion.descripcion}</p>
            </div>

            {selectedReunion.mi_asistencia && (
              <div className={styles.registroInfo}>
                <p className={styles.registroTitulo}>Datos de tu Registro:</p>
                <div className={styles.registroGrid}>
                  <p><strong>ID Asistente:</strong> {selectedReunion.mi_asistencia.id_asistente_reunion}</p>
                  <p><strong>Rol:</strong> {selectedReunion.mi_asistencia.rol_asistente}</p>
                  <p><strong>ID Persona:</strong> {selectedReunion.mi_asistencia.id_persona}</p>
                  <p><strong>ID Reunión:</strong> {selectedReunion.mi_asistencia.id_reunion}</p>
                </div>
                <p className={styles.registroFecha}>
                  Registrado: {selectedReunion.mi_asistencia.fecha_registro}
                </p>
                {selectedReunion.mi_asistencia.fecha_ultima_actualizacion !== selectedReunion.mi_asistencia.fecha_registro && (
                  <p className={styles.registroFecha}>
                    Última actualización: {selectedReunion.mi_asistencia.fecha_ultima_actualizacion}
                  </p>
                )}
              </div>
            )}

            <div className={styles.checkboxContainer}>
              <Checkbox
                inputId="confirmacion"
                checked={confirmacion}
                onChange={(e) => setConfirmacion(e.checked)}
              />
              <label htmlFor="confirmacion" className={styles.checkboxLabel}>
                {confirmacion ? 'Confirmo mi asistencia' : 'No podré asistir'}
              </label>
            </div>

            <div>
              <label className={styles.textareaLabel}>Observaciones (opcional)</label>
              <InputTextarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={3}
                className={styles.textarea}
                placeholder="Ingrese cualquier observación sobre su asistencia..."
              />
            </div>
          </div>
        )}
      </Dialog>

      {/* Dialog Ver Asistentes */}
      <Dialog
        header="Lista de Asistentes"
        visible={showAsistentesDialog}
        style={{ width: '800px' }}
        onHide={() => setShowAsistentesDialog(false)}
      >
        {selectedReunion && (
          <div>
            <div className={styles.dialogInfo}>
              <h3 className={styles.dialogTitulo}>{selectedReunion.titulo}</h3>
              <p className={styles.dialogText}>
                {new Date(selectedReunion.fecha).toLocaleDateString('es-ES')} - {selectedReunion.lugar}
              </p>
            </div>

            <DataTable
              value={selectedReunion.asistentes || []}
              size="small"
              stripedRows
              emptyMessage="No hay asistentes registrados"
            >
              <Column 
                field="id_asistente_reunion" 
                header="ID" 
                style={{width: '80px'}}
              />
              <Column field="nombre" header="Nombre" sortable />
              <Column field="rol_asistente" header="Rol" sortable style={{width: '130px'}} />
              <Column field="id_persona" header="ID Persona" style={{width: '100px'}} />
              <Column 
                header="Confirmación" 
                body={confirmacionAsistenteTemplate}
                style={{width: '120px'}}
              />
              <Column 
                header="Estado" 
                body={activoAsistenteTemplate}
                style={{width: '100px'}}
              />
              <Column 
                field="fecha_registro" 
                header="F. Registro"
                body={(rowData) => (
                  <span className={styles.fechaSmall}>{rowData.fecha_registro}</span>
                )}
                style={{width: '140px'}}
              />
            </DataTable>

            <div className={styles.asistentesResumen}>
              <strong>Total asistentes:</strong> {selectedReunion.asistentes?.length || 0} | 
              <strong className={styles.asistentesConfirmados}>Confirmados:</strong> {selectedReunion.asistentes?.filter(a => a.confirmacion).length || 0}
            </div>
          </div>
        )}
      </Dialog>

      {/* Dialog Ver Actas */}
      <Dialog
        header="Actas y Evidencias"
        visible={showActasDialog}
        style={{ width: '700px' }}
        onHide={() => setShowActasDialog(false)}
      >
        {selectedReunion && (
          <div className={styles.dialogContent}>
            <div className={styles.dialogInfo}>
              <h3 className={styles.dialogTitulo}>{selectedReunion.titulo}</h3>
              <p className={styles.dialogText}>
                {new Date(selectedReunion.fecha).toLocaleDateString('es-ES')}
              </p>
            </div>

            {selectedReunion.actas && selectedReunion.actas.length > 0 ? (
              selectedReunion.actas.map(acta => (
                <Panel key={acta.id} header={acta.titulo} className={styles.actaPanel}>
                  <p className={styles.actaDetalle}><strong>Fecha:</strong> {acta.fecha}</p>
                  <p className={styles.actaDetalle}><strong>Resumen:</strong> {acta.resumen}</p>
                  
                  {acta.compromisos && acta.compromisos.length > 0 && (
                    <div>
                      <strong>Compromisos:</strong>
                      <ul className={styles.compromisosList}>
                        {acta.compromisos.map((compromiso, idx) => (
                          <li key={idx}>{compromiso}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Divider />
                  <div className={styles.actaButtons}>
                    <Button
                      label="Descargar PDF"
                      icon="pi pi-download"
                      size="small"
                      className="p-button-outlined"
                    />
                    <Button
                      label="Ver Completa"
                      icon="pi pi-eye"
                      size="small"
                      className="p-button-outlined p-button-info"
                    />
                  </div>
                </Panel>
              ))
            ) : (
              <div className={styles.emptyState}>
                <i className="pi pi-file"></i>
                <p>No hay actas disponibles para esta reunión</p>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}