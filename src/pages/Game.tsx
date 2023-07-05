import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MyCalendar from "../components/MyCalendar";
import "./Game.css";

interface Game {
  name: string;
  description: string;
  image: string;
  id: string;
}

const Game = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis l'URL
  const [game, setGame] = useState<Game>(); // Ne pas laisser les parenthèses vides
  const [errorApi, setErrorApi] = useState<boolean>(false)

  useEffect(() => {
    fetch("http://localhost:3000/games/" + id)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      })
      .catch(function(error){
        console.log(error)
        setErrorApi(true)
      });
  }, []);

  return (
    <div>
      <Nav />
      {errorApi ? (<div className="error"><h1>Sorry, le Loup de valmorel à mangé tous les cables !</h1>
        <img src="../src/images/grandMechantLoup.jpeg" /> </div>) : 
        (
          <>
          <div className="pageGame">
            {game && (
              <div className="gameOne">
                <img className="imgGame" src={game.image} alt={game.name} />
                <h2 className="titre">{game.name}</h2>
                <p className="description">{game.description}</p>
              </div>
            )}
          </div>
          <MyCalendar />
          </>

          )}
        
      <Footer />
    </div>
  );
};

export default Game;
