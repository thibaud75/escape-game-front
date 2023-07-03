import { useState, useEffect, ChangeEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameForm from "../components/GameForm";
import "./Booking.css";
import { accountService } from "../_services/account.service";
import { v4 as uuidv4 } from "uuid";

interface ParticipantData {
  Nom: string;
  Prenom: string;
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
  const nameRegex = /^[a-zA-ZÀ-ÿ\-']+$/;

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

    setParticipantData((prevData) => {
      if (value > prevData.length) {
        const newData = [...prevData];
        for (let i = prevData.length; i < value; i++) {
          newData.push({
            Nom: "",
            Prenom: "",
            Date: "",
          });
        }
        return newData;
      } else if (value < prevData.length) {
        return prevData.slice(0, value);
      } else {
        return prevData;
      }
    });
  };

  const handleSubmit = () => {
    if (participantData.length === 0) {
      alert("Veuillez remplir les informations des participants");
      return;
    }

    let isValid = true;

    for (let i = 0; i < participantData.length; i++) {
      const element = participantData[i];
      const isPrenomValid = nameRegex.test(element.Prenom);
      const isNomValid = nameRegex.test(element.Nom);

      if (Object.values(element).some((value) => value === "")) {
        alert("Veuillez remplir tous les champs!");
        isValid = false;
        break;
      } else if (
        element.Prenom === "" ||
        element.Nom === "" ||
        element.Date === ""
      ) {
        alert("Veuillez remplir tous les champs!");
        isValid = false;
        break;
      } else if (!isPrenomValid) {
        alert("Les prénoms des participants doivent être valides!");
        isValid = false;
        break;
      } else if (!isNomValid) {
        alert("Les noms des participants doivent être valides!");
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      return;
    }

    const body = {
      dispo: {
        gameId: gameId,
        gameName: game.name,
        date: formattedString,
        disponibility: [
          {
            users: participantData,
          },
        ],
        userId: localStorage.getItem("userId"),
        id: uuidv4(),
      },
    };

    fetch("http://localhost:3000/disponibility/reserveform", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accountService.getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok === false) {
        alert(
          "Vous n'êtes pas autorisé à reservé une salle. Plus d'informations: " +
            "statut: " +
            response.statusText +
            " erreur " +
            response.status
        );
        navigate("/auth");
      } else {
        response
          .json()
          .then((data) => {
            console.log(response);
            console.log(data);
            navigate("/succesOrder/" + data.dispo.id);
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
            <select value={participants} onChange={handleParticipantsChange}>
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
