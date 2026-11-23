import 'bulma/css/bulma.min.css';
import '../Css/Summary.css';
import { useContext, useEffect, useState } from 'react';
import SummaryCards from './SummaryCards';
import { ReportContext } from '../Contexts/ReportContext';

function Summary(props){

    const{refresh} = props;
    const [balance, setBalance] = useState({
        net_amt: 0,
        total_recieve: 0,
        total_sent: 0
    });
    const {getSummary} = useContext(ReportContext);
    const{net_amt, total_recieve, total_sent} = balance;
    const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
 useEffect(() => {

    const summaryData = async () => {
        try {
            const today = new Date();

            const startDate = formatDate(
                new Date(today.getFullYear(), today.getMonth(), 1)
            );

            const endDate = formatDate(today);

            const responseData = await getSummary(
                startDate,
                endDate,
                null,
                null,
                null
            );

            if (responseData) {
                setBalance(responseData);
            }

        } catch (error) {
            console.error("Summary API failed:", error);
        }
    };

    summaryData();

}, [refresh]);
    return (
        <SummaryCards
        total_recieve = {total_recieve}
        total_sent = {total_sent}
        net_amt = {net_amt}
        />
    );
}
export default Summary;