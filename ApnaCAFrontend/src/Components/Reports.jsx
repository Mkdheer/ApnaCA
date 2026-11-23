
import { useState } from "react";
import "../Css/Reports.css";
import ReportPage from "./ReportPage";
import PieChartCompo from "./PieChart";

function Reports() {

    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
        transactionType: "ALL",
        category: "ALL",
        paymentMethod: "ALL"
    });

    const [generated, setGenerated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateReport = (e) => {
        e.preventDefault();

        if (!filters.fromDate || !filters.toDate) {
            alert("Please select both dates");
            return;
        }

        if (filters.fromDate > filters.toDate) {
            alert("From date cannot be greater than To date");
            return;
        }

        console.log("Report Filters:", filters);

        setGenerated(true);
    };

    const resetForm = () => {
        setFilters({
            fromDate: "",
            toDate: "",
            transactionType: "ALL",
            category: "ALL",
            paymentMethod: "ALL"
        });

        setGenerated(false);
    };

    return (
        <div className="reports-page">

            <div className="reports-header">
                <h2>Financial Reports</h2>
                <p>Generate and download your financial reports</p>
            </div>

            <div className="report-form-container">

                <div className="report-form-heading">
                    <h3>Generate Report</h3>
                    <p>Select your preferred filters below</p>
                </div>

                <form onSubmit={generateReport}>

                    <div className="report-form-grid">

                        <div className="report-field">
                            <label>From Date</label>
                            <input
                                type="date"
                                name="fromDate"
                                value={filters.fromDate}
                                onChange={handleChange}
                                max={new Date().toLocaleDateString("en-CA")}
                                required
                            />
                        </div>

                        <div className="report-field">
                            <label>To Date</label>
                            <input
                                type="date"
                                name="toDate"
                                value={filters.toDate}
                                onChange={handleChange}
                                max={new Date().toLocaleDateString("en-CA")}
                                min={filters.fromDate || undefined}
                                required
                            />
                        </div>

                        <div className="report-field">
                            <label>Transaction Type</label>
                            <select
                                name="transactionType"
                                value={filters.transactionType}
                                onChange={handleChange}
                            >
                                <option value="ALL">All Transactions</option>
                                <option value="RECEIVED">Income</option>
                                <option value="SENT">Expense</option>
                            </select>
                        </div>

                        <div className="report-field">
                            <label>Category</label>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleChange}
                            >
                                <option value="ALL">All Categories</option>
                                <option value="FOOD">Food</option>
                                <option value="RENT">Rent</option>
                                <option value="TRAVEL">Travel</option>
                                <option value="EMI">EMI</option>
                                <option value="FASHION">Fashion</option>
                            </select>
                        </div>

                        <div className="report-field">
                            <label>Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={filters.paymentMethod}
                                onChange={handleChange}
                            >
                                <option value="ALL">All Methods</option>
                                <option value="CASH">Cash</option>
                                <option value="UPI">UPI</option>
                                <option value="CARD">Card</option>
                                <option value="BANK">Bank Transfer</option>
                            </select>
                        </div>

                    </div>

                    <div className="report-form-actions">
                        <button type="button" onClick={resetForm}
                            className="report-reset-btn">
                            Reset
                        </button>

                        <button type="submit"
                            className="report-generate-btn">
                            Generate Report
                        </button>
                    </div>

                </form>
            </div>

            {generated && (
                <>
               <ReportPage filters = {filters}/>
               <PieChartCompo
                            fromDate = {filters.fromDate}
                            toDate = {filters.toDate}
                            transactionType = {filters.transactionType}
                            category = {filters.category}
                            paymentMethod = {filters.paymentMethod} />
            
            </>)}

        </div>
    );
}

export default Reports;
