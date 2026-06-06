import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const ExpensesCard = ({expense}) => {
    return (
        <div className="expense-card">
            <div>
                <h2>{expense.title}</h2>
                <h3>{expense.amount} ALL</h3>
                <h3>{expense.category}</h3>
            </div>
            <div>
                <button><GrDocumentUpdate /> Update</button>
                <button><MdDelete /> Delete</button>
            </div>
        </div>
    )
}

export default ExpensesCard;