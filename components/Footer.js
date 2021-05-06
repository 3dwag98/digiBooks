import React from "react";
import { ButtonGroup, IconButton, Box, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="#"
      aria-label="LinkedIn"
      icon={<FaLinkedin fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="#"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="#"
      aria-label="Twitter"
      icon={<FaTwitter fontSize="20px" />}
    />
  </ButtonGroup>
);

const Footer = (props) => {
  return (
    <>
      <Box
        as="footer"
        role="contentinfo"
        mx="auto"
        maxW="7xl"
        py="8"
        px={{
          base: "4",
          md: "8",
        }}
      >
        <Stack>
          <Stack
            direction="row"
            spacing="4"
            align="center"
            justify="space-between"
          >
            <Text fontSize="x-large">Digi-Books</Text>

            <SocialMediaLinks />
          </Stack>
          <Text
            fontSize="sm"
            alignSelf={{
              base: "center",
              sm: "start",
            }}
          >
            &copy; {new Date().getFullYear()} Company, Inc. All rights reserved.
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
