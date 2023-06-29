import { useState } from "react";
import "./Inscription.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";


function Auth() {
  const navigate = useNavigate()
  const getData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    let newEmail = email as string;

    const password = formData.get("password");
    let newPassword = password as string;

    const name = formData.get("name");
    let newName = name as string;

    const lastname = formData.get("lastname");
    let newLastname = lastname as string;

    const data = {
      email: newEmail,
      password: newPassword,
      name: newName,
      lastname: newLastname,
      id: uuidv4(),
    };

    callApi(data);
  };

  function callApi(login: {}) {
    fetch(`http://localhost:3000/auth/signup`, {
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
        navigate("/auth")
      });
  }
  return (
    <>
      <Nav />
      <form className="FormInscription" onSubmit={(e) => getData(e)}>
        <h1>Inscription</h1>
        <input
          className="inputName"
          type="text"
          placeholder="e-mail"
          name="email"
        ></input>
        <input
          className="inputName"
          type="text"
          placeholder="Mot de passe"
          name="password"
        ></input>
        <input
          className="inputName"
          type="text"
          placeholder="Prenom"
          name="name"
        ></input>
        <input
          className="inputName"
          type="text"
          placeholder="Nom"
          name="lastname"
        ></input>
        <div>
          <button type="submit" className="buttonSubmit">
            <span>Inscription</span>
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Auth;
