import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import App from "../App"


export default function MainRouter() {
  return (
     <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/auth" element={<Auth />} />
    </Routes>
</BrowserRouter> 
  );
}

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//       <MainRouter/>
// )