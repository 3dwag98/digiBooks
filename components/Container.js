import React from "react";
import { Flex } from "@chakra-ui/react";

export default function Container({ children }) {
  return (
    <>
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        p={8}
        minH="65vh"
      >  
        {children}
      </Flex>
    </>
  );
}
