interface Contact {
  id: string;
  name: string;
  category: ContactCategory;
  status: ContactStatus;
  birthday: Date | null;
  country_code: string;
  phone: string;
  description: string;
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
}

type ContactCategory =
  | "Familia 👨‍👩‍👧"
  | "Amigos 🤝"
  | "Conocido 🙍‍♂️"
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
  "Conocido 🙍‍♂️",
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
