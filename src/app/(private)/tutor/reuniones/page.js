
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import styles from './reuniones.module.css';
import ReunionForm from './reunion-form';
import ReunionesList from './reuniones-list';

export default function Reuniones() {
  const toast = useRef(null);
  const [reuniones, setReuniones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReunion, setEditingReunion] = useState(null);
  const [displayActa, setDisplayActa] = useState(false);
  const [selectedReunion, setSelectedReunion] = useState(null);

  const cargarDatos = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const reunionesGuardadas = JSON.parse(localStorage.getItem('reuniones')) || [];
        setReuniones(reunionesGuardadas);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingReunion) {
        const reunionesActualizadas = reuniones.map((reu) =>
          reu.id === editingReunion.id
            ? { ...reu, ...data, fecha_ultima_actualizacion: new Date().toISOString() }
            : reu
        );
        setReuniones(reunionesActualizadas);
        localStorage.setItem('reuniones', JSON.stringify(reunionesActualizadas));
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Reunión actualizada correctamente',
          life: 3000,
        });
      } else {
        const nuevaReunion = {
          id: Date.now(),
          ...data,
          estado: 'Programada',
          acta: null,
          fecha_registro: new Date().toISOString(),
          fecha_ultima_actualizacion: new Date().toISOString(),
          Activo_reuniones: true,
        };
        const reunionesActualizadas = [...reuniones, nuevaReunion];
        setReuniones(reunionesActualizadas);
        localStorage.setItem('reuniones', JSON.stringify(reunionesActualizadas));
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Reunión creada correctamente',
          life: 3000,
        });
      }
      resetForm();
    } catch (error) {
      console.error('Error al guardar reunión:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo guardar la reunión',
        life: 3000,
      });
    }
    setLoading(false);
  };

  const handleEdit = (reunion) => {
    setEditingReunion(reunion);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar esta reunión?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const reunionesActualizadas = reuniones.filter((reu) => reu.id !== id);
        setReuniones(reunionesActualizadas);
        localStorage.setItem('reuniones', JSON.stringify(reunionesActualizadas));
        toast.current.show({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Reunión eliminada correctamente',
          life: 3000,
        });
      },
    });
  };

  const handleConfirm = (reunion) => {
    const reunionesActualizadas = reuniones.map((reu) =>
      reu.id === reunion.id ? { ...reu, estado: 'Realizada', acta: reu.resumen } : reu
    );
    setReuniones(reunionesActualizadas);
    localStorage.setItem('reuniones', JSON.stringify(reunionesActualizadas));
    toast.current.show({
      severity: 'success',
      summary: 'Confirmado',
      detail: 'Asistencia a la reunión confirmada.',
      life: 3000,
    });
  };

  const handleViewActa = (reunion) => {
    setSelectedReunion(reunion);
    setDisplayActa(true);
  };

  const resetForm = () => {
    setEditingReunion(null);
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Registro de Reuniones</h1>
          <div className={styles.actions}>
            <Button
              label="Nueva Reunión"
              icon="pi pi-plus"
              className={styles.submitButton}
              onClick={() => {
                setEditingReunion(null);
                setShowForm(true);
              }}
            />
          </div>
        </div>

        <ReunionesList
          reuniones={reuniones}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onConfirm={handleConfirm}
          onViewActa={handleViewActa}
        />

        {showForm && (
          <ReunionForm
            visible={showForm}
            onHide={resetForm}
            onSubmit={handleFormSubmit}
            reunion={editingReunion}
            loading={loading}
          />
        )}

        <Dialog
          header="Acta de la Reunión"
          visible={displayActa}
          style={{ width: '50vw' }}
          onHide={() => setDisplayActa(false)}
        >
          <p>{selectedReunion?.acta}</p>
        </Dialog>
      </div>
    </div>
  );
}