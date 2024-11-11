interface Contact {
  id: string;
  name: string;
  description: string;
  category: ContactCategory;
  country_code: string;
  phone: string;
  status: ContactStatus;
}

type ContactCategory =
  | "Familia 👨‍👩‍👧"
  | "Amigos 🤝"
  | "Recreaciones 🏃‍♂️"
  | "Compras 🛒"
  | "Trabajo 💼"
  | "Estudio 📚";

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
];

export const contactStatus = [
  "Pendiente ⚠️",
  "En progreso 📆",
  "Auspiciado ✔️",
  "Sin interes ❌",
];

export type { Contact, ContactCategory, ContactStatus };
