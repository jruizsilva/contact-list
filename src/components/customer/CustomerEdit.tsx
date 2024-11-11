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
import { DateInput } from "@mantine/dates";
import CountrySelect from "../CountrySelect";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  last_follow_up: yup
    .date()
    .required("La fecha del ultimo seguimiento es requerida"),
  purchased_products: yup.array().min(1).required("El producto es requerido"),
  birthday: yup.date().nullable(),
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
      last_follow_up:
        customer.last_follow_up !== null
          ? new Date(customer.last_follow_up)
          : null,
      purchased_products: customer.purchased_products,
      interests: customer.interests,
      birthday: customer.birthday !== null ? new Date(customer.birthday) : null,
      country_code: customer.country_code,
      phone: customer.phone,
      created_at: customer.created_at,
    },

    validate: yupResolver(schema),
  });
  const updateCustomer = useAppStore((store) => store.updateCustomer);

  console.log(form.values);

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
            <DateInput
              label="Fecha de nacimiento"
              placeholder="Ingrese la fecha de nacimiento"
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
            <Button type="submit">Actualizar cliente</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
