import {
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Text,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/usuarios", label: "Usuarios" },
];

export function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const buttonSize = useMatches({ base: "md", xs: "xs" });
  const { pathname } = useLocation();

  const items = links.map(({ label, to }) => (
    <Button
      key={label}
      component={Link}
      color="gray"
      w={{ base: "100%", xs: "auto" }}
      size={buttonSize}
      to={to}
      variant={pathname === to ? "default" : "subtle"}
    >
      {label}
    </Button>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="md" h={"100%"}>
          <Group h={"100%"} justify="space-between">
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: "indigo", to: "teal", deg: 90 }}
              visibleFrom="xs"
            >
              Contact List
            </Text>
            {/* <Group gap={5} visibleFrom="xs">
              {items}
            </Group>
            <UserMenu /> */}

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
            />
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Group hiddenFrom="xs">{items}</Group>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
