import { Avatar, Button, Group, Menu, rem, Stack, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconLibrary,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

interface Props {}

export default function UserMenu(_props: Props): JSX.Element {
  return (
    <>
      <Menu width={180} shadow="md">
        <Menu.Target>
          <Button
            p={0}
            variant="transparent"
            color="gray"
            rightSection={<IconChevronDown size={"1rem"} />}
          >
            <Group gap={"xs"}>
              <Avatar size={32} />
              <Stack gap={0} align="flex-start">
                <Text size="xs" fw={500} tt={"capitalize"}>
                  user name
                </Text>
                <Text c="dimmed" size="xs" tt={"lowercase"}>
                  user@gmail.com
                </Text>
              </Stack>
            </Group>
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconLibrary style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Mis publicaciones
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconUser style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Mi cuenta
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
