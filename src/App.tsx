import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTransaction from './components/main/mainComponents/AddTransaction';
import Main from './components/main/Main';
import IncomeExpenses from './components/details/incomeExpenseDetails';
import "bootstrap/dist/css/bootstrap.min.css"



function App() {
  return (
    <div className="container">
      <div className='d-flex row g-4 align-items-start justify-content-start'>
        <div className='col order-lg-1 order-md-2 order-sm-2 order-2 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center'>
          <IncomeExpenses title="Income" />
        </div>
        <div className='col g-0 order-lg-2 order-md-1 order-sm-1 order-1 col-lg-4 col-md-12 col-sm-12'>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/addTransaction" element={<AddTransaction />} />
              <Route>404 Not Found!</Route>
            </Routes>
          </Router>
        </div>
        <div className='col order-lg-3 order-md-3 order-sm-3 order-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center'>
          <IncomeExpenses title="Expense" />
        </div>
      </div>
    </div>
  );
}

export default App;
