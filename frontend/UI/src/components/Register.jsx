import {useState} from 'react'
import authService from '../services/authService.js'
import {useNavigate} from 'react-router-dom';

const Register = () => {

    // defining the states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const nav = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault(); // makes sure to not re-render the page after submit event
        setError("")

        try{
            const userData = await authService.register({name,email,password})
            nav("/dashboard")
        }catch (error) {
            const message = error.response?.data?.message || 'Something went wrong!';
            setError(message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className="register-info">
                <h1>Welcome to Expense Tracker App!</h1>
                <h2>Register to manage your own expenses!</h2>
            </div>
            <div className="name">
                <label>Name</label>
                <input type="text" placeholder="Write your name..." value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className="email">
                <label>Email</label>
                <input type="email" placeholder="Write your email..." value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="password">
                <label>Password</label>
                <input type="password" placeholder="Type your passcode..." value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type="submit">Sign In</button>
        </form>
    )
}

export default Register;
