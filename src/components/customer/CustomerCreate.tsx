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
import * as yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useAppStore } from "../../store/useAppStore";
import { Customer } from "../../types/customer";
import { DateInput } from "@mantine/dates";
import CountrySelect from "../CountrySelect";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  last_follow_up: yup
    .date()
    .required("La fecha del ultimo seguimiento es requerida"),
  purchased_products: yup.array().min(1).required("El producto es requerido"),
  birthday: yup.date().nullable(),
  phone: yup.string(),
  interests: yup.array(),
});

interface Props {}

export default function CustomerCreate(_props: Props): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Omit<Customer, "id" | "created_at">>({
    mode: "controlled",
    initialValues: {
      name: "",
      last_follow_up: null,
      purchased_products: [],
      birthday: null,
      country_code: "+54",
      phone: "",
      interests: [],
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
              placeholder="Nombre del cliente"
              withAsterisk
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <DateInput
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
              key={form.key("purchased_products")}
              {...form.getInputProps("purchased_products")}
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
            <TagsInput
              label="Interes"
              placeholder="Interes del cliente"
              key={form.key("interests")}
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
            <Button type="submit">Agregar cliente</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
