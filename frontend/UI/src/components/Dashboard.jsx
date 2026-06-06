import { useGetExpensesQuery } from '../store/apis/expenseApi';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import ExpensesCard from './ExpensesCard'
import { setCategoryFilter, setDateFilter } from '../store/filterSlice';

const Dashboard = () => {

    const { user } = useSelector((state) => state.user);

    // initial states of filters
    const { categoryFilter, dateFilter } = useSelector((state) => state.filters);

    // states of the components managed by expense Api
    const { data: expenses = [], isLoading, error } = useGetExpensesQuery(user?._id);

    // in loading phase
    if(isLoading){
        return <h3>Page currently loading...</h3>
    }

    // when error is faced
    if(error){
        return <h3>Page faced error: {error?.data?.message || 'Data not fetched!'}</h3>
    }

    // get today's date
    const today = new Date().toISOString().split('T')[0];

    // generate all the expenses done by user
    const totalExpenses = expenses ? expenses.reduce((acc, item) => acc + item.amount , 0) : 0

    // generate today's expenses
    const todayExpenses = expenses ? expenses.filter(i => i.date.startsWith(today)).reduce((acc, item) => acc + item.amount, 0): 0;

    // generate the avg of expenses by all expenses / all days
    const uniqueDays = new Set(
        expenses.map(item => new Date(item.date || item.createdAt).toISOString().split('T')[0])
    );
    
    const totalDaysCount = uniqueDays.size;
    const avgExpenses = totalDaysCount > 0 ? (totalExpenses / totalDaysCount) : 0;

    // init our postman here
    const dispatch = useDispatch();

    return (
        <div>
            <div className="dash-info">
                <h1>Welcome {user ? user.name : 'Guest'}👋</h1>
                <h3>What have you spent today?</h3>
            </div>
            <div className="info-tables">
                <div className="info-card">
                    <h3>Total Expenses</h3>
                    <p>{totalExpenses}ALL</p>
                </div>
                <div className="info-card">
                    <h3>Today Expenses</h3>
                    <p>{todayExpenses}ALL</p>
                </div>
                <div className="info-card">
                    <h3>Average Expenses</h3>
                    <p>{avgExpenses}ALL</p>
                </div>
            </div>
            <div className="options">
                <button>{<FaPlus />} Add New Expense</button>
                <div>
                    <label>Filter by Category</label>
                    <select onChange={(e) => dispatch(setCategoryFilter(e.target.value))}>
                        <option value="all">All</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>               
                    </select>
                </div>
                <div>
                    <label>Filter by Period</label>
                    <select onChange={(e) => dispatch(setDateFilter(e.target.value))}>
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>
            </div>
            <div className="cards-container">
                {expenses.map((item) => (
                    <ExpensesCard key={item._id} expense={item}/>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;