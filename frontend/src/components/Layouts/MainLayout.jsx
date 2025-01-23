import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Title,
} from "@mantine/core";
import { NavLink as RRNavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCart } from "@tabler/icons-react";
import navLinks from "../../constants/NavLinks";
import TopMenu from "./TopMenu";

const renderNavLinks = (links) =>
  links.map((link) => (
    <NavLink
      key={link.url}
      label={link.label}
      leftSection={link.Icon && <link.Icon size={16} />}
      component={RRNavLink}
      to={link.url}
      childrenOffset={28}
      bg="transparent"
    >
      {link.children && renderNavLinks(link.children)}
    </NavLink>
  ));

const MainLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <ScrollArea h="100%">{renderNavLinks(navLinks)}</ScrollArea>
      </AppShell.Navbar>

      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <IconShoppingCart color="black" size={30} />
            <Title order={4}>Management</Title>
          </Group>
          <TopMenu />
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
