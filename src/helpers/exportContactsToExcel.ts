import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Contact } from "../types/contact";

// Función para exportar datos a Excel específicamente para Contact
export const exportContactsToExcel = (data: Contact[], fileName: string) => {
  // Transforma los datos de la interfaz Contact para exportación
  const transformedData = data.map((contact) => ({
    ID: contact.id,
    Nombre: contact.name,
    Descripción: contact.description || "", // Muestra cadena vacía si es opcional
    Categoría: contact.category,
    Teléfono: contact.phone || "", // Muestra cadena vacía si es opcional
    Estado: contact.status,
  }));

  // Crea un libro de trabajo (workbook) y una hoja de trabajo (worksheet)
  const worksheet = XLSX.utils.json_to_sheet(transformedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contactos");

  // Escribe el archivo de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Guarda el archivo usando FileSaver
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(dataBlob, `${fileName}.xlsx`);
};
