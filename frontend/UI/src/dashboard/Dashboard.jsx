import { useGetExpensesQuery } from '../store/apis/expenseApi';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import ExpensesCard from '../expense/ExpensesCard';
import InfoCard from "../cards/InfoCard.jsx";
import {applyFilters} from "../utils/Filter.js";
import { getExpenseStats } from '../utils/Stats.js';
import { setCategoryFilter, setDateFilter } from '../store/filterSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../utils/Spinner';
import './Dashboard.css';

const Dashboard = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const { data: expenses = [], isLoading, error } = useGetExpensesQuery(user?._id, { skip: !user?._id, });

    const { categoryFilter, dateFilter } = useSelector((state) => state.filters);
    const filteredExpenses = applyFilters(expenses, categoryFilter, dateFilter);

    // in loading phase
    if (isLoading) { return <Spinner /> }

    // when error is faced
    if (error) {
        return <h3>Page faced error: {error?.data?.message || 'Data not fetched!'}</h3>
    }

    const stats = getExpenseStats(expenses);

    // pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const actualPage = currentPage > totalPages ? (totalPages > 0 ? totalPages : 1) : currentPage;
    const startIndex = (actualPage - 1) * itemsPerPage;
    const currentExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="dashboard">
            <div className="dash-info">
                <h1>Hello {user ? user.name : 'Guest'}👋</h1>
                <h3>What have you spent today?</h3>
            </div>
            <div className="info-tables">
                <InfoCard title="Last Month" expenses={stats.lastMonth}/>
                <InfoCard title="Today" expenses={stats.today}/>
                <InfoCard title="This Month" expenses={stats.month}/>
            </div>
            <div className="options">
                <button onClick={() => nav("/add-expense")}>{<FaPlus />} Add New Expense</button>
                <div className="filters">
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
            </div>
            <div className="cards-container">
                {currentExpenses.length > 0 ? currentExpenses.map((item) => (
                    <ExpensesCard key={item._id} expense={item} />
                )) : <p>No Expenses found!</p>}
            </div>
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={actualPage === 1}
                    >
                        &laquo; Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={actualPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={actualPage === totalPages}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}
        </div>
    )
}

export default Dashboard;