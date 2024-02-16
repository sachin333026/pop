import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
 
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
       
        <App />
     
  
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
