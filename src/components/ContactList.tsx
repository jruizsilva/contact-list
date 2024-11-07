import { Button, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface Props {}

const elements = [
  {
    name: "Jonathan",
    description: "C",
    category: "Amigos",
    status: "Pendiente",
  },
];

export default function ContactList(_props: Props): JSX.Element {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td style={{ display: "flex", justifyContent: "end" }}>
        <Button variant="subtle" color="cyan">
          <IconEdit />
        </Button>
        <Button variant="subtle" color="red">
          <IconTrash />
        </Button>
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
