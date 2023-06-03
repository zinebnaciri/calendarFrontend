import axios from 'axios'
import { service } from './Service'


const Axios = axios.create({
    baseURL: 'http://localhost:8080'
})


Axios.interceptors.request.use(request => {

    if(service.isLogged()){
        request.headers.Authorization = 'Bearer '+service.getToken()
    }

    return request
})

Axios.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response.status === 401){
        service.logout()
        window.location = '/auth/login'
    }else{
        return Promise.reject(error)
    }
})

export default Axios