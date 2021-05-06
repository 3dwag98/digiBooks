import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import {
  Box,
  Flex,
  Text,
  Button,
  Spacer,
  Badge,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Divider,
  Center,
  Image,
  useColorModeValue,
  useToast,
  HStack,
  Alert,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  useFormControl,
  FormHelperText,
} from "@chakra-ui/react";
import firebaseClient from "../lib/firebaseClient";
import Rating from "./Rating";
import { useAuth } from "../lib/auth";

export default function Book({ book }) {
  firebaseClient();
  const finalRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPay, setPay] = useState(false);
  const toast = useToast();
  const r = Math.floor(Math.random() * 5) + 1;
  const [rate, setRating] = useState(book.rating ? book.rating : r);
  const { user } = useAuth();
  const onPClose = () => setPay(false);
  const [name, setName] = useState("");
  const [credit, setCredit] = useState(null);
  const [valid, setValid] = useState("");
  const [cvc, setCVC] = useState(null);

  const addBook = async (bookDetails) => {
    await firebase
      .database()
      .ref("Books/" + bookDetails.id)
      .set(bookDetails.id, (err) => {
        if (err) {
          const msg = err.message;
          toast({
            title: "An error occured",
            description: msg,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          mutate("/api/books");
        } else {
          toast({
            title: "Added Book",
            description: bookDetails.title,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  function downloadURI(url, filename) {
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        const url = window.URL.createObjectURL(b);
        var a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = Date.parse(new Date()) + "_" + filename + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        toast({
          title: "Downloaded Book",
          description: filename,
          status: "success",
          position: "bottom-left",
          duration: 9000,
          isClosable: true,
        });

        setPay(false);
      });
    });
  }

  const download = () => {
    var storage = firebase.storage();
    var name = "";
    var url = "";
    var ref = storage.ref().child("pdf/notebook.jpg");
    ref
      .getMetadata()
      .then((metadata) => {
        name = metadata.generation + "_" + metadata.name;
        console.log(metadata);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        storage
          .ref()
          .child("cover/notebook.jpg")
          .getDownloadURL()
          .then((uri) => {
            console.log(uri);
            url = uri;
            downloadURI(url, name);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <Flex
      flexDirection="column"
      p={8}
      maxWidth="32rem"
      borderWidth={1}
      rounded="2xl"
      boxShadow="dark-lg"
      minH="350px"
      width="300px"
    >
      <Text
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="x-large"
        letterSpacing="wide"
        color="black.600"
        textAlign="center"
      >
        {book.title}
      </Text>
      <Spacer />
      {book.imgUrl && <Image mt={4} mb={4} src={book.imgUrl} rounded={4} />}
      <Badge
        ml="1"
        fontSize="0.8em"
        colorScheme="green"
        width="fit-content"
        p={1}
        mt={2}
      >
        {book.genre}
      </Badge>
      <Rating
        size={25}
        icon="BsStar"
        scale={5}
        fillColor="gold"
        strokeColor="grey"
        rate={rate}
        setRating={setRating}
        mt={2}
        onChange={() => console.log(rate)}
      />
      <Button
        mt={4}
        variant="outline"
        colorScheme="yellow"
        width="100%"
        onClick={onOpen}
      >
        VIEW
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="extrabold" fontSize="2rem">
              {book.title}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="flex-start" flexDirection="row">
              <Center>
                <Badge
                  colorScheme="green"
                  fontSize="4xl"
                  pt={4}
                  pb={4}
                  sx={{
                    writingMode: "vertical-lr",
                    transform: "rotate(-180deg)",
                  }}
                >
                  {book.genre}
                </Badge>
              </Center>
              {book.imgUrl && <Image ml={4} src={book.imgUrl} />}
              <Box ml={5}>
                <Text fontSize="1rem" fontWeight="semibold">
                  &emsp; &emsp;{book.description}
                </Text>
                <Divider
                  mt={2}
                  mb={2}
                  color={useColorModeValue("gray.700", "gray.300")}
                  borderWidth={1}
                  orientation="horizontal"
                />
                <Text mt={2} color="gray.500">
                  Author: <b>{book.Author}</b>
                </Text>

                <Text mt={2} color="gray.500">
                  Publications: <b>{book.publications}</b>
                </Text>

                <Text mt={2} color="gray.500">
                  Price: <b fontWeight="extrabold">₹{book.price}</b>
                </Text>
                <HStack mt={2}>
                  <Text color="gray.500">Rating:</Text>
                  <Rating
                    size={25}
                    icon="BsStar"
                    scale={5}
                    fillColor="gold"
                    strokeColor="grey"
                    rate={rate}
                    setRating={setRating}
                    onChange={() => console.log(rate)}
                  />
                </HStack>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => {
                setPay(true);
              }}
              isDisabled={!book.pdfUrl || !user}
            >
              {user ? "Go to Payment" : "Login to Buy"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog finalFocusRef={finalRef} isOpen={isPay} size="2xl">
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text fontWeight="extrabold" fontSize="2rem">
              Payment Gateway
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <HStack spacing={4}>
              <Box minW="20vw" maxW="40vw" p={8} ma="auto" rounded={6}>
                <VStack spacing={5} align="flex-end">
                  <FormControl isRequired>
                    <FormLabel htmlFor="usr">Full Name</FormLabel>
                    <Input
                      aria-describedby="usr-helper-text"
                      type="text"
                      id="usr"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      placeholder="@lphaOmeGa"
                      variant="filled"
                    ></Input>
                    <FormHelperText>Enter Full Name</FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="fname">Credit Card</FormLabel>
                    <Input
                      aria-describedby="fname-helper-text"
                      type="number"
                      id="fname"
                      onChange={(e) => {
                        setCredit(e.target.value);
                      }}
                      value={credit}
                      maxLength={16}
                      placeholder="***********689"
                      variant="filled"
                    ></Input>
                    <FormHelperText>Enter Credit Card No.</FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="lname">Valid Till</FormLabel>
                    <Input
                      aria-describedby="lname-helper-text"
                      type="text"
                      id="lname"
                      onChange={(e) => {
                        setValid(e.target.value);
                      }}
                      value={valid}
                      placeholder="07/24"
                      variant="filled"
                      maxLength={5}
                    ></Input>
                    <FormHelperText>Enter Valid Till</FormHelperText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="email">CVC</FormLabel>
                    <Input
                      aria-describedby="email-helper-text"
                      type="password"
                      id="email"
                      onChange={(e) => {
                        setCVC(e.target.value);
                      }}
                      value={cvc}
                      placeholder="007"
                      variant="filled"
                      maxLength="3"
                    ></Input>
                    <FormHelperText>Enter CVC</FormHelperText>
                  </FormControl>
                </VStack>
              </Box>
              <Box>
                <Image src="qrcode.png" padding={8}></Image>
              </Box>
            </HStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" mr={3} onClick={onPClose}>
              Cancel
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => downloadURI(book.pdfUrl, book.title)}
              isDisabled={
                !book.pdfUrl ||
                name === "" ||
                credit === null ||
                valid === null ||
                cvc === null
              }
            >
              BUY NOW
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}
