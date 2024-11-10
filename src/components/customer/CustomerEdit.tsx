import * as yup from "yup";
import { useAppStore } from "../../store/useAppStore";
import { useForm, yupResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Modal,
  SimpleGrid,
  TextInput,
  Group,
  ActionIcon,
  TagsInput,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { Customer } from "../../types/customer";
import { DatePickerInput } from "@mantine/dates";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  last_follow_up: yup
    .date()
    .required("La fecha del ultimo seguimiento es requerida"),
  purchased_products: yup.array().min(1).required("El producto es requerido"),
  birthday: yup.date(),
  phone: yup.number(),
  interests: yup.array(),
});

interface Props {
  customer: Customer;
}

export default function CustomerEdit({ customer }: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Customer>({
    mode: "uncontrolled",
    initialValues: {
      id: customer.id,
      name: customer.name,
      last_follow_up: customer.last_follow_up,
      purchased_products: [],
      interests: [],
      birthday: customer.birthday,
      phone: customer.phone,
      created_at: customer.created_at,
    },

    validate: yupResolver(schema),
  });
  const updateCustomer = useAppStore((store) => store.updateCustomer);

  return (
    <>
      <ActionIcon
        onClick={open}
        variant="subtle"
        color="cyan"
        size={"lg"}
        radius="xl"
        aria-label="Edit"
      >
        <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Editar cliente">
        <form
          onSubmit={form.onSubmit((values) => {
            updateCustomer(values);
            notifications.show({
              title: "Cliente actualizado",
              message: "El cliente se ha actualizado correctamente",
              color: "green",
            });
          })}
        >
          <SimpleGrid spacing={"xs"}>
            <TextInput
              label="Nombre"
              placeholder="Nombre del contacto"
              withAsterisk
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <DatePickerInput
              label="Ultimo seguimiento"
              placeholder="Selecciona la fecha del ultimo seguimiento"
              withAsterisk
              key={form.key("last_follow_up")}
              {...form.getInputProps("last_follow_up")}
            />
            <TagsInput
              label="Productos"
              placeholder="Productos que ha comprado"
              withAsterisk
              {...form.getInputProps("purchased_products")}
            />
            <DatePickerInput
              label="Fecha de nacimiento"
              placeholder="Ingrese la fecha de nacimiento"
              {...form.getInputProps("birthday")}
            />
            <TextInput
              label="Telefono"
              placeholder="Telefono del contacto"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
            <TagsInput
              label="Interes"
              placeholder="Interes del cliente"
              {...form.getInputProps("interests")}
            />
          </SimpleGrid>
          <Group justify="flex-end" mt={"md"}>
            <Button
              variant="outline"
              onClick={() => {
                close();
                form.reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Actualizar cliente</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
