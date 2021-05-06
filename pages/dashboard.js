import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { useAuth } from "../lib/auth";
import { verifyIdToken } from "../lib/firebaseAdmin";
import firebaseClient from "../lib/firebaseClient";
import firebase from "firebase/app";
import {
  Text,
  Skeleton,
  Grid,
  Button,
  Center,
  HStack,
  useDisclosure,
  useMenuState,
} from "@chakra-ui/react";
import Container from "../components/Container";
import Book from "../components/Book";
import AddBookModel from "../components/AddBookModel";
import SkeletonLayout from "../components/SkeletonLayout";

const logout = async () => {
  await firebase.auth().signOut();
  window.location.href = "/";
};

const dashboard = ({ session, books }) => {
  const [data, setData] = useState(books);

  firebaseClient();
  const finalRef = React.useRef();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usr, setUser] = useState({});

  const getUsr = async (userId) => {
    await firebase
      .database()
      .ref("/Users/" + userId)
      .get()
      .then((snapshot) => {
        setUser(snapshot.val());
      });
  };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      firebase
        .database()
        .ref("/Users/" + firebase.auth().currentUser.uid)
        .once("value")
        .then((snapshot) => {
          // if (snapshot.exists()) {
          //   console.log(snapshot.val());
          // } else {
          //   console.log("No data available");
          // }

          setUser(snapshot.val());
        });
    }, 1 * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  if (session) {
    // getUsr(session);

    if (!user || !books) {
      return (
        <Container>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {[...Array(8)].map((e, i) => (
              <SkeletonLayout />
            ))}
          </Grid>
        </Container>
      );
    }

    return (
      <Container>
        <Center>
          <HStack spacing={20}>
            <Text
              as="h1"
              fontSize="5rem"
              casing="capitalize"
              textAlign="center"
              mb={8}
              fontWeight="extrabold"
              alignSelf="center"
            >
              Library
            </Text>
            {console.log(usr)}
            {usr?.type === "seller" && (
              <Button
                alignSelf="center"
                fontSize="1.5rem"
                casing="capitalize"
                textAlign="center"
                width="max-content"
                height="max-content"
                variant="outline"
                colorScheme="green"
                onClick={onOpen}
                isDisabled={usr?.type === "user"}
                p={4}
              >
                Add Book
              </Button>
            )}
          </HStack>
        </Center>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </Grid>
        <AddBookModel finalRef={finalRef} isOpen={isOpen} onClose={onClose} />
        {/* {mutate("/api/books")} */}
      </Container>
    );
  } else {
    return (
      <Container>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {[...Array(8)].map((e, i) => (
            <SkeletonLayout />
          ))}
        </Grid>
      </Container>
    );
  }
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    const res = await fetch(`http://localhost:3000/api/books`);
    const books = await res.json();
    // const books = await useSWR("http://localhost:3000/api/books", fetcher);
    return {
      props: {
        session: uid,
        books: books,
      },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { location: "/login" });
    context.res.end();
    return {
      props: {},
    };
  }
}

export default dashboard;
