import { create } from "zustand";
import { Contact } from "../types/contact";

const initialContactList: Contact[] = [
  {
    id: "1",
    name: "Jonathan",
    description: "C",
    status: "Pendiente",
  },
];

interface Store {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (contact: Contact) => void;
}

export const useAppStore = create<Store>((set) => ({
  contacts: initialContactList,
  addContact: (contact: Contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  updateContact: (contact: Contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) => (c.id === contact.id ? contact : c)),
    })),
  deleteContact: (contact: Contact) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id),
    })),
}));
