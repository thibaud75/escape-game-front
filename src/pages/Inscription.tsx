import { useState } from 'react'
// import './App.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'


function Auth() {
  
  const getData = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget);
    
    const email = formData.get('email')
    let newEmail = email as string
  
    const password = formData.get('password')
    let newPassword = password as string
  
  
    const data = {
      email : newEmail,
      password : newPassword,
    }
  
    callApi(data)
  }
  
  function callApi(login:{}){
    fetch(`http://localhost:3000/auth/signup`, {
      method : 'POST',
      headers :{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
  
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(data => {
      console.log(data)
    })
  }
  return (
    <>
      <Nav/>
      <div>
        <h1 className='inscription'>Inscrpition</h1>
        <form onSubmit={(e)=> getData(e)}>
          <input type = 'text' placeholder='email' name='email'></input>
          <input type = 'text' placeholder='mdp' name='password'></input>
          <button type='submit'></button>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default Auth