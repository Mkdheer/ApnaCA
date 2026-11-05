import 'bulma/css/bulma.min.css';
import '../Css/AddExpense.css'
import AddExpenseForm from './AddExpenseForm';
import Message from './Message';
import { useState } from 'react';

function AddExpense(props){
     const{setRefresh,message, setMessage} = props;
     const [showForm, setShowForm] = useState(false);
     const currentMonthYear = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
  });

    const modelForm = () => {
        setShowForm(true);
    }
    return(
    <div className="btn_container">
      <div className="dashboard_info">
        <h1>Dashboard</h1>
        <span>{currentMonthYear} . sample data</span>
      </div>

      <div className="dashboard_actions">
        <button className="add_expense_btn" onClick={modelForm}>
          <span>＋</span>
          Add expense
        </button>
      </div>
       {showForm && <AddExpenseForm 
                        showForm = {showForm} 
                        setShowForm ={setShowForm} 
                        setRefresh = {setRefresh}
                        message = {message}
                        setMessage = {setMessage}
                    />}
                  {<Message
                  message = {message} 
                  />}
    </div>
  ); 
}

export default AddExpense;