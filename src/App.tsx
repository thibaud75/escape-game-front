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
      <div className="page">
        <h1 className="title">Escape Game</h1>
        <div className="gamesAll">
          {game.map((elem, index) => {
            return (
              <>
                <div className="div-game" key={index}>
                  <Link to={`/game/${elem.id}`} className="game-link">
                    <img className="imgApp" src={elem.image} alt={elem.name} />
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
