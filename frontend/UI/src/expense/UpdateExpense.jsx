import { useUpdateExpenseMutation } from '../store/apis/expenseApi';
import { useState } from 'react';
import {toast} from 'react-toastify';
import './UpdateExpense.css';

const UpdateExpense = ({expense, setUpdatePage = () => {}}) => {

    const [title, setTitle] = useState(expense.title)
    const [amount, setAmount] = useState(expense.amount)
    const [category, setCategory] = useState(expense.category)
    const [updateExpense] = useUpdateExpenseMutation();

    //handle submit logic
    const handleUpdate = async(e) => {
        e.preventDefault();

        const updatedExpense = {
            title, amount, category
        }

        const result = await updateExpense({ id: expense._id, updatedData: updatedExpense })
        if(result.error){
            toast.error(result.error.data.message)
            return;
        }
        toast.success("Expense updated successfully!")
        setUpdatePage(false)
    }

    return (
        <div className="modal-overlay" onClick={() => setUpdatePage(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleUpdate}>
                    <button type="button" className="modal-close-btn" onClick={() => setUpdatePage(false)}>✕ Close</button>
                    <div className="header-add">
                        <h1>Update your expense!</h1>
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
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                    <button type="submit" className="modal-submit-btn">Update Expense</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateExpense;
