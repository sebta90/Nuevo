export function formatDateToDDMMYYYY(isoDateString) {
  const date = new Date(isoDateString);
  
  const day = String(date.getDate()).padStart(2, '0');       // Día (2 dígitos)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (2 dígitos)
  const year = date.getFullYear();                           // Año (4 dígitos)

  return `${day}/${month}/${year}`; // Formato dd/mm/yyyy
}
