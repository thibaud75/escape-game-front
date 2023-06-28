import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameForm from "../components/GameForm";

interface Game {
  name: string;
  description: string;
  image: string;
  id: string;
  capacity: number[];
}

const Booking = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis l'URL
  const [game, setGame] = useState<Game | null>(null);
  const [participants, setParticipants] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:3000/games/" + id)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      });
  }, []);

  const handleParticipantsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setParticipants(value);
    console.log(value);
  };

  const gameForms = [];
  for (let i = 0; i < participants; i++) {
    if (!isNaN(participants)) {
      gameForms.push(
        <div key={i}>
          <GameForm />
        </div>
      );
    }
  }

  console.log(game);

  return (
    <div>
      <Nav />
      <div className="flex-layout">
        {game && (
          <div className="div-game">
            <img src={game.image} alt={game.name} />
            <p className="reserv-date">
              Vous allez réserver la salle {game.name}
            </p>
            <p className="reserv-capacity">
              Le nombre de participants doit être compris entre
              {" " + game.capacity[0]} et
              {" " + game.capacity[game.capacity.length - 1]}
            </p>
            <select
              value={participants ?? ""}
              onChange={handleParticipantsChange}
            >
              <option value="">Nombre de participants</option>
              {game.capacity.map((capacity, index) => (
                <option key={index} value={capacity}>
                  {capacity}
                </option>
              ))}
            </select>
            <form onSubmit={(e) => e}>{gameForms}</form>
            <button type="submit"></button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
