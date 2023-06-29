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

  const handleDateClick = (date: string) => {
    setSelectedDate((prevDate) => (prevDate === date ? "" : date));
  };
  console.log(selectedDate);

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

          return (
            <li key={index}>
              <p className="date">{formattedDate}</p>
              <p
                onClick={() => handleDateClick(morningTime)}
                className={isMorningSelected ? "morning selected" : "morning"}
              >
                MATIN
              </p>
              <p
                onClick={() => handleDateClick(afternoonTime)}
                className={
                  isAfternoonSelected ? "afternoon selected" : "afternoon"
                }
              >
                APREM
              </p>
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
