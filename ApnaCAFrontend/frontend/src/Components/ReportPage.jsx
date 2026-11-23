import { useContext, useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import { ReportContext } from "../Contexts/ReportContext";
import "../Css/ReportPage.css";
function ReportPage({filters}){
    const [reportData, setReportData] = useState({
        net_amt : 0,
        total_sent : 0,
        total_recieve : 0
    })
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(false);
    const {getSummary} = useContext(ReportContext);

   useEffect(
    ()=>{
         const fectchSumDet = async () => {
        try{
            setLoading(true);
            const resData = await getSummary(
                filters.fromDate, 
                filters.toDate,
                filters.transactionType,
                filters.category,
                filters.paymentMethod
            );
            setReportData(resData);
            setError("");
        }catch(e){
            setError("Failed to fetch the data")
            console.log("Something went wrong", e);
        }
        finally{
            setLoading(false);
        }
        };
        fectchSumDet();
    },[filters]
   );
if (loading) {
    return (
        <div className="report-status-container">
            <div className="report-loader"></div>
            <h3>Loading Reports</h3>
            <p>Please wait while we fetch your financial data...</p>
        </div>
    );
}

if (error) {
    return (
        <div className="report-status-container report-error">
            <div className="report-status-icon">
                <i className="bi bi-exclamation-circle"></i>
            </div>
            <h3>Unable to Load Reports</h3>
            <p>{error}</p>
        </div>
    );
}
    return(        
        <>
            <div className="reports-page-dwd">
                <div className="reports-header-dwd">
                    <div>
                        <h1>Reports</h1>
                        <p>Track your financial activity and insights</p>
                    </div>
                    <div className="report-icon-dwd">
                        <div className="brand-logo">A</div>
                    </div>
                </div>

                <div className="reports-summary-dwd">
                    <SummaryCards
                        net_amt={reportData.net_amt}
                        total_recieve={reportData.total_recieve}
                        total_sent={reportData.total_sent}
                    />
                </div>
            </div>
        </>
    );
}   
export default ReportPage;