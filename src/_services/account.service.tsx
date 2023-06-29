let saveToken = (token:string) => {
    localStorage.setItem('token', token)
}

let logout =() =>{
    localStorage.removeItem('token')
}

let isLogged = () =>{
    let token = localStorage.getItem('token')
    return !!token
} 

let saveUserId = (userId:string) =>{
localStorage.setItem('userId', userId)
}

export const accountService = {
    saveToken, logout, isLogged, saveUserId
}