import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const login = async(userData) => {
    // axios connecting with backend
    const response = await axios.post(`${API_URL}/api/user/login`, userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
}

const register = async(userData) => {
    // axios connecting with backend
    const response = await axios.post(`${API_URL}/api/user/register`, userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
}

const authService = {login, register}

export default authService;