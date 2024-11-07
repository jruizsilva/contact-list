import { create } from "zustand";
import { Contact } from "../types/contact";
import { persist } from "zustand/middleware";

interface Store {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (contact: Contact) => void;
}

export const useAppStore = create<Store, [["zustand/persist", Store]]>(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact: Contact) =>
        set((state) => ({ contacts: [...state.contacts, contact] })),
      updateContact: (contact: Contact) =>
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === contact.id ? contact : c
          ),
        })),
      deleteContact: (contact: Contact) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== contact.id),
        })),
    }),
    {
      name: "contact-store",
    }
  )
);
