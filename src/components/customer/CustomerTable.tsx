import { Table } from "@mantine/core";

interface Props {}

export default function CustomerTable(_props: Props): JSX.Element {
  const rows = [];

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Ultimo seguimiento</Table.Th>
            <Table.Th>Productos vendidos</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody></Table.Tbody>
      </Table>
    </>
  );
}
