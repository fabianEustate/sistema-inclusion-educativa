// validar.model.js

/**
 * Validación para nombres y apellidos (solo letras, espacios y ñ/Ñ)
 */
export const validarNombreApellido = (value) => {
  const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
  return regex.test(value) && value.length <= 60;
};

/**
 * Validación para identificación (solo números, máximo 10)
 */
export const validarIdentificacion = (value) => {
  const regex = /^\d*$/;
  return regex.test(value) && value.length <= 10;
};

/**
 * Validación para teléfono colombiano o internacional
 */
export const validarTelefono = (value) => {
  // Permitir números, espacios y el símbolo + al inicio
  const regex = /^[\+]?[\d\s]*$/;
  if (!regex.test(value)) return false;
  
  // Máximo 15 caracteres (considerando indicativo internacional)
  if (value.length > 15) return false;
  
  // Si tiene contenido, validar que el + solo esté al inicio
  if (value.includes('+') && value.indexOf('+') !== 0) return false;
  
  return true;
};

/**
 * Detectar y autocompletar números colombianos
 */
export const procesarTelefono = (value) => {
  // Si ya tiene +57, no hacer nada
  if (value.startsWith('+57')) {
    return value;
  }

  // Si ya tiene +, asumir que es otro país
  if (value.startsWith('+')) {
    return value;
  }

  // Limpiar espacios para contar dígitos
  const soloDigitos = value.replace(/\s/g, '');

  // Si tiene exactamente 10 dígitos y empieza con 3 (celular) o 60 (fijo)
  if (soloDigitos.length === 10) {
    const primerDigito = soloDigitos[0];
    const primerosDosDígitos = soloDigitos.substring(0, 2);
    const primerosTresDígitos = soloDigitos.substring(0, 3);

    // Celulares colombianos (empiezan con 3)
    const prefijosMoviles = ['300', '301', '302', '303', '304', '305', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '350', '351'];
    
    // Fijos colombianos (empiezan con 60)
    const prefijosFijos = ['601', '602', '604', '605', '606', '607', '608'];

    if (prefijosMoviles.includes(primerosTresDígitos) || prefijosFijos.includes(primerosTresDígitos)) {
      // Formatear: +57 XXX XXX XXXX
      return `+57 ${soloDigitos}`;
    }
  }

  return value;
};

/**
 * Validación para campos alfabéticos
 */
export const validarAlfabetico = (value) => {
  const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
  return regex.test(value);
};

/**
 * Valida el formulario completo
 */
export const validateForm = (formData) => {
  const newErrors = {};
  
  // Validar campos obligatorios
  if (!formData.nombres.trim()) newErrors.nombres = 'Campo obligatorio';
  if (!formData.primer_apellido.trim()) newErrors.primer_apellido = 'Campo obligatorio';
  if (!formData.fecha_nacimiento) newErrors.fecha_nacimiento = 'Campo obligatorio';
  if (!formData.tipo_documento) newErrors.tipo_documento = 'Campo obligatorio';
  if (!formData.identificacion.trim()) newErrors.identificacion = 'Campo obligatorio';
  if (!formData.nombre_facultad) newErrors.nombre_facultad = 'Campo obligatorio';
  if (!formData.programa) newErrors.programa = 'Campo obligatorio';
  if (!formData.id_direccion.trim()) newErrors.id_direccion = 'Campo obligatorio';
  if (!formData.con_quien_vive.trim()) newErrors.con_quien_vive = 'Campo obligatorio';
  if (!formData.telefono.trim()) newErrors.telefono = 'Campo obligatorio';
  if (!formData.nombre_discapacidad || !formData.nombre_discapacidad.trim()) {
    newErrors.nombre_discapacidad = 'Campo obligatorio';
  }
  // Validar otra_discapacidad solo si nombre_discapacidad es "Otra"
  if (formData.nombre_discapacidad === 'Otra' && !formData.otra_discapacidad.trim()) {
    newErrors.otra_discapacidad = 'Campo obligatorio';
  }
  if (!formData.estado_civil) newErrors.estado_civil = 'Campo obligatorio';
  if (!formData.nombre_persona_a_cargo.trim()) newErrors.nombre_persona_a_cargo = 'Campo obligatorio';
  if (!formData.epsIps.trim()) newErrors.epsIps = 'Campo obligatorio';
  if (!formData.causaDiscapacidad.trim()) newErrors.causaDiscapacidad = 'Campo obligatorio';
  if (!formData.antecedentesPersonales.trim()) newErrors.antecedentesPersonales = 'Campo obligatorio';

  // Validar longitudes mínimas
  if (formData.identificacion && formData.identificacion.length < 6) {
    newErrors.identificacion = 'La identificación debe tener al menos 6 dígitos';
  }
  if (formData.telefono) {
    // Contar solo los dígitos (sin espacios ni +)
    const soloDigitos = formData.telefono.replace(/[\s\+]/g, '');
    if (soloDigitos.length < 7) {
      newErrors.telefono = 'El teléfono debe tener al menos 7 dígitos';
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors
  };
};

/**
 * Valida un campo individual según su tipo
 */
export const validateField = (field, value, errors) => {
  let isValid = true;
  let newErrors = { ...errors };

  switch (field) {
    case 'nombres':
    case 'primer_apellido':
    case 'segundo_apellido':
      if (!validarNombreApellido(value)) {
        isValid = false;
        newErrors[field] = 'Solo se permiten digitar letras(máximo 60 caracteres)';
      } else {
        delete newErrors[field];
      }
      break;
    
    case 'identificacion':
      if (!validarIdentificacion(value)) {
        isValid = false;
        newErrors[field] = 'Solo digite números (máximo 10 dígitos)';
      } else {
        delete newErrors[field];
      }
      break;
    
    case 'telefono':
      if (!validarTelefono(value)) {
        isValid = false;
        newErrors[field] = 'Formato inválido. Use solo números y opcionalmente + al inicio';
      } else {
        delete newErrors[field];
      }
      break;
    
    case 'con_quien_vive':
    case 'nombre_persona_a_cargo':
    case 'epsIps':
    case 'nombrePadre':
    case 'nombreMadre':
    case 'otra_discapacidad':
      if (!validarAlfabetico(value)) {
        isValid = false;
        newErrors[field] = 'Solo se permiten digitar letras';
      } else {
        delete newErrors[field];
      }
      break;
    
    default:
      delete newErrors[field];
  }

  return {
    isValid,
    errors: newErrors
  };
};