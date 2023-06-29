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

      {/* <HiOutlineLogin /> */}
      <form className="formConnect" onSubmit={(e) => getData(e)}>
        <h1>connexion</h1>
        <input
          type="text"
          placeholder="e-mail"
          name="email"
          className="inputEmail"
        ></input>
        <input
          type="text"
          placeholder="Mot de passe"
          name="password"
          className="inputPassword"
        ></input>
        <div>
          <button type="submit" className="buttonSubmit">
            <span>connexion</span>
          </button>
        </div>
        <Link to="/signup">
          <button className="signInBtn">Vous n'avez pas de compte ?</button>
        </Link>
      </form>
      <Footer />
    </>
  );
}

export default Auth;
