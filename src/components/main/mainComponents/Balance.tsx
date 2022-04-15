import React from "react";
import useTransactions from "../../../useTransactions";

const Balance: React.FC = () => {
  const { balance } = useTransactions("Income");
  const balanceColor: string = balance > 0 ? "text-success" : "text-danger";

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="fs-2 fw-bolder text-secondary">Balance</div>
      <div className={`fs-3 fw-bold ${balanceColor}`}>${balance}</div>
    </div>
  );
}

export default Balance; 