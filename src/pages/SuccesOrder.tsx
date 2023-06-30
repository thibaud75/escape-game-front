import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import "./SuccesOrder.css";
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
        console.log(data.name);
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
        <div className="pagePsartek">
          <div className="psartek">
            <h1>Félicitations {user}</h1>
            <p>
              Notre equipe vous attend le <strong>{date}</strong> dans notre
              salle <strong>{gameName} </strong>
              pour l'experience la plus démentielle de votre vie !
            </p>
            <p>PS : N'oubliez pas de laisser votre peur à la maison </p>
          </div>
        </div>
      ) : (
        <p>Page introuvable</p>
      )}

      <Footer />
    </>
  );
}

export default SuccesOrder;
