import axios from 'axios'

const login = async(userData) => {
    // axios connecting with backend
    const response = await axios.post("http://localhost:5000/api/user/login", userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
}

const register = async(userData) => {
    // axios connecting with backend
    const response = await axios.post("http://localhost:5000/api/user/register", userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
}

const authService = {login, register}

export default authService;