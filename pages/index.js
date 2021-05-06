import { React, useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import Container from "../components/Container";
import BtnLink from "../components/BtnLink";
import {
  Center,
  Flex,
  Box,
  Text,
  Heading,
  Stack,
  useColorModeValue,
  createIcon,
  HStack,
} from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import firebaseClient from "../lib/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const quotes = [
  "That’s the thing about books. They let you travel without moving your feet.”– Jhumpa Lahiri",
  "If you don’t like to read, you haven’t found the right book.”\n– J.K. Rowling",
  "पुस्तके आणि चांगली माणस लगेच काळात नाही त्यांना वाचव लागतं.”",
  "Fill your house with stacks of books, in all the crannies and all the nooks.”\n– Dr Seuss",
  "′Classic′ – a book which people praise and don’t read.”\n– Mark Twain",
  "Sleep is good, he said, and books are better.”– George R.R. Martin",
  "The library is inhabited by spirits that come out of the pages at night.”– Isabel Allende",
  "One glance at a book and you hear the voice of another person, perhaps someone dead for 1,000 years. To read is to voyage through time.”\n– Carl Sagan",
];

const QuoteIcon = createIcon({
  viewBox: "0 0 50 37",
  d:
    "M49.6 4.712C47.2853 5.952 45.4253 7.15067 44.02 8.308C42.6973 9.38267 41.664 10.4573 40.92 11.532C40.176 12.524 39.68 13.4747 39.432 14.384C39.2667 15.2933 39.184 16.1613 39.184 16.988C39.184 18.476 39.8453 19.22 41.168 19.22C46.9547 19.22 49.848 21.948 49.848 27.404C49.848 30.4627 48.98 32.8187 47.244 34.472C45.508 36.1253 43.1107 36.952 40.052 36.952C36.332 36.952 33.48 35.8773 31.496 33.728C29.512 31.496 28.52 28.272 28.52 24.056C28.52 18.4347 30.0907 13.764 33.232 10.044C36.3733 6.24134 40.8787 2.89334 46.748 0L49.6 4.712ZM20.956 4.712C18.6413 5.952 16.7813 7.15067 15.376 8.308C14.0533 9.38267 13.02 10.4573 12.276 11.532C11.532 12.524 11.036 13.4747 10.788 14.384C10.6227 15.2933 10.54 16.1613 10.54 16.988C10.54 18.476 11.2013 19.22 12.524 19.22C18.3107 19.22 21.204 21.948 21.204 27.404C21.204 30.4627 20.336 32.8187 18.6 34.472C16.864 36.1253 14.4667 36.952 11.408 36.952C7.688 36.952 4.836 35.8773 2.852 33.728C0.950667 31.496 0 28.272 0 24.056C0 18.4347 1.52933 13.764 4.588 10.044C7.72933 6.24134 12.2347 2.89334 18.104 0L20.956 4.712Z",
});

export default function Home() {
  firebaseClient();
  const { user } = useAuth();
  const bg = useColorModeValue("gray.100", "gray.700");
  const [usr, setUser] = useState({});

  const getUsr = async (userId) => {
    await firebase
      .database()
      .ref("/Users/" + userId)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }

        setUser(snapshot.val());
      });
  };
  // useEffect(() => {
  //   if (user) {
  //     let timer1 = setTimeout(() => {
  //       firebase
  //         .database()
  //         .ref("/Users/" + firebase.auth().currentUser.uid)
  //         .once("value")
  //         .then((snapshot) => {
  //           // if (snapshot.exists()) {
  //           //   console.log(snapshot.val());
  //           // } else {
  //           //   console.log("No data available");
  //           // }

  //           setUser(snapshot.val());
  //         });
  //     }, 1 * 1000);

  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   }
  // }, []);
  if (user) {
    getUsr(user.uid);
  }
  return (
    <>
      <Container>
        <Box pl={20} pr={20} w="90vw">
          <Flex direction="row" align="">
            <QuoteIcon
              alignSelf="flex-start"
              color={useColorModeValue("gray.700", "gray.300")}
              fontSize={{ base: "3xl", md: "6xl" }}
            />
          </Flex>
          <Heading fontSize="5rem" ml={4}>
            <Typewriter
              options={{
                strings: quotes,
                autoStart: true,
                loop: true,
              }}
            />
          </Heading>
        </Box>
        <Center>
          <Box
            w="60vw"
            p={20}
            my={12}
            ma="auto"
            rounded={6}
            alignItems="center"
          >
            <Text mt={8} textAlign="center" fontSize="2.5rem">
              {user && `Welcome, ${usr.fName + " " + usr.lName}`}
              {!user && "Seems like you haven't Logged-In"}
            </Text>

            <Center>
              <HStack mt={8} spacing={8}>
                {user && (
                  <BtnLink
                    minWidth="20%"
                    maxW="80%"
                    variant="outline"
                    colorScheme="blue"
                    fontSize="2rem"
                    p={8}
                    to="/dashboard"
                    isDisable={!user}
                    height="50px"
                  >
                    GO INSIDE
                  </BtnLink>
                )}

                {!user && (
                  <BtnLink
                    minWidth="20%"
                    maxW="80%"
                    variant="outline"
                    colorScheme="green"
                    fontSize="2rem"
                    p={8}
                    isDisable={user}
                    to="/login"
                    height="50px"
                  >
                    LOGIN
                  </BtnLink>
                )}
              </HStack>
            </Center>
          </Box>
        </Center>

        {/* <Container>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {[...Array(8)].map((e, i) => (
              <SkeletonLayout />
            ))}
          </Grid>
        </Container> */}
      </Container>
    </>
  );
}
