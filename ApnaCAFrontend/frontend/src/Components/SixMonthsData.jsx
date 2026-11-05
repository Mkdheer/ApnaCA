import { useEffect, useState } from "react";
import { sixMonthData } from "../APIs/Expense";
import '../Css/SixMonthData.css';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";



function SixMonthsData({refresh}) {
    const [chartData, setCharData] = useState([]);
    const MONTHS = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

    useEffect(() => {
        const sixMonthDataRes = async () => {
            try {
                const response = await sixMonthData();

                const formattedData = response.map(item => ({
                    ...item,
                    monthName: MONTHS[item.month - 1]
                }));
                setCharData(formattedData);

            } catch (e) {
                console.error("Something went wrong!", e);
            }
        };

        sixMonthDataRes();
    }, [refresh]);

    return (
        <div className="bar-chart-container bar-ctr">
            <p>Six Months Data</p>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    className="barChart"
                    data={chartData}
                    margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
                    barGap={4}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis dataKey="monthName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar
                        dataKey="received"
                        name="Received"
                        fill="#16a34a"
                        radius={[4, 4, 0, 0]}
                    />

                    <Bar
                        dataKey="spent"
                        name="Spent"
                        fill="#dc2626"
                        radius={[4, 4, 0, 0]}
                    />

                    <Bar
                        dataKey="net"
                        name="Net"
                        fill="#9333ea"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SixMonthsData;