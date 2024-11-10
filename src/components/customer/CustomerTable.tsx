import { Group, Table } from "@mantine/core";
import { useAppStore } from "../../store/useAppStore";
import CustomerMenu from "./CustomerMenu";
import CustomerCreate from "./CustomerCreate";
import CustomerInfo from "./CustomerInfo";
import CustomerEdit from "./CustomerEdit";
import CustomerDelete from "./CustomerDelete";

interface Props {}

export default function CustomerTable(_props: Props): JSX.Element {
  const customers = useAppStore((store) => store.customers);

  const rows = customers.map((customer) => (
    <Table.Tr key={customer.name}>
      <Table.Td>{customer.name}</Table.Td>
      <Table.Td>{customer.last_follow_up?.toString()}</Table.Td>
      <Table.Td>{customer.purchased_products}</Table.Td>
      <Table.Td style={{ display: "flex", justifyContent: "end" }}>
        <Group>
          <CustomerInfo customer={customer} />
          <CustomerEdit customer={customer} />
          <CustomerDelete customer={customer} />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

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
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
