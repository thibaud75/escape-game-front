import React, { useEffect } from "react";
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

  useEffect(() => {
    saveDataToDatabase();
  }, []);

  const saveDataToDatabase = () => {
    const data = {
      dates: futureDates,
    };

    fetch("http://localhost:3000/games/date", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Données enregistrées avec succès !");
        } else {
          throw new Error("Erreur lors de l'enregistrement des données");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement des données :", error);
      });
  };

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
