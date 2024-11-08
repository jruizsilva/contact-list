import {
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/contactos", label: "Contactos" },
  { to: "/clientes", label: "Clientes" },
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
          <Group h={"100%"}>
            <Group gap={5} mx={"auto"} visibleFrom="xs">
              {items}
            </Group>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
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
