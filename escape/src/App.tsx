import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>
      <span>escape game</span>
      <span>connexion</span>
    </header>
      <h1>Bienvenue sur l'escape game des fou furieux</h1>
    </>
  )
}

export default App
