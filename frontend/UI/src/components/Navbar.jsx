import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import '../styles/navbar.css';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {

    const nav = useNavigate();

    return (
        <div className="navbar">
            <img onClick={() => nav("/dashboard")} src={Logo} alt="logo" />
            <h2>Expense Tracker</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-expense">Add Expense</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;