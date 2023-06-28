import React, { useEffect, useState } from "react";
import "./MyCalendar.css";
import { Outlet, Link } from "react-router-dom";

interface CreneauxHorraire {
  date: string;
  id: number;
}

const MyCalendar = () => {
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

  let tableOfAllDate: string[] = [];
  futureDates.forEach((elem) => {
    tableOfAllDate.push(formatDate(elem) + " MATIN");
    tableOfAllDate.push(formatDate(elem) + " APREM");
  });
  console.log(tableOfAllDate);

  const [tableOfDate, setTableOfDate] = useState<CreneauxHorraire[]>([]);

  const targetDate = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    date: Date,
    time: string
  ) => {
    e.preventDefault();
    setTableOfDate((prevTable) => {
      const selectedDateTime = formatDate(date) + " " + time;
      const index = prevTable.findIndex(
        (item) => item.date === selectedDateTime
      );
      if (index !== -1) {
        // Supprimer le créneau horaire s'il est déjà sélectionné
        return prevTable.filter((item) => item.date !== selectedDateTime);
      } else {
        // Ajouter le créneau horaire s'il n'est pas déjà sélectionné
        return [...prevTable, { date: selectedDateTime, id: tableOfAllDate.indexOf(formatDate(date)) }];
      }
    });
  };

  console.log(tableOfDate);

  return (
    <div>
      <h2>Disponibilités</h2>
      <ul className="list-day">
        {futureDates.map((date, index) => (
          <li key={index}>
            <p className="date">{formatDate(date)}</p>
            <p
              onClick={(e) => {
                targetDate(e, date, "MATIN");
              }}
              className="morning"
            >
              MATIN
            </p>
            <p
              onClick={(e) => {
                targetDate(e, date, "APREM");
              }}
              className="afternoon"
            >
              APREM
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendar;
