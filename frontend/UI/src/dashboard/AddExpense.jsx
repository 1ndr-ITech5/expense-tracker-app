import { useAddExpenseMutation } from '../store/apis/expenseApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import './AddExpense.css';

const AddExpense = () => {

    const nav = useNavigate();

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [addExpense] = useAddExpenseMutation()

    //handle sumbit logic
    const handleSubmit = async(e) => {
        e.preventDefault();


        const newExpense = {
            title, amount, category
        }

        const result = await addExpense(newExpense)
        if(result.error){
            toast.error(result.error.data.message)
            return;
        }   

        toast.success("Expense created successfully!")
        setTitle("")
        setAmount("")
        setCategory("")
        nav("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="button" onClick={() => nav(-1)}>Go Back</button>
            <div className="header-add">
                <h1>Add your newest expense!</h1>
                <h3>Fill the fields down below!</h3>
            </div>
            <div className="title">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="amount">
                <label>Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <div className="category">
                <label>Category</label>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <button>Add Expense</button>
        </form>
    )
}

export default AddExpense;
