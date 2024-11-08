import { ActionIcon, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { Contact } from "../../types/contact";

interface Props {
  contact: Contact;
}

export default function ContactInfo({ contact }: Props): JSX.Element {
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
            <Text size="sm">{contact.name}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Telefono:</Title>
            <Text size="sm">{contact.phone}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Descripción:</Title>
            <Text size="sm">{contact.description}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Categoria:</Title>
            <Text size="sm">{contact.category}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Estado:</Title>
            <Text size="sm">{contact.status}</Text>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
