import { ITransaction } from "../../types";
import { ActionTypes } from "../action-types/action-types"

export const addTransaction = (transaction : ITransaction) => {
    return {
        type: ActionTypes.ADD_TRANSACTION,
        payload: transaction
    };
};

export const transactionList = (transactions : ITransaction[]) => {
    return {
        type: ActionTypes.TRANSACTION_LIST,
        payload: transactions
    }
}

export const deleteTransaction = (transaction: ITransaction[]) => {
    return {
        type: ActionTypes.DELETE_TRANSACTION,
        // payload: transaction
    }
}

// export const filterTransaction = (transactions: ITransaction[], category: string) => {
//     return {
//         type: ActionTypes.FILTER_PRODUCT_BY_CATEGORY,
//         payload: category
//     }
// }