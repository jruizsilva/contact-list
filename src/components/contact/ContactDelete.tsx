import { ActionIcon, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useAppStore } from "../../store/useAppStore";
import { Contact } from "../../types/contact";

interface Props {
  contact: Contact;
}

export default function ContactDelete({ contact }: Props): JSX.Element {
  const deleteContact = useAppStore((store) => store.deleteContact);
  const openModal = () =>
    modals.openConfirmModal({
      title: "Eliminar contacto",
      children: (
        <Text size="sm">
          ¿Estás seguro de que quieres eliminar este contacto? <br />
          Esta acción no se puede deshacer.
        </Text>
      ),
      labels: { confirm: "Eliminar contacto", cancel: "Cancelar" },
      onConfirm: () => {
        deleteContact(contact);
      },
      confirmProps: { color: "red" },
    });
  return (
    <>
      <ActionIcon
        onClick={openModal}
        variant="subtle"
        color="red"
        size={"lg"}
        radius="xl"
        aria-label="Edit"
      >
        <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
