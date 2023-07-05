import React, { useEffect, useState, useContext } from "react";
import "./MyCalendar.css";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { accountService } from "../_services/account.service";
import { UserDataContext } from "../pages/UserDataContext";
import { v4 as uuidv4 } from "uuid";

interface CreneauxHorraire {
  date: string;
  id: number;
}

const MyCalendar = () => {
  const { userData } = useContext(UserDataContext);
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();

  const getFutureDates = () => {
    const today = new Date();
    const futureDates = [];
    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i + 1
      );
      futureDates.push(futureDate);
    }
    return futureDates;
  };

  const formatDate = (date: any) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  const futureDates = getFutureDates();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [arrayPush, setArrayPush] = useState<string[]>([]);
  const [buttonStates, setButtonStates] = useState<boolean[]>(
    Array(14).fill(false)
  );
  const [gameName, setGameName] = useState<string>("");

  let tableOfAllDate: string[] = [];
  futureDates.forEach((elem) => {
    const formattedDate = formatDate(elem);
    const capitalizedDay =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    tableOfAllDate.push(capitalizedDay + " matin");
    tableOfAllDate.push(capitalizedDay + " aprem");
  });

  console.log(tableOfAllDate);

  const handleDateClick = (date: string) => {
    setSelectedDate((prevDate) => (prevDate === date ? "" : date));
  };

  const getDates = () => {
    fetch("http://localhost:3000/disponibility/getdates/" + id)
      .then((response) => response.json())
      .then((data) => {
        const dates = data.map((element: any) => element.disponibility[0].date);
        setArrayPush(dates);
        const gameName = data[0]?.gameName || "";
        setGameName(gameName);
      })
      .catch((error) => {
        console.log("Erreur de date", error);
      });
  };

  useEffect(() => {
    getDates();
  }, []);

  console.log(gameName);
  useEffect(() => {
    const initialButtonStates = tableOfAllDate.map((date) =>
      arrayPush.includes(date)
    );
    setButtonStates(initialButtonStates);
  }, [arrayPush]);

  console.log(arrayPush);

  const closeRoom = (date: string) => {
    const formattedString =
      date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();
    console.log(formattedString);
    const body = {
      dispo: {
        gameId: id,
        gameName: gameName,
        disponibility: [
          {
            date: formattedString,
            users: { Prenom: "Admin", Nom: "Admin", Date: "1982-01-01" },
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
          "Vous n'êtes pas autorisé à fermer une salle. Plus d'informations: " +
            "statut: " +
            response.statusText +
            " erreur " +
            response.status
        );
      } else {
        response
          .json()
          .then((data) => {
            console.log(response);
            console.log(data);
            getDates();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="pageCalendar">
      <h2>Disponibilités</h2>
      <ul className="list-day">
        {futureDates.map((date, index) => {
          const formattedDate = formatDate(date);
          const morningTime = formattedDate + " MATIN";
          const afternoonTime = formattedDate + " APREM";
          const isMorningSelected = selectedDate === morningTime;
          const isAfternoonSelected = selectedDate === afternoonTime;

          // Attribue true ou false en fonction de l'id du boutton
          const initialMorningState = buttonStates[index * 2];
          const initialAfternoonState = buttonStates[index * 2 + 1];

          return (
            <li key={index} className="liResa">
              <p className="date">{formattedDate}</p>
              <div className="buttonResa">
                <button
                  onClick={() => handleDateClick(morningTime)}
                  className={isMorningSelected ? "morning selected" : "morning"}
                  disabled={initialMorningState}
                >
                  MATIN
                </button>
                <button
                  onClick={() => handleDateClick(afternoonTime)}
                  className={
                    isAfternoonSelected ? "afternoon selected" : "afternoon"
                  }
                  disabled={initialAfternoonState}
                >
                  APRES-MIDI
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {selectedDate && userData.role === "admin" ? (
        <>
          <button
            className="buttonSubmit"
            onClick={() => {
              if (accountService.isLogged()) {
                navigate(`/game/${id}/booking/${selectedDate}`);
              } else {
                alert("Veuillez vous connecter avant de réserver une salle !");
              }
            }}
          >
            <span>Réserver</span>
          </button>
          <button
            onClick={() => {
              closeRoom(selectedDate);
            }}
          >
            Fermer la salle
          </button>
        </>
      ) : selectedDate ? (
        <button
          className="buttonSubmit"
          onClick={() => {
            if (accountService.isLogged()) {
              navigate(`/game/${id}/booking/${selectedDate}`);
            } else {
              alert("Veuillez vous connecter avant de réserver une salle !");
            }
          }}
        >
          <span>Réserver</span>
        </button>
      ) : null}
    </div>
  );
};
export default MyCalendar;
