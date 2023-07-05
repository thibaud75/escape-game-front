import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

interface Game {
  name: string;
  petiteDesc: string;
  image: string;
  id: string;
}

function App() {
  const [game, setGame] = useState<Game[]>([]);
  const [errorApi, setErrorApi] = useState<boolean>(false);

  const getGames = () => {
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => {
        const gameAvailable = data.filter((elem) => elem.available === true);
        setGame(gameAvailable);
      })
      .catch(function (error) {
        console.log(error);
        setErrorApi(true);
      });
  };

  useEffect(() => {
    getGames();
  }, []);

  // console.log(game);

  const closeGame = (game) => {
    fetch("http://localhost:3000/games/closegame/" + game, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getGames();
        console.log(data);
      });
  };

  return (
    <>
      <Nav />
      {errorApi ? (
        <div className="error">
          <h1>Sorry, le Loup de valmorel à mangé tous les cables !</h1>
          <img src="../src/images/grandMechantLoup.jpeg" />{" "}
        </div>
      ) : (
        <div className="page">
          <h1 className="title">
            Bienvenue sur le site de réservation d'<em>Escape Game</em> !
          </h1>
          <div className="gamesAll">
            {game.map((elem, index) => {
              return (
                <React.Fragment key={index}>
                  {/* <div> */}
                  <Link to={`/game/${elem.id}`} className="div-game">
                    <div>
                      <img
                        className="imgApp"
                        src={elem.image}
                        alt={elem.name}
                      />
                      <h2 className="titre">{elem.name}</h2>
                      <p className="description">{elem.petiteDesc}</p>
                    </div>
                    {/* <button onClick={() => closeGame(elem.id)}>
                      FERMER LA SALLE
                    </button> */}
                  </Link>
                  {/* </div> */}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
