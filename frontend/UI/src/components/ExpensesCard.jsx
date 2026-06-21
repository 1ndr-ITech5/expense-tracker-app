import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import UpdateExpense from "./UpdateExpense";
import { useDeleteExpenseMutation } from '../store/apis/expenseApi';
import {toast} from 'react-toastify';

const ExpensesCard = ({ expense }) => {
  const [updatePage, setUpdatePage] = useState(false);
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleDelete = async() => {
      const result = await deleteExpense(expense._id)
      if(result.error){
        toast.error(result.error.data.message)
        return;
      }
      toast.success("Expense deleted successfully!")  
  }

  return (
    <div className="expense-card">

      <div>
        <h2>{expense.title}</h2>
        <h3>{expense.amount} ALL</h3>
        <h3>{expense.category}</h3>
      </div>

      <div>
        <button onClick={() => setUpdatePage(true)}>
          <GrDocumentUpdate /> Update
        </button>

        <button onClick={() => handleDelete()}>
          <MdDelete /> Delete
        </button>
      </div>

      {updatePage && (
        <UpdateExpense
          expense={expense}
          setUpdatePage={setUpdatePage}
        />
      )}

    </div>
  );
};

export default ExpensesCard;