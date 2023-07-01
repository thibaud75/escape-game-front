import { useState, useEffect, ChangeEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameForm from "../components/GameForm";
import "./Booking.css";
import { accountService } from "../_services/account.service";

interface ParticipantData {
  Nom: string;
  Prénom: string;
  Date: string;
}

interface Game {
  name: string;
  description: string;
  image: string;
  id: string;
  capacity: number[];
}

const Booking = () => {
  const navigate = useNavigate();
  const { id: gameId } = useParams<{ id: string }>();
  const bookingId = window.location.pathname.split("/")[4];
  const url = decodeURIComponent(bookingId);
  const formattedString =
    url.charAt(0).toUpperCase() + url.slice(1).toLowerCase();
  console.log(formattedString);

  const [game, setGame] = useState<Game | null>(null);
  const [participants, setParticipants] = useState<number>(0);
  const [participantData, setParticipantData] = useState<any[]>([]);

  const handleParticipantInputChange = (
    index: number,
    data: ParticipantData
  ) => {
    setParticipantData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        ...data,
      };
      return newData;
    });
  };

  console.log(participantData);

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
    const body = {
      dispo: {
        gameId: gameId,
        disponibility: [
          {
            date: formattedString,
            users: participantData,
          },
        ],
        userId: localStorage.getItem("userId"),
      },
    };

    // Envoyer la requête POST
    fetch("http://localhost:3000/disponibility/reserveform", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accountService.getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // Traiter la réponse de la requête
        console.log(data);
        navigate("/succesOrder");
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
          <GameForm
            onInputChange={(data) => handleParticipantInputChange(i, data)}
          />
        </div>
      );
    }
  }

  return (
    <div>
      <Nav />
      <div className="pageBooking">
        {game && (
          <div className="div2">
            <div className="textDescBooking">
              <img className="imgBooking" src={game.image} alt={game.name} />
              <p className="reserv-date">
                Vous allez réserver la salle {game.name} le {formattedString}
              </p>
              <p className="reserv-capacity">
                Le nombre de participants doit être compris entre{" "}
                {` ${game.capacity[0]} et ${
                  game.capacity[game.capacity.length - 1]
                }`}
              </p>
            </div>
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
            <form className="formBooking" onSubmit={(e) => e.preventDefault()}>
              {gameForms}
            </form>
            <div>
              <button
                className="buttonSubmit"
                type="submit"
                onClick={() => {
                  accountService.isLogged()
                    ? handleSubmit()
                    : alert("Veuillez vous connecter!");
                }}
              >
                <span>Réserver</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
