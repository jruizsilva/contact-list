import {
  ActionIcon,
  Button,
  Group,
  Modal,
  SimpleGrid,
  TagsInput,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { contactCategories, contactStatus } from "../../types/contact";
import * as yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useAppStore } from "../../store/useAppStore";
import { Customer } from "../../types/customer";
import { DatePickerInput } from "@mantine/dates";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  category: yup
    .string()
    .oneOf(
      contactCategories,
      "Categoria debe ser uno de los valores permitidos"
    )
    .required("Categoria es requerida"),
  status: yup
    .string()
    .oneOf(contactStatus, "Estado debe ser uno de los valores permitidos")
    .required("Estado es requerido"),
  phone: yup.string(),
  email: yup.string().email("Email no es valido"),
  description: yup.string(),
});

interface Props {}

export default function CustomerCreate(_props: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Omit<Customer, "id" | "created_at">>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      last_follow_up: null,
      purchased_products: [],
      interests: [],
      phone: "",
      birthday: null,
    },

    validate: yupResolver(schema),
  });
  const addCustomer = useAppStore((store) => store.addCustomer);

  return (
    <>
      <ActionIcon
        onClick={open}
        variant="light"
        size="lg"
        radius="xl"
        aria-label="Add"
      >
        <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Modal opened={opened} onClose={close} title="Agregar cliente">
        <form
          onSubmit={form.onSubmit((values) => {
            addCustomer(values);
            form.reset();
            close();
            notifications.show({
              title: "Cliente agregado",
              message: "El cliente se ha agregado correctamente",
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
              key={form.key("last_follow_up")}
              {...form.getInputProps("last_follow_up")}
            />
            <TagsInput
              label="Productos"
              placeholder="Productos que ha comprado"
            />
            <DatePickerInput
              label="Fecha de nacimiento"
              placeholder="Ingrese la fecha de nacimiento"
            />
            <TextInput
              label="Telefono"
              placeholder="Telefono del contacto"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
            <TagsInput label="Interes" placeholder="Interes del cliente" />
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
            <Button type="submit">Agregar contacto</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
