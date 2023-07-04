import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MainRouter from "./Router/MainRouter.tsx";
import { UserDataProvider } from "./pages/UserDataContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserDataProvider>
      <MainRouter />
    </UserDataProvider>
  </React.StrictMode>
);
