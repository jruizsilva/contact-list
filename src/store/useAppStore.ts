import { create } from "zustand";
import { Contact } from "../types/contact";
import { persist } from "zustand/middleware";
import uuid4 from "uuid4";

interface Store {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Omit<Contact, "id">) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (contact: Contact) => void;
}

export const useAppStore = create<Store, [["zustand/persist", Store]]>(
  persist(
    (set) => ({
      contacts: [],
      setContacts: (contacts: Contact[]) => set({ contacts }),
      addContact: (contact: Omit<Contact, "id">) =>
        set((state) => ({
          contacts: [...state.contacts, { ...contact, id: uuid4() }],
        })),
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
