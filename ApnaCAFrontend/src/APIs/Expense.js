import { LOCAL_URL } from "../Constants";
import axios from "axios";

const fetchBal = async (startDate, 
                        endDate,
                        transactionType = "ALL",
                        category = "ALL",
                        paymentMethod = "ALL"
) => {
    const response = await axios.get(`${LOCAL_URL}/getMonthExpense`,{
        params : {
                    startDate, 
                    endDate,
                    transactionType,
                    category,
                    paymentMethod
        }
    });
    return response.data;
}

export {fetchBal};


const sendData = async (transactionData) => {
            try{
                const sendResponse = await axios.post(LOCAL_URL+"/addExpense",transactionData);
                return sendResponse.data;
            }catch(error){
                console.log("Something wenr wrong expense.js", error)
            }
}
export {sendData};


const expensesData = async (page, size) => {
    try{
        const response = await axios.get(LOCAL_URL,
            {
                params :{
                    page : page,
                    size : size
            }
        });
        return response;
    }catch(e){
        console.log("Something went wrong..!" , e);
    }
}

export {expensesData};


const monthChart = async (startDate, 
                        endDate,
                        transactionType = "ALL",
                        category = "ALL",
                        paymentMethod = "ALL") => {
            const monthData = await axios.get(`${LOCAL_URL}/getMonthExpenseByCategory`,{
                params : {
                    startDate, 
                    endDate,
                    transactionType,
                    category,
                    paymentMethod
                }
            });
            return monthData.data;
}

export {monthChart}

const sixMonthData = async () => {
    const response = await axios.get(`${LOCAL_URL}/getSixMonthExpense`);
    return response.data;
}

export {sixMonthData};

const delById = async (id) => {
    const delData = await axios.delete(`${LOCAL_URL}/${id}`);
    return delData.status;
}

export {delById};

const updateById = async (id,expense) => {
    const updateData = axios.put(`${LOCAL_URL}/update/${id}`, expense);
    return updateData.data;
}

export {updateById};