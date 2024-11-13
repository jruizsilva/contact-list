import {
  ActionIcon,
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
import { Contact, contactCategories, contactStatus } from "../../types/contact";
import * as yup from "yup";
import { useAppStore } from "../../store/useAppStore";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import CountrySelect from "../CountrySelect";
import { DateInput } from "@mantine/dates";

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
  country_code: yup.string().required("El codigo del país es requerido"),
  phone: yup.string(),
  email: yup.string().email("Email no es valido"),
  description: yup.string(),
});

interface Props {}

export default function ContactCreate(_props: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Omit<Contact, "id" | "created_at">>({
    mode: "controlled",
    initialValues: {
      name: "",
      category: "Amigos 🤝",
      status: "Pendiente ⚠️",
      birthday: null,
      country_code: "+54",
      phone: "",
      description: "",
    },

    validate: yupResolver(schema),
  });
  const addContact = useAppStore((store) => store.addContact);

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
      <Modal opened={opened} onClose={close} title="Agregar contacto">
        <form
          onSubmit={form.onSubmit((values) => {
            addContact(values);
            form.reset();
            close();
            notifications.show({
              title: "Contacto agregado",
              message: "El contacto se ha agregado correctamente",
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
            <Select
              label="Categoria"
              placeholder="Seleccione una categoria"
              withAsterisk
              data={contactCategories}
              allowDeselect={false}
              key={form.key("category")}
              {...form.getInputProps("category")}
            />
            <Select
              label="Estado"
              placeholder="Seleccione un estado"
              allowDeselect={false}
              withAsterisk
              data={contactStatus}
              key={form.key("status")}
              {...form.getInputProps("status")}
            />
            <DateInput
              maxDate={new Date()}
              valueFormat="DD/MM/YYYY"
              label="Fecha de nacimiento"
              placeholder="DD/MM/YYYY"
              key={form.key("birthday")}
              {...form.getInputProps("birthday")}
            />
            <CountrySelect
              label="País de residencia"
              key={form.key("country_code")}
              {...form.getInputProps("country_code")}
            />

            <Group>
              <TextInput
                readOnly
                label="Código de país"
                value={form.values.country_code}
                style={{ flexBasis: "30%" }}
              />

              <TextInput
                placeholder="Número de teléfono"
                label="Número de teléfono"
                flex={1}
                key={form.key("phone")}
                {...form.getInputProps("phone")}
              />
            </Group>
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
