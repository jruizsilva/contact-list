import { parseISO, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (date: string) => {
  const parsedDate = parseISO(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: es });
};
