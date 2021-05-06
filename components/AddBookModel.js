import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export default function AddBookModel({ finalRef, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [pub, setPub] = useState("");
  const [details, setDetails] = useState("");
  const [file, setfile] = useState("");
  const [pdf, setPdf] = useState("");
  const toast = useToast();
  // const [open, setOpen] = useState(isOpen);
  const makeBook = (title, price, author, genre, pub, details, image, pdf) => {
    const id = "_" + Math.random().toString(36).substr(2, 9);
    var pdfUrl = "";
    var imgUrl = "";
    var storage = firebase.storage().ref();
    var ref = storage.child("cover/" + image.name);
    // var uploadTask = storageRef.child('images/rivers.jpg').put(file);

    ref
      .put(image)
      .then(
        (snapshot) => {
          imgUrl = snapshot.metadata;
          toast({
            title: "Added Book Cover",
            description: image.name,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        (error) => {
          toast({
            title: "An error occured",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      )
      .then(async () => {
        await ref
          .getDownloadURL()
          .then((uri) => {
            console.log(uri);
            imgUrl = uri;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        storage
          .child("pdf/" + pdf.name)
          .put(pdf)
          .on(
            "state_changed",
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              toast({
                title: "An error occured",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            },
            () => {
              storage
                .child("pdf/" + pdf.name)
                .put(pdf)
                .snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                  console.log("File available at", downloadURL);
                  pdfUrl = downloadURL;
                  const book = {
                    id: id,
                    title: title,
                    Author: author,
                    genre: genre,
                    publications: pub,
                    price: price,
                    description: details,
                    imgUrl: imgUrl,
                    pdfUrl: pdfUrl,
                  };
                  addBook(book);
                  onClose.call();
                });
            }
          );
      });
  };
  //     .then(
  //       (snapshot) => {
  //         toast({
  //           title: "Added Book PDF",
  //           description: pdf.name,
  //           status: "success",
  //           duration: 9000,
  //           isClosable: true,
  //         });
  //         console.log(snapshot.val())
  //       },
  //       (error) => {
  //         toast({
  //           title: "An error occured",
  //           description: error.message,
  //           status: "error",
  //           duration: 9000,
  //           isClosable: true,
  //         });
  //       }
  //     );
  // })
  // .then(async () => {
  //   await storage
  //     .child("pdf/" + pdf.name)
  //     .getDownloadURL()
  //     .then((uri) => {
  //       console.log(uri);
  //       pdfUrl = uri;
  //       console.log(uri);
  //       const book = {
  //         id: id,
  //         title: title,
  //         Author: author,
  //         genre: genre,
  //         publications: pub,
  //         price: price,
  //         description: details,
  //         imgUrl: imgUrl,
  //         pdfUrl: pdfUrl,
  //       };
  //       addBook(book);
  //       onClose.call();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  // ref = storageRef.child("pdf/" + pdf.name);
  // ref.put(pdf).then(
  //   (snapshot) => {
  //     toast({
  //       title: "Added Book PDF",
  //       description: pdf.name,
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   },
  //   (error) => {
  //     toast({
  //       title: "An error occured",
  //       description: error.message,
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // );

  // const book = {
  //   id: id,
  //   title: title,
  //   Author: author,
  //   genre: genre,
  //   publications: pub,
  //   price: price,
  //   description: details,
  //   imgUrl:imgUrl,
  //   pdfUrl:pdfUrl
  // };
  // addBook(book);
  // setOpen(false);

  const addBook = async (bookDetails) => {
    await firebase
      .database()
      .ref("Books/" + bookDetails.id)
      .set(bookDetails, (err) => {
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
            title: "Added Book",
            description: bookDetails.title,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  const uploadFile = (filename) => {
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(filename.name);
    ref.put(file).then(
      (snapshot) => {
        toast({
          title: "Added Book",
          description: filename.name,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      (error) => {
        toast({
          title: "An error occured",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Center> */}
          <Box p={8}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  aria-describedby="title-helper-text"
                  type="text"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Harry Potter"
                  variant="filled"
                ></Input>
                <FormHelperText>Enter Book Title</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  aria-describedby="price-helper-text"
                  type="number"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder="656.665"
                  variant="filled"
                ></Input>
                <FormHelperText>Enter Book Price</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="genre">Genre</FormLabel>
                <Input
                  aria-describedby="genre-helper-text"
                  type="text"
                  id="genre"
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                  placeholder="Fiction"
                  variant="filled"
                ></Input>
                <FormHelperText>Enter Book Genre</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input
                  aria-describedby="author-helper-text"
                  type="text"
                  id="author"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                  placeholder="J.K Rowling"
                  variant="filled"
                ></Input>
                <FormHelperText>Enter Book Author</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="pub">Publication</FormLabel>
                <Input
                  aria-describedby="pub-helper-text"
                  type="text"
                  id="pub"
                  onChange={(e) => setPub(e.target.value)}
                  value={pub}
                  placeholder="Bloomsbury"
                  variant="filled"
                ></Input>
                <FormHelperText>Enter Book Publication</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="pub">Description</FormLabel>
                <Textarea
                  aria-describedby="pub-helper-text"
                  type="text"
                  id="pub"
                  onChange={(e) => setDetails(e.target.value)}
                  value={details}
                  placeholder="The books concern a wizard called Harry Potter and his journey through Hogwarts School of Witchcraft and Wizardry..."
                  variant="filled"
                ></Textarea>
                <FormHelperText>Enter Book Description</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="cover">Image</FormLabel>
                <Input
                  aria-describedby="cover-helper-text"
                  type="file"
                  accept="image/*"
                  id="cover"
                  onChange={(e) => setfile(e.target.files[0])}
                  // value={file?.name}
                  placeholder="harry.png"
                  variant="filled"
                  p={1}
                ></Input>
                <FormHelperText>Upload Cover Image</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="pdf">PDF</FormLabel>
                <Input
                  aria-describedby="pdf-helper-text"
                  type="file"
                  accept="application/pdf"
                  id="pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                  // value={file?.name}
                  placeholder="harry-potter.pdf"
                  variant="filled"
                  p={1}
                ></Input>
                <FormHelperText>Upload Book PDF</FormHelperText>
              </FormControl>
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="yellow"
            onClick={() =>
              makeBook(title, price, author, genre, pub, details, file, pdf)
            }
            isDisabled={
              title === "" ||
              price === null ||
              author === "" ||
              genre === "" ||
              pub === "" ||
              details === "" ||
              file === null ||
              pdf === null
            }
          >
            ADD
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
