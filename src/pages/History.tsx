import React from "react";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const History = () => {
  useEffect(() => {
    fetch(
      "http://localhost:3000/disponibility/history/" +
        localStorage.getItem("userId")
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  //   console.log(localStorage.getItem("us"))
  return (
    <>
      <Nav />

      <Footer />
    </>
  );
};

export default History;
