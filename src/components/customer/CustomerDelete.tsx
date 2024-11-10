import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useAppStore } from "../../store/useAppStore";
import { notifications } from "@mantine/notifications";
import { Customer } from "../../types/customer";

interface Props {
  customer: Customer;
}

export default function CustomerDelete({
  customer: contact,
}: Props): JSX.Element {
  const deleteCustomer = useAppStore((store) => store.deleteCustomer);
  const openModal = () =>
    modals.openConfirmModal({
      title: "Eliminar cliente",
      children: (
        <Text size="sm">
          ¿Estás seguro de que quieres eliminar a este cliente? <br />
          Esta acción no se puede deshacer.
        </Text>
      ),
      labels: { confirm: "Eliminar cliente", cancel: "Cancelar" },
      onConfirm: () => {
        deleteCustomer(contact);
        notifications.show({
          title: "Cliente eliminado",
          message: "El cliente se ha eliminado correctamente",
        });
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
