/**
 * Componente utilitario para formatear fechas en español
 * Formato: "DD de MMMM del YYYY"
 * Ejemplo: "15 de octubre del 2024"
 */

export const formatearFecha = (fecha) => {
  if (!fecha) return '';

  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  return `${dia} de ${mes} del ${año}`;
};

export const parsearFechaFormateada = (textoFecha) => {
  // Esta función puede ser útil si necesitas convertir el texto de vuelta a Date
  if (!textoFecha) return null;

  const meses = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };

  // Parsear formato "DD de MMMM del YYYY"
  const regex = /(\d+) de (\w+) del (\d+)/;
  const match = textoFecha.match(regex);

  if (match) {
    const dia = parseInt(match[1]);
    const mes = meses[match[2].toLowerCase()];
    const año = parseInt(match[3]);

    return new Date(año, mes, dia);
  }

  return null;
};