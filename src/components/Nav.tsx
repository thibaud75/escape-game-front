import { useState } from "react";
import Auth from "../pages/Auth";
import { Outlet, Link } from "react-router-dom";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

export default function Nav() {
  const navigate = useNavigate();

  function onConnexion() {
    accountService.logout();
    setIsConnect(false);
  }

  function onHistory() {
    navigate("/history");
  }

  const [isConnect, setIsConnect] = useState(accountService.isLogged());

  return (
    <header>
      <Link to="/">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-escapegame-blanc.png"
        />
      </Link>
      {isConnect == true && <h1>Bonjour {localStorage.getItem("userName")}</h1>}
      <div className="droite">
        <span
          id="history"
          onClick={() => {
            onHistory();
          }}
        >
          {isConnect == true && <button className="navBtn">Historique</button>}
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
              "Déconnexion"
            ) : (
              <Link to="/auth">Connexion</Link>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
