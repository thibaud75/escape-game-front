import React from "react";
import "./MyCalendar.css";

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

  return (
    <div>
      <h2>Disponibilités</h2>
      <ul className="list-day">
        {futureDates.map((date, index) => (
          <li key={index}>
            <p className="date">{formatDate(date)}</p>
            <p className="morning">MATIN</p>
            <p className="afternoon">APREM</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendar;
