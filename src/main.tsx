import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth.tsx";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <Router>
  <App/>
 </Router>
)
