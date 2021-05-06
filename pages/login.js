import React, { useRef, useState } from "react";
import firebaseClient from "../lib/firebaseClient";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import Container from "../components/Container";
import "firebase/auth";
import "firebase/database";
// import createUser from "../lib/db";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Button,
  Heading,
  useToast,
  useColorModeValue,
  Center,
  useDisclosure,
  InputGroup,
  InputRightElement,
  IconButton,
  useMergeRefs,
} from "@chakra-ui/react";
import { CloseIcon, SettingsIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const login = () => {
  firebaseClient();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const bg = useColorModeValue("gray.400", "gray.700");
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const mergeRef = useMergeRefs(inputRef);

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;

    if (input) {
      input.focus({
        preventScroll: true,
      });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  async function signUp(email, pass) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        toast({
          title: "Created user",
          description: email,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        firebase
          .database()
          .ref("users")
          .set({ email, pass }, (err) => {
            if (err) {
              const msg = err.message;
              toast({
                title: "An error occured",
                description: msg,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Added user",
                description: email,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }
          });

        router.push("/dashboard");
      })
      .catch((err) => {
        const msg = err.message;
        toast({
          title: "An error occured",
          description: msg,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  function addUser(data) {
    msg = createUser(data);
    toast({
      title: "Operation Add",
      description: msg,
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  }

  async function signIn(email, pass) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        const msg = err.message;
        toast({
          title: "An error occured",
          description: msg,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Container>
      <Center>
        <Box w="40vw" p={20} ma="auto" rounded={6} background={bg}>
          <Heading as="h2" textAlign="center">
            Login
          </Heading>
          <FormControl isRequired mt={8}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              aria-describedby="email-helper-text"
              type="email"
              id="emailAddress"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="test@gmail.com"
              variant="filled"
            ></Input>
            <FormHelperText>Enter E-mail</FormHelperText>
          </FormControl>
          <FormControl isRequired mt={8}>
            <FormLabel htmlFor="password">Password</FormLabel>

            <InputGroup>
              <InputRightElement>
                <IconButton
                  bg="transparent !important"
                  variant="ghost"
                  aria-label={isOpen ? "Mask password" : "Reveal password"}
                  icon={isOpen ? <MoonIcon /> : <SunIcon />}
                  onClick={onClickReveal}
                />
              </InputRightElement>
              <Input
                ref={mergeRef}
                name="pass"
                type={isOpen ? "text" : "password"}
                autoComplete="current-password"
                required
                id="pass"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                placeholder="*********"
                variant="filled"
              />
            </InputGroup>
            <FormHelperText>Enter Password</FormHelperText>
          </FormControl>
          <Stack justify="center" mt={6} isInline spacing={10}>
            {/* <Button
              minWidth="40%"
              variant="solid"
              colorScheme="blue"
              isDisabled={email === "" || pass === ""}
              onClick={() => signUp(email, pass)}
            >
              Create Account
            </Button> */}

            <Button
              minWidth="40%"
              maxW="80%"
              variant="outline"
              colorScheme="green"
              fontSize="2rem"
              p={8}
              isDisabled={email === "" || pass === ""}
              onClick={() => signIn(email, pass)}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Center>
    </Container>
  );
};

export default login;
