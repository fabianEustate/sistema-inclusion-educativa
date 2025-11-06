
'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import styles from './reuniones.module.css';

export default function ReunionForm({ visible, onHide, onSubmit, reunion, loading }) {
  const defaultValues = {
    resumen: reunion?.resumen || '',
    fecha: reunion?.fechaReunion ? new Date(reunion.fechaReunion) : null,
    hora: reunion?.fechaReunion ? new Date(reunion.fechaReunion) : null,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  React.useEffect(() => {
    if (reunion) {
      reset(defaultValues);
    } else {
      reset({
        resumen: '',
        fecha: null,
        hora: null,
      });
    }
  }, [reunion, reset]);

  const handleFormSubmit = (data) => {
    const { fecha, hora, ...rest } = data;
    const fechaReunion = new Date(fecha);
    if (hora) {
      fechaReunion.setHours(hora.getHours());
      fechaReunion.setMinutes(hora.getMinutes());
    }
    onSubmit({ ...rest, fechaReunion });
    reset();
  };

  const dialogFooter = (
    <div className={styles.actionsRow}>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className={styles.cancelButton}
        onClick={() => {
          reset();
          onHide();
        }}
        disabled={loading}
      />
      <Button
        label={reunion ? 'Actualizar' : 'Guardar Reunión'}
        icon="pi pi-check"
        className={styles.submitButton}
        onClick={handleSubmit(handleFormSubmit)}
        loading={loading}
      />
    </div>
  );

  return (
    <Dialog
      header={reunion ? 'Editar Reunión' : 'Programar Nueva Reunión'}
      visible={visible}
      style={{ width: '50vw' }}
      onHide={onHide}
      footer={dialogFooter}
      modal
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-fluid">
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="fecha" className={`${styles.label} ${styles.required}`}>
              Fecha de la Reunión
            </label>
            <Controller
              name="fecha"
              control={control}
              rules={{ required: 'La fecha es obligatoria' }}
              render={({ field, fieldState }) => (
                <Calendar
                  id={field.name}
                  {...field}
                  dateFormat="dd/mm/yy"
                  placeholder="Seleccione una fecha"
                  className={fieldState.error ? 'p-invalid' : ''}
                />
              )}
            />
            {errors.fecha && <small className="p-error">{errors.fecha.message}</small>}
          </div>
          <div className={styles.field}>
            <label htmlFor="hora" className={`${styles.label} ${styles.required}`}>
              Hora de la Reunión
            </label>
            <Controller
              name="hora"
              control={control}
              rules={{ required: 'La hora es obligatoria' }}
              render={({ field, fieldState }) => (
                <Calendar
                  id={field.name}
                  {...field}
                  timeOnly
                  hourFormat="12"
                  placeholder="Seleccione una hora"
                  className={fieldState.error ? 'p-invalid' : ''}
                />
              )}
            />
            {errors.hora && <small className="p-error">{errors.hora.message}</small>}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="resumen" className={`${styles.label} ${styles.required}`}>
            Resumen / Temas a tratar
          </label>
          <Controller
            name="resumen"
            control={control}
            rules={{
              required: 'El resumen es obligatorio',
              maxLength: {
                value: 225,
                message: 'El resumen no puede exceder 225 caracteres',
              },
            }}
            render={({ field, fieldState }) => (
              <InputTextarea
                id={field.name}
                {...field}
                rows={4}
                placeholder="Ingrese un resumen o los temas a tratar en la reunión..."
                className={fieldState.error ? 'p-invalid' : ''}
                style={{ width: '100%' }}
              />
            )}
          />
          {errors.resumen && <small className="p-error">{errors.resumen.message}</small>}
          <small className={styles.helpText}>
            Máximo 225 caracteres.
          </small>
        </div>
      </form>
    </Dialog>
  );
}
