import {
  Button,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import { Contact, contactCategories, contactStatus } from "../types/contact";
import * as yup from "yup";
import { useAppStore } from "../store/useAppStore";

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

export default function ContactCreate(_props: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Omit<Contact, "id">>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      category: "Amigos",
      status: "Pendiente",
      phone: "",
      description: "",
    },

    validate: yupResolver(schema),
  });
  const addContact = useAppStore((store) => store.addContact);

  return (
    <>
      <Button onClick={open}>Agregar contacto</Button>
      <Modal opened={opened} onClose={close} title="Agregar contacto">
        <form
          onSubmit={form.onSubmit((values) => {
            addContact(values);
            form.reset();
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
            <Select
              label="Categoria"
              placeholder="Seleccione una categoria"
              withAsterisk
              data={contactCategories}
              {...form.getInputProps("category")}
            />
            <Select
              label="Estado"
              placeholder="Seleccione un estado"
              withAsterisk
              data={contactStatus}
              {...form.getInputProps("status")}
            />
            <TextInput
              label="Telefono"
              placeholder="Telefono del contacto"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
            <Textarea
              label="Descripción"
              placeholder="Descripción del contacto"
              key={form.key("description")}
              {...form.getInputProps("description")}
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
            <Button type="submit">Agregar contacto</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
