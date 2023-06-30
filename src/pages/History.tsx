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
    if (
      localStorage.getItem("userName")?.charAt(0) == "A" ||
      "E" ||
      "I" ||
      "O" ||
      "U" ||
      "Y" ||
      "a" ||
      "e" ||
      "i" ||
      "o" ||
      "u" ||
      "y"
    ) {
      return <h2>Reservations d'{localStorage.getItem("userName")}</h2>;
    } else {
      return <h2>Reservations de {localStorage.getItem("userName")}</h2>;
    }
  }

  return (
    <>
      <Nav />
      <div className="reservAll">
        {particule()}
        {reservHistory.map((elem, index) => (
          <div className="reservOne" key={index}>
            <h3>
              Votre réservation pour la salle {elem.gameId} le{" "}
              {elem.disponibility[0].date}
            </h3>
            <p className="participantsList">Participants :</p>
            <ul>
              {elem.disponibility[0].users.map((user, userIndex) => (
                <li className="participants" key={userIndex}>
                  {user.Prenom} {user.Nom} né le {user.Date}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default History;
