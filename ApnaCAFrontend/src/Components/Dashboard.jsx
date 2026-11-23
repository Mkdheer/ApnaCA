import { useState } from "react";
import AddExpense from "./AddExpense";
import DisplayData from "./DisplayData";
import Graphs from "./Graphs";
import Summary from "./Summary";


function Dashboard(){
    const [refresh, setRefresh] = useState(0);
    const[message, setMessage] = useState("");
    return(
            <>
                <AddExpense  
                    setRefresh = {setRefresh} 
                    message = {message}
                    setMessage = {setMessage}
                />
                <Summary 
                refresh = {refresh} 
                />
                <Graphs
                refresh = {refresh} 
                />
                <DisplayData
                refresh = {refresh} 
                setRefresh = {setRefresh}
                />
            </>
    );
}

export default Dashboard;