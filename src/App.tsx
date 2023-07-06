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
    fetch("http://localhost:3000/games") // on récupere toute la data de la route game qui possede nos images et ces infos.
      .then((response) => response.json()) 
      .then((data) => {
        const gameAvailable = data.filter((elem) => elem.available === true);
        setGame(gameAvailable);
      })
      .catch(function (error) {
        console.log(error);
        setErrorApi(true); // Nous indique si il y a eu une erreur et nous la reutiliserons plus tard
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
      {errorApi ? ( // nous affiche une image en cas d'erreur de l'apl api
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
            {game.map((elem, index) => { // une boucle pour afficher chaque element et Link pour rediriger vers la page suivante
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
