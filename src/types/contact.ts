interface Contact {
  id: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  status: "Pendiente" | "En progreso" | "Auspiciado" | "Sin interes";
}

export type { Contact };
