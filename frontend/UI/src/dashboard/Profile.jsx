import { useNavigate } from 'react-router-dom';
import { useGetExpensesQuery } from '../store/apis/expenseApi';
import {useGetUserQuery} from "../store/apis/authApi.js";
import Spinner from "../utils/Spinner.jsx";
import proimg from '../assets/profile.png';
import './Profile.css';

const Profile = () => {
    const nav = useNavigate();

    const {data: user, isLoading: profileLoading} = useGetUserQuery();
    const { data: expenses = [], isLoading: expensesLoading } = useGetExpensesQuery(user?._id, { skip: !user?._id, });

    if(profileLoading || expensesLoading){
        return (
            <div className="page-loading">
                <h1>Loading user's profile data...</h1>
                <Spinner/>
            </div>
        )
    }

    if(!user){
        return (
            <div className="no-profile">
                <div className="no-profile-card">
                    <h1>User's data was not found!</h1>
                    <h2>Try to refresh page or go to dashboard page!</h2>
                    <button onClick={() => nav("/dashboard")}>Go to Dashboard</button>
                </div>
            </div>
        )
    }

    const totalExpenses = expenses ? expenses.reduce((acc, item) => acc + item.amount, 0) : 0;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="profile">
            <h1>Your Personal Profile</h1>
            <img src={proimg} />
            <div className="user-data">
                <h2>Name: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <h2>Joined: {formatDate(user.createdAt)}</h2>
                <h2>All Time Expenses: {totalExpenses} ALL</h2>
            </div>
            <button onClick={() => nav("/add-expense")}>Add New Expenses</button>
        </div>
    )
}

export default Profile;