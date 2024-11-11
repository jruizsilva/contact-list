import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Contact, ContactString } from "../types/contact";

// Función para exportar datos a Excel específicamente para Contact
export const exportContactsToExcel = (data: Contact[], fileName: string) => {
  // Transforma los datos de la interfaz Contact para exportación
  const transformedData: ContactString[] = data.map((contact) => ({
    id: contact.id,
    name: contact.name,
    category: contact.category,
    status: contact.status,
    birthday: contact.birthday !== null ? `${contact.birthday}` : null,
    country_code: contact.country_code,
    phone: contact.phone,
    description: contact.description,
    created_at: `${contact.created_at}`,
  }));

  // Crea un libro de trabajo (workbook) y una hoja de trabajo (worksheet)
  const worksheet = XLSX.utils.json_to_sheet(transformedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

  // Escribe el archivo de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Guarda el archivo usando FileSaver
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(dataBlob, `${fileName}.xlsx`);
};
