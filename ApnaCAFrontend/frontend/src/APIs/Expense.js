import { LOCAL_URL } from "../Constants";
import axios from "axios";

const fetchBal = async () => {
    const response = await axios.get(`${LOCAL_URL}/getMonthExpense`)
    return response.data;
}

export {fetchBal};


const sendData = async (transactionData) => {
            try{
                console.log(LOCAL_URL+"/addExpense");
                const sendResponse = await axios.post(LOCAL_URL+"/addExpense",transactionData);
                return sendResponse.data;
            }catch(error){
                console.log("Something wenr wrong", error)
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


const monthChart = async (year, month) => {
            const monthData = await axios.get(`${LOCAL_URL}/getMonthExpenseByCategory`,{
                params : {
                    year : year,
                    month : month
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
    console.log(delData);
    return delData.status;
}

export {delById};

const updateById = async (id) => {
    const updateData = axios.put(`${LOCAL_URL}/update/${id}`)
    return updateData.data;
}

export {updateById};