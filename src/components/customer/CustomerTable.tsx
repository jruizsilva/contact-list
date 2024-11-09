import { Group, Table } from "@mantine/core";
import { useAppStore } from "../../store/useAppStore";
import CustomerMenu from "./CustomerMenu";
import CustomerCreate from "./CustomerCreate";

interface Props {}

export default function CustomerTable(_props: Props): JSX.Element {
  const customers = useAppStore((store) => store.customers);

  return (
    <>
      <Group justify="space-between" mb={"lg"}>
        <CustomerMenu />

        <CustomerCreate />
      </Group>
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
