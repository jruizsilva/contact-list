import { Menu, Button, rem } from "@mantine/core";
import {
  IconMessageCircle,
  IconPhoto,
  IconTrash,
  IconMenu2,
  IconDownload,
  IconFileImport,
} from "@tabler/icons-react";

interface Props {}

export default function ContactMenu(_props: Props): JSX.Element {
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="transparent" color="gray">
            <IconMenu2 />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            leftSection={
              <IconFileImport style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Importar desde excel
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconDownload style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Exportar a excel
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Eliminar todos
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
