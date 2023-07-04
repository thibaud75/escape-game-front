import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState([]);

  const handleDataUserFetched = (data) => {
    setUserData(data);
  };

  fetch("http://localhost:3000/disponibility/getalldispo");
  return (
    <>
      <Nav onDataUserFetched={handleDataUserFetched} />
      {userData.role === "admin" ? (
        <h1>Salut patron content de te revoir</h1>
      ) : (
        <h1>Je crois que tu t'es trompé d'endroit !</h1>
      )}
      <Footer />
    </>
  );
};

export default Home;
