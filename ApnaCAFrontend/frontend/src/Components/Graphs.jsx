import PieChartCompo from "./PieChart";
import '../Css/Graphs.css';
import SixMonthsData from "./SixMonthsData";

function Graphs({refresh}){
    const today = new Date();
    const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );
    const endDate = today;
    // Format as yyyy-MM-dd
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    const fromDate = formatDate(startDate);
    const toDate = formatDate(endDate);
    const transactionType = "ALL";
    const category = "ALL";
    const paymentMethod = "ALL";
    return(
        <div className="graph-ctr">
            <PieChartCompo  refresh = {refresh} 
                            fromDate = {fromDate}
                            toDate = {toDate}
                            transactionType = {transactionType}
                            category = {category}
                            paymentMethod = {paymentMethod} />
            <SixMonthsData refresh = {refresh} />
        </div>
    );
}

export default Graphs;