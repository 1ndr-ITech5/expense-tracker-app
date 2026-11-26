import { useAddExpenseMutation } from '../store/apis/expenseApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import './AddExpense.css';

const AddExpense = () => {

    const nav = useNavigate();
    const [addExpense, {isLoading: creatingExpense}] = useAddExpenseMutation()

    const [newExpense, setExpense] = useState({
        title: "",
        amount: "",
        category: ""
    })

    const handleSetExpense = (e) => {
        const {name, value} = e.target;

        setExpense(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    //handle sumbit logic
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await addExpense(newExpense).unwrap()
            toast.success("Expense created successfully!")
            nav("/dashboard")
        }catch(error){
            toast.error(error?.data?.message)
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <button type="button" onClick={() => nav(-1)}>Go Back</button>
            <div className="header-add">
                <h1>Add your newest expense!</h1>
                <h3>Fill the fields down below!</h3>
            </div>
            <div className="title">
                <label>Title</label>
                <input type="text" name="title" value={newExpense.title} onChange={(e) => handleSetExpense(e)}/>
            </div>
            <div className="amount">
                <label>Amount</label>
                <input type="number" name="amount" value={newExpense.amount} onChange={(e) => handleSetExpense(e)}/>
            </div>
            <div className="category">
                <label>Category</label>
                <select name="category" onChange={(e) => handleSetExpense(e)}>
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
            <button disabled={creatingExpense}>Add Expense</button>
        </form>
    )
}

export default AddExpense;