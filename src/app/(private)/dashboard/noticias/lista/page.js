'use client';
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from './lista.module.css';
// Constantes globales basadas en el diccionario de datos
const GLOBAL_CONSTANTS = {
  // Categorías según tabla NOTICIAS
  CATEGORIAS_NOTICIAS: [
    { label: 'Todas las categorías', value: '' },
    { label: 'Académica', value: 'academica' },
    { label: 'Cultural', value: 'cultural' },
    { label: 'Institucional', value: 'institucional' },
    { label: 'Inclusiva', value: 'inclusiva' },
    { label: 'Investigación', value: 'investigacion' },
    { label: 'Extensión', value: 'extension' },
    { label: 'Bienestar Universitario', value: 'bienestar' },
    { label: 'Eventos', value: 'eventos' },
    { label: 'Convocatorias', value: 'convocatorias' }
  ],
  // Estados según tabla NOTICIAS
  ESTADOS_NOTICIA: [
    { label: 'Todos los estados', value: '' },
    { label: 'Borrador', value: 'borrador' },
    { label: 'Publicada', value: 'publicada' }
  ],
  // Ubicaciones según tabla NOTICIAS
  UBICACIONES: [
    { label: 'Todas las sedes', value: '' },
    { label: 'Campus Sabanas', value: 'sabanas' },
    { label: 'Campus Hurtado', value: 'hurtado' },
    { label: 'Sede Aguachica', value: 'aguachica' },
    { label: 'Sede Bellas Artes', value: 'bellas-artes' }
  ]
};
export default function ListaNoticiasPage() {
  const [noticias, setNoticias] = useState([]);
  const [noticiasFiltradas, setNoticiasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState('grid');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  // Cargar noticias desde localStorage
  useEffect(() => {
    cargarNoticias();
  }, []);
  const cargarNoticias = () => {
    try {
      setLoading(true);
      const noticiasGuardadas = JSON.parse(localStorage.getItem('noticias')) || [];
      console.log('Noticias cargadas:', noticiasGuardadas); // Debug
      // Mapear datos a estructura consistente
      const noticiasMapeadas = noticiasGuardadas.map(noticia => ({
        // Campos principales usando nombres consistentes
        id: noticia.id_noticia || noticia.id,
        titulo: noticia.titulo_noticia || noticia.titulo,
        subtitulo: noticia.subtitulo_noticia || noticia.subtitulo,
        lead: noticia.lead_noticia || noticia.lead,
        cuerpo: noticia.cuerpo_noticia || noticia.cuerpo,
        categoria: noticia.categoria_noticia || noticia.categoria,
        ubicacion: noticia.ubicacion_noticia || noticia.ubicacion,
        estado: noticia.estado_noticia || noticia.estado,
        fecha_publicacion: noticia.fecha_publicacion,
        fecha_registro: noticia.fecha_registro,
        activo: noticia.activo_noticia !== undefined ? noticia.activo_noticia : true,
        autor: noticia.autor || 'Administrador',
        id_usuario: noticia.id_usuario || 1
      }));
      // Ordenar por fecha de registro (más recientes primero)
      const noticiasOrdenadas = noticiasMapeadas.sort((a, b) =>
        new Date(b.fecha_registro) - new Date(a.fecha_registro)
      );
      setNoticias(noticiasOrdenadas);
      setNoticiasFiltradas(noticiasOrdenadas);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
      setNoticias([]);
      setNoticiasFiltradas([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    filtrarNoticias();
  }, [filtroCategoria, filtroEstado, busqueda, noticias]);
  const filtrarNoticias = () => {
    let filtered = [...noticias];
    // Filtrar por categoría (solo si hay un valor seleccionado y no es vacío)
    if (filtroCategoria) {
      filtered = filtered.filter(noticia => noticia.categoria === filtroCategoria);
    }
    // Filtrar por estado (solo si hay un valor seleccionado y no es vacío)
    if (filtroEstado) {
      filtered = filtered.filter(noticia => noticia.estado === filtroEstado);
    }
    // Filtrar por búsqueda
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      filtered = filtered.filter(noticia =>
        noticia.titulo?.toLowerCase().includes(searchLower) ||
        noticia.subtitulo?.toLowerCase().includes(searchLower) ||
        noticia.lead?.toLowerCase().includes(searchLower) ||
        (noticia.cuerpo && noticia.cuerpo.toLowerCase().includes(searchLower))
      );
    }
    setNoticiasFiltradas(filtered);
  };
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'publicada':
        return <Badge value="Publicada" severity="success" className={styles.badge}
        />;
      case 'borrador':
        return <Badge value="Borrador" severity="warning" className={styles.badge}
        />;
      case 'archivada':
        return <Badge value="Archivada" severity="secondary"
          className={styles.badge} />;
      default:
        return <Badge value={estado} severity="info" className={styles.badge} />;
    }
  };
  const getCategoriaBadge = (categoria) => {
    const categoriaObj = GLOBAL_CONSTANTS.CATEGORIAS_NOTICIAS.find(cat=> cat.value === categoria);
    return <Badge value={categoriaObj?.label || categoria} severity="info"
      className={styles.categoriaBadge} />;
  };
  const formatFecha = (fecha) => {
    if (!fecha) return 'Fecha no definida';
    try {
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  };
  const verNoticiaCompleta = (noticia) => {
    setNoticiaSeleccionada(noticia);
    setDialogVisible(true);
  };
  const eliminarNoticia = (id) => {
    if (confirm('¿Está seguro de que desea eliminar esta noticia?')) {
      try {
        const noticiasActualizadas = noticias.filter(noticia => noticia.id !== id);
        // Actualizar localStorage con la estructura correcta
        const noticiasParaGuardar = noticiasActualizadas.map(noticia => ({
          id_noticia: noticia.id,
          titulo_noticia: noticia.titulo,
          subtitulo_noticia: noticia.subtitulo,
          lead_noticia: noticia.lead,
          cuerpo_noticia: noticia.cuerpo,
          categoria_noticia: noticia.categoria,
          ubicacion_noticia: noticia.ubicacion,
          estado_noticia: noticia.estado,
          fecha_publicacion: noticia.fecha_publicacion,
          fecha_registro: noticia.fecha_registro,
          activo_noticia: noticia.activo,
          id_usuario: noticia.id_usuario
        }));
        localStorage.setItem('noticias', JSON.stringify(noticiasParaGuardar));
        setNoticias(noticiasActualizadas);
        alert('Noticia eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar noticia:', error);
        alert('Error al eliminar la noticia');
      }
    }
  };
  // Función helper para obtener etiqueta de ubicación
  const getUbicacionLabel = (valor) => {
    const ubicacion = GLOBAL_CONSTANTS.UBICACIONES.find(ubic => ubic.value
      === valor);
    return ubicacion ? ubicacion.label : 'Sin ubicación';
  };
  const gridItem = (noticia) => {
    return (
      <div className="col-12 md:col-6 lg:col-4">
        <Card className={styles.noticiaCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.noticiaTitulo}>{noticia.titulo || 'Sin título'}</h3>
            {getEstadoBadge(noticia.estado)}
          </div>
          <div className={styles.cardContent}>
            <p className={styles.noticiaSubtitulo}>{noticia.subtitulo || 'Sinsubtítulo'}</p>
            <p className={styles.noticiaLead}>{noticia.lead || 'Sin resumen'}</p>
            <div className={styles.noticiaMetadata}>
              <div className={styles.metadataItem}>
                <i className="pi pi-calendar"></i>
                <span>{formatFecha(noticia.fecha_publicacion)}</span>
              </div>
              <div className={styles.metadataItem}>
                <i className="pi pi-map-marker"></i>
                <span>{getUbicacionLabel(noticia.ubicacion)}</span>
              </div>
            </div>
            <div className={styles.noticiaCategorias}>
              {getCategoriaBadge(noticia.categoria)}
            </div>
          </div>
          <div className={styles.cardActions}>
            <Button
              label="Ver Detalles"
              icon="pi pi-eye"
              className={styles.detalleButton}
              onClick={() => verNoticiaCompleta(noticia)}
            />
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              className={styles.eliminarButton}
              severity="danger"
              onClick={() => eliminarNoticia(noticia.id)}
            />
          </div>
        </Card>
      </div>
    );
  };
  const listItem = (noticia) => {
    return (
      <div className="col-12">
        <Card className={styles.noticiaCardList}>
          <div className={styles.listContent}>
            <div className={styles.listMain}>
              <div className={styles.listHeader}>
                <h3 className={styles.noticiaTitulo}>{noticia.titulo || 'Sintítulo'}</h3>
                {getEstadoBadge(noticia.estado)}
              </div>
              <p className={styles.noticiaSubtitulo}>{noticia.subtitulo || 'Sinsubtítulo'}</p>
              <p className={styles.noticiaLead}>{noticia.lead || 'Sin resumen'}</p>
            </div>
            <div className={styles.listSidebar}>
              <div className={styles.noticiaMetadata}>
                <div className={styles.metadataItem}>
                  <i className="pi pi-calendar"></i>
                  <span>{formatFecha(noticia.fecha_publicacion)}</span>
                </div>
                <div className={styles.metadataItem}>
                  <i className="pi pi-map-marker"></i>
                  <span>{getUbicacionLabel(noticia.ubicacion)}</span>
                </div>
                <div className={styles.noticiaCategorias}>
                  {getCategoriaBadge(noticia.categoria)}
                </div>
              </div>
              <div className={styles.listActions}>
                <Button
                  label="Ver Detalles"
                  icon="pi pi-eye"
                  className={styles.detalleButton}
                  onClick={() => verNoticiaCompleta(noticia)}
                />
                <Button
                  label="Eliminar"
                  icon="pi pi-trash"
                  className={styles.eliminarButton}
                  severity="danger"
                  onClick={() => eliminarNoticia(noticia.id)}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };
  const itemTemplate = (noticia, layout) => {
    if (!noticia) return null;
    return layout === 'grid' ? gridItem(noticia) : listItem(noticia);
  };
  const header = () => {
    return (
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.resultadosTitle}>
            {noticiasFiltradas.length} Noticia{noticiasFiltradas.length !== 1 ? 's' : ''}
            Encontrada{noticiasFiltradas.length !== 1 ? 's' : ''}
          </h2>
        </div>
        <div className={styles.headerRight}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ProgressSpinner
          style={{ width: '50px', height: '50px' }}
          strokeWidth="4"
          animationDuration=".5s"
        />
        <p>Cargando noticias...</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Noticias</h1>
      <p className={styles.subtitle}>
        Administre y visualice todas las noticias del sistema de inclusión educativa
      </p>
      <Divider className={styles.divider} />
      {/* Filtros y Búsqueda */}
      <Card className={styles.filtrosCard}>
        <div className={styles.filtrosContent}>
          <h3 className={styles.filtrosTitle}>Filtros y Búsqueda</h3>
          <div className={styles.filtrosGrid}>
            <div className={styles.filtroGroup}>
              <label className={styles.filtroLabel}>Buscar</label>
              <InputText
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar en títulos, contenido..."
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filtroGroup}>
              <label className={styles.filtroLabel}>Categoría</label>
              <Dropdown
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.value)}
                options={GLOBAL_CONSTANTS.CATEGORIAS_NOTICIAS}
                placeholder="Todas las categorías"
                className={styles.filtroDropdown}
              />
            </div>
            <div className={styles.filtroGroup}>
              <label className={styles.filtroLabel}>Estado</label>
              <Dropdown
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.value)}
                options={GLOBAL_CONSTANTS.ESTADOS_NOTICIA}
                placeholder="Todos los estados"
                className={styles.filtroDropdown}
              />
            </div>
            <div className={styles.filtroGroup}>
              <Button
                label="Limpiar Filtros"
                icon="pi pi-refresh"
                className={styles.limpiarButton}
                onClick={() => {
                  setFiltroCategoria('');
                  setFiltroEstado('');
                  setBusqueda('');
                }}
              />
            </div>
          </div>
        </div>
      </Card>
      {/* Lista de Noticias */}
      <Card>
        {noticiasFiltradas.length === 0 && noticias.length > 0 ? (
          <div className={styles.emptyState}>
            <i className="pi pi-search" style={{ fontSize: '3rem', color: '#ddd' }}></i>
            <h3>No se encontraron noticias</h3>
            <p>No hay noticias que coincidan con los filtros aplicados.</p>
            <Button
              label="Limpiar filtros"
              icon="pi pi-refresh"
              className={styles.limpiarButton}
              onClick={() => {
                setFiltroCategoria('');
                setFiltroEstado('');
                setBusqueda('');
              }}
              style={{ marginTop: '1rem' }}
            />
          </div>
        ) : noticias.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="pi pi-inbox" style={{ fontSize: '3rem', color: '#ddd' }}></i>
            <h3>No hay noticias creadas</h3>
            <p>Cuando crees noticias, aparecerán aquí.</p>
          </div>
        ) : (
          <DataView
            value={noticiasFiltradas}
            layout={layout}
            itemTemplate={itemTemplate}
            header={header()}
            paginator
            rows={6}
            rowsPerPageOptions={[6, 12, 24]}
          />
        )}
      </Card>
      {/* Dialog para ver noticia completa */}
      <Dialog
        header={noticiaSeleccionada?.titulo}
        visible={dialogVisible}
        style={{ width: '50vw' }}
        onHide={() => setDialogVisible(false)}
        className={styles.detalleDialog}
      >
        {noticiaSeleccionada && (
          <div className={styles.detalleContent}>
            <div className={styles.detalleHeader}>
              <h3
                className={styles.detalleSubtitulo}>{noticiaSeleccionada.subtitulo}</h3>
              <div className={styles.detalleMetadata}>
                <div className={styles.metadataRow}>
                  {getEstadoBadge(noticiaSeleccionada.estado)}
                  {getCategoriaBadge(noticiaSeleccionada.categoria)}
                  <span className={styles.metadataItem}>
                    <i className="pi pi-map-marker"></i>
                    {getUbicacionLabel(noticiaSeleccionada.ubicacion)}
                  </span>
                </div>
                <div className={styles.fechaInfo}>
                  Publicado: {formatFecha(noticiaSeleccionada.fecha_publicacion)}
                </div>
              </div>
            </div>
            <div className={styles.detalleLead}>
              {noticiaSeleccionada.lead}
            </div>
            <div className={styles.detalleCuerpo}>
              {noticiaSeleccionada.cuerpo}
            </div>
            <div className={styles.detalleFooter}>
              <small>Autor: {noticiaSeleccionada.autor || 'Administrador'}</small>
              <small>Creado:
                {formatFecha(noticiaSeleccionada.fecha_registro)}</small>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}