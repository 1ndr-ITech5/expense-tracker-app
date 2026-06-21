import { useGetExpensesQuery } from '../store/apis/expenseApi';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import ExpensesCard from '../expense/ExpensesCard'
import { setCategoryFilter, setDateFilter } from '../store/filterSlice';
import {useNavigate} from 'react-router-dom';
import Spinner from '../utils/Spinner';
import './Dashboard.css';

const Dashboard = () => {

    const nav = useNavigate();
    // init our postman here
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    // initial states of filters
    const { categoryFilter, dateFilter } = useSelector((state) => state.filters);

    // states of the components managed by expense Api
    const { data: expenses = [], isLoading, error } = useGetExpensesQuery(user?._id, {skip: !user?._id,});

    // applying the category filter
    const byCategory = categoryFilter === "all" ? expenses : expenses.filter(f => f.category === categoryFilter)

    // filter by date
    const filteredExpenses = byCategory.filter(expense => {
    const expenseDate = new Date(expense.date || expense.createdAt);
    const now = new Date();

    switch (dateFilter) {
        case 'today':
            return expenseDate.toDateString() === now.toDateString();

        case 'week': {
            const weekAgo = new Date(now);
            weekAgo.setDate(now.getDate() - 7);
            return expenseDate >= weekAgo;
        }

        case 'month':
            return expenseDate.getMonth()     === now.getMonth() &&
                   expenseDate.getFullYear()  === now.getFullYear();

        default: // 'all'
            return true;
        }
    });

    // in loading phase
    if(isLoading) {return <Spinner/> }

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

    // generate month expenses
    const monthExpenses = expenses.filter(item => {
        const expenseDate = new Date(item.date || item.createdAt);
        const now = new Date();
        return expenseDate.getMonth()    === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
    }).reduce((acc, item) => acc + item.amount, 0);

    return (
        <div>
            <div className="dash-info">
                <h1>Hello {user ? user.name : 'Guest'}👋</h1>
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
                    <h3>This Month Expenses</h3>
                    <p>{monthExpenses}ALL</p>
                </div>
            </div>
            <div className="options">
                <button onClick={() => nav("/add-expense")}>{<FaPlus />} Add New Expense</button>
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
                {filteredExpenses.length > 0 ? filteredExpenses.map((item) => (
                    <ExpensesCard key={item._id} expense={item}/>
                )) : <p>No Expenses found!</p>}
            </div>
        </div>
    )
}

export default Dashboard;
