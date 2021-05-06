import { FormHelperText } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import Container from "../components/Container";
import "firebase/auth";
import "firebase/database";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import Typewriter from "typewriter-effect";
import firebaseClient from "../lib/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useRouter } from "next/router";

function signup() {
  firebaseClient();
  const [usr, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [contact, setContact] = useState(null);
  const [address, setAddress] = useState("");
  const [type, setType] = useState(false);
  const toast = useToast();
  const bg = useColorModeValue("gray.400", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const router = useRouter();

  const openDialog = (val) => {
    setType(val);
    onOpen.call();
  };

  async function signUp(
    email,
    pass,
    usr,
    lname,
    fname,
    contact,
    address,
    type,
    onClose
  ) {
    var id = "";
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCred) => {
        var user = userCred.user;
        // console.log(user);
        id = user.uid;
        toast({
          title: "Created user",
          description: usr,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .then(() => {
        const u = {
          id: id,
          fName: fname,
          lName: lname,
          username: usr,
          email: email,
          contact: contact,
          address: address,
          type: !type ? "user" : "seller",
        };
        console.log(u);
        firebase
          .database()
          .ref("Users/" + id)
          .set(u, (err) => {
            if (err) {
              const msg = err.message;
              toast({
                title: "An error occured",
                description: msg,
                status: "error",
                duration: 9000,
                isClosable: true,
              });

              router.push("/dashboard");
            } else {
              toast({
                title: "Added user",
                description: usr,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }
          });
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
    onClose.call();
  }

  return (
    <Container>
      <Center>
        <Text fontSize="5rem" ml={4} fontWeight="bold">
          <Typewriter
            options={{
              strings: "What you want to do ?",
              autoStart: true,
              pauseFor: 2000,
              loop: true,
            }}
          />
        </Text>
      </Center>
      <Center>
        <HStack mt={8} spacing={8}>
          <Button
            minWidth="20%"
            maxW="80%"
            variant="outline"
            colorScheme="blue"
            onClick={() => openDialog(true)}
            fontSize="2rem"
            p={8}
          >
            Sell Books ?
          </Button>
          <Button
            minWidth="20%"
            maxW="80%"
            variant="outline"
            colorScheme="green"
            fontSize="2rem"
            p={8}
            onClick={() => openDialog(false)}
          >
            Buy Books ?
          </Button>
        </HStack>
      </Center>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="40vw" p={20} ma="auto" rounded={6} background={bg}>
              <Heading as="h1" textAlign="center">
                Create Account
              </Heading>
              <VStack spacing={5} mt={8} align="flex-end">
                <FormControl isRequired>
                  <FormLabel htmlFor="usr">UserName</FormLabel>
                  <Input
                    aria-describedby="usr-helper-text"
                    type="text"
                    id="usr"
                    onChange={(e) => setUser(e.target.value)}
                    value={usr}
                    placeholder="@lphaOmeGa"
                    variant="filled"
                  ></Input>
                  <FormHelperText>Enter Book Title</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="fname">First Name</FormLabel>
                  <Input
                    aria-describedby="fname-helper-text"
                    type="text"
                    id="fname"
                    onChange={(e) => setFName(e.target.value)}
                    value={fName}
                    placeholder="Richard"
                    variant="filled"
                  ></Input>
                  <FormHelperText>Enter First Name</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="lname">Last Name</FormLabel>
                  <Input
                    aria-describedby="lname-helper-text"
                    type="text"
                    id="lname"
                    onChange={(e) => setLName(e.target.value)}
                    value={lName}
                    placeholder="Parker"
                    variant="filled"
                  ></Input>
                  <FormHelperText>Enter Last Name</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    aria-describedby="email-helper-text"
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="r.parker@hotmail.com"
                    variant="filled"
                  ></Input>
                  <FormHelperText>Enter Email</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="pass">Password</FormLabel>
                  <Input
                    aria-describedby="pass-helper-text"
                    type="password"
                    id="pass"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    placeholder="***********"
                    variant="filled"
                  ></Input>
                  <FormHelperText>Enter Password</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="contact">Contact</FormLabel>
                  <Input
                    aria-describedby="contact-helper-text"
                    type="tel"
                    id="contact"
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                    placeholder="638-565-895"
                    maxLength="10"
                    variant="filled"
                  ></Input>
                  <FormHelperText>Enter Contact No.</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="address">address</FormLabel>
                  <Textarea
                    aria-describedby="address-helper-text"
                    type="text"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Prinsengracht 263-267, 1016 GV Amsterdam, Netherlands"
                    variant="filled"
                  ></Textarea>
                  <FormHelperText>Enter Address</FormHelperText>
                </FormControl>
              </VStack>
              <Stack justify="center" mt={6} isInline spacing={10}>
                <Button
                  minWidth="40%"
                  maxW="80%"
                  variant="solid"
                  colorScheme="blue"
                  isDisabled={
                    email === "" ||
                    pass === "" ||
                    usr === "" ||
                    lName === "" ||
                    fName === "" ||
                    contact === "" ||
                    address === ""
                  }
                  onClick={() =>
                    signUp(
                      email,
                      pass,
                      usr,
                      lName,
                      fName,
                      contact,
                      address,
                      type,
                      onClose
                    )
                  }
                >
                  Create Account
                </Button>

                {/* <Button
                  minWidth="40%"
                  maxW="80%"
                  variant="outline"
                  colorScheme="green"
                  isDisabled={email === "" || pass === ""}
                  onClick={() => signIn(email, pass)}
                >
                  Login
                </Button> */}
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default signup;
