import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

interface Game {
  name: string;
  description: string;
  image: string;
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
                  <img src={elem.image} alt={elem.name} />
                  <h2 className="titre">{elem.name}</h2>
                  <p className="description">{elem.description}</p>
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
