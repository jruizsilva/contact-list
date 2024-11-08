import { Group, Select } from "@mantine/core";
import ContactCreate from "../components/contact/ContactCreate";
import ContactTable from "../components/contact/ContactTable";
import { useSearchParams } from "react-router-dom";
import { contactCategories, contactStatus } from "../types/contact";
import ContactMenu from "../components/contact/ContactMenu";

interface Props {}

export default function ContactPage(_props: Props): JSX.Element {
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
          <ContactMenu />
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

        <ContactCreate />
      </Group>
      <ContactTable />
    </>
  );
}
