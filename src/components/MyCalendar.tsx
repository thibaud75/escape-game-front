import React, { useEffect, useState } from "react";
import "./MyCalendar.css";
import { Outlet, Link, useParams } from "react-router-dom";

interface CreneauxHorraire {
  date: string;
  id: number;
}

const MyCalendar = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis l'URL

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

  useEffect(() => {
    fetch("http://localhost:3000/disponibility/getdates/" + id)
      .then((response) => response.json())
      .then((data) => {
        const dates = data.map((element: any) => element.disponibility[0].date);
        setArrayPush(dates);
      })
      .catch((error) => {
        console.log("Erreur de date", error);
      });
  }, []);

  useEffect(() => {
    const initialButtonStates = tableOfAllDate.map((date) =>
      arrayPush.includes(date)
    );
    setButtonStates(initialButtonStates);
  }, [arrayPush]);

  console.log(arrayPush);

  return (
    <div>
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
            <li key={index}>
              <p className="date">{formattedDate}</p>
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
                APREM
              </button>
            </li>
          );
        })}
      </ul>
      {selectedDate && (
        <Link to={`/game/${id}/booking/${selectedDate}`}>
          <button>Réserver</button>
        </Link>
      )}
    </div>
  );
};

export default MyCalendar;
