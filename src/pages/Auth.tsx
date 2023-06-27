import { useState } from "react";
import "./Auth.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { HiOutlineLogin } from "react-icons/hi";
import { Outlet, Link } from "react-router-dom";

function Auth() {
  const getData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    let newEmail = email as string;

    const password = formData.get("password");
    let newPassword = password as string;

    const data = {
      email: newEmail,
      password: newPassword,
    };

    callApi(data);
  };

  function callApi(login: {}) {
    fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <>
      <Nav />
      <div>
        <h1 className="connexion">connexion</h1>
        {/* <HiOutlineLogin /> */}
        <form onSubmit={(e) => getData(e)}>
          <input
            type="text"
            placeholder="email"
            name="email"
            className="inputEmail"
          ></input>
          <input
            type="text"
            placeholder="mdp"
            name="password"
            className="inputPassword"
          ></input>
          <button type="submit" className="button-64">
            <span>Submit</span>
          </button>
        </form>
        <Link to="/signup" className="signInLink">
          Inscription
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Auth;
