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
  addCustomer: (customer: Omit<Customer, "id" | "created_at">) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (customer: Customer) => void;
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
      addCustomer: (customer: Omit<Customer, "id" | "created_at">) =>
        set((state) => ({
          customers: [
            ...state.customers,
            {
              id: `${state.customers.length + 1}`,
              name: capitalizeWords(customer.name),
              last_follow_up: customer.last_follow_up,
              purchased_products: customer.purchased_products,
              interests: customer.interests,
              phone: customer.phone,
              birthday: customer.birthday,
              created_at: new Date(),
            },
          ],
        })),
      updateCustomer: (customer: Customer) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === customer.id ? customer : c
          ),
        })),
      deleteCustomer: (customer: Customer) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== customer.id),
        })),
    }),
    {
      name: "contact-store",
    }
  )
);
