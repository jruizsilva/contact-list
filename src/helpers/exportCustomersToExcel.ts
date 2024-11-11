import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Customer } from "../types/customer";

// Función para exportar datos a Excel
export const exportCustomersToExcel = (data: Customer[], fileName: string) => {
  // Transforma los datos para que los campos purchased_products e interests se muestren como cadenas
  const transformedData = data.map((item) => ({
    ...item,
    purchased_products: item.purchased_products.join(", "), // Convierte el array a una cadena separada por comas
    interests: item.interests.join(", "), // Convierte el array a una cadena separada por comas
  }));

  // Crea un libro de trabajo (workbook) y una hoja de trabajo (worksheet)
  const worksheet = XLSX.utils.json_to_sheet(transformedData);
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
