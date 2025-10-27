'use client';
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import styles from './Agenda.module.css';

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [eventData, setEventData] = useState({
    titulo: '',
    hora: '',
    lugar: '',
    descripcion: '',
  });

  const handleDateSelect = (e) => {
    setSelectedDate(e.value);
    setVisible(true);
  };

  const handleSave = () => {
    console.log('Evento guardado:', { date: selectedDate, ...eventData });
    setVisible(false);
    setEventData({ titulo: '', hora: '', lugar: '', descripcion: '' });
  };

  return (
    <div className={styles.agendaContainer}>
      <h2 className={styles.title}>
        Agenda de Actividades
        <span className={styles.line}></span>
      </h2>

      {/* ======= CALENDARIO ======= */}
      <div className={styles.calendarContainer}>
        <Calendar
          inline
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.value)}
          onSelect={handleDateSelect}
          showWeek
          dateFormat="dd/mm/yy"
          className={styles.calendar}
          aria-label="Calendario de actividades"
        />
      </div>

      {/* ======= MODAL PARA EVENTO ======= */}
      <Dialog
        header="Agregar evento"
        visible={visible}
        style={{ width: '30rem' }}
        modal
        onHide={() => setVisible(false)}
      >
        <div className={styles.dialogContent}>
          <label htmlFor="titulo">Título</label>
          <InputText
            id="titulo"
            value={eventData.titulo}
            onChange={(e) => setEventData({ ...eventData, titulo: e.target.value })}
            placeholder="Ej: Reunión de comité"
            className={styles.input}
          />

          <label htmlFor="hora">Hora</label>
          <InputText
            id="hora"
            value={eventData.hora}
            onChange={(e) => setEventData({ ...eventData, hora: e.target.value })}
            placeholder="Ej: 10:30 AM"
            className={styles.input}
          />

          <label htmlFor="lugar">Lugar</label>
          <InputText
            id="lugar"
            value={eventData.lugar}
            onChange={(e) => setEventData({ ...eventData, lugar: e.target.value })}
            placeholder="Ej: Oficina de Bienestar"
            className={styles.input}
          />

          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            rows={3}
            value={eventData.descripcion}
            onChange={(e) =>
              setEventData({ ...eventData, descripcion: e.target.value })
            }
            placeholder="Detalles del evento..."
            className={styles.textarea}
          />

          <div className={styles.buttons}>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-outlined"
              onClick={() => setVisible(false)}
            />
            <Button
              label="Guardar"
              icon="pi pi-check"
              className="p-button-success"
              onClick={handleSave}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
