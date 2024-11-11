import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: es });
};
