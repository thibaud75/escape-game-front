import React, { useEffect, useState } from "react";
import { accountService } from "../../_services/account.service";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

interface User {
  Date: string;
  Nom: string;
  Prenom: string;
}

interface Disponibility {
  disponibility: {
    date: string;
    users: User[];
  }[];
  gameId: string;
  gameName: string;
  id: string;
  userId: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [reservTable, setReservTable] = useState<Disponibility[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/admin", {
        headers: {
          Authorization: "Bearer " + accountService.getToken(),
        },
      });
      if (response.ok) {
        // La requête a réussi, faire quelque chose avec les données
        const data = await response.json();
        console.log(data);
      } else {
        // La requête a échoué, afficher un message d'erreur ou rediriger l'utilisateur
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de la requête API", error);
    }
  };

  const dashboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/disponibility/getalldispo"
      );
      const data = await response.json();
      setReservTable(data);
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la requête API", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dashboard();
  }, []);

  console.log(reservTable);

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

  const sortedReservTable = [...reservTable].sort(
    (a: Disponibility, b: Disponibility) => {
      const dateA = convertToStandardDateFormat(a.disponibility[0].date);
      const dateB = convertToStandardDateFormat(b.disponibility[0].date);

      return new Date(dateA).getTime() - new Date(dateB).getTime();
    }
  );

  console.log(sortedReservTable);

  const deleteReservation = async (reservationId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/disponibility/deleteReserv/${reservationId}`,
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
        dashboard();
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
      <div>
        <h1>Bienvenue Patron, content de te revoir!</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Nom du jeu</th>
              <th className="table-header">Date</th>
              <th className="table-header">Participants</th>
              <th className="table-header">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservTable.map((item, index) => (
              <tr key={index}>
                <td>{item.gameName}</td>
                <td>{item.disponibility[0].date}</td>
                <td>
                  {item.disponibility[0].users.map((user, userIndex) => (
                    <div key={userIndex}>
                      {user.Nom} {user.Prenom} né(e) le {user.Date}
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    className="deleteButtonAdmin"
                    onClick={() => deleteReservation(item.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Home;
