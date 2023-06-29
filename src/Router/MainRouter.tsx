import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Inscription from "../pages/Inscription";
import Game from "../pages/Game";
import Booking from "../pages/Booking";
import History from "../pages/History";
import App from "../App";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Inscription />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/game/:id/booking/:dateId" element={<Booking />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//       <MainRouter/>
// )
