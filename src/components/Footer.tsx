import { Outlet, Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footerContent">
        <Link to="/">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-escapegame-blanc.png"
          />
        </Link>

        <div>
          <p>15 square Vergennes</p>
          <p>75015, Paris</p>
          <p>+33 1 23 45 67 89</p>
        </div>

        <div className="aPropos">
          <p>A propos</p>
          <p>
            <strong>Escape Game</strong> est la référence pour les détectives et
            aveturiers sur Paris ! Si vous êtes vaillants et curieux rejoignez
            l'aventure <strong>Escape Game</strong> ! Sinon il existe des escape
            games moins poussés et moins amusants tels que le{" "}
            <strong>peu importe</strong> et{" "}
            <strong>l'escape du dictateur</strong> mais on vous aura prevenus !
          </p>
          {/* </div>

      <div className="reseaux"> */}
          <button className="navBtn">Facebook</button>
          <button className="navBtn">Twitter</button>
          <button className="navBtn">Instagram</button>
          <button className="navBtn">Youtube</button>
        </div>
      </div>
    </footer>
  );
}
