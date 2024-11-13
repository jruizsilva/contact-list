interface Contact {
  id: string;
  name: string;
  category: ContactCategory;
  status: ContactStatus;
  birthday: Date | null;
  country_code: string;
  phone: string;
  description: string;
  created_at: Date;
}

interface ContactString {
  id: string;
  name: string;
  category: ContactCategory;
  status: ContactStatus;
  birthday: string | null;
  country_code: string;
  phone: string;
  description: string;
  created_at: string;
}

type ContactCategory =
  | "Familia 👨‍👩‍👧"
  | "Amigos 🤝"
  | "Recreaciones 🏃‍♂️"
  | "Compras 🛒"
  | "Trabajo 💼"
  | "Estudio 📚"
  | "Inquilino 🏠";

type ContactStatus =
  | "Pendiente ⚠️"
  | "En progreso 📆"
  | "Auspiciado ✔️"
  | "Sin interes ❌";

export const contactCategories = [
  "Familia 👨‍👩‍👧",
  "Amigos 🤝",
  "Recreaciones 🏃‍♂️",
  "Compras 🛒",
  "Trabajo 💼",
  "Estudio 📚",
  "Inquilino 🏠",
];

export const contactStatus = [
  "Pendiente ⚠️",
  "En progreso 📆",
  "Auspiciado ✔️",
  "Sin interes ❌",
];

export type { Contact, ContactCategory, ContactString, ContactStatus };
