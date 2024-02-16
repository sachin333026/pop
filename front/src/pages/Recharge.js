import React, {useState, useEffect} from 'react'
import { Navbar, Container ,Form, Col, Row ,Dropdown, Nav} from "react-bootstrap";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import { RiWallet3Fill } from 'react-icons/ri'
import { HiMenuAlt2 } from 'react-icons/hi';
import { BsConeStriped, BsShieldExclamation } from 'react-icons/bs'
import Footer from '../components/Footer'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {makeStyles} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {Menu,MenuItem,MenuButton,MenuDivider} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
// function onScriptLoad(){
//   var config = {
//     "root": "",
//     "flow": "DEFAULT",
//     "data": {
//     "orderId": "", /* update order id */
//     "token": "", /* update token value */
//     "tokenType": "TXN_TOKEN",
//     "amount": "" /* update amount */
//     },
//     "handler": {
//       "notifyMerchant": function(eventName,data){
//         console.log("notifyMerchant handler function called");
//         console.log("eventName => ",eventName);
//         console.log("data => ",data);
//       } 
//     }
//   };

//   if(window.Paytm && window.Paytm.CheckoutJS){
//       window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
//           // initialze configuration using init method 
//           window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
//               // after successfully updating configuration, invoke JS Checkout
//               window.Paytm.CheckoutJS.invoke();
//           }).catch(function onError(error){
//               console.log("error => ",error);
//           });
//       });
//   } 
// }

const useStyles=makeStyles({
btn:{
}
})


function Recharge({baseUrl}) {
const [userData, setUserData] = useState([])
const [money,setmoney] = useState({amount:'',channelname:'',upi:'',transactionId:'',Utr:''});
const [rechargeoption, setrechargeoption] = useState([{id:''}])
const classes=useStyles();
const [copySuccess, setCopySuccess] = useState('');
const [showelement, setShowElement] = useState(false);
const navigate = useNavigate()
useEffect(()=>{
  setShowElement(true)
  setTimeout(function() {
   
    setShowElement(false)
    setCopySuccess('')
       }, 5000);
     },
 [copySuccess])




 const handleShow = (e) => {
  const { name, value } = e.target

  setmoney((prastate) => ({
      ...prastate,
      [name]: value,
  }));
}


useEffect(() => {
  showRCoption();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));


  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      // body: raw,
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
              setUserData({userBalance:result[0].userBalance})
          }


          // console.log(result);
      })
      .catch(error => console.log('error', error));
  return () => { };





},[])

 
const sendMoney = (value)=> {
  setmoney({amount:value})

}
const handShow = (e) => {
  const {value } = e.target

  setmoney((prastate) => ({
      ...prastate,
      amount: value,
  }));
}

const showRCoption = async () => {
  const ress = await fetch(baseUrl+'show/rcoption')
  const option = await ress.json();
  setrechargeoption(option)
}

 
const [selected, setSelected] = useState(rechargeoption[0].id)

const handleChange = event => {
  console.log(event.target.value);
 setSelected(event.target.value);  

}

const back = (val) => {
  if (val === 'back') {
    document.querySelector("#utrtable").style.display = "none";
    document.querySelector("#optiontable").style.display = "block";
    setmoney({amount:''})
}

}
const openutr = (val) => {

    if (val === 'openutr') {
 var selc='';
    if(selected=='')
    {
      selc=rechargeoption[0].id;
    }
    else
    {
      selc=selected;

    }

    var raw = JSON.stringify({
      id:selc,amount:money.amount,
  });
  var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body:raw,
              redirect: 'follow'
          };

          fetch(baseUrl + "show/rcoptionupi", requestOptions)
              .then(response => response.json())
              .then(result => {
                  if (result?.mess == "Max") {
                    toast.error('Amount must be Less than 20000', {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                      

                  } else if (result?.mess == "Min") {
                 
                    toast.error('Amount must be More than 99 Rs', {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                  
                  }

                  else if (result?.mess == "invalidAmount") {
                 
                    toast.error('Please Enter Valid Amount', {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                    
                }
                   
                  else {
                     
                    setmoney({channelname:result.channelname,upi:result.upi,transactionId:result.transactionId})
      document.getElementById('utrtable').style.display = 'block';
          document.getElementById('optiontable').style.display = 'none';
                      
                  }
              })
              .catch(error => console.log('error', error));

      

   
  }
 
}
 
const rechargesubmit = () => {
 
  var raw = JSON.stringify({
    utr:money.Utr , transactionId:money.transactionId
});
var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "submitrecharge", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.error == "ALREADY") {
                  toast.error('Utr Already Applied', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    

                } else if (result?.error == "ALREADYFILLED") {
               
                  toast.error('ALREADY FILLED UTR FOR THIS TRANSACTION ', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
                }
                else if (result?.error == "INVALID") {
               
                  toast.error('PLEASE ENTER CORRECT UTR/RRN NO.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
                }
                else if (result?.mess == "Success") {
               
                  toast.success('UTR SUCCESSFULLY SUBMITTED', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setmoney({amount:'',channelname:'',upi:'',transactionId:'',Utr:''})

                                 
    document.getElementById('utrtable').style.display = 'none';
    document.getElementById('optiontable').style.display = 'block';
              }
                 
                else {
                   
     
                    
                }
            })
            .catch(error => console.log('error', error));


}






// <Navbar style={{fontWeight: '500',color :'white' ,backgroundColor:'#0288d1',height: '62px',paddingTop:'14px',paddingLeft:'20px'}}  >
// <span>
//  <Dropdown align="end"  >  
//  <Dropdown.Toggle >
//  <HiMenuAlt2 ></HiMenuAlt2>
//  </Dropdown.Toggle>  
//  <Dropdown.Menu >
//          {/* <Dropdown.Item href="#/action-1">Promotion Record</Dropdown.Item> */}
//          <Dropdown.Item href="/BonusRecord">Bonus Record</Dropdown.Item>
//          <Dropdown.Item href="/ApplyRecord">Apply Record</Dropdown.Item>
//    </Dropdown.Menu>
//    </Dropdown >
//   </span>
//  </Navbar> 


  return (
    <>

      <Navbar style={{display:'flex',alignItems:'center', fontWeight: '500',color :'white' ,backgroundColor:'#0288d1',padding: '0.70rem'}}  >
                    <Link to='/mine' style={{ margin: '0.15rem', color: 'white' }}><IoMdArrowRoundBack size="1.55rem" /></Link> 
                    <span style={{display:'flex',alignItems:'center', margin: '0 0.40rem',fontSize:'1.25rem' }}>Recharge</span>  
                    <div
                     style={{ display: 'flex', justifyContent: 'flex-end', width: '85vw'  }}>
                    </div>
                    <span>
                    <div>

                   <Menu  direction="left"    menuButton={ <Link to='/RechargeRecord' style={{ textDecoration: 'none' }}> <i className="material-icons" style={{borderRadius:'0px',display:'flex',alignItems:'left',color:'white'}}>subject</i></Link>}>
           
            
        </Menu>
                      </div>
                     </span>
                  
                    </Navbar>   
      <div  style={{ display:'block', width: "100%" , overflowY :'scroll',}}>

        <div style={{borderColor:'rgba(0,0,0,.12)!important', backgroundColor: "#fb8c00",boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)' ,padding:'2px',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>   <BsShieldExclamation style={{padding:'2px' ,color:'white'}} size='30'/><Hp style={{ fontFamily:'Futura',fontWeight:'400',display:'flex',color: "white" }}>Note: If the recharge amount is deducted but amount is not added to the account, please send a detailed screenshot of payment and game ID to the mailbox for processing. </Hp></div>
       
        <Ah3 style={{fontFamily:'arial', color: "red", textAlign: "center",fontWeight:'550',marginTop:'24px'}}>Any Problem? Contact <span style={{ color: "#0288d1" }} onClick={event =>  window.location.href='https://api.whatsapp.com/send?phone=917877444069'}> Whatsapp</span></Ah3>
        <Ah2 style={{ textAlign: "center",marginTop:'25px' ,fontWeight:'400'}}>Balance: ₹ {userData.userBalance}</Ah2>
        <div  id="optiontable" style={{ padding:'0 20px', marginTop:'19px',borderRadius:'2px',width:'100%'}}>
          <div style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}><RiWallet3Fill style={{ color: "#4C4E52",padding:'0px 5px'  }} size='35' />
          <Borderinput   value={money.amount}  type= "text" placeholder='Please select recharge amount' style={{border:'none' ,width: "80%", height: "3rem",padding: "0 18px" }} /></div>
        <div style={{justifyContent:'center', display: "flex",flexDirection:'row', flexWrap:'wrap',textAlign:'center', marginTop:'25px' }}>
          
            <PriceButton onClick={ ()=>sendMoney("100")}  style={{ borderRadius:'0px',marginBottom: "0.7rem",content:'space-between' ,backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center" ,fontWeight:'400'}}>₹ 100</PriceButton>
            <PriceButton onClick={ ()=>sendMoney("500")}   style={{borderRadius:'0px',marginLeft: "0.7rem",content:'space-between' , marginBottom: "0.7rem",backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center",fontWeight:'400' }}>₹ 500</PriceButton>
            <PriceButton onClick={ ()=>sendMoney("1000")}  style={{ borderRadius:'0px',marginLeft: "0.7rem",content:'space-between' , marginBottom: "0.7rem",backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center" ,fontWeight:'400'}}>₹ 1000</PriceButton>
            <PriceButton onClick={ ()=>sendMoney("3000")}  style={{ borderRadius:'0px',marginLeft: "0.7rem", content:'space-between' ,marginBottom: "0.7rem",backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center" ,fontWeight:'400'}}>₹ 3000</PriceButton>
            <PriceButton onClick={ ()=>sendMoney("5000")}  style={{ borderRadius:'0px',marginLeft: "0.7rem", content:'space-between' ,marginBottom: "0.7rem",backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center" ,fontWeight:'400'}}>₹ 5000</PriceButton>
            <PriceButton onClick={ ()=>sendMoney("10000")}  style={{ borderRadius:'0px',marginLeft: "0.7rem",content:'space-between' , marginBottom: "0.7rem",backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center" ,fontWeight:'400'}}>₹ 10000</PriceButton>
            <PriceButton onClick={ ()=>sendMoney("20000")}  style={{ borderRadius:'0px',marginLeft: "0.7rem", content:'space-between' ,marginBottom: "0.7rem",backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center" ,fontWeight:'400'}}>₹ 20000</PriceButton>
            <Luckinput  onChange={(e)=>{handShow(e)}}   type="text"  placeholder="Amount" style={{ borderRadius:'0px',marginLeft: "0.7rem", marginBottom: "0.5rem",backgroundColor:'#fff', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', textAlign: "center" ,fontWeight:'400',borderRadius:'5px'}} />
           
        </div>
       
         
        <div style={{justifyContent:'center',textAlign:'center',marginTop:'20px'}}>
        <b  style={{color:'#e5e5e5e',fontWeight:'600',border:'0px',textDecoration:'none',fontSize:'18px'}}>Select Channel :</b><select style={{fontWeight:'400',border:'0px',textDecoration:'none',fontSize:'20px'}} value={selected} onChange={handleChange}>
      {
      rechargeoption.map(rechargeoption=>(
           <option style={{color:'#e5e5e5e'}} key={rechargeoption.id} value={rechargeoption.id}>
         {rechargeoption.channelname}
             </option>
     ))
    }
    </select>
    </div>

        <div style={{ margin: "2rem", color: "#888888" }}>
          {/* <p>Payment</p>
          <p> <input type="checkbox" id="payment" name="payment" value="Payment" style={{ marginRight: "0.5rem", color: "#888888" }} />
            EK</p> */}

            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={(e) => openutr("openutr")} style={{ whiteSpace:'inherit',marginTop:'8px',width: '10.80rem' ,backgroundColor:'#0288D1' ,color:'white',transition:'.3s cubic-bezier(.25,.8,.5,1)',height:'2.3rem',fontSize:'16px',textTransform: "none",borderRadius:'0px',fontWeight:'400',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}   type="submit" >
                                Recharge
                            </Button>

            </div> 
                        </div>
                        
                        <div id='utrtable' style={{ overflowY :'scroll', display: 'none', border: "0.4px solid white", borderRadius: "5px", margin: "0px" }}>
                        <Container style={{ padding: "0 30px" ,paddingBotton:'30px'}}>
                            <Form >
                            <Form.Group className="mb-3">
                                    <Form.Label>Channel Name</Form.Label>
                                    <Form.Control  style={{fontWeight:'bold'}} type="text"  value={money.channelname}  readOnly />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                <Form.Label>Transaction No.</Form.Label>
                                <Form.Control  style={{fontWeight:'bold'}} type="text"  value={money.transactionId}  readOnly />
                            </Form.Group>
                                <Form.Group className="mb-3">
                                <Form.Control  name="selected" type="hidden" value={selected}  readOnly />
                            </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>UPI ID     {showelement?<b style={{color:'green'}}>{copySuccess}</b>:<b style={{color:'inherit',fontFamily:'futuru',fontWeight:'400',marginLeft:'5px'}} > Click to Copy</b>}</Form.Label>
                                    <Form.Control   style={{fontWeight:'bold'}} value={money.upi} type="text" onClick={() =>  navigator.clipboard.writeText(money.upi)?setCopySuccess("Copied"):setCopySuccess("Error") } readOnly />    
                                    
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label>AMOUNT</Form.Label>
                                        <Form.Control  style={{fontWeight:'bold'}}  value={money.amount} readOnly />
                                    </Form.Group>
                                   
                                <Form.Group className="mb-3">
                                    <Form.Label>UTR</Form.Label>
                                    <Form.Control type="number"  name='Utr'  onChange={handleShow} placeholder="Enter UTR/Transaction Number" required/>
                                </Form.Group>
                                <Button style={{backgroundColor:'#FF5733',width:'100px',fontWeight:'600' ,color:'white',textShadow:'0.25px 0.25px 0.25px white'}}   onClick={() => back('back')}>Cancel</Button>
                                        <Button disabled={!money.Utr} style={{marginLeft:'0.70rem',backgroundColor:'#0288d1',width:'100px',fontWeight:'600',color:'white',textShadow:'0.25px 0.25px 0.25px white'}} onClick={() => rechargesubmit()}  >submit</Button>
                                    
        
                            </Form>
                        </Container>
                    </div>
                    </div>




                   

                       
     
      <Footer /></>
  )
}

export default Recharge
const Borderinput = styled.input`
  &:focus {
    outline: none;
  }
`;

const Hp = styled.div`
  font-size: 1.2rem;
  width: 100%;
  padding: 10px;
  padding-left: 5px;
  padding-right: 2px;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 5px;
  }

  @media (max-width: 280px) {
    font-size: 0.8rem;
    padding: 5px;
  }
`;

const PriceButton = styled.div`
  width: 120px;
  padding: 10px;
  font-size: 15px;

  @media (max-width: 1024px) {
    width: 120px;
    padding: 7px;
    font-size: 15px;
  }

  @media (max-width: 768px) {
    width: 70px;
    padding: 7px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    width: 70px;
    padding: 4px;
    font-size: 14px;
  }

  @media (max-width: 280px) {
    width: 50px;
    padding: 3px;
    font-size: 10px;
  }
`;

const Luckinput = styled.input`
  width: 200px;
  padding: 10px;
  font-size: 15px;

  @media (max-width: 1024px) {
    width: 200px;
    padding: 7px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    width: 70px;
    padding: 7px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    width: 70px;
    padding: 4px;
    font-size: 15px;
  }

  @media (max-width: 280px) {
    width: 50px;
    padding: 3px;
    font-size: 10px;
  }
`;

const Ah2 = styled.h2`
  font-size: 40px;

  @media (max-width: 1024px) {
    font-size: 30px;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 19px;
  }

  @media (max-width: 280px) {
    font-size: 17px;
  }
`;

const Ah3 = styled.h3`
  font-size: 30px;

  @media (max-width: 1024px) {
    font-size: 25px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }

  @media (max-width: 280px) {
    font-size: 10px;
  }


`;