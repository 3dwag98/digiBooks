import React from "react";
import Link from "next/link";
import { useAuth } from "../lib/auth";
import firebase from "firebase/app";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useDisclosure,
  useColorMode,
  IconButton,
  Image,
} from "@chakra-ui/react";

import { CloseIcon, SettingsIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const MenuItems = (props) => {
  const { children, isLast, to = "/", ...rest } = props;

  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      fontWeight="bold"
      {...rest}
    >
      <Link href={to}>
        <a>{children}</a>
      </Link>
    </Text>
  );
};

const Header = (props) => {
  const { user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { show, toggleMenu } = useDisclosure();

  const logout = async () => {
    await firebase.auth().signOut();
    window.location.href = "/";
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["grey.500", "grey.500", "transparent", "transparent"]}
      color={["grey", "grey", "grey.700", "grey.700"]}
      {...props}
    >
      <Flex align="center">
        <Link href="/">
          <a>
            <Image
              borderRadius="full"
              boxSize="60px"
              src="logo.gif"
              alt="Segun Adebayo"
            />
          </a>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <SettingsIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          isInline
          spacing={10}
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <IconButton
            shadow="2xl"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            width="50%"
            variant="outline"
            onClick={toggleColorMode}
          >
            Toggle
          </IconButton>
          <MenuItems to="/">Home</MenuItems>
          <MenuItems to="/books">Books</MenuItems>
          <MenuItems to="/about">About </MenuItems>
          {!user && (
            <MenuItems to="/login">
              <Button
                size="sm"
                rounded="md"
                variant="outline"
                colorScheme="green"
              >
                Login
              </Button>
            </MenuItems>
          )}
          {!user && (
            <MenuItems to="/signup">
              <Button
                size="sm"
                rounded="md"
                variant="outline"
                colorScheme="blue"
              >
                Create Account
              </Button>
            </MenuItems>
          )}
          {user && (
            <MenuItems>
              <Button
                variant="outline"
                size="sm"
                rounded="md"
                colorScheme="red"
                onClick={() => logout()}
              >
                Log Out
              </Button>
            </MenuItems>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
