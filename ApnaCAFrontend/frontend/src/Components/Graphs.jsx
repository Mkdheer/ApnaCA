import PieChartCompo from "./PieChart";
import '../Css/Graphs.css';
import SixMonthsData from "./SixMonthsData";
function Graphs({refresh}){
    return(
        <div className="graph-ctr">
            <PieChartCompo refresh = {refresh} />
            <SixMonthsData refresh = {refresh} />
        </div>
    );
}

export default Graphs;