import React from "react";
import Header from "./Navbar";
import Footer from "./Footer";

export default function Container({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
