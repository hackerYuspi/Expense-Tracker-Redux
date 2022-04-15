import { combineReducers } from 'redux';
import { budgetReducer } from './BudgetReducer';

const reducers = combineReducers({
    allTransactions: budgetReducer,
});

export default reducers;