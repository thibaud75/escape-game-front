import React, { useEffect } from "react";
import "./MyCalendar.css";
import { Outlet, Link } from "react-router-dom";

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

 
  let tableOfDate = "";

  const targetDate = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,date: Date,time: string) => {
    e.preventDefault();
    tableOfDate = formatDate(date) + " " + time
    console.log(tableOfDate);
  };

  return (
    <div>
      <h2>Disponibilités</h2>
      <ul className="list-day">
        {futureDates.map((date, index) => (
          <li key={index}>
            <p className="date">{formatDate(date)}</p>
            <Link to="booking" className="signInLink">
            <p 
              onClick={(e) => {
                targetDate(e, date, "MATIN")
              }}
              className="morning"
            >
              MATIN
            </p>
        </Link>
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
