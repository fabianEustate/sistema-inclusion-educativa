'use client';

import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Badge } from 'primereact/badge';
import styles from './EstudianteView.module.css';
import estudiantesService from '@/services/estudiante/estudiante_service';

export default function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    try {
      setLoading(true);
      const respuesta = await estudiantesService.getEstudiantes();
      setEstudiantes(respuesta.estudiantes || []);
    } catch (error) {
      console.error('Error cargando estudiantes:', error);
      setEstudiantes([]);
    } finally {
      setLoading(false);
    }
  };

  const verDetalles = (estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setDialogVisible(true);
  };

  const getEstadoBadge = (activo) => {
    return activo ? (
      <Badge value="Activo" severity="success" className={styles.badge} />
    ) : (
      <Badge value="Inactivo" severity="danger" className={styles.badge} />
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Cargando estudiantes...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Estudiantes</h1>
      <p className={styles.subtitle}>
        Información general de los estudiantes del sistema
      </p>

      {estudiantes.length === 0 ? (
        <div className={styles.emptyState}>
          <i className="pi pi-users" style={{ fontSize: '3rem', color: '#ddd' }}></i>
          <h3>No hay estudiantes</h3>
          <p>Cuando agregues estudiantes, aparecerán aquí.</p>
        </div>
      ) : (
        <div className="grid">
          {estudiantes.map((estudiante) => (
            <div key={estudiante.id_estudiante} className="col-12 md:col-6 lg:col-4">
              <Card className={styles.noticiaCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.noticiaTitulo}>
                    {estudiante.persona.nombres} {estudiante.persona.primer_apellido}
                  </h3>
                  {getEstadoBadge(estudiante.persona.activo)}
                </div>
                <div className={styles.cardContent}>
                  <p><strong>Programa:</strong> {estudiante.programa.nombre}</p>
                  <p><strong>Documento:</strong> {estudiante.persona.tipo_documento} {estudiante.persona.identificacion}</p>
                  <p><strong>Correo:</strong> {estudiante.persona.correo_institucional}</p>
                  <p><strong>Teléfono:</strong> {estudiante.persona.telefono}</p>
                </div>
                <div className={styles.cardActions}>
                  <Button
                    label="Ver Detalles"
                    icon="pi pi-eye"
                    className={styles.detalleButton}
                    onClick={() => verDetalles(estudiante)}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Dialog para detalles */}
      <Dialog
        header={estudianteSeleccionado?.persona.nombres}
        visible={dialogVisible}
        style={{ width: '50vw' }}
        onHide={() => setDialogVisible(false)}
        className={styles.detalleDialog}
      >
        {estudianteSeleccionado && (
          <div className={styles.detalleContent}>
            <p><strong>Nombre completo:</strong> {estudianteSeleccionado.persona.nombres} {estudianteSeleccionado.persona.primer_apellido} {estudianteSeleccionado.persona.segundo_apellido}</p>
            <p><strong>Documento:</strong> {estudianteSeleccionado.persona.tipo_documento} {estudianteSeleccionado.persona.identificacion}</p>
            <p><strong>Correo institucional:</strong> {estudianteSeleccionado.persona.correo_institucional}</p>
            <p><strong>Teléfono:</strong> {estudianteSeleccionado.persona.telefono}</p>
            <p><strong>Programa:</strong> {estudianteSeleccionado.programa.nombre}</p>
            <p><strong>Ficha activa:</strong> {estudianteSeleccionado.ficha_activa ? 'Sí' : 'No'}</p>
            <p><strong>Estado:</strong> {estudianteSeleccionado.persona.activo ? 'Activo' : 'Inactivo'}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
}
