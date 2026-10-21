import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setUser } from '../store/userSlice';
import {useLoginUserMutation} from "../store/apis/authApi.js"
import {toast} from 'react-toastify';
import './Login.css';

const Login = () => {
    const nav = useNavigate()
    const dispatch = useDispatch();

    const [loginUser, {isLoading}] = useLoginUserMutation();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleLoginData = (e) => {
        const {name, value} = e.target

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); // makes sure to not re-render the page after submit event

        try{
            const userData = await loginUser(loginData).unwrap()
            toast.success("User logged successfully!")
            console.log(userData)
            dispatch(setUser(userData))
            nav("/dashboard")
        }catch (error) {
            console.log(error)
            toast.error(error.data?.message || 'Something went wrong!')
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
                <input type="email" name="email" placeholder="Write your email..." 
                    value={loginData.email} onChange={(e) => handleLoginData(e)}></input>
            </div>
            <div className="password">
                <label>Password</label>
                <input type="password" name="password" placeholder="Type your passcode..." 
                    value={loginData.password} onChange={(e) => handleLoginData(e)}></input>
            </div>
            <button type="submit" disabled={isLoading}>Log In</button>
        </form>
    )
}

export default Login;
