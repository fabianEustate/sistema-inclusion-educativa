'use client';
import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import { ProgressBar } from 'primereact/progressbar';
import styles from './noticias.module.css';
export default function Page() {
    const [formData, setFormData] = useState({
        titulo: '',
        subtitulo: '',
        lead: '',
        cuerpo: '',
        fecha_publicacion: null,
        categoria: '',
        ubicacion: '',
        estado: 'borrador'
    });
    const [mediaFiles, setMediaFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const categorias = [
        { label: 'General', value: 'general' },
        { label: 'Académico', value: 'academico' },
        { label: 'Investigación', value: 'investigacion' },
        { label: 'Extensión', value: 'extension' },
        { label: 'Bienestar Universitario', value: 'bienestar' },
        { label: 'Inclusión', value: 'inclusion' },
        { label: 'Eventos', value: 'eventos' },
        { label: 'Convocatorias', value: 'convocatorias' }
    ];
    const estados = [
        { label: 'Borrador', value: 'borrador' },
        { label: 'Publicado', value: 'publicado' },
        { label: 'Archivado', value: 'archivado' }
    ];
    const ubicaciones = [
        { label: 'Sede Sabanas', value: 'Sabanas' },
        { label: 'Sede Aguachica', value: 'aguachica' },
        { label: 'Sede Hurtado', value: 'Hurtado' },
        { label: 'Sede Bellas Artes', value: 'Bellas Artes' },
        { label: 'Todas las sedes', value: 'todas' }
    ];
    // Validaciones
    const validateRequired = (value, fieldName) => {
        if (!value || value.toString().trim() === '') return `El campo ${fieldName} es obligatorio`;
        return '';
    };
    const validateTitulo = (titulo) => {
        if (!titulo) return 'El título es obligatorio';
        if (titulo.length > 200) return 'El título no puede tener más de 200 caracteres';
        return '';
    };
    const validateCuerpo = (cuerpo) => {
        if (!cuerpo) return 'El cuerpo de la noticia es obligatorio';
        if (cuerpo.length < 50) return 'El cuerpo debe tener al menos 50 caracteres';
        return '';
    };
    // Manejo de archivos multimedia
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            const maxSize = 50 * 1024 * 1024; // 50MB
            if (!isImage && !isVideo) {
                alert(`El archivo ${file.name} no es una imagen o video válido`);
                return false;
            }
            if (file.size > maxSize) {
                alert(`El archivo ${file.name} es demasiado grande. Máximo 50MB`);
                return false;
            }
            return true;
        });
        if (validFiles.length > 0) {
            simulateUpload(validFiles);
        }
        // Limpiar el input
        event.target.value = '';
    };
    const simulateUpload = (files) => {
        setIsUploading(true);
        setUploadProgress(0);
        const totalFiles = files.length;
        let uploadedCount = 0;
        const uploadInterval = setInterval(() => {
            uploadedCount++;
            const progress = (uploadedCount / totalFiles) * 100;
            setUploadProgress(progress);
            if (uploadedCount === totalFiles) {
                clearInterval(uploadInterval);
                // Agregar archivos al estado
                const newMediaFiles = files.map(file => ({
                    id: Date.now() + Math.random(),
                    file,
                    name: file.name,
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploadDate: new Date()
                }));
                setMediaFiles(prev => [...prev, ...newMediaFiles]);
                setIsUploading(false);
                setUploadProgress(0);
            }
        }, 500);
    };
    const removeMediaFile = (id) => {
        setMediaFiles(prev => {
            const fileToRemove = prev.find(file => file.id === id);
            if (fileToRemove && fileToRemove.url) {
                URL.revokeObjectURL(fileToRemove.url);
            }
            return prev.filter(file => file.id !== id);
        });
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };
    const validateForm = () => {
        const newErrors = {
            titulo: validateTitulo(formData.titulo),
            subtitulo: validateRequired(formData.subtitulo, 'subtítulo'),
            lead: validateRequired(formData.lead, 'lead'),
            cuerpo: validateCuerpo(formData.cuerpo),
            categoria: validateRequired(formData.categoria, 'categoría'),
            ubicacion: validateRequired(formData.ubicacion, 'ubicación'),
            estado: validateRequired(formData.estado, 'estado')
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Lógica para guardar la noticia
            const noticiaCompleta = {
                ...formData,
                mediaFiles: mediaFiles.map(file => ({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    // En una aplicación real, aquí subirías el archivo a un servidor
                    // y guardarías la URL resultante
                    url: file.url // Esto es temporal para la demo
                })),
                fecha_registro: new Date(),
                fecha_ultima_actualizacion: new Date(),
                activo: true,
                id_usuario: 1 // Esto vendría del contexto de autenticación
            };
            console.log('Noticia a guardar:', noticiaCompleta);
            alert('Noticia guardada exitosamente');
        } else {
            alert('Por favor, corrija los errores en el formulario');
        }
    };
    const handleCancel = () => {
        setFormData({
            titulo: '',
            subtitulo: '',
            lead: '',
            cuerpo: '',
            fecha_publicacion: null,
            categoria: '',
            ubicacion: '',
            estado: 'borrador'
        });
        // Limpiar archivos multimedia
        mediaFiles.forEach(file => {
            if (file.url) {
                URL.revokeObjectURL(file.url);
            }
        });
        setMediaFiles([]);
        setErrors({});
    };
    const getStatusBadgeClass = (estado) => {
        switch (estado) {
            case 'borrador': return styles.statusBorrador;
            case 'publicado': return styles.statusPublicado;
            case 'archivado': return styles.statusArchivado;
            default: return styles.statusBorrador;
        }
    };
    const getStatusIcon = (estado) => {
        switch (estado) {
            case 'borrador': return 'pi pi-pencil';
            case 'publicado': return 'pi pi-check';
            case 'archivado': return 'pi pi-archive';
            default: return 'pi pi-pencil';
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gestión de Noticias</h1>
            <p className={styles.subtitle}>
                Cree y administre las noticias del sistema de inclusión educativa
            </p>
            <Divider className={styles.divider} />
            <div className={styles.contentGrid}>
                {/* Formulario de Noticias */}
                <div className={styles.formContainer}>
                    <div className={styles.formContent}>
                        <h2 style={{ color: 'var(--green-primary)', marginBottom: '1.5rem' }}>
                            Crear Nueva Noticia
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                {/* Título */}
                                <div className={`${styles.formField} ${styles.fullWidth}`}>
                                    <label className={`${styles.label} ${styles.labelRequired}`}>Título</label>
                                    <InputText
                                        value={formData.titulo}
                                        onChange={(e) => handleInputChange('titulo', e.target.value)}
                                        placeholder="Ingrese el título de la noticia"
                                        className={errors.titulo ? 'p-invalid' : ''}
                                    />
                                    {errors.titulo && (
                                        <Message severity="error" text={errors.titulo} style={{
                                            marginTop: '0.5rem'
                                        }} />
                                    )}
                                </div>
                                {/* Subtítulo */}
                                <div className={`${styles.formField} ${styles.fullWidth}`}>
                                    <label className={`${styles.label}
${styles.labelRequired}`}>Subtítulo</label>
                                    <InputText
                                        value={formData.subtitulo}
                                        onChange={(e) => handleInputChange('subtitulo', e.target.value)}
                                        placeholder="Ingrese un subtítulo descriptivo"
                                        className={errors.subtitulo ? 'p-invalid' : ''}
                                    />
                                    {errors.subtitulo && (
                                        <Message severity="error" text={errors.subtitulo} style={{
                                            marginTop:
                                                '0.5rem'
                                        }} />
                                    )}
                                </div>
                                {/* Lead */}
                                <div className={`${styles.formField} ${styles.fullWidth}`}>
                                    <label className={`${styles.label} ${styles.labelRequired}`}>Lead o
                                        Resumen</label>
                                    <InputTextarea
                                        value={formData.lead}
                                        onChange={(e) => handleInputChange('lead', e.target.value)}
                                        placeholder="Escriba un resumen breve de la noticia..."
                                        rows={3}
                                        className={errors.lead ? 'p-invalid' : ''}
                                    />
                                    {errors.lead && (
                                        <Message severity="error" text={errors.lead} style={{ marginTop: '0.5rem' }}
                                        />
                                    )}
                                </div>
                                {/* Categoría y Ubicación */}
                                <div className={styles.formField}>
                                    <label className={`${styles.label}
${styles.labelRequired}`}>Categoría</label>
                                    <Dropdown
                                        value={formData.categoria}
                                        onChange={(e) => handleInputChange('categoria', e.value)}
                                        options={categorias}
                                        placeholder="Seleccione categoría"
                                        className={errors.categoria ? 'p-invalid' : ''}
                                    />
                                    {errors.categoria && (
                                        <Message severity="error" text={errors.categoria} style={{
                                            marginTop:
                                                '0.5rem'
                                        }} />
                                    )}
                                </div>
                                <div className={styles.formField}>
                                    <label className={`${styles.label}
${styles.labelRequired}`}>Ubicación</label>
                                    <Dropdown
                                        value={formData.ubicacion}
                                        onChange={(e) => handleInputChange('ubicacion', e.value)}
                                        options={ubicaciones}
                                        placeholder="Seleccione ubicación"
                                        className={errors.ubicacion ? 'p-invalid' : ''}
                                    />
                                    {errors.ubicacion && (
                                        <Message severity="error" text={errors.ubicacion} style={{
                                            marginTop:
                                                '0.5rem'
                                        }} />
                                    )}
                                </div>
                                {/* Estado y Fecha de Publicación */}
                                <div className={styles.formField}>
                                    <label className={`${styles.label} ${styles.labelRequired}`}>Estado</label>
                                    <Dropdown
                                        value={formData.estado}
                                        onChange={(e) => handleInputChange('estado', e.value)}
                                        options={estados}
                                        className={errors.estado ? 'p-invalid' : ''}
                                    />
                                    {errors.estado && (
                                        <Message severity="error" text={errors.estado} style={{
                                            marginTop: '0.5rem'
                                        }} />
                                    )}
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Fecha de Publicación</label>
                                    <Calendar
                                        value={formData.fecha_publicacion}
                                        onChange={(e) => handleInputChange('fecha_publicacion', e.value)}
                                        showIcon
                                        dateFormat="dd/mm/yy"
                                        placeholder="Seleccione fecha"
                                    />
                                </div>
                                {/* Sección Multimedia */}
                                <div className={`${styles.formField} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Multimedia (Fotos y Videos)</label>
                                    <div
                                        className={styles.mediaUpload}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <i className="pi pi-cloud-upload"></i>
                                        <div className={styles.mediaUploadText}>
                                            Haga clic para subir fotos o videos
                                        </div>
                                        <div className={styles.mediaUploadSubtext}>
                                            Formatos soportados: JPG, PNG, GIF, MP4, AVI (Máx. 50MB por archivo)
                                        </div>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className={styles.fileInput}
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleFileSelect}
                                    />
                                    {isUploading && (
                                        <div className={styles.uploadProgress}>
                                            <ProgressBar value={uploadProgress} style={{ height: '6px' }} />
                                            <small style={{ color: 'var(--text)', opacity: 0.7 }}>
                                                Subiendo archivos... {Math.round(uploadProgress)}%
                                            </small>
                                        </div>
                                    )}
                                    {mediaFiles.length > 0 && (
                                        <div className={styles.mediaPreview}>
                                            <h4 style={{ color: 'var(--text)', marginBottom: '1rem' }}>
                                                Archivos subidos ({mediaFiles.length})
                                            </h4>
                                            <div className={styles.mediaGrid}>
                                                {mediaFiles.map((media) => (
                                                    <div key={media.id} className={styles.mediaGridItem}>
                                                        {media.type === 'image' ? (
                                                            <img
                                                                src={media.url}
                                                                alt={media.name}
                                                                className={styles.mediaGridImage}
                                                            />
                                                        ) : (
                                                            <div className={styles.mediaGridVideo}>
                                                                <i className="pi pi-video" style={{ fontSize: '2rem' }}></i>
                                                            </div>
                                                        )}
                                                        <div className={styles.mediaGridOverlay}>
                                                            <Button
                                                                icon="pi pi-trash"
                                                                className={styles.mediaGridRemove}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeMediaFile(media.id);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className={styles.mediaTypeBadge}>
                                                            {media.type === 'image' ? 'IMG' : 'VID'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Cuerpo de la Noticia */}
                                <div className={`${styles.formField} ${styles.fullWidth}`}>
                                    <label className={`${styles.label} ${styles.labelRequired}`}>Cuerpo de la
                                        Noticia</label>
                                    <InputTextarea
                                        value={formData.cuerpo}
                                        onChange={(e) => handleInputChange('cuerpo', e.target.value)}
                                        placeholder="Escriba el contenido completo de la noticia..."
                                        rows={8}
                                        className={`${styles.textareaField} ${errors.cuerpo ? 'p-invalid' : ''}`}
                                    />
                                    {errors.cuerpo && (
                                        <Message severity="error" text={errors.cuerpo} style={{
                                            marginTop: '0.5rem'
                                        }} />
                                    )}
                                    <small style={{ color: 'var(--text)', opacity: 0.7 }}>
                                        {formData.cuerpo.length} caracteres (mínimo 50 requeridos)
                                    </small>
                                </div>
                            </div>
                            {/* Botones de acción */}
                            <div className={styles.buttonGroup}>
                                <Button
                                    type="button"
                                    label="Cancelar"
                                    icon="pi pi-times"
                                    className={styles.cancelButton}
                                    onClick={handleCancel}
                                />
                                <Button
                                    type="submit"
                                    label="Guardar Noticia"
                                    icon="pi pi-save"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                {/* Vista Previa */}
                <div className={styles.previewContainer}>
                    <div className={styles.previewContent}>
                        <h2 className={styles.previewTitle}>Vista Previa</h2>
                        {formData.titulo ? (
                            <div className={styles.noticiaPreview}>
                                <div className={styles.noticiaTitulo}>{formData.titulo}</div>
                                <div className={styles.noticiaSubtitulo}>{formData.subtitulo}</div>
                                <div className={styles.noticiaMetadata}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <span className={styles.noticiaCategoria}>
                                            {categorias.find(cat => cat.value === formData.categoria)?.label || 'Sincategoría'}
                                        </span>
                                        <span className={`${styles.statusBadge}
${getStatusBadgeClass(formData.estado)}`}>
                                            <i className={getStatusIcon(formData.estado)}></i>
                                            {estados.find(est => est.value === formData.estado)?.label || 'Borrador'}
                                        </span>
                                    </div>
                                    <div>
                                        {formData.fecha_publicacion ?
                                            new Date(formData.fecha_publicacion).toLocaleDateString('es-ES') :
                                            'Fecha no definida'
                                        }
                                    </div>
                                </div>
                                <div className={styles.noticiaUbicacion}>
                                    <i className="pi pi-map-marker"></i>
                                    <span>{ubicaciones.find(ubic => ubic.value === formData.ubicacion)?.label ||
                                        'Sin ubicación'}</span>
                                </div>
                                {/* Mostrar multimedia en la vista previa */}
                                {mediaFiles.length > 0 && (
                                    <div className={styles.mediaSection}>
                                        {mediaFiles.map((media, index) => (
                                            <div key={media.id}>
                                                {media.type === 'image' ? (
                                                    <img
                                                        src={media.url}
                                                        alt={`Imagen ${index + 1} de la noticia`}
                                                        className={styles.noticiaImagen}
                                                    />
                                                ) : (
                                                    <video
                                                        controls
                                                        className={styles.noticiaVideo}
                                                    >
                                                        <source src={media.url} type={media.type} />
                                                        Tu navegador no soporta el elemento de video.
                                                    </video>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className={styles.noticiaLead}>
                                    {formData.lead}
                                </div>
                                <div className={styles.noticiaCuerpo}>
                                    {formData.cuerpo}
                                </div>
                                <div className={styles.noticiaMetadata}>
                                    <div>Fecha de creación: {new Date().toLocaleDateString('es-ES')}</div>
                                    <div>Última actualización: {new Date().toLocaleDateString('es-ES')}</div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.previewPlaceholder}>
                                <i className="pi pi-eye-slash"></i>
                                <p>Complete el formulario para ver la vista previa de la noticia</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
