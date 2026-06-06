import Logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={Logo}/>
            <div>
                <ul>
                    <li>Dashboard</li>
                    <li>Add Expense</li>
                    <li>Profile</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;