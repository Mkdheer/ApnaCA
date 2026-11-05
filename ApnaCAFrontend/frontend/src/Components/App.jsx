import 'bulma/css/bulma.min.css';
import SideMenu from './SideMenu';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';



function Reports() {
    return <h1 style={{textAlign:'center'}}>Reports Page</h1>;
}

function Budgets() {
    return <h1  style={{textAlign:'center'}}>Budgets Page</h1>;
}

function AIBudgetPlanner() {
    return <h1  style={{textAlign:'center'}}>AI Budget Planner</h1>;
}

function Settings() {
    return <h1  style={{textAlign:'center'}}>Settings Page</h1>;
}


function App(){
    return (
        <BrowserRouter>
            <div className='body'>
                <SideMenu />
                <main>
                    <Routes>
                        <Route path='/' element = {<Dashboard />}/>
                        <Route path='/reports' element = {<Reports />}/>
                        <Route path='/' element = {<Dashboard />}/>
                        <Route path='/' element = {<Dashboard />}/>
                        <Route path='/' element = {<Dashboard />}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;