import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useAppStore } from "../store/useAppStore";
import { Contact } from "../types/contact";

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
      <Button variant="subtle" color="red" onClick={openModal}>
        <IconTrash />
      </Button>
    </>
  );
}
