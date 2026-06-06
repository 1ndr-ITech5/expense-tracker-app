import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router';
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../store/userSlice';
import {useNavigate} from 'react-router-dom';

const Header = () => {

    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    // when logout button gets clicked
    const handleLogout = () => {
        dispatch(logout())
        nav("/login");
    }

return (
    <header className='header'>
        <div className="logo">
            <Link to='/login'>Expense-Tracker App</Link>
        </div>
        {!user ? 
        (<ul>
            <li>
                <Link to="/login"><FaSignInAlt/> Login</Link>
            </li>
            <li>
                <Link to="/register"><FaUser/> Register</Link>
            </li>
        </ul>) : (
            <ul>
                <li>
                    <button onClick={() => handleLogout()}><MdLogout /> Logout</button>
                </li>
            </ul>
        )}
    </header>
    )
}

export default Header;