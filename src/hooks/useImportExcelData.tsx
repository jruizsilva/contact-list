import { useState } from "react";
import { Contact } from "../types/contact";
import * as XLSX from "xlsx";

export const useImportExcelData = () => {
  const [data, setData] = useState<null | Contact[]>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData as Contact[]);
    };

    if (!file) return;
    reader.readAsArrayBuffer(file);
  };

  return { data, handleFileUpload };
};
