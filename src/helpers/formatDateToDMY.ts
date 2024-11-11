import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDateToDMY = (date: string) => {
  const parsedDate = new Date(date);
  return format(parsedDate, "dd/MM/yyyy", { locale: es });
};
