import { Flex, Spacer } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
import React from "react";

function SkeletonLayout() {
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
      <SkeletonCircle alignSelf="center" h={100} w={100}></SkeletonCircle>
      <Spacer />

      <SkeletonText mt={5} color="gray.500"></SkeletonText>
      <Spacer />

      <SkeletonText mt={2} color="gray.500"></SkeletonText>
      <Spacer />

      <SkeletonText mt={2} color="gray.500"></SkeletonText>
      <Spacer />

      <SkeletonText
        ml="1"
        colorScheme="green"
        width="fit-content"
        p={1}
      ></SkeletonText>
      <Spacer />

      <SkeletonCircle
        variant="outline"
        colorScheme="yellow"
        width="100%"
      ></SkeletonCircle>
    </Flex>
  );
}
export default SkeletonLayout;
