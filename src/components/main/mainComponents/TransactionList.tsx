import { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ITransaction } from "../../../types";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store/store";
import api from "../../../api/http-common";
import { ActionTypes } from "../../../redux/action-types/action-types";
import { transactionList } from "../../../redux/actions/BudgetAction";
import "bootstrap/dist/css/bootstrap.min.css"

// function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)

const TransactionList: React.FC = () => {

  const transactions: ITransaction[] = useSelector((state: RootState) => state.allTransactions);
  const dispatch = useDispatch();

  const fetchTransactions = async () => {
    const response: any = await api.get("/allTransactions")
      .catch((err) => {
        console.log("Err", err);
      });
    // console.log(response.data);
    dispatch(transactionList(response.data));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  console.log("Transactions: ", transactions);
  const [filteredTransactions, setfilteredTransactions] = useState<ITransaction[]>(transactions || '');
  console.log("filetredTransactions: ", filteredTransactions);


  const handleChange = (event: { target: { value: string; }; }) => {
    const searchResults = transactions.filter((filteredTransactions) =>
      filteredTransactions.category.toLowerCase().includes(event.target.value)
      || filteredTransactions.category.toUpperCase().includes(event.target.value)
      || filteredTransactions.date.includes(event.target.value)
    );
    setfilteredTransactions(searchResults);
  };

  useEffect(() => {
    setfilteredTransactions(transactions);
  }, [transactions]);

  const filterHandler = (value: string) => {
    const searchResults = transactions.filter((filteredTransactions) =>
      filteredTransactions.type.includes(value)
    );
    // console.log(filteredTransactions.category)
    setfilteredTransactions(searchResults);
  };


  const deleteHandler: (state: ITransaction) => void = async (transaction) => {

    await api.delete(`/allTransactions/${transaction.id}`);

    dispatch({
      type: ActionTypes.DELETE_TRANSACTION,
      payload: transaction,
    });

    console.log(transactions);
  };


  return (
    <>
      <p className="mt-4 p-0 border-bottom text-left fs-2 fw-bold text-black-50">All Transactions</p>
      {/* <div className="form-outline"> */}
      <input className="form-control rounded" type="search" placeholder="Type to search.." onChange={handleChange}></input>
      {/* </div> */}
      <div className="container">
        <div className="my-2 d-flex justify-content-around">
          <button className=" btn btn-outline-primary" onClick={() => filterHandler("e")}>All</button>
          <button className=" btn btn-outline-primary" onClick={() => filterHandler("Income")}>Income</button>
          <button className=" btn btn-outline-primary" onClick={() => filterHandler("Expense")}>Expense</button>
        </div>
      </div>
      <div className="container">
        <div className="d-flex flex-column w-100 mt-3 border-top h-100 overflow-scroll">
          {filteredTransactions.map((i: ITransaction) => (
            <div key={i.id} >
              {/* {console.log("Each Transaction ", i)} */}
              <div className="d-flex justify-content-between py-2 border-bottom">
                <div className="d-flex align-items-center w-100 justify-content-around">
                  {i.type === "Income" ? (
                    <FaPlus className="green" />
                  ) : (
                    <FaMinus className="red" />
                  )}
                  <span className="mr-2 text-end">${i.amount}</span>
                  <span className="mr-2">{i.category}</span>
                  <span className="">{i.date}</span>
                </div>
                <div className="d-flex align-items-center">
                  <AiFillDelete
                    className="deleteIcon"
                    onClick={() => deleteHandler(i)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionList;