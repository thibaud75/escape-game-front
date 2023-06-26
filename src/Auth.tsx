import { useState } from 'react'
import './App.css'
import Nav from './components/nav'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <div>
        <h1 className='title'>dsrghidfgihux</h1>
      </div>
      <Footer/>
    </>
  )
}

export default App