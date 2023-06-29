import { useState, useEffect, ChangeEventHandler } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameForm from "../components/GameForm";
import "./Booking.css";
import { accountService } from "../_services/account.service";

interface Game {
  name: string;
  description: string;
  image: string;
  id: string;
  capacity: number[];
}

const Booking = () => {
  const { id: gameId } = useParams<{ id: string }>();
  const bookingId = window.location.pathname.split("/")[4];
  const url = decodeURIComponent(bookingId);
  const formattedString =
    url.charAt(0).toUpperCase() + url.slice(1).toLowerCase();
  console.log(formattedString);

  const [game, setGame] = useState<Game | null>(null);
  const [participants, setParticipants] = useState<number>(0);

  useEffect(() => {
    fetch(`http://localhost:3000/games/${gameId}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      });
  }, [gameId]);

  const handleParticipantsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value);
    setParticipants(value);
    console.log(value);
  };

  const handleSubmit = () => {
    // Construire le corps de la requête
    const body = {
      dispo: {
        gameId: gameId,
        disponibility: [
          {
            date: formattedString,
          },
        ],
        userId: localStorage.getItem('userId')
      },
    };
    
    // Envoyer la requête POST
    fetch("http://localhost:3000/disponibility/reserveform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // Traiter la réponse de la requête
        console.log(data);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(error);
      });
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

  // console.log(game);

  return (
    <div>
      <Nav />
      <div className="flex-layout">
        {game && (
          <div className="div2">
            <img src={game.image} alt={game.name} />
            <p className="reserv-date">
              Vous allez réserver la salle {game.name}
            </p>
            <p className="reserv-capacity">
              Le nombre de participants doit être compris entre{" "}
              {` ${game.capacity[0]} et ${
                game.capacity[game.capacity.length - 1]
              }`}
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
            <form onSubmit={(e) => e.preventDefault()}>{gameForms}</form>
            <button
              className="buttonSubmit"
              type="submit"
              onClick={handleSubmit}
            >
              <span>Réserver</span>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
