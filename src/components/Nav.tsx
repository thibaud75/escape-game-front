import { useState } from "react"
import Auth from '../Auth'

export default function Nav() {

const name = 'blabla'
// object.name
function onConnexion(){
    if (isConnect == true){
        setIsConnect(false)
    }else{
        alert(`la page de connexion n'est pas encore disponible`)
    }

}

function onHistory(){
    alert(`la page d'historique n'est pas encore disponible`)

}

const [isConnect, setIsConnect] = useState(true)

    return(

        <header>
            <span>Escape Game</span>
                {isConnect == true && <h1>Bonjour {name}</h1>}
            <div className="droite" >
                <span id="history" onClick={()=>{onHistory()}}> 
                    {isConnect == true  && 'Historique'}
                </span>
                <span id="connexion" onClick={()=>{onConnexion()}}> 
                    {isConnect == true  ?'Déconnexion' : 'Connexion'}
                </span>
            </div>

        </header>
    )

}