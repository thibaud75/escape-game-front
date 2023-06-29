import React from "react";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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

  return (
    <>
      <Nav />
      <div className="rerserve-div">
        <h2>Bonjour {localStorage.getItem("UserName")}</h2>
        {reservHistory.map((elem, index) => (
          <div className="div-all-reservById" key={index}>
            <h3>
              Votre réservation pour la salle {elem.gameId} le{" "}
              {elem.disponibility[0].date}
            </h3>
            <p>Voici la liste des participants :</p>
            <ul>
              {elem.disponibility[0].users.map((user, userIndex) => (
                <li key={userIndex}>
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
