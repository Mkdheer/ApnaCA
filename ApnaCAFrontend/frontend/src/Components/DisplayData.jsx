import { useEffect, useState } from 'react';
import '../Css/DisplayData.css';
import { delById, expensesData } from '../APIs/Expense'; 
import Message from './Message';
import EditExpense from './EditExpense';

function DisplayData(props){
    const{refresh,setRefresh} = props;
    const [expenses, setExpenses] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteByID, setDeleteByID] = useState(null);
    const [delMsg, setDelMsg] = useState('');
    const [editForm, setEditForm] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    useEffect(
         ()=>{
            const trailexpense = async () => {
                try{
                   const trail =  await expensesData(currentPage-1,5);
                   setExpenses(trail.data.content); 
                   setTotalElements(trail.data.totalElements);
                }catch(e){
                    console.log("Something went wrong..!", e);
                }
            }
            trailexpense();
        },[refresh,currentPage]);


const itemsPerPage = 5;

const totalPages = Math.ceil(totalElements / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const delTranData = async (expense) => {
    try{
        setDeleteByID(expense.id);
        const dataDel = await delById(expense.id);
        if(dataDel === 200){
            setRefresh(e => e+1);
            console.log("Deleted Data",dataDel);
            setDelMsg('Successfully deleted');
            setTimeout(()=>{
                setDelMsg('');
            },3000);
            return dataDel;
        }
        return null;
    }catch(e){
        console.log("Something went wrong..!", e);
    }finally{
        setDeleteByID(null);
    }
}

const callEditForm = (e)=>{
    setEditForm(true);
    setEditFormData(e);
    
}
    

    return (
    <div className="table-container table-ctr">
        {delMsg?<Message message = {delMsg}/>:''}
        <div className="table-heading title-ctr" >
            <p className="table-title">Recent expenses</p>
        </div>
        {editForm? <EditExpense  editFormData = {editFormData}/>: ''}
        <table className="table is-fullwidth table-data table-styles">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th className="has-text-right">Amount</th>
                </tr>
            </thead>

            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td className="date-txt">
                            {expense.expenseDate}
                        </td>

                        <td className="description">
                            {expense.description}
                        </td>

                        <td className='category'>
                            <span className={`category-badge-${expense.category.toLowerCase()} common-category`}>
                                {expense.category}
                            </span>
                        </td>

                        <td className="amount">
                            ₹{expense.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="amount">
                            <span className='edit-icon'>
                                <button
                                onClick={()=>callEditForm(expense)}
                                >&#9998;</button>
                            </span> 
                            <span className='del-icon'>
                                <button
                                disabled = {expense.id === deleteByID} 
                                onClick={() => delTranData(expense)} >&#10006;</button>
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="pagination-container page-style">
            <span className="pagination-info page-style-info">
                Showing {startIndex + 1}–
                {Math.min(startIndex + itemsPerPage, totalElements)} of {totalElements}
            </span>

            <div className="pagination-buttons">
                <button
                    type="button"
                    className="pagination-button"
                    disabled={currentPage === 1}
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
                    disabled={currentPage === totalPages}
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