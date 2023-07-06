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
  const [errorApi, setErrorApi] = useState<boolean>(false);
  const { id: gameId } = useParams<{ id: string }>();
  const bookingId = window.location.pathname.split("/")[4]; // on divise l'url et on recupere le 4eme element ( la date )
  const url = decodeURIComponent(bookingId);
  const formattedString =
    url.charAt(0).toUpperCase() + url.slice(1).toLowerCase(); // on formate la date pour qu'elle corresponde au format de la bdd
  console.log(formattedString);

  const [game, setGame] = useState<Game | null>(null);
  const [participants, setParticipants] = useState<number>(0);
  const [participantData, setParticipantData] = useState<any[]>([]);
  const nameRegex = /^[a-zA-ZÀ-ÿ\-']+$/;

  const handleParticipantInputChange = (
    // fonction qui recupere les données des participants via l'input et les inserts dans
    index: number, // ParticipantData
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

  const getAlldate = () => {
    let allDate: string[] = [];
    participantData.forEach((element, index) => { // récupère toute les dates de naissances de chaque user
      allDate.push(element.Date);
    });
    console.log(allDate, "test11");
    return allDate;
  };

  function calculerAge(dateNaissance: Date) {
    var dateActuelle = new Date();
    var anneeActuelle = dateActuelle.getFullYear();
    var moisActuel = dateActuelle.getMonth() + 1; // les mois sont indexés à partir de 0
    var jourActuel = dateActuelle.getDate();

    var anneeNaissance = dateNaissance.getFullYear();
    var moisNaissance = dateNaissance.getMonth() + 1;
    var jourNaissance = dateNaissance.getDate();

    var age = anneeActuelle - anneeNaissance;

    // Vérifier si l'anniversaire de la personne est déjà passé cette année
    if (
      moisActuel < moisNaissance ||
      (moisActuel === moisNaissance && jourActuel < jourNaissance)
    ) {
      age--;
    }

    return age;
  }

  const allAge = () => {
    const alldate = getAlldate();
    const allAge: number[] = [];

    alldate.forEach((elem) => {
      console.log(elem);
      const annee = parseInt(elem.split("-")[0]);
      const mois = parseInt(elem.split("-")[1]);
      const jour = parseInt(elem.split("-")[2]); // on découpe la date de naissance pour la fonction Date()

      console.log(annee, "ANNEE");
      console.log(mois, "MOIS");
      console.log(jour, "JOUR");

      const dateNaissance = new Date(annee, mois, jour);
      console.log(dateNaissance, "DATE DE NAISSANCE");
      const age = calculerAge(dateNaissance); // on récupère tout les ages en années
      console.log(age);
      allAge.push(age);
      console.log(allAge);
    });

    return allAge;
  };

  const isAdult = () => {
    const allAges: number[] = allAge();
    let adulteOrNot = false;
    allAges.forEach((elem) => { // on regarde si une des personnes qui participe au game est majeur ou non
      if (elem >= 18) {
        adulteOrNot = true;
      }
    });
    return adulteOrNot;
  };
  const isLess10y = () => {
    const allAges: number[] = allAge();
    let less10 = false;
    allAges.forEach((elem) => {
      if (elem < 10) {
        less10 = true;
      }
    });
    return less10;
  };

  useEffect(() => {
    fetch(`http://localhost:3000/games/${gameId}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      })
      .catch(function (error) {
        console.log(error);
        setErrorApi(true);
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
        gameName: game?.name,
        disponibility: [
          {
            date: formattedString,
            users: participantData,
          },
        ],
        userId: localStorage.getItem("userId"),
        id: uuidv4(),
      },
    };
    if (isAdult() && !isLess10y()) {
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
          accountService.logout();
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
    } else {
      alert(
        "Au moins une personne doit avoir plus de 18 ans et tous les utilisateurs doivent avoir plus de 10 ans"
      );
    }
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
      {errorApi ? (
        <div className="error">
          <h1>Sorry, le Loup de valmorel à mangé tous les cables !</h1>
          <img src="/src/images/grandMechantLoup.jpeg" />{" "}
        </div>
      ) : (
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
              <form
                className="formBookingAll"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="formBooking">{gameForms}</div>

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
              </form>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Booking;
