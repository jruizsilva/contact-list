import { Group } from "@mantine/core";
import ContactCreate from "../components/ContactCreate";
import ContactList from "../components/ContactList";

interface Props {}

export default function HomePage(_props: Props): JSX.Element {
  return (
    <>
      <Group justify="flex-end">
        <ContactCreate />
      </Group>
      <ContactList />
    </>
  );
}
