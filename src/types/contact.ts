interface Contact {
  id: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  category: ContactCategory;
  status: ContactStatus;
}

type ContactCategory =
  | "Familia"
  | "Amigos"
  | "Recreaciones"
  | "Compras"
  | "Trabajo"
  | "Estudio";

type ContactStatus = "Pendiente" | "En progreso" | "Auspiciado" | "Sin interes";

export type { Contact };
