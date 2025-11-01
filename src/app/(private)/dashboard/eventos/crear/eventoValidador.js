/**
 * Validadores para el formulario de eventos
 */

// Validación de campo requerido
export const validarRequerido = (valor, nombreCampo) => {
  if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
    return `El campo ${nombreCampo} es requerido`;
  }
  return null;
};

// Validación de longitud máxima
export const validarLongitudMaxima = (valor, max, nombreCampo) => {
  if (valor && valor.length > max) {
    return `${nombreCampo} no puede exceder ${max} caracteres`;
  }
  return null;
};

// Validación de número entero positivo
export const validarEnteroPositivo = (valor, nombreCampo) => {
  const numero = parseInt(valor);
  if (isNaN(numero) || numero <= 0) {
    return `${nombreCampo} debe ser un número entero positivo`;
  }
  return null;
};

// Validación de fecha
export const validarFecha = (fecha, nombreCampo) => {
  if (!fecha || !(fecha instanceof Date) || isNaN(fecha.getTime())) {
    return `${nombreCampo} debe ser una fecha válida`;
  }
  return null;
};

// Validación de fecha futura (opcional)
export const validarFechaFutura = (fecha) => {
  const ahora = new Date();
  if (fecha < ahora) {
    return 'La fecha del evento no puede ser en el pasado';
  }
  return null;
};

// Validación de tipo de asistencia
export const validarTipoAsistencia = (tipo) => {
  const tiposPermitidos = ['Presencial', 'Virtual', 'Híbrida'];
  if (!tiposPermitidos.includes(tipo)) {
    return 'Tipo de asistencia no válido';
  }
  return null;
};

// Validación de categoría
export const validarCategoria = (categoria) => {
  const categoriasPermitidas = ['Académico', 'Cultural', 'Social'];
  if (!categoriasPermitidas.includes(categoria)) {
    return 'Categoría no válida';
  }
  return null;
};

// Validación de estado
export const validarEstado = (estado) => {
  const estadosPermitidos = ['Programado', 'Realizado', 'Cancelado'];
  if (!estadosPermitidos.includes(estado)) {
    return 'Estado no válido';
  }
  return null;
};

// Validación del tema
export const validarTema = (tema) => {
  let error = validarRequerido(tema, 'Tema');
  if (error) return error;

  error = validarLongitudMaxima(tema, 150, 'Tema');
  if (error) return error;

  if (tema.trim().length < 5) {
    return 'El tema debe tener al menos 5 caracteres';
  }

  return null;
};

// Validación de la descripción
export const validarDescripcion = (descripcion) => {
  let error = validarRequerido(descripcion, 'Descripción');
  if (error) return error;

  error = validarLongitudMaxima(descripcion, 255, 'Descripción');
  if (error) return error;

  if (descripcion.trim().length < 10) {
    return 'La descripción debe tener al menos 10 caracteres';
  }

  return null;
};

// Validación del objetivo
export const validarObjetivo = (objetivo) => {
  let error = validarRequerido(objetivo, 'Objetivo');
  if (error) return error;

  if (objetivo.trim().length < 10) {
    return 'El objetivo debe tener al menos 10 caracteres';
  }

  return null;
};

// Validación completa del formulario de evento
export const validarEvento = (formData) => {
  const errors = {};

  // Validar tipo de asistencia
  const errorTipoAsistencia = 
    validarRequerido(formData.tipo_asistencia, 'Tipo de asistencia') ||
    validarTipoAsistencia(formData.tipo_asistencia);
  if (errorTipoAsistencia) errors.tipo_asistencia = errorTipoAsistencia;

  // Validar tema
  const errorTema = validarTema(formData.tema);
  if (errorTema) errors.tema = errorTema;

  // Validar objetivo
  const errorObjetivo = validarObjetivo(formData.objetivo);
  if (errorObjetivo) errors.objetivo = errorObjetivo;

  // Validar fecha
  const errorFecha = validarFecha(formData.fecha, 'Fecha');
  if (errorFecha) {
    errors.fecha = errorFecha;
  }

  // Validar descripción
  const errorDescripcion = validarDescripcion(formData.descripcion);
  if (errorDescripcion) errors.descripcion = errorDescripcion;

  // Validar categoría
  const errorCategoria = 
    validarRequerido(formData.categoria, 'Categoría') ||
    validarCategoria(formData.categoria);
  if (errorCategoria) errors.categoria = errorCategoria;

  // Validar estado
  const errorEstado = 
    validarRequerido(formData.estado, 'Estado') ||
    validarEstado(formData.estado);
  if (errorEstado) errors.estado = errorEstado;

  // Validar ID usuario
  const errorIdUsuario = 
    validarRequerido(formData.id_usuario, 'ID Usuario') ||
    validarEnteroPositivo(formData.id_usuario, 'ID Usuario');
  if (errorIdUsuario) errors.id_usuario = errorIdUsuario;

  // Validar ID dirección
  const errorIdDireccion = 
    validarRequerido(formData.id_direccion, 'ID Dirección') ||
    validarEnteroPositivo(formData.id_direccion, 'ID Dirección');
  if (errorIdDireccion) errors.id_direccion = errorIdDireccion;

  return errors;
};

// Validación individual de campo
export const validarCampo = (nombre, valor) => {
  switch (nombre) {
    case 'tipo_asistencia':
      return validarRequerido(valor, 'Tipo de asistencia') ||
             validarTipoAsistencia(valor);
    
    case 'tema':
      return validarTema(valor);
    
    case 'objetivo':
      return validarObjetivo(valor);
    
    case 'fecha':
      return validarFecha(valor, 'Fecha');
    
    case 'descripcion':
      return validarDescripcion(valor);
    
    case 'categoria':
      return validarRequerido(valor, 'Categoría') ||
             validarCategoria(valor);
    
    case 'estado':
      return validarRequerido(valor, 'Estado') ||
             validarEstado(valor);
    
    case 'id_usuario':
      return validarRequerido(valor, 'ID Usuario') ||
             validarEnteroPositivo(valor, 'ID Usuario');
    
    case 'id_direccion':
      return validarRequerido(valor, 'ID Dirección') ||
             validarEnteroPositivo(valor, 'ID Dirección');
    
    default:
      return null;
  }
};

export default {
  validarEvento,
  validarCampo,
  validarRequerido,
  validarLongitudMaxima,
  validarEnteroPositivo,
  validarFecha,
  validarFechaFutura,
  validarTipoAsistencia,
  validarCategoria,
  validarEstado,
  validarTema,
  validarDescripcion,
  validarObjetivo
};