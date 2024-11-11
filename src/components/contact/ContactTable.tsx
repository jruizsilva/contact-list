import { Group, Select, Table } from "@mantine/core";
import { useAppStore } from "../../store/useAppStore";
import ContactDelete from "./ContactDelete";
import ContactEdit from "./ContactEdit";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContactInfo from "./ContactInfo";
import { contactCategories, contactStatus } from "../../types/contact";
import ContactCreate from "./ContactCreate";
import ContactMenu from "./ContactMenu";

interface Props {}

export default function ContactTable(_props: Props): JSX.Element {
  const contacts = useAppStore((store) => store.contacts);
  const [contactList, setContactList] = useState(contacts);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const filteredContacts = contacts.filter((contact) => {
      if (category && contact.category !== category) {
        return false;
      }
      if (status && contact.status !== status) {
        return false;
      }
      return true;
    });
    setContactList(filteredContacts);
  }, [contacts, searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prevParams) => {
      value = value.trim();
      if (value === "") {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const rows = contactList.map((contact) => (
    <Table.Tr key={contact.id}>
      <Table.Td>{contact.name}</Table.Td>
      <Table.Td>{contact.category}</Table.Td>
      <Table.Td>{contact.status}</Table.Td>
      <Table.Td style={{ display: "flex", justifyContent: "end" }}>
        <Group>
          <ContactInfo contact={contact} />
          <ContactEdit contact={contact} />
          <ContactDelete contact={contact} />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="space-between" mb={"lg"}>
        <Group>
          <ContactMenu />
          <Select
            placeholder="Seleccione una categoria"
            data={contactCategories}
            allowDeselect={false}
            onChange={(value) => handleFilterChange("category", value || "")}
          />
          <Select
            placeholder="Seleccione un estado"
            data={contactStatus}
            allowDeselect={false}
            onChange={(value) => handleFilterChange("status", value || "")}
          />
        </Group>

        <ContactCreate />
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Categoria</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
