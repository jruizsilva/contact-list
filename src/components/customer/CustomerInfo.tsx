import { ActionIcon, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { Customer } from "../../types/customer";

interface Props {
  customer: Customer;
}

export default function CustomerInfo({ customer }: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ActionIcon
        onClick={open}
        variant="subtle"
        color="yellow"
        size={"lg"}
        radius="xl"
        aria-label="Edit"
      >
        <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={2}>Información del contacto</Title>}
      >
        {/* Modal content */}
        <Stack>
          <Group gap={"xs"} align="end">
            <Title order={5}>Nombre:</Title>
            <Text size="sm">{customer.name}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Ultimo seguimiento:</Title>
            <Text size="sm">{customer.last_follow_up?.toString()}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Productos vendidos:</Title>
            <Text size="sm">{customer.purchased_products}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Fecha de nacimiento:</Title>
            <Text size="sm">{customer.birthday?.toString()}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Telefono:</Title>
            <Text size="sm">{customer.phone}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Intereses:</Title>
            <Text size="sm">{customer.interests}</Text>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
