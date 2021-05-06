import React from "react";
import { Text, Grid, Button, useToast } from "@chakra-ui/react";
import Container from "../components/Container";
import Book from "../components/Book";
import firebase from "firebase/app";
import "firebase/database";
import useSWR, { mutate } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function books({ books }) {
  const toast = useToast();

  const getData = async () => {
    const data = await firebase
      .database()
      .ref()
      .child("Books")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return "No data available";
        }
      })
      .catch((error) => {
        return error;
      });
    return data;
  };

  const addBook = async (bookDetails) => {
    await firebase
      .database()
      .ref()
      .child("Books")
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
          // mutate("/api/books");
        } else {
          toast({
            title: "Added Book",
            description: "All",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Container>
      <Text
        as="h1"
        fontSize="5rem"
        casing="capitalize"
        textAlign="center"
        mb={8}
        fontWeight="extrabold"
      >
        Library
      </Text>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* <Button
          alignSelf="center"
          fontSize="1.5rem"
          casing="capitalize"
          textAlign="center"
          width="max-content"
          height="max-content"
          variant="outline"
          colorScheme="green"
          p={4}
          onClick={() => addBook(data)}
        >
          Add Book
        </Button> */}
        {!books && [...Array(8)].map((e, i) => <SkeletonLayout />)}
        {books && books.map((book) => <Book book={book} key={book.id} />)}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps(context) {
  try {
    // const res = useSWR("http://localhost:3000/api/books", fetcher);
    // console.log("hg")
    const res = await fetch(`http://localhost:3000/api/books`);
    const books = await res.json();
    return {
      props: {
        books: books,
      },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return {
      props: {},
    };
  }
}

export default books;
