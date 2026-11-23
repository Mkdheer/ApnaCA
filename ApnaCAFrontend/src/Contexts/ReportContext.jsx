
import { createContext } from "react";
import { fetchBal } from "../APIs/Expense";

export const ReportContext = createContext();

function ReportProvider({ children }) {

    const getSummary = async (
        startDate,
        endDate,
        transactionType,
        category,
        paymentMethod
    ) => {
        try {
            const response = await fetchBal(
                startDate,
                endDate,
                transactionType,
                category,
                paymentMethod
            );

            return response;

        } catch (e) {
            console.error("Something went wrong RC", e);
            throw e;
        }
    };

    return (
        <ReportContext.Provider value={{ getSummary }}>
            {children}
        </ReportContext.Provider>
    );
}

export { ReportProvider };
