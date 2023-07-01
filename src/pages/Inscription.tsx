import { useState } from "react";
import "./Inscription.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ\-']+$/;
  const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

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

    if (
      emailRegex.test(newEmail) &&
      nameRegex.test(newName) &&
      // nameRegex.test(newName) &&
      // nameRegex.test(newLastname)
      nameRegex.test(newLastname) &&
      newPassword.length > 0
    ) {
      callApi(data);
    } else if (!emailRegex.test(newEmail)) {
      alert("veuillez entrer une adresse mail valide");
    } else if (!nameRegex.test(newName)) {
      alert("veuillez entrer un prénom valide");
    } else if (!nameRegex.test(newLastname)) {
      alert("veuillez entrer un nom valide");
    } else {
      alert("Veuillez remplir tous les champs");
    }
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
        navigate("/auth");
      });
  }

  const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailRegex.test(e.target.value)) {
      return <p>Adresse email invalide</p>;
    }
  };

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
          onChange={(e) => checkInput(e)}
        ></input>
        <p></p>
        <input
          className="inputName"
          type="text"
          placeholder="Mot de passe"
          name="password"
        ></input>
        <p></p>
        <input
          className="inputName"
          type="text"
          placeholder="Prenom"
          name="name"
        ></input>
        <p></p>
        <input
          className="inputName"
          type="text"
          placeholder="Nom"
          name="lastname"
        ></input>
        <p></p>
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
