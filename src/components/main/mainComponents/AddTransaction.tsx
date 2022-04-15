import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { incomeCategories, expenseCategories } from "../../../constants/categories";
import { ActionTypes } from "../../../redux/action-types/action-types";
import { Category, IFormData, ITransaction } from "../../../types";
import Balance from "./Balance";
import Header from "./Header";
import api from "../../../api/http-common"
import { Form, } from "react-bootstrap";

const initialState: IFormData = {
    amount: 0,
    category: "",
    type: "Income",
    date: "",
};

const AddTransaction: React.FC = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState<IFormData>(initialState);
    const dispatch = useDispatch();

    const selectRef = useRef<HTMLSelectElement>(null);

    const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const transaction: ITransaction = {
            ...formData,
            id: uuid(),
        };

        const response = await api.post("/allTransactions", transaction);

        dispatch({
            type: ActionTypes.ADD_TRANSACTION,
            payload: response.data,
        });

        setFormData(initialState);
        selectRef.current?.blur();


        navigate('/');
    };



    const selectedCategories: Category[] =
        formData.type === "Income" ? incomeCategories : expenseCategories;

    return (
        <div className="container rounded m-lg-0 mb-md-4">
            <div className="w-100 px-4 d-flex flex-column align-items-center justify-content-center border shadow p-3 bg-light rounded">
                <Header />
                <Balance />
                <br></br>
                <h1 className="listHeader">Add a New Transaction</h1>
                <form id="from" onSubmit={(e) => formSubmitHandler(e)}>
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-column">
                            <select
                                required
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({ ...formData, type: e.target.value })
                                }
                            >
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                        <div className="d-flex flex-column">
                            <select
                                required
                                ref={selectRef}
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                            >
                                <option value="" disabled hidden>
                                    Category
                                </option>
                                {selectedCategories.map((c) => (
                                    <option key={c.type} value={c.type} className="optionList">
                                        {c.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex flex-column">
                            <input
                                required
                                id="amount"
                                type="number"
                                value={formData.amount || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, amount: +e.target.value })
                                }
                                placeholder="Amount"
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <input
                                required
                                id="date"
                                type="text"
                                placeholder="Date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                        </div>
                        <div className="">
                            <button
                                type="submit"
                                className="addbutton"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransaction;