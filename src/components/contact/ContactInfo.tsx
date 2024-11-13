import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { Contact } from "../../types/contact";
import { formatDateToDMY } from "../../helpers/formatDateToDMY";

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
        title={<Text fz={"h2"}>Información del contacto</Text>}
      >
        {/* Modal content */}
        <Stack>
          <Group gap={"xs"} align="end">
            <Title order={5}>Nombre:</Title>
            <Text size="sm">{contact.name}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Categoria:</Title>
            <Text size="sm">{contact.category}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Estado:</Title>
            <Text size="sm">{contact.status}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Fecha de nacimiento:</Title>
            <Text size="sm">
              {contact.birthday !== null &&
                `${formatDateToDMY(contact.birthday.toString())}`}
            </Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Telefono:</Title>
            <Text size="sm">{`${contact.country_code} ${contact.phone}`}</Text>
          </Group>
          <Group gap={"xs"} align="end">
            <Title order={5}>Descripción:</Title>
            <Text size="sm">{contact.description}</Text>
          </Group>
          <Button
            component="a"
            href={`https://wa.me/${contact.country_code}${contact.phone}`}
            target="_blank"
          >
            Enviar mensaje
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
