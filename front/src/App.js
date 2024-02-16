import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Win from './pages/Win';
import MinePage from './pages/MinePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import About from './pages/About';

import ResetPassword from './pages/ResetPassword';
import AddAddress from './pages/AddAddress';
import AddBankCard from './pages/AddBankCard';
import Withdrawal from './pages/Withdrawal';
import Orders from './pages/Orders';
import ComplaintsSuggestions from './pages/ComplaintsSuggestions';
import Promotion from './pages/Promotion';
import Transactions from './pages/Transactions';
import RiskDisclosureAgreement from './pages/RiskDisclosureAgreement';
import Recharge from './pages/Recharge';
import AuthUser from "./AuthUser";
import AdminPage from './pages/AdminPage';
// import Home from './pages/Home';
import Home from './pages/HomePage';
import UserManagement from './adminPages/UserManagement';
import Pages from './adminPages/Pages';
// import WinTwo from './pages/WinTwo';
import Payment from './pages/Payment';
import Error404 from './pages/Error404';
import Order from './adminPages/Order';
import Period from './adminPages/Period';
import GameResult from './adminPages/GameResult';
import GameRules from './adminPages/GameRules';
import WithdrawalPayments from './adminPages/WithdrawalPayments';
import RechargePayments from './adminPages/RechargePayments';
// import GameTC from './adminPages/GameTC';
import Promotions from './adminPages/Promotions';
import Wallet from './adminPages/Wallet'
import Tickets from './adminPages/Tickets'
import Gamesetting from './adminPages/Gamesetting'
import RechargeSetting from './adminPages/RechargeSetting'
import WithdrawSetting from './adminPages/WithdrawSetting'
import LoginAdmin from './adminPages/Login'
import Ticket from './pages/Ticket';
import SettingUser from './pages/Setting';
import AuthAdmin from './AuthAdmin';
// import AdminLogin from './adminPages/AdminLogin'
import History from './pages/History';
import Reports from './adminComponent/Reports';
import Trasation from './adminComponent/Trasation';
import BonusRecord from './pages/BonusRecord';
import ApplyRecord from './pages/ApplyRecord';
import RechargeRecord from './pages/RechargeRecord';
import WithdrawalRecord from './pages/WithdrawalRecord';
import BandhanToken from './adminPages/BandhanToken.js';
import BandhanPayments from './adminPages/BandhanPayments';

function App()
 {
  const navigate = useNavigate()



  // const baseUrl = 'http://54.237.197.99:5000/';
 // const baseUrl = URL.API_BASE_URL
 const baseUrl = 'http://localhost:5000/';

 


  const [userData, setUserData] = useState([])
  const [userBalance, setUserBalance] = useState('')
  const [userName, setUserName] = useState('')
  const userToken = localStorage.getItem('token')
  useEffect(() => {
    if (userToken) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer "+userToken);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
       
        redirect: 'follow'
      };

      fetch(baseUrl + "showUserAdmin", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result?.mess == "user not Found") {
            localStorage.removeItem('token')
            navigate('/')

          } else if (result?.message == "Authorization required") {
            
            localStorage.removeItem('token')
            navigate('/')
          } else {
            setUserBalance(result[0]?.userBalance)
            setUserData(result)
            setUserName(result[0]?.userName)
          }
        })
        .catch(error => console.log('error', error));

    }
  }, [])
 











  function UserWindow() {
    const [screenSize, getDimension] = useState({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
    const setDimension = () => {
      getDimension({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
      })
    }
    
    useEffect(() => {
      window.addEventListener('resize', setDimension);
      
      return(() => {
          window.removeEventListener('resize', setDimension);
      })
    }, [screenSize])
    return (
      <div>
        <ul>
          <li>Width: <strong>{screenSize.dynamicWidth}</strong></li>
          <li>Height: <strong>{screenSize.dynamicHeight}</strong></li>
        </ul>    
      </div>
    )
  }
  
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login baseUrl={baseUrl} />} />
        <Route path='*' element={<Error404 />} />
        <Route exact path='/register' element={<Register baseUrl={baseUrl} />} />
        <Route path='/reset/password' element={<ResetPassword baseUrl={baseUrl} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin/login' element={<AuthAdmin cmp={LoginAdmin} baseUrl={baseUrl} />} />
        <Route path='/admin' element={<AuthAdmin cmp={AdminPage} baseUrl={baseUrl} />} />
        <Route path='/user/management' element={<AuthAdmin cmp={UserManagement} baseUrl={baseUrl} />} />
        <Route path='/user/pages' element={<AuthAdmin cmp={Pages} baseUrl={baseUrl} />} />
        <Route path='/Promotions' element={<AuthAdmin cmp={Promotions} baseUrl={baseUrl} />} />
        <Route path='/Order' element={<AuthAdmin cmp={Order} baseUrl={baseUrl} />} />
        <Route path='/GameResult' element={<AuthAdmin cmp={GameResult} baseUrl={baseUrl} />} />
        <Route path='/GameRules' element={<AuthAdmin cmp={GameRules} baseUrl={baseUrl} />} />
        <Route path='/user/wallet' element={<AuthAdmin cmp={Wallet} baseUrl={baseUrl} />} />
        <Route path='/admin/ticket' element={<AuthAdmin cmp={Tickets} baseUrl={baseUrl} />} />
        <Route path='/admin/gamesettings' element={<AuthAdmin cmp={Gamesetting} baseUrl={baseUrl} />} />
        <Route path='/admin/RechargeSetting' element={<AuthAdmin cmp={RechargeSetting} baseUrl={baseUrl} />} />
        <Route path='/admin/WithdrawSetting' element={<AuthAdmin cmp={WithdrawSetting} baseUrl={baseUrl} />} />
       
        <Route path='/admin/Period' element={<AuthAdmin cmp={Period} baseUrl={baseUrl} />} />
        <Route path='/admin/report' element={<AuthAdmin cmp={Reports} baseUrl={baseUrl} />} />
        <Route path='/admin/transactions' element={<AuthAdmin cmp={Trasation} baseUrl={baseUrl} />} />
        <Route path='/admin/BandhanToken' element={<AuthAdmin cmp={BandhanToken} baseUrl={baseUrl} />} />
        <Route path='/admin/BandhanPayments' element={<AuthAdmin cmp={BandhanPayments} baseUrl={baseUrl} />} />
        <Route path='/admin/WithdrawalPayments' element={<AuthUser cmp={WithdrawalPayments} baseUrl={baseUrl} />} />
        <Route path='/admin/RechargePayments' element={<AuthUser cmp={RechargePayments} baseUrl={baseUrl} />} />

        {/* User Auth */}

        <Route path='/win' element={<AuthUser cmp={Win} baseUrl={baseUrl}    userData={userData} userBalance={userBalance} userName={userName} />} />
        <Route path='/mine' element={<AuthUser cmp={MinePage} baseUrl={baseUrl} userData={userData} />} />
        <Route path='/privacy/policy' element={<AuthUser baseUrl={baseUrl} cmp={PrivacyPolicy} />} />
        <Route path='/terms/condition' element={<AuthUser baseUrl={baseUrl} cmp={Terms} />} />
        <Route path='/about' element={<AuthUser cmp={About} />} />
        <Route path='/reset/password' element={<AuthUser cpm={ResetPassword} />} />
        <Route path='/add/address' element={<AuthUser cmp={AddAddress} baseUrl={baseUrl} />} />
        <Route path='/add/bank' element={<AuthUser cmp={AddBankCard} baseUrl={baseUrl} />} />
        <Route path='/withdrawal' element={<AuthUser cmp={Withdrawal} userBalance={userBalance} baseUrl={baseUrl} userName={userName} />} />
        <Route path='/orders' element={<AuthUser cmp={Orders} />} />
        <Route path='/ComplaintsSuggestions' element={<AuthUser cmp={ComplaintsSuggestions} baseUrl={baseUrl} />} />
        <Route path='/promotion' element={<AuthUser cmp={Promotion} baseUrl={baseUrl} userBalance={userBalance} />} />
        <Route path='/transactions' element={<AuthUser cmp={Transactions} />} />
        <Route path='/RiskDisclosure' element={<AuthUser cmp={RiskDisclosureAgreement} baseUrl={baseUrl} />} />
        <Route path='/recharge' element={<AuthUser cmp={Recharge} baseUrl={baseUrl} />} />
        
        <Route path='/user/ticket' element={<AuthUser cmp={Ticket} baseUrl={baseUrl} />} />
        <Route path='/user/setting' element={<AuthUser cmp={SettingUser} baseUrl={baseUrl} />} />
        <Route path='/user/history' element={<AuthUser cmp={History} baseUrl={baseUrl} />} />
        <Route path='/BonusRecord' element={<AuthUser cmp={BonusRecord} baseUrl={baseUrl} />} />
        <Route path='/ApplyRecord' element={<AuthUser cmp={ApplyRecord} baseUrl={baseUrl} />} />
        <Route path='/RechargeRecord' element={<AuthUser cmp={RechargeRecord} baseUrl={baseUrl} />} />
        <Route path='/WithdrawalRecord' element={<AuthUser cmp={WithdrawalRecord} baseUrl={baseUrl} />} />
         <Route exact path='/promotion/register' element={<Register baseUrl={baseUrl} />} /> 
          
          </Routes>
      
    </>
  );
}



export default App;
