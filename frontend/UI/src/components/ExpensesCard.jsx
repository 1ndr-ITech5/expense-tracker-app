import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import UpdateExpense from "./UpdateExpense";
import { useDeleteExpenseMutation } from '../store/apis/expenseApi';

const ExpensesCard = ({ expense }) => {
  const [updatePage, setUpdatePage] = useState(false);
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleDelete = async() => {
    try{
        await deleteExpense(expense._id)
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div className="expense-card">

      {!updatePage ? (
        <>
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
        </>
      ) : (
        <UpdateExpense
          expense={expense}
          setUpdatePage={setUpdatePage}
        />
      )}

    </div>
  );
};

export default ExpensesCard;