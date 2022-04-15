import useTransactions from "../../useTransactions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Styles, Title } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenses: React.FC<Title> = ({ title }) => {
    const { total, chartData } = useTransactions(title);

    const styles: Styles =
        title === "Income"
            ? {
                order: "",
                borderColor: "blue",
                titleColor: "blue",
                totalColor: "green",
            }
            : {
                order: "order-3",
                borderColor: "red",
                titleColor: "red",
                totalColor: "red",
            };

    return (
        <div
            className={`d-inline-flex flex-column align-items-center justify-content-start border rounded shadow p-3 bg-light rounded  ${styles.order} ${styles.borderColor}`}
        >
            <div className={`fs-2 fw-bold ${styles.titleColor}`}>
                {title}
            </div>
            <div className={`fs-3 ${styles.totalColor}`}>${total}</div>
            <Doughnut data={chartData} />
        </div>
    );
};

export default IncomeExpenses;