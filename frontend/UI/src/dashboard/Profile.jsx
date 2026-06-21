import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import proimg from '../assets/profile.png';
import './Profile.css';

const Profile = () => {

    const nav = useNavigate();

    const {user} = useSelector((state) => state.user);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day:   'numeric',
            month: 'long',
            year:  'numeric'
        });
    };

    return (
        <div className="profile">
            <h1>Your Personal Profile</h1>
            <img src={proimg}/>
            <div className="user-data">
                <h2>Name: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <h2>Joined: {formatDate(user.createdAt)}</h2>
            </div>
            <button onClick={() => nav("/add-expense")}>Add New Expenses</button>
        </div>
    )
}

export default Profile;
