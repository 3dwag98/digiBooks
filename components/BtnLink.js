import React from "react";
import Link from "next/link";
import { Button,Flex } from "@chakra-ui/react";

const BtnLink = ({ to, isDisable, children, ...rest }) => {
  return (
    <Flex as="div" width="100%" >
      {isDisable ? (
        <Button isDisabled={isDisable} {...rest}>
          <Link href="#">
            <a>{children}</a>
          </Link>
        </Button>
      ) : (
        <Button {...rest}>
          <Link href={to}>
            <a>{children}</a>
          </Link>
        </Button>
      )}
    </Flex>
  );
};

export default BtnLink;
