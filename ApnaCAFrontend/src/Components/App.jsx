import 'bulma/css/bulma.min.css';
import '../Css/App.css';
import Reports from './Reports';
import SideMenu from './SideMenu';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import { ReportProvider } from '../Contexts/ReportContext';



function Budgets() {
    return <h1>Budgets Page</h1>;
}

function AIBudgetPlanner() {
    return <h1>AI Budget Planner</h1>;
}

function Settings() {
    return <h1>Settings Page</h1>;
}

function App() {

    return (
        <ReportProvider>
        <BrowserRouter>
            <div className="body">

                <SideMenu />

                <main className="dashboard-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/budgets" element={<Budgets />} />
                        <Route path="/ai-budget-planner" element={<AIBudgetPlanner />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>

            </div>
        </BrowserRouter>
        </ReportProvider>
    );
}

export default App;
