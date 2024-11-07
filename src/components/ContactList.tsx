import { Table } from "@mantine/core";
import { useAppStore } from "../store/useAppStore";
import ContactDelete from "./ContactDelete";
import ContactEdit from "./ContactEdit";

interface Props {}

export default function ContactList(_props: Props): JSX.Element {
  const contacts = useAppStore((store) => store.contacts);

  const rows = contacts.map((contact) => (
    <Table.Tr key={contact.name}>
      <Table.Td>{contact.name}</Table.Td>
      <Table.Td>{contact.description}</Table.Td>
      <Table.Td>{contact.category}</Table.Td>
      <Table.Td>{contact.status}</Table.Td>
      <Table.Td style={{ display: "flex", justifyContent: "end" }}>
        <ContactEdit contact={contact} />
        <ContactDelete contact={contact} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Descripción</Table.Th>
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
