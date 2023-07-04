import { useEffect, useState } from "react";
import Auth from "../pages/Auth";
import LogoEscape from "./Logo";
import { Outlet, Link } from "react-router-dom";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { accountService } from "../_services/account.service";
import { UserDataContext } from "../pages/UserDataContext";
import "./Nav.css";
import React, { useContext } from "react";

export default function Nav() {
  const [isConnect, setIsConnect] = useState(accountService.isLogged());
  const { userData, updateUserData } = useContext(UserDataContext);

  console.log(userData);
  const navigate = useNavigate();

  function onDeconnexion() {
    accountService.logout();
    setIsConnect(false);
    updateUserData({
      name: "",
      email: "",
      lastname: "",
      birthday: "",
      date: "",
      role: "",
    });
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
          {isConnect == true && userData.role === "admin" ? (
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
          ) : isConnect === true && userData.role !== "admin" ? (
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
          <button className="navBtn" id="connexion">
            {isConnect == true ? (
              <Link
                onClick={() => {
                  onDeconnexion();
                }}
                to="/"
              >
                Déconnexion
              </Link>
            ) : (
              <Link to="/auth">Connexion</Link>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
