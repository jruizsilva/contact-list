import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Función para exportar datos a Excel
export const exportToExcel = (data: object[], fileName: string) => {
  // Crea un libro de trabajo (workbook) y una hoja de trabajo (worksheet)
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Escribe el archivo de Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Guarda el archivo usando FileSaver
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(dataBlob, `${fileName}.xlsx`);
};
