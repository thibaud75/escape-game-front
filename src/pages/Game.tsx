import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MyCalendar from "../components/MyCalendar";

interface Game {
  name: string;
  description: string;
  image: string;
  id: string;
}

const Game = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis l'URL
  const [game, setGame] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/games/" + id)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="flex-layout">
        {game && (
          <div className="div-game">
            <img src={game.image} alt={game.name} />
            <h2 className="titre">{game.name}</h2>
            <p className="description">{game.description}</p>
          </div>
        )}
      </div>
      <MyCalendar />
      <Footer />
    </div>
  );
};

export default Game;
