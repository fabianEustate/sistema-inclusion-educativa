'use client';
import React from 'react';
import { Button } from 'primereact/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../../../../../styles/ConstanciaPDF.module.css';
import Image from 'next/image';
import logo from '../../../../../components/ui/logoUPC.png';

const ConstanciaPDF = ({ data, onClose }) => {
  const pdfRef = React.useRef();

  const descargarPDF = async () => {
    const elemento = pdfRef.current;
    
    try {
      // Configurar html2canvas para mejor calidad
      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Crear PDF en tamaño carta
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Constancia_Visita_${data.nombres || 'documento'}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor intente nuevamente.');
    }
  };

  const formatearHora = (hora) => {
    if (!hora) return '';
    return hora;
  };
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
    };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Vista Previa - Constancia de Visita Domiciliaria</h3>
          <Button
            icon="pi pi-times"
            className={styles.closeButton}
            onClick={onClose}
            rounded
            text
          />
        </div>

        <div className={styles.pdfPreview}>
          <div ref={pdfRef} className={styles.pdfContainer}>
            {/* Encabezado */}
            <div className={styles.header}>
              <div className={styles.logoContainer}>
                <Image
                  src={logo}
                  alt="Logo Universidad Popular del Cesar"
                  className={styles.logo}
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <div className={styles.headerCenter}>
                <div className={styles.universityName}>
                  UNIVERSIDAD POPULAR DEL CESAR
                </div>
                <div className={styles.documentTitle}>
                  CONSTANCIA VISITA DOMICILIARIA
                </div>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.codigo}>CÓDIGO: 307-202-PRC005-FOR14</div>
                <div className={styles.version}>VERSIÓN: 1</div>
                <div className={styles.pagina}>PÁG.:1</div>
                <div className={styles.fecha}>FECHA: {obtenerFechaActual()}</div>
              </div>
            </div>

            {/* Contenido del formulario */}
            <div className={styles.formContent}>
              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>FECHA</span>
                <span className={styles.fieldValue}>{data.fecha_visita || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>NOMBRES</span>
                <span className={styles.fieldValue}>{data.nombres || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>DIRECCIÓN DONDE SE REALIZA LA VISITA</span>
                <span className={styles.fieldValue}>{data.direccion?.direccion_completa || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>ESTAMENTO: </span>
                <span className={styles.checkbox}>ESTUDIANTE {data.estamento === 'estudiante' ? '✓' : '___'}</span>
                <span className={styles.checkbox}>DOCENTE {data.estamento === 'docente' ? '✓' : '___'}</span>
                <span className={styles.checkbox}>FUNCIONARIO {data.estamento === 'funcionario' ? '✓' : '___'}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>PROGRAMA</span>
                <span className={styles.fieldValue}>{data.programa || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>FACULTAD</span>
                <span className={styles.fieldValue}>{data.facultad || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>DEPENDENCIA</span>
                <span className={styles.fieldValue}>{data.dependencia || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>PERSONA CONTACTADA</span>
                <span className={styles.fieldValue}>{data.persona_contactada || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>PARENTESCO</span>
                <span className={styles.fieldValue}>{data.parentesco_contacto || ''}</span>
              </div>

              <div className={styles.formRow}>
                <span className={styles.fieldLabel}>HORA DE INICIO - VISITA</span>
                <span className={styles.fieldValue}>{formatearHora(data.hora_inicio)}</span>
                <span className={styles.fieldLabel} style={{ marginLeft: '40px' }}>HORA FINALIZACIÓN</span>
                <span className={styles.fieldValue}>{formatearHora(data.hora_fin)}</span>
              </div>

              <div className={styles.observacionesSection}>
                <div className={styles.fieldLabel}>OBSERVACIONES</div>
                <div className={styles.observacionesContent}>
                  {data.observaciones || ''}
                </div>
              </div>

            {/* Firmas */}
              <div className={styles.firmasSection}>
                <div className={styles.firmaBox}>
                  <div className={styles.firmaNombre}>{data.persona_que_atiende || ''}</div>
                  <div className={styles.firmaLinea}></div>
                  <div className={styles.firmaLabel}>PERSONA QUE ATIENDE LA VISITA</div>
                </div>
                <div className={styles.firmaBox}>
                  <div className={styles.firmaNombre}>{data.profesionales_visita || ''}</div>
                  <div className={styles.firmaLinea}></div>
                  <div className={styles.firmaLabel}>PROFESIONAL QUE REALIZA LA VISITA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={onClose}
            className={styles.cancelButton}
          />
          <Button
            label="Descargar PDF"
            icon="pi pi-download"
            onClick={descargarPDF}
            className={styles.downloadButton}
          />
        </div>
      </div>
    </div>
  );
};

export default ConstanciaPDF;