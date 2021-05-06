import { AuthProvider } from "../lib/auth";
import { ChakraProvider, Button, useColorMode } from "@chakra-ui/react";
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
