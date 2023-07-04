import { useEffect, useState } from "react";
import Auth from "../pages/Auth";
import LogoEscape from "./Logo";
import { Outlet, Link } from "react-router-dom";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { accountService } from "../_services/account.service";
import "./Nav.css";

export default function Nav() {
  const [isConnect, setIsConnect] = useState(accountService.isLogged());
  const [dataUser, setDataUser] = useState<string[]>([]);

  const getUserData = () => {
    fetch("http://localhost:3000/auth/infos/" + localStorage.getItem("userId"))
      .then((response) => response.json())
      .then((data) => {
        setDataUser(data);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(dataUser);
  const navigate = useNavigate();

  function onConnexion() {
    accountService.logout();
    setIsConnect(false);
  }

  function onHistory() {
    navigate("/history");
  }

  function onAdmin() {
    navigate("/admin");
  }

  return (
    <header>
      <Link to="/">
        {/* <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-escapegame-blanc.png"
        /> */}
        <LogoEscape></LogoEscape>
      </Link>
      {isConnect == true && (
        <h1 className="UserNameTitle">
          Bonjour {localStorage.getItem("userName")}
        </h1>
      )}
      <div className="droite">
        <span>
          {isConnect == true && dataUser.role === "admin" ? (
            <div>
              <button
                id="history"
                onClick={() => {
                  onAdmin();
                }}
                className="navBtn"
              >
                Admin
              </button>
              <button
                id="history"
                onClick={() => {
                  onHistory();
                }}
                className="navBtn"
              >
                Historique
              </button>
            </div>
          ) : isConnect === true && dataUser.role !== "admin" ? (
            <button
              id="history"
              onClick={() => {
                onHistory();
              }}
              className="navBtn"
            >
              Historique
            </button>
          ) : (
            ""
          )}
        </span>
        {useLocation().pathname != "/auth" && (
          <button
            className="navBtn"
            id="connexion"
            onClick={() => {
              onConnexion();
            }}
          >
            {isConnect == true ? (
              <Link to="/">Déconnexion</Link>
            ) : (
              <Link to="/auth">Connexion</Link>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
