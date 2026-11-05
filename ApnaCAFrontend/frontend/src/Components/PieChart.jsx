import { useEffect, useState } from "react";
import { monthChart } from "../APIs/Expense";
import '../Css/PieChart.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
function PieChartCompo({refresh}){
    const [pieExpense, setPieExpense] = useState({
        emi:0,
        fashion:0,
        food:0,
        other:0,
        rent:0,
        shopping:0,
        travel:0
    }); 
    const chartData = Object.entries(pieExpense)
        .map(([category, amount]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            amount: Number(amount)
        }))
        .filter(item => item.amount > 0);

    useEffect(() => {
            const pieData = async() => {
                try{
                    const response = await monthChart(2026,10);
                    setPieExpense(response);
                }catch(e){
                console.log("Something went wrong", e);
                }
            } 
            pieData();
    },[refresh])
    
    return(
     <div className="chart-ctr">
            <p>Spending by category</p>

            {chartData.length === 0 ? (
                <p>No expense data available for this month.</p>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart className="pieChart">
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ category, percent }) =>
                                `${category} ${(percent * 100).toFixed(1)}%`
                            }
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={entry.category}
                                    fill={COLORS[entry.category.toLocaleLowerCase()] || "#8884D8"}
                                />
                            ))}
                        </Pie>

                        <Tooltip 
                        wrapperClassName="catgery"
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
    );
}

export default PieChartCompo;