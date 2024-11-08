import * as yup from "yup";
import { useAppStore } from "../../store/useAppStore";
import { Contact, contactCategories, contactStatus } from "../../types/contact";
import { useForm, yupResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Modal,
  SimpleGrid,
  TextInput,
  Select,
  Textarea,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

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

interface Props {
  contact: Contact;
}

export default function ContactEdit({ contact }: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Omit<Contact, "id">>({
    mode: "uncontrolled",
    initialValues: {
      name: contact.name,
      category: contact.category,
      status: contact.status,
      phone: contact.phone,
      description: contact.description,
    },

    validate: yupResolver(schema),
  });
  const updateContact = useAppStore((store) => store.updateContact);

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
      <Modal opened={opened} onClose={close} title="Editar contacto">
        <form
          onSubmit={form.onSubmit((values) => {
            updateContact({ id: contact.id, ...values });
          })}
        >
          <SimpleGrid spacing={"xs"}>
            <TextInput
              label="Nombre"
              withAsterisk
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <Select
              label="Categoria"
              withAsterisk
              data={contactCategories}
              {...form.getInputProps("category")}
            />
            <Select
              label="Estado"
              withAsterisk
              data={contactStatus}
              {...form.getInputProps("status")}
            />
            <TextInput
              label="Telefono"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
            <Textarea
              label="Descripción"
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
            <Button type="submit">Actualizar contacto</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
