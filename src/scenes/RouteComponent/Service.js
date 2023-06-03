import Axios from './compaxios'
import jwt_decode from 'jwt-decode'


let login = (emailL,passwordL) => {
    return Axios.post(`/api/auth/login`, {
        email: emailL,
        password: passwordL
      });
}


let saveToken = (token) => {
    localStorage.setItem('token', token)
}


export const logout = () => {
   
    window.location.href = '/login';
}


let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}


let getToken = () => {
    return localStorage.getItem('token')
}


let getTokenInfo = () => {
    return jwt_decode(getToken())
}

let saveRole = (role) =>{
    localStorage.setItem('role', role)
}

let saveUsername = (username) =>{
    localStorage.setItem('username', username)
}

let getUsername = () =>{
    localStorage.getItem('username')
}
let saveId = (id) =>{
    localStorage.setItem('id', id)
}

let getId = () =>{
    localStorage.getItem('id')
}



let getRole = () => {
    return localStorage.getItem('role')
}

export const service = {
    login, saveToken, logout, isLogged, getToken, getTokenInfo ,saveRole,getRole,saveUsername,getUsername,saveId,getId
}