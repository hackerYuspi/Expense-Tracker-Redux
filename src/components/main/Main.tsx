import React from "react";
import Balance from "./mainComponents/Balance";
import Header from "./mainComponents/Header";
import TransactionList from "./mainComponents/TransactionList";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap";

const Main = () => {
    let navigate = useNavigate();
    return (
        <div className="container rounded">
            <div className="w-100 d-inline-flex flex-column align-items-center justify-content-center border shadow p-3 bg-light rounded">
                <Header />
                <Balance />
                <br />
                <button
                    className="btn btn-primary w-100 hover-shadow hover-zoom"
                    onClick={() => navigate('addTransaction')}>
                    Click here to Add a New Transaction
                </button>
                <TransactionList />
            </div>
        </div>
    )
}

export default Main;