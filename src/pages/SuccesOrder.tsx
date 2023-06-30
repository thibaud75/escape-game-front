import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

function SuccesOrder() {
  const [date, setDate] = useState();
  const [gameId, setGameId] = useState();
  const [gameName, setGameName] = useState();

  function apiForDate() {
    fetch("http://localhost:3000/disponibility/getalldispo")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[data.length - 1]);
        // console.log(data[0].dispo.disponibility[0].date)

        setDate(data[data.length - 1].disponibility[0].date);
        setGameId(data[data.length - 1].gameId);
      });
  }

  const user = localStorage.getItem("userName");

  function apiForNameGame() {
    fetch(`http://localhost:3000/games/${gameId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(gameId);
        setGameName(data.name);
      });
  }

  useEffect(() => {
    apiForDate();
  }, []);

  useEffect(() => {
    apiForNameGame();
  }, [gameId]);

  return (
    <>
      <Nav />
      {accountService.isLogged() ? (
        <p>
          Félicitation {user}, notre equipe vous attend le {date} dans notre
          salle {gameName} pour l'experience la plus démentielle de votre vie !
          ps : N'oubliez pas de laissez votre peur à la maison{" "}
        </p>
      ) : (
        <p>Page introuvable</p>
      )}

      <Footer />
    </>
  );
}

export default SuccesOrder;
