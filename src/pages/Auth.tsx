import { useState } from "react";
import "./Auth.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { HiOutlineLogin } from "react-icons/hi";
import { Outlet, Link, useNavigate} from "react-router-dom";
import { accountService } from "../_services/account.service";



  

function Auth() {

  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate()

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
        accountService.saveToken(data.token)
        accountService.saveUserId(data.userId)
        console.log('test')
        navigate("/")
      })
      
  }
  return (
    <>
      <Nav />
      <div className="formConnect">
        <h1 className="connexion">connexion</h1>
        {/* <HiOutlineLogin /> */}
        <form onSubmit={(e) => getData(e)}>
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
          <button type="submit" className="buttonSubmit">
            <span>Submit</span>
          </button>
        </form>
        <Link to="/signup">
          <button className="signInBtn">Inscription</button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Auth;
