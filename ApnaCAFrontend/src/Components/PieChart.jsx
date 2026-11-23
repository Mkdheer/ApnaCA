import { useEffect, useState } from "react";
import { monthChart } from "../APIs/Expense";
import "../Css/PieChart.css";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = {
    food: "#6253e5",
    travel: "darkorange",
    rent: "#08716a",
    emi: "blueviolet",
    shopping: "aqua",
    salary: "brown",
    fashion: "darkcyan",
    other: "#8884D8"
};

function PieChartCompo({ refresh, fromDate, toDate, transactionType, category, paymentMethod }) {

    const [pieExpense, setPieExpense] = useState({
        emi: 0,
        fashion: 0,
        food: 0,
        other: 0,
        rent: 0,
        shopping: 0,
        travel: 0
    });

    const chartData = Object.entries(pieExpense)
        .map(([category, amount]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            amount: Number(amount)
        }))
        .filter(item => item.amount > 0);

    useEffect(() => {
        const pieData = async () => {
            try {
    const response = await monthChart(fromDate, toDate, transactionType, category, paymentMethod);
    setPieExpense(response);
            } catch (e) {
                console.log("Something went wrong", e);
            }
        };
        pieData();
    }, [refresh]);


    return (
        <div className="chart-ctr">

            <p className="chart-title">
                Spending by Category
            </p>

            <div className="chart-content">

                {chartData.length === 0 ? (
                    <div className="chart-empty">
                        No expense data available for this month.
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="45%"
                                outerRadius="65%"
                                label={({ category, percent }) =>
                                    `${category} ${(percent * 100).toFixed(1)}%`
                                }
                            >
                                {chartData.map((entry) => (
                                    <Cell
                                        key={entry.category}
                                        fill={
                                            COLORS[entry.category.toLowerCase()]
                                            || "#8884D8"
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => [
                                    `₹${Number(value).toLocaleString("en-IN")}`,
                                    "Amount"
                                ]}
                            />

                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}

            </div>
        </div>
    );
}

export default PieChartCompo;
