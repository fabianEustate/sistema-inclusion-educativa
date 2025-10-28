'use client';
import React from 'react';
import { Button } from 'primereact/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../../../components/ui/logo_siglas.png';

const DescargarPDFDiscapacidad = ({ formData }) => {
  
  // Función para convertir imagen a base64
  const getBase64Image = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  };

  const generarPDF = async () => {
    // Cargar y convertir el logo a base64
    let logoBase64 = '';
    try {
      const img = new Image();
      img.src = logo.src || logo; // Maneja tanto objetos de Next.js como rutas directas
      await new Promise((resolve, reject) => {
        img.onload = () => {
          logoBase64 = getBase64Image(img);
          resolve();
        };
        img.onerror = reject;
      });
    } catch (error) {
      console.error('Error al cargar el logo:', error);
    }

    // Crear elemento temporal para el PDF
    const elemento = document.createElement('div');
    elemento.style.position = 'absolute';
    elemento.style.left = '-9999px';
    elemento.style.width = '210mm'; // Ancho A4
    elemento.style.backgroundColor = 'white';
    elemento.style.padding = '0';
    
    // HTML del documento siguiendo el formato de la imagen
    elemento.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 11px;">
        <!-- Encabezado con tabla -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="width: 30%; border: 1px solid #000; padding: 10px; text-align: center;">
              <div style="height: 60px; display: flex; align-items: center; justify-content: center;">
                ${logoBase64 ? `<img src="${logoBase64}" alt="Logo UPC" style="max-width: 100px; max-height: 60px;" />` : '<div style="width: 100px; height: 60px; background-color: #f0f0f0;"></div>'}
              </div>
            </td>
            <td style="width: 40%; border: 1px solid #000; padding: 10px; text-align: center;">
              <strong>UNIVERSIDAD POPULAR DEL<br/>CESAR</strong>
              <div style="margin-top: 10px; font-size: 10px;">
                <strong>HISTORIA PERSONAS CON<br/>DISCAPACIDAD</strong>
              </div>
            </td>
            <td style="width: 30%; border: 1px solid #000; padding: 10px;">
              <div style="margin-bottom: 5px;"><strong>CÓDIGO:</strong></div>
              <div style="margin-bottom: 5px;"><strong>VERSIÓN:</strong> 1</div>
              <div><strong>PÁG:</strong> 1 de 1</div>
            </td>
          </tr>
        </table>

        <!-- Fecha -->
        <div style="margin-bottom: 30px;">
          <strong>Fecha:</strong> _________________________________
        </div>

        <!-- Datos del Estudiante -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px; background-color: #f0f0f0; text-align: center;">
              <strong>DATOS DEL ESTUDIANTE</strong>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px;">
              <strong>Nombre y Apellidos:</strong> ${formData.nombres} ${formData.primer_apellido} ${formData.segundo_apellido || ''}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px;">
              <strong>Fecha de Nacimiento:</strong> ${formData.fecha_nacimiento ? new Date(formData.fecha_nacimiento).toLocaleDateString('es-CO') : ''}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px;">
              <strong>Identificación:</strong> ${formData.tipo_documento} - ${formData.identificacion}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px;">
              <strong>Programa:</strong> ${formData.programa}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; width: 60%;">
              <strong>Dirección:</strong> ${formData.id_direccion}
            </td>
            <td style="border: 1px solid #000; padding: 8px; width: 40%;">
              <strong>¿Con quién vive?</strong> ${formData.con_quien_vive}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px;">
              <strong>Teléfono:</strong> ${formData.telefono}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px;">
              <strong>Tipo de Discapacidad:</strong> ${formData.nombre_discapacidad}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px;">
              <strong>Estado Civil:</strong> ${formData.estado_civil}
            </td>
            <td style="border: 1px solid #000; padding: 8px;">
              <strong>Persona a Cargo:</strong> ${formData.nombre_persona_a_cargo}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px;">
              <strong>EPS o IPS:</strong> ${formData.epsIps}
            </td>
          </tr>
        </table>

        <!-- Causa de la Discapacidad -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="border: 1px solid #000; padding: 8px; background-color: #f0f0f0; text-align: center;">
              <strong>CAUSA DE LA DISCAPACIDAD</strong>
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; height: 120px; vertical-align: top;">
              ${formData.causaDiscapacidad || ''}
            </td>
          </tr>
        </table>

        <!-- Antecedentes Personales -->
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid #000; padding: 8px; background-color: #f0f0f0; text-align: center;">
              <strong>ANTECEDENTES PERSONALES</strong>
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; height: 150px; vertical-align: top;">
              ${formData.antecedentesPersonales || ''}
            </td>
          </tr>
        </table>
      </div>
    `;

    document.body.appendChild(elemento);

    try {
      // Generar canvas del elemento
      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Crear PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Generar nombre del archivo
      const nombreArchivo = `Historia_Discapacidad_${formData.nombres}_${formData.primer_apellido}_${Date.now()}.pdf`;
      pdf.save(nombreArchivo);

    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, intente nuevamente.');
    } finally {
      // Limpiar elemento temporal
      document.body.removeChild(elemento);
    }
  };

  return (
    <Button
      label="Descargar PDF"
      icon="pi pi-file-pdf"
      className="p-button-danger"
      onClick={generarPDF}
      tooltip="Descargar historia en formato PDF"
      tooltipOptions={{ position: 'top' }}
    />
  );
};

export default DescargarPDFDiscapacidad;