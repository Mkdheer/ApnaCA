import 'bulma/css/bulma.min.css';
import '../Css/Summary.css';
import { fetchBal } from '../APIs/Expense';
import { useEffect, useState } from 'react';

function Summary(props){
    const{refresh} = props;
    const [balance, setBalance] = useState({
        net_amt: 0,
        total_recieve: 0,
        total_sent: 0
    });
    const{net_amt, total_recieve, total_sent} = balance;

    useEffect(
        ()=>{
            const summaryData = async() => {
                try{
                    const data = await fetchBal();
                    setBalance(data);
                }catch(error){
                    console.log("Error fetching summary" , error);
                }
            }
        summaryData()
        },[refresh]
    );
    return (
        <div className="dashboard_cards">
            <div className="card dashboard_card">
                <div className="card-content">
                    <p className="card_label">Total Income</p>
                    <p className="card_amount income_amount">
                        ₹{total_recieve}
                        </p>
                    <p className="card_description">Money received this month</p>
                </div>
            </div>

            <div className="card dashboard_card">
                <div className="card-content">
                    <p className="card_label">Total Expenses</p>
                    <p className="card_amount expense_amount">₹{total_sent}</p>
                    <p className="card_description">Money spent this month</p>
                </div>
            </div>

            <div className="card dashboard_card">
                <div className="card-content">
                    <p className="card_label">Net Balance</p>
                    <p className="card_amount balance_amount">₹{net_amt}</p>
                    <p className="card_description">Income minus expenses</p>
                </div>
            </div>
        </div>
    );
}
export default Summary;