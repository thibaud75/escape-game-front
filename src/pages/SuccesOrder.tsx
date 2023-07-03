import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import "./SuccesOrder.css";
import { accountService } from "../_services/account.service";
import { useParams, useNavigate } from "react-router-dom";

function SuccesOrder() {
  // const [gameId, setGameId] = useState();
  const [date, setDate] = useState();
  const [gameName, setGameName] = useState();
  const { id: id } = useParams<{ id: string }>();
  const user = localStorage.getItem("userName");
  const navigate = useNavigate();

  // function apiForDate() {
  //   fetch("http://localhost:3000/disponibility/getalldispo")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data[data.length - 1]);
  //       // console.log(data[0].dispo.disponibility[0].date)

  //       setDate(data[data.length - 1].disponibility[0].date);
  //       setGameId(data[data.length - 1].gameId);
  //     });
  // }

  // function apiForNameGame() {
  //   fetch(`http://localhost:3000/games/${gameId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(gameId);
  //       setGameName(data.name);
  //     });
  // }

  // useEffect(() => {
  //   apiForDate();
  // }, []);

  // useEffect(() => {
  //   apiForNameGame();
  // }, [gameId]);
  const getInfosOneDispo = () => {
    fetch("http://localhost:3000/disponibility/getonedispo/" + id, {
      headers: {
        Authorization: "Bearer " + accountService.getToken(),
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok === false) {
        alert(
          "Vous n'avez pas accès à cette page" +
            "statut: " +
            response.statusText +
            " erreur " +
            response.status
        );
        navigate("/auth");
      } else {
        response
          .json()
          .then((data) => {
            console.log(data);
            setDate(data.disponibility[0].date);
            setGameName(data.gameName);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  useEffect(() => {
    getInfosOneDispo();
  }, []);

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
