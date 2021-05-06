import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Head>
          <title>DigiBooks</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
