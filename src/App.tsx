import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet, Link } from "react-router-dom";

interface Game {
  name: string;
  petiteDesc: string;
  image: string;
  id: string;
}

function App() {
  const [game, setGame] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      });
  }, []);

  console.log(game);

  return (
    <>
      <Nav />
      <div>
        <h1 className="title">Bienvenue sur l'escape game des fou furieux</h1>
        <div className="flex-layout">
          {game.map((elem) => {
            return (
              <>
                <div className="div-game">
                  <Link to={`/game/${elem.id}`} className="game-link">
                    <img src={elem.image} alt={elem.name} />
                  </Link>
                  <h2 className="titre">{elem.name}</h2>
                  <p className="description">{elem.petiteDesc}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
