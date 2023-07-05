import React from "react";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { accountService } from "../_services/account.service";
import "./History.css";

interface User {
  Prenom: string;
  Nom: string;
  Date: string;
}

interface ReservHistory {
  disponibility: {
    date: string;
    users: User[];
  }[];
  gameId: string;
  gameName: string;
  id: string;
  userId: string;
}

const History = () => {
  const [reservHistory, setReservHistory] = useState<ReservHistory[]>([]);

  const historyData = () => {
    fetch(
      "http://localhost:3000/disponibility/history/" +
        localStorage.getItem("userId")
    )
      .then((response) => response.json())
      .then((data) => {
        setReservHistory(data);
        console.log(data);
      });
  };

  useEffect(() => {
    historyData();
  }, []);

  function particule() {
    const userName = localStorage.getItem("userName");
    if (userName != null) {
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
    } else {
      alert("erreur");
    }
  }
  const convertToStandardDateFormat = (dateString: string) => {
    let lol1 = dateString.split(" ").slice(1, 5);
    let day = lol1[0];
    let month = convertMonthToNumber(lol1[1]) + " ";
    let year = lol1[2].slice(2) + " ";
    let hour = "";
    if (lol1[3] === "matin") hour = "09:00:00 ";
    else hour = "15:00:00 ";

    return month + day + ", " + year + hour + "GMT+0100";
  };

  const convertMonthToNumber = (month: string) => {
    const monthsMap: { [key: string]: string } = {
      janvier: "Jan",
      février: "Feb",
      mars: "Mar",
      avril: "Apr",
      mai: "May",
      juin: "Jun",
      juillet: "Jul",
      août: "Aug",
      septembre: "Sep",
      octobre: "Oct",
      novembre: "Nov",
      décembre: "Dec",
    };

    return monthsMap[month];
  };

  const sortedReservHistory = [...reservHistory].sort(
    (a: ReservHistory, b: ReservHistory) => {
      const dateA = convertToStandardDateFormat(a.disponibility[0].date);
      const dateB = convertToStandardDateFormat(b.disponibility[0].date);

      return new Date(dateA).getTime() - new Date(dateB).getTime();
    }
  );

  const isDatePassed = (date: string) => {
    const currentDate = new Date().getTime();
    const reservationDate = new Date(
      convertToStandardDateFormat(date)
    ).getTime();

    return currentDate > reservationDate;
  };

  const getClassNameForDate = (date: string) => {
    return isDatePassed(date) ? "red" : "green";
  };

  const deleteReservation = async (reservationId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/disponibility/deleteReservUser/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + accountService.getToken(),
          },
        }
      );

      if (response.ok) {
        // La réservation a été supprimée avec succès, effectuer les actions nécessaires
        console.log("Réservation supprimée avec succès !");
        // Mettre à jour la liste des réservations après la suppression
        const data = await response.json();
        historyData();
      } else {
        // La requête a échoué, afficher un message d'erreur ou rediriger l'utilisateur
        console.error("Erreur lors de la suppression de la réservation");
      }
    } catch (error) {
      console.error("Erreur lors de la requête API", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="reservAll">
        {sortedReservHistory.length !== 0 ? (
          <>
            {particule()}
            {sortedReservHistory.map((elem, index) => (
              <div className="reservOne" key={index}>
                <h3>
                  Votre réservation pour la salle {elem.gameName} le{" "}
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
                  <div className="eventAndDelete">
                    <span
                      className={getClassNameForDate(
                        elem.disponibility[0].date
                      )}
                    >
                      {isDatePassed(elem.disponibility[0].date)
                        ? "Statut: Evenement passé"
                        : "Statut: Evenement à venir"}
                    </span>
                    <span>
                      {isDatePassed(elem.disponibility[0].date) ? (
                        ""
                      ) : (
                        <button
                          className="deleteButton"
                          onClick={() => deleteReservation(elem.id)}
                        >
                          Annuler
                        </button>
                      )}
                    </span>
                  </div>
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
