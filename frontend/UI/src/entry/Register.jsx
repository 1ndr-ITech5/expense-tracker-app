import {useState} from 'react'
import {useRegisterUserMutation} from '../store/apis/authApi.js';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setUser } from '../store/userSlice';
import {toast} from 'react-toastify';
import './Register.css';

const Register = () => {
    const nav = useNavigate()
    const dispatch = useDispatch();

    const [registerUser, {isLoading}] = useRegisterUserMutation();

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleRegisterData = (e) => {
        const {name, value} = e.target

        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value
        })) 
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); // makes sure to not re-render the page after submit event

        try{
            const userData = await registerUser(registerData)
            toast.success("User registered! Welcome!")
            dispatch(setUser(userData))
            nav("/dashboard")
        }catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="register-info">
                <h1>Welcome to Expense Tracker App!</h1>
                <h2>Register to manage your own expenses!</h2>
            </div>
            <div className="name">
                <label>Name</label>
                <input type="text" name="name" placeholder="Write your name..." 
                    value={registerData.name} onChange={(e) => handleRegisterData(e)}></input>
            </div>
            <div className="email">
                <label>Email</label>
                <input type="email" name="email" placeholder="Write your email..." 
                    value={registerData.email} onChange={(e) => handleRegisterData(e)}></input>
            </div>
            <div className="password">
                <label>Password</label>
                <input type="password" name="password" placeholder="Type your passcode..." 
                    value={registerData.password} onChange={(e) => handleRegisterData(e)}></input>
            </div>
            <button type="submit" disabled={isLoading}>Sign In</button>
        </form>
    )
}

export default Register;
