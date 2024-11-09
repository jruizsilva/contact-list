import { create } from "zustand";
import { Contact } from "../types/contact";
import { persist } from "zustand/middleware";
import { capitalizeWords } from "../helpers/capitalizeWords";
import { Customer } from "../types/customer";

interface Store {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Omit<Contact, "id">) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (contact: Contact) => void;
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  addCustomers: (customer: Omit<Customer, "id">) => void;
  updateCustomers: (customer: Customer) => void;
  deleteCustomers: (customer: Customer) => void;
}

export const useAppStore = create<Store, [["zustand/persist", Store]]>(
  persist(
    (set) => ({
      contacts: [],
      setContacts: (contacts: Contact[]) => set({ contacts }),
      addContact: (contact: Omit<Contact, "id">) =>
        set((state) => ({
          contacts: [
            ...state.contacts,
            {
              id: `${state.contacts.length + 1}`,
              name: capitalizeWords(contact.name),
              category: contact.category,
              status: contact.status,
              phone: contact.phone,
              description: contact.description,
            },
          ],
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
      customers: [],
      setCustomers: (customers: Customer[]) => set({ customers }),
      addCustomers: (customer: Omit<Customer, "id">) =>
        set((state) => ({
          customers: [
            ...state.customers,
            {
              id: `${state.customers.length + 1}`,
              name: capitalizeWords(customer.name),
              last_follow_up: customer.last_follow_up,
              purchased_products: customer.purchased_products,
              interests: customer.interests,
              created_at: customer.created_at,
            },
          ],
        })),
      updateCustomers: (customer: Customer) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === customer.id ? customer : c
          ),
        })),
      deleteCustomers: (customer: Customer) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== customer.id),
        })),
    }),
    {
      name: "contact-store",
    }
  )
);
