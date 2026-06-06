import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router'

const Header = () => {
return (
    <header className='header'>
        <div className="logo">
            <Link to='/home'>Expense-Tracker App</Link>
        </div>
        <ul>
            <li>
                <Link to="/login"><FaSignInAlt/> Login</Link>
            </li>
            <li>
                <Link to="/register"><FaUser/> Register</Link>
            </li>
        </ul>
    </header>
    )
}

export default Header;