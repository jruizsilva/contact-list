import { Button, Container, Flex, Group } from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/contactos", label: "Contactos" },
  { to: "/clientes", label: "Clientes" },
];

export function MainLayout() {
  const { pathname } = useLocation();

  const items = links.map(({ label, to }) => (
    <Button
      key={label}
      component={Link}
      color="gray"
      size="xs"
      to={to}
      variant={pathname === to ? "default" : "subtle"}
    >
      {label}
    </Button>
  ));

  return (
    <>
      <Container size="md">
        <Flex justify={"center"} my={16}>
          <Group gap={5}>{items}</Group>
        </Flex>

        <Outlet />
      </Container>
    </>
  );
}
