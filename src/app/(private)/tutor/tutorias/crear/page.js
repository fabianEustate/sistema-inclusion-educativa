'use client'; 
import React, { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { useForm, Controller } from 'react-hook-form'; 
import { InputText } from 'primereact/inputtext'; 
import { Calendar } from 'primereact/calendar'; 
import { Dropdown } from 'primereact/dropdown'; 
import { InputTextarea } from 'primereact/inputtextarea'; 
import { Button } from 'primereact/button'; 
import { Toast } from 'primereact/toast'; 
import { useRef } from 'react'; 
import styles from './crearTutoria.module.css'; 
export default function CrearTutoria() { 
const router = useRouter(); 
const toast = useRef(null); 
const [loading, setLoading] = useState(false); 
const estadosTutoria = [ 
{ label: 'Programada', value: 'Programada' }, 
{ label: 'Realizada', value: 'Realizada' }, 
{ label: 'Cancelada', value: 'Cancelada' } 
  ]; 
 
  const defaultValues = { 
    tema_tutoria: '', 
    descripcion_tutoria: '', 
    fecha_tutoria: null, 
    hora_inicio_tutoria: null, 
    hora_fin_tutoria: null, 
    lugar_tutoria: '', 
    estado_tutoria: estadosTutoria[0], // Usar el objeto directamente 
    id_tutor: '', 
    id_estudiante: '' 
  }; 
 
  const { 
    control, 
    formState: { errors }, 
    handleSubmit, 
    reset, 
    watch, 
    setError, 
    clearErrors, 
    getValues // Agregar getValues para depuración 
  } = useForm({ defaultValues }); 
 
  // Observar los valores de hora_inicio y hora_fin para validación 
  const horaInicio = watch('hora_inicio_tutoria'); 
  const horaFin = watch('hora_fin_tutoria'); 
 
  // Función para validar que la hora de fin sea mayor que la de inicio 
  const validarHoras = (horaInicio, horaFin) => { 
    if (horaInicio && horaFin) { 
      const inicio = new Date(horaInicio); 
      const fin = new Date(horaFin); 
       
      if (fin <= inicio) { 
        setError('hora_fin_tutoria', { 
          type: 'manual', 
          message: 'La hora de fin debe ser posterior a la hora de inicio' 
        }); 
        return false; 
      } else { 
        clearErrors('hora_fin_tutoria'); 
        return true; 
      } 
    } 
    return true; 
  }; 
 
  // Función para obtener la fecha mínima (hoy) 
  const getFechaMinima = () => { 
    const hoy = new Date(); 
    hoy.setHours(0, 0, 0, 0); 
    return hoy; 
  }; 
 
  const onSubmit = async (data) => { 
    setLoading(true); 
     
    // DEPURACIÓN: Ver qué contiene data.estado_tutoria 
    console.log('    DEPURACIÓN - data.estado_tutoria:', data.estado_tutoria); 
    console.log('    DEPURACIÓN - Tipo de data.estado_tutoria:', typeof 
data.estado_tutoria); 
     
    if (data.estado_tutoria) { 
      console.log('    DEPURACIÓN - data.estado_tutoria.value:', 
data.estado_tutoria.value); 
      console.log('    DEPURACIÓN - data.estado_tutoria.label:', data.estado_tutoria.label); 
    } 
 
    // Validar horas antes de enviar 
    if (!validarHoras(data.hora_inicio_tutoria, data.hora_fin_tutoria)) { 
      setLoading(false); 
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error de validación', 
        detail: 'La hora de fin debe ser posterior a la hora de inicio', 
        life: 3000 
      }); 
      return; 
    } 
 
    try { 
      // Simular envío a API 
      await new Promise(resolve => setTimeout(resolve, 1500)); 
       
      // CORRECCIÓN: Manejar diferentes formatos del estado 
      let estadoSeleccionado = 'Programada'; // Valor por defecto 
       
      if (data.estado_tutoria) { 
        if (typeof data.estado_tutoria === 'string') { 
          estadoSeleccionado = data.estado_tutoria; 
        } else if (data.estado_tutoria.value) { 
          estadoSeleccionado = data.estado_tutoria.value; 
        } else if (data.estado_tutoria.label) { 
          estadoSeleccionado = data.estado_tutoria.label; 
        } 
      } 
       
      console.log('   Estado final a guardar:', estadoSeleccionado); 
 
      // Crear objeto de tutoría 
      const nuevaTutoria = { 
        id: Date.now(), // ID único basado en timestamp 
        tema_tutoria: data.tema_tutoria, 
        descripcion_tutoria: data.descripcion_tutoria, 
        fecha_tutoria: data.fecha_tutoria, 
        hora_inicio_tutoria: data.hora_inicio_tutoria, 
        hora_fin_tutoria: data.hora_fin_tutoria, 
        lugar_tutoria: data.lugar_tutoria, 
        estado_tutoria: estadoSeleccionado, // Usar el estado corregido 
        id_tutor: data.id_tutor, 
        id_estudiante: data.id_estudiante, 
        fecha_registro: new Date().toISOString(), 
        fecha_ultima_actualizacion: new Date().toISOString(), 
        activo_tutoria: true 
      }; 
 
      console.log('          Tutoría completa a guardar:', nuevaTutoria); 
 
      // Guardar en localStorage 
      const tutoriasExistentes = JSON.parse(localStorage.getItem('tutorias')) || []; 
      const tutoriasActualizadas = [...tutoriasExistentes, nuevaTutoria]; 
      localStorage.setItem('tutorias', JSON.stringify(tutoriasActualizadas)); 
 
      console.log('       Tutorías en localStorage después de guardar:', tutoriasActualizadas); 
 
      // Mostrar mensaje de éxito 
      toast.current.show({ 
        severity: 'success', 
        summary: 'Éxito', 
        detail: `Tutoría creada correctamente (Estado: ${estadoSeleccionado})`, 
        life: 3000 
      }); 
 
      // LIMPIAR EL FORMULARIO - NO REDIRIGIR 
      reset(defaultValues); 
 
    } catch (error) { 
      console.error('Error al crear tutoría:', error); 
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'No se pudo crear la tutoría', 
        life: 3000 
      }); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  const handleCancel = () => { 
    // Limpiar el formulario al cancelar 
    reset(defaultValues); 
  }; 
 
  const getFormErrorMessage = (name) => { 
    return errors[name] ? <small 
className={styles.error}>{errors[name].message}</small> : null; 
  }; 
 
  return ( 
    <div className={styles.container}> 
      <Toast ref={toast} /> 
       
      <div className={styles.content}> 
        <div className={styles.header}> 
          <h1 className={styles.title}>Crear Nueva Tutoría</h1> 
        </div> 
 
        <div className={`${styles.formContainer} ${loading ? styles.loading : ''}`}> 
          <div className={styles.formHeader}> 
            <h2 className={styles.formTitle}> 
              <i className="pi pi-bookmark"></i> 
              Información de la Tutoría 
            </h2> 
          </div> 
 
          <div className={styles.formContent}> 
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid"> 
              {/* Sección: Información Básica */} 
              <div className={styles.formSection}> 
                <h3 className={styles.sectionTitle}>Información Básica</h3> 
                <div className={styles.formGrid}> 
                  {/* Tema de la tutoría */} 
                  <div className={styles.field}> 
                    <label htmlFor="tema_tutoria" className={`${styles.label} 
${styles.required}`}> 
                      Tema de la Tutoría 
                    </label> 
                    <Controller 
                      name="tema_tutoria" 
                      control={control} 
                      rules={{ required: 'El tema es obligatorio' }} 
                      render={({ field, fieldState }) => ( 
                        <InputText 
                          id={field.name} 
                          {...field} 
                          placeholder="Ej: Refuerzo en Matemáticas Aplicadas" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                        /> 
                      )} 
                    /> 
                    {getFormErrorMessage('tema_tutoria')} 
                  </div> 
 
                  {/* Estado de la tutoría - VERSIÓN SIMPLIFICADA */} 
                  <div className={styles.field}> 
                    <label htmlFor="estado_tutoria" className={`${styles.label} 
${styles.required}`}> 
                      Estado 
                    </label> 
                    <Controller 
                      name="estado_tutoria" 
                      control={control} 
                      rules={{ required: 'El estado es obligatorio' }} 
                      render={({ field, fieldState }) => ( 
                        <div> 
                          <Dropdown 
                            id={field.name} 
                            value={field.value} 
                            onChange={(e) => { 
                              console.log('    Dropdown cambiado:', e.value); 
                              field.onChange(e.value); 
                            }} 
                            options={estadosTutoria} 
                            optionLabel="label" 
                            placeholder="Seleccione un estado" 
                            className={fieldState.error ? 'p-invalid' : ''} 
                          /> 
                          <small style={{color: '#666', fontSize: '0.8rem', marginTop: '0.25rem', 
display: 'block'}}> 
                            Estado seleccionado: {field.value?.label || 'Ninguno'} 
                          </small> 
                        </div> 
                      )} 
                    /> 
                    {getFormErrorMessage('estado_tutoria')} 
                  </div> 
                </div> 
              </div> 
 
              {/* Sección: Fecha y Hora */} 
              <div className={styles.formSection}> 
                <h3 className={styles.sectionTitle}>Fecha y Hora</h3> 
                <div className={styles.formGrid}> 
                  {/* Fecha de la tutoría */} 
                  <div className={styles.field}> 
                    <label htmlFor="fecha_tutoria" className={`${styles.label} 
${styles.required}`}> 
                      Fecha 
                    </label> 
                    <Controller 
                      name="fecha_tutoria" 
                      control={control} 
                      rules={{ required: 'La fecha es obligatoria' }} 
                      render={({ field, fieldState }) => ( 
                        <Calendar 
                          id={field.name} 
                          {...field} 
                          dateFormat="dd/mm/yy" 
                          showIcon 
                          minDate={getFechaMinima()} 
                          placeholder="Seleccione la fecha" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                        /> 
                      )} 
                    /> 
                    {getFormErrorMessage('fecha_tutoria')} 
                  </div> 
 
                  {/* Hora de inicio */} 
                  <div className={styles.field}> 
                    <label htmlFor="hora_inicio_tutoria" className={`${styles.label} 
${styles.required}`}> 
                      Hora de Inicio 
                    </label> 
                    <Controller 
                      name="hora_inicio_tutoria" 
                      control={control} 
                      rules={{  
                        required: 'La hora de inicio es obligatoria', 
                        validate: { 
                          validTime: (value) => { 
                            if (horaFin && value && new Date(value) >= new Date(horaFin)) { 
                              return 'La hora de inicio debe ser anterior a la hora de fin'; 
                            } 
                            return true; 
                          } 
                        } 
                      }} 
                      render={({ field, fieldState }) => ( 
                        <Calendar 
                          id={field.name} 
                          {...field} 
                          timeOnly 
                          showTime 
                          hourFormat="24" 
                          placeholder="Seleccione la hora" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                          onChange={(e) => { 
                            field.onChange(e.value); 
                            if (e.value && horaFin) { 
                              validarHoras(e.value, horaFin); 
                            } 
                          }} 
                        /> 
                      )} 
                    /> 
                    {getFormErrorMessage('hora_inicio_tutoria')} 
                  </div> 
 
                  {/* Hora de fin */} 
                  <div className={styles.field}> 
                    <label htmlFor="hora_fin_tutoria" className={`${styles.label} 
${styles.required}`}> 
                      Hora de Fin 
                    </label> 
                    <Controller 
                      name="hora_fin_tutoria" 
                      control={control} 
                      rules={{  
                        required: 'La hora de fin es obligatoria', 
                        validate: { 
                          validTime: (value) => { 
                            if (horaInicio && value && new Date(value) <= new Date(horaInicio)) { 
                              return 'La hora de fin debe ser posterior a la hora de inicio'; 
                            } 
                            return true; 
                          } 
                        } 
                      }} 
                      render={({ field, fieldState }) => ( 
                        <Calendar 
                          id={field.name} 
                          {...field} 
                          timeOnly 
                          showTime 
                          hourFormat="24" 
                          placeholder="Seleccione la hora" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                          onChange={(e) => { 
                            field.onChange(e.value); 
                            if (horaInicio && e.value) { 
                              validarHoras(horaInicio, e.value); 
                            } 
                          }} 
                        /> 
                      )} 
                    /> 
                    {getFormErrorMessage('hora_fin_tutoria')} 
                  </div> 
                </div> 
              </div> 
 
              {/* Sección: Participantes y Lugar */} 
              <div className={styles.formSection}> 
                <h3 className={styles.sectionTitle}>Participantes y Lugar</h3> 
                <div className={styles.formGrid}> 
                  {/* Tutor */} 
                  <div className={styles.field}> 
                    <label htmlFor="id_tutor" className={`${styles.label} ${styles.required}`}> 
                      Nombre del Tutor 
                    </label> 
                    <Controller 
                      name="id_tutor" 
                      control={control} 
                      rules={{ required: 'El nombre del tutor es obligatorio' }} 
                      render={({ field, fieldState }) => ( 
                        <InputText 
                          id={field.name} 
                          {...field} 
                          placeholder="Ej: Profesor Carlos Rodríguez" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                        /> 
                      )} 
                    /> 
                    {getFormErrorMessage('id_tutor')} 
                  </div> 
 
                  {/* Estudiante */} 
                  <div className={styles.field}> 
                    <label htmlFor="id_estudiante" className={`${styles.label} 
${styles.required}`}> 
                      Nombre del Estudiante 
                    </label> 
                    <Controller 
                      name="id_estudiante" 
                      control={control} 
                      rules={{ required: 'El nombre del estudiante es obligatorio' }} 
                      render={({ field, fieldState }) => ( 
                        <InputText 
                          id={field.name} 
                          {...field} 
                          placeholder="Ej: Juan Carlos Pérez" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                        /> 
                      )} 
                    /> 
                    {getFormErrorMessage('id_estudiante')} 
                  </div> 
 
                  {/* Lugar */} 
                  <div className={styles.field}> 
                    <label htmlFor="lugar_tutoria" className={`${styles.label} 
${styles.required}`}> 
                      Lugar de la Tutoría 
                    </label> 
                    <Controller 
                      name="lugar_tutoria" 
                      control={control} 
                      rules={{ required: 'El lugar es obligatorio' }} 
                      render={({ field, fieldState }) => ( 
                        <InputText 
                          id={field.name} 
                          {...field} 
                          placeholder="Ej: Biblioteca Central, Aula 101, Sala Virtual Teams" 
                          className={fieldState.error ? 'p-invalid' : ''} 
                        /> 
                      )} 
                    /> 
                    {getFormErrorMessage('lugar_tutoria')} 
                  </div> 
                </div> 
              </div> 
 
              {/* Sección: Descripción */} 
              <div className={styles.formSection}> 
                <h3 className={styles.sectionTitle}>Descripción Detallada</h3> 
                <div className={styles.field}> 
                  <Controller 
                    name="descripcion_tutoria" 
                    control={control} 
                    render={({ field }) => ( 
                      <InputTextarea 
                        id={field.name} 
                        {...field} 
                        rows={4} 
                        placeholder="Describa las actividades, contenidos o temas específicos que 
se tratarán en la tutoría..." 
                        style={{ width: '100%' }} 
                      /> 
                    )} 
                  /> 
                  <small className={styles.helpText}> 
                    Opcional: Incluya detalles sobre los ejercicios, materiales o estrategias que se 
utilizarán. 
                  </small> 
                </div> 
              </div> 
 
              {/* Botones de acción */} 
              <div className={styles.actions}> 
                <Button 
                  type="button" 
                  label="Limpiar Campos" 
                  icon="pi pi-times" 
                  className={styles.cancelButton} 
                  onClick={handleCancel} 
                  disabled={loading} 
                /> 
                <Button 
                  type="submit" 
                  label={loading ? 'Creando...' : 'Crear Tutoría'} 
                  icon="pi pi-check" 
                  className={styles.submitButton} 
                  loading={loading} 
                /> 
              </div> 
            </form> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}