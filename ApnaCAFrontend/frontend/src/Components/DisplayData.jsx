import { useEffect, useState } from 'react';
import '../Css/DisplayData.css';
import { delById, expensesData } from '../APIs/Expense';
import Message from './Message';
import EditExpense from './EditExpense';

function DisplayData(props) {

    const { refresh, setRefresh } = props;

    const [expenses, setExpenses] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteByID, setDeleteByID] = useState(null);
    const [msg, setMsg] = useState('');
    const [editForm, setEditForm] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalElements / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    useEffect(() => {

        const fetchExpenses = async () => {
            try {
                const response = await expensesData(currentPage - 1, itemsPerPage);

                setExpenses(response.data.content);
                setTotalElements(response.data.totalElements);

            } catch (e) {
                console.log("Something went wrong..!", e);
            }
        };

        fetchExpenses();

    }, [refresh, currentPage]);


    const delTranData = async (expense) => {

        try {
            setDeleteByID(expense.id);

            const dataDel = await delById(expense.id);

            if (dataDel === 200) {

                setRefresh(e => e + 1);
                setMsg('Successfully deleted');

                setTimeout(() => {
                    setMsg('');
                }, 3000);

                return dataDel;
            }

            return null;

        } catch (e) {
            console.log("Something went wrong..!", e);
        } finally {
            setDeleteByID(null);
        }
    };


    const callEditForm = (expense) => {
        setEditFormData(expense);
        setEditForm(true);
    };



    return (
        <div className="table-ctr">

            {msg && <Message message={msg} />}
            
            {/* Table Header */}
            <div className="title-ctr">
                <div>
                    <p className="table-title">Recent Expenses</p>
                    <span className="table-subtitle">
                        Your latest income and expense transactions
                    </span>
                </div>
            </div>

            {editForm && (
                <EditExpense
                    editFormData={editFormData}
                    setEditForm={setEditForm}
                    setRefresh={setRefresh}
                    setMsg = {setMsg}

                />
            )}

            {/* Responsive Table Wrapper */}
            <div className="expense-table-scroll">

                <table className="table is-fullwidth table-styles">

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th className="amount-heading">Amount</th>
                            <th className="actions-heading">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {expenses.length === 0 ? (

                            <tr>
                                <td colSpan="5" className="empty-table">
                                    No transactions available.
                                </td>
                            </tr>

                        ) : (

                            expenses.map((expense) => (

                                <tr key={expense.id}>

                                    <td className="date-txt">
                                        {expense.expenseDate}
                                    </td>

                                    <td className="description">
                                        {expense.description || '-'}
                                    </td>

                                    <td className="category">
                                        <span
                                            className={`category-badge-${(expense.category || 'other').toLowerCase()} common-category`}
                                        >
                                            {expense.category}
                                        </span>
                                    </td>

                                    <td className="amount">
                                        ₹{Number(expense.amount).toLocaleString('en-IN')}
                                    </td>

                                    <td className="action-cell">

                                        <button
                                            type="button"
                                            className="edit-action"
                                            title="Edit transaction"
                                            onClick={() => callEditForm(expense)}
                                        >
                                            &#9998;
                                        </button>

                                        <button
                                            type="button"
                                            className="delete-action"
                                            title="Delete transaction"
                                            disabled={expense.id === deleteByID}
                                            onClick={() => delTranData(expense)}
                                        >
                                            &#10006;
                                        </button>

                                    </td>

                                </tr>

                            ))
                        )}

                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">

                <span className="pagination-info">
                    Showing {totalElements === 0 ? 0 : startIndex + 1}–
                    {Math.min(startIndex + itemsPerPage, totalElements)}
                    {' '}of {totalElements}
                </span>

                <div className="pagination-buttons">

                    <button
                        type="button"
                        className="pagination-button"
                        disabled={currentPage === 1 || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (

                        <button
                            type="button"
                            key={index + 1}
                            className={`pagination-button ${
                                currentPage === index + 1 ? 'active' : ''
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>

                    ))}

                    <button
                        type="button"
                        className="pagination-button"
                        disabled={currentPage >= totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>

                </div>
            </div>

        </div>
    );
}

export default DisplayData;
