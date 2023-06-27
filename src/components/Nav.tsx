import { useState } from "react";
import Auth from "../pages/Auth";
import { Outlet, Link } from "react-router-dom";
import { Route, useLocation } from "react-router-dom";

export default function Nav() {
  const name = "blabla";
  // object.name
  function onConnexion() {
    if (isConnect == true) {
      setIsConnect(false);
    }
  }

  function onHistory() {
    alert(`la page d'historique n'est pas encore disponible`);
  }

  const [isConnect, setIsConnect] = useState(false);

  return (
    <header>
      <Link to="/">
        <span>Escape Game</span>
      </Link>
      {isConnect == true && <h1>Bonjour {name}</h1>}
      <div className="droite">
        <span
          id="history"
          onClick={() => {
            onHistory();
          }}
        >
          {isConnect == true && "Historique"}
        </span>
        {useLocation().pathname != "/auth" && (
          <span
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
          </span>
        )}
      </div>
    </header>
  );
}
