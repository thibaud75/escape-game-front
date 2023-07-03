import React from "react";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./History.css";

interface User {
  Prenom: string;
  Nom: string;
  Date: string;
}

interface ReservHistory {
  userId: string;
  gameId: string;
  disponibility: [
    {
      date: string;
      users: User[];
    }
  ];
}

const History = () => {
  const [reservHistory, setReservHistory] = useState<ReservHistory[]>([]);
  const [arrayTimestamp, setArrayTimestamp] = useState<number[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:3000/disponibility/history/" +
        localStorage.getItem("userId")
    )
      .then((response) => response.json())
      .then((data) => {
        setReservHistory(data);
        console.log(data);
      });
  }, []);

  function particule() {
    const userName = localStorage.getItem("userName");
    const checkLetter = userName.charAt(0).toLowerCase();

    if (
      checkLetter === "a" ||
      checkLetter === "e" ||
      checkLetter === "i" ||
      checkLetter === "o" ||
      checkLetter === "u" ||
      checkLetter === "y"
    ) {
      return <h2 className="h2resa">Réservations d' {userName}</h2>;
    } else {
      return <h2 className="h2resa">Réservations de {userName}</h2>;
    }
  }

  const getMonthNumber = (monthName: string) => {
    const date = new Date(`${monthName} 1, 2000`);
    return date.toLocaleString("fr-FR", { month: "numeric" });
  };

  const getTimestamp = () => {
    const dateString: string[] = [];

    reservHistory.forEach((element, index) => {
      dateString.push(element.disponibility[0].date);

      // Convertir le jour de la semaine en numéro (0 pour dimanche, 1 pour lundi, etc.)
      const dayOfWeek = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ].indexOf(dateString[index].split(" ")[0]);

      // Extraire le jour et le mois de la date
      const day = dateString[index].split(" ")[1];
      const month = getMonthNumber(dateString[index].split(" ")[2]);
      console.log(month);

      // Extraire l'année de la date
      const year = dateString[index].split(" ")[3];

      // Déterminer l'heure en fonction de la partie "matin" ou "après-midi"
      const time = dateString[index].includes("matin")
        ? "10:00:00"
        : "14:00:00";

      // console.log(year, day, time);
      // Construire la date au format ISO 8601
      const isoDate = new Date(`${year}-02-${day}T${time}`);
      // console.log();

      // Obtenir le timestamp en millisecondes
      const timestamp = isoDate.getTime();

      setArrayTimestamp((prevArray) => [...prevArray, timestamp]);
    });
  };

  useEffect(() => {
    getTimestamp();
  }, [reservHistory]);

  console.log(arrayTimestamp);

  return (
    <>
      <Nav />
      <div className="reservAll">
        {reservHistory.length !== 0 ? (
          <>
            {particule()}
            {reservHistory.map((elem, index) => (
              <div className="reservOne" key={index}>
                <h3>
                  Votre réservation pour la salle {elem.gameId} le{" "}
                  {elem.disponibility[0].date}
                </h3>
                <div className="PAndS">
                  <div className="Party">
                    <p className="participantsList">Participants :</p>
                    <ul>
                      {elem.disponibility[0].users.map((user, userIndex) => (
                        <li className="participants" key={userIndex}>
                          {user.Prenom} {user.Nom} né le {user.Date}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>Status : Evenement en attente</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h2 className="h2resa">Vous n'avez jamais rien réservé!</h2>
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;
