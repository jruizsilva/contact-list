import { Group, Select } from "@mantine/core";
import ContactCreate from "../components/ContactCreate";
import ContactList from "../components/ContactList";
import { useSearchParams } from "react-router-dom";
import { contactCategories, contactStatus } from "../types/contact";
import ContactMenu from "../components/ContactMenu";

interface Props {}

export default function ContactListPage(_props: Props): JSX.Element {
  const [, setSearchParams] = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prevParams) => {
      value = value.trim();
      if (value === "") {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };
  return (
    <>
      <Group justify="space-between" mb={"lg"}>
        <Group>
          <ContactCreate />
          <Select
            placeholder="Seleccione una categoria"
            data={contactCategories}
            onChange={(value) => handleFilterChange("category", value || "")}
          />
          <Select
            placeholder="Seleccione un estado"
            data={contactStatus}
            onChange={(value) => handleFilterChange("status", value || "")}
          />
        </Group>
        <ContactMenu />
      </Group>
      <ContactList />
    </>
  );
}
