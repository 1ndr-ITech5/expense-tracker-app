import { useGetExpensesQuery } from '../store/apis/expenseApi';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const { user } = useSelector((state) => state.auth);

    // states of the components managed by expense Api
    const { data: expenses = [], isLoading, error } = useGetExpensesQuery();

    // in loading phase
    if(isLoading){
        <h3>Page currently loading...</h3>
    }

    // when error is faced
    if(error){
        <h3>Page faced error: {error?.data?.message || 'Data not fetched!'}</h3>
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
        </div>
    )
}

export default Dashboard;