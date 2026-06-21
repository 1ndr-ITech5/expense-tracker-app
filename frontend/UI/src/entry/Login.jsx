import {useState} from 'react'
import authService from '../services/authService.js'
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setUser } from '../store/userSlice';
import {toast} from 'react-toastify';
import './Login.css';

const Login = () => {

    // defining the states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const nav = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault(); // makes sure to not re-render the page after submit event

        try{
            const userData = await authService.login({email,password})
            toast.success("User logged successfully!")
            dispatch(setUser(userData))
            nav("/dashboard")
        }catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="register-info">
                <h1>Welcome back!</h1>
                <h2>Login to continue adding more expenses</h2>
            </div>
            <div className="email">
                <label>Email</label>
                <input type="email" placeholder="Write your email..." value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="password">
                <label>Password</label>
                <input type="password" placeholder="Type your passcode..." value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type="submit">Log In</button>
        </form>
    )
}

export default Login;
