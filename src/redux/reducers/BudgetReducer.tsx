import { BudgetAction, ITransaction } from '../../types';
import { ActionTypes } from '../action-types/action-types';

const initialState: ITransaction[] = [
  // {
  //   amount: 5000,
  //   category: "Salary",
  //   type: "Income",
  //   date: "2020-11-16",
  //   id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a",
  // },
  // {
  //   amount: 75,
  //   category: "Shopping",
  //   type: "Expense",
  //   date: "2020-11-16",
  //   id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a",
  // },
  // {
  //   amount: 125,
  //   category: "Car",
  //   type: "Expense",
  //   date: "2020-11-16",
  //   id: "0f72e66e-e144-4a72-bbc1-c3c92018635e",
  // },
];

export const budgetReducer = (state = initialState, action: BudgetAction) => {
  switch (action.type) {
    case ActionTypes.TRANSACTION_LIST:
      return action.payload;
    case ActionTypes.ADD_TRANSACTION:
      return state;
    // return [action.payload, ...state];
    case ActionTypes.DELETE_TRANSACTION:
      return state.filter((i) => i.id !== action.payload.id);
    // case ActionTypes.FILTER_PRODUCT_BY_CATEGORY:
    //   return state.filter((i) => i.id == action.payload.category)
    default:
      return state;
  }
}