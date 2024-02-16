import React, { useEffect, useState } from 'react'
import { Navbar, Form, Dropdown, Button } from 'react-bootstrap';
import { BiRupee } from 'react-icons/bi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { costomeSocket } from '../components/CostomSocket';
import Footer from '../components/Footer';
import jwt_decode from "jwt-decode";
import styled from 'styled-components'
import CryptoJS from 'crypto-js';
import {Menu,MenuItem,MenuButton,MenuDivider} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
const Withdrawal = ({ userBalance, baseUrl, userName }) => {
    const navigate = useNavigate()
   const Id = localStorage.getItem('token')
   const [userBankDetails, setUserBankDetails] = useState([])
   const [userData, setUserData] = useState([])
    const [userDetails, setuserDetails] = useState("");
   const [userBankInfo, setUserBankInfo] = useState({
        reqamount: '', BankId: "", userPassword: ""
    })
    const [withdrawoption, setwithdrawoption] = useState([{id:''}])
    const showWDoption = async () => {
        const ress = await fetch(baseUrl+'show/wdoption')
        const option = await ress.json();
        setwithdrawoption(option)
      }
      
    const [selected, setSelected] = useState(withdrawoption[0].id)

const handleChange = event => {
  
 setSelected(event.target.value);  

}


   const [socket, setSocket] = useState(null)
    useEffect(() => {
        showWDoption();
        showBankDetails();
        showbalance();
   }, [])
   let commission="0";
    if(userBankInfo?.reqamount<=1000 && userBankInfo?.reqamount>0)
    {
    commission = 30;
    }
    else
    {
    commission = 2 / 100 * userBankInfo.reqamount 
    }
    const payableAmount = userBankInfo?.reqamount - commission
    const userID = localStorage.getItem("token")

    useEffect(() => {
     if (userID) {
            if (socket === null) {
                // setSocket(io(baseUrl))
                setSocket(costomeSocket)
            }
          else{
            socket.off("receive_history").on("receive_history", (data) => {
           

               socket.emit("user_Details_Get", userID);
            })

            socket.on("user_Details", (data) => {
            
                setUserData(data)
            })
          }
       }
       return () => { };
   }, [socket])


   const showbalance=()=>
{

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
        
}
   const showBankDetails = () => {
        // document.getElementById('addDiv').style.display = 'none';
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Id);
        var raw = JSON.stringify({
            userId: Id
        });
       var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
       fetch(baseUrl + "showBankDetails", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserBankDetails(result.data)
            }
            )
            .catch(error => console.log('error', error));
    }
   const withdrawalRequest = () => {
       if (userBankInfo?.reqamount == "") {
            toast.error('Amount  input required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (userBankInfo?.BankId == "") {
            toast.error('Bank card required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        
        else if (userBankInfo?.userPassword == "") {
            toast.error('Password required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            
           if (parseFloat(userData?.userBalance) >= parseFloat(userBankInfo?.reqamount)) {
            var myHeadersChack = new Headers();
            myHeadersChack.append("Content-Type", "application/json");
            myHeadersChack.append("Authorization", "Bearer " + Id);

            var selc='';
    if(selected=='')
    {
      selc=withdrawoption[0].id;
    }
    else
    {
      selc=selected;

    }

            var rawdata = JSON.stringify({
                BankId: userBankInfo?.BankId,
                requestPayment: userBankInfo?.reqamount,
                current_balance: userData?.userBalance,
                userPassword: userBankInfo?.userPassword,
                fee: commission.toFixed(2),
                channel:selc,
                payableAmount: payableAmount.toFixed(2)
           });
           var requestOptionsChack = {
                method: 'POST',
                headers: myHeadersChack,
                body: rawdata,
                redirect: 'follow'
            };
           // setUserBankInfo({ reqamount: "",BankId: "", userPassword: "" })
           fetch(baseUrl + "withdralpaymentchack", requestOptionsChack)
           .then(response => response.json())
           .then(result => {
                   
                    // console.log(result);
                   if (result.error === "LPI") {
                     
                        toast.error("Login Password Incorrect", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } 
                   else if (result.error === "KCAC") {
                     
                        toast.error("Kindly Choose Another Channel !", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else if (result.error === "INF") {
                     
                        toast.error("Insufficient Funds !", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else if (result.error === "SWW") {
                     
                        toast.error("Something Went Wrong ,Please Reload Page and Try Again !", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else if (result.error === "BDI") {
                     
                        toast.error("BANK CARD INVALID", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else if (result.error === "GPE") {
                     
                        toast.error("Game play must be greater than recharge amount !", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else {
                        if(result.mess === "Success")
                       {
                        toast.success("Successfully Withdrawal ", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        showBankDetails()
                    }


                   }
                     
                }
                )
             
           } else {
            toast.error("Insufficient Funds !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
          
           }
       }
   }
   const HandlShow = (e) => {
        const { name, value } = e.target
       setUserBankInfo((prastate) => ({
            ...prastate,
            [name]: value,
        }))
    }
   return (
        <>
           <div>
           <Navbar style={{display:'flex',alignItems:'center', fontWeight: '500',color :'white' ,backgroundColor:'#0288d1',padding: '0.70rem'}}   >
           <Link to='/mine' style={{ margin: '0.15rem', color: 'white' }}><IoMdArrowRoundBack size="1.55rem"/></Link> 
           <span style={{display:'flex',alignItems:'center', margin: '0 0.40rem',fontSize:'1.25rem' }}>Withdrawal</span>  
     <div
            style={{ display: 'flex', justifyContent: 'flex-end', width: '85vw' }}>
     </div>
        <span>
             <div>

                 <Menu  direction="left"    menuButton={ <Link to='/WithdrawalRecord' style={{ textDecoration: 'none' }}> <i className="material-icons" style={{borderRadius:'0px',display:'flex',alignItems:'left',color:'white'}}>subject</i></Link>}>
                 </Menu>

             </div>
        </span>
         
           </Navbar>  


            </div>
            <div>
                <div style={{ backgroundColor: '#fb8c00', color: 'white' }}>
                    <p style={{ padding: '18px',fontWeight: '550' ,fontSize:'14px'}}>Please assure the bank details are correct otherwise company will not be responsible for any missing withdraw.. </p>
                </div>
            </div>
           <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                   <h6 style={{ marginBottom: '1rem', color: 'red' ,fontWeight: '550' ,fontSize:'26px'}}>Any problem? Contact <span style={{ color: '#0288d1' }}>WhatsApp</span></h6>
                </div>
            </div>
           <div style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h6 style={{ marginTop: '1.5rem' , color: 'black',fontSize: '24px' }}>  Balance : ₹ {userData.userBalance} </h6>
                    </div>
                </div>

                <div style={{margin:'0.10rem 2rem',borderRadius:'2px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}><i class="material-icons" style={{marginLeft:'0.50rem',display:'inline-flex',lineHeight:'1',alignItems:'center',justifyContent:'center',verticalAlign:'text-bottom',color:'#039BE5'}}>monetization_on</i>
                <Borderinput  type= "text" placeholder='Enter withdrawal Amount' name='reqamount' value={userBankInfo?.reqamount} onChange={HandlShow} style={{textDecoration:'none',border:'none' ,width:'90%',height: "3rem",padding: "0 0.30rem",textAlign:'left' }} /></div>
     
                
              
               <div style={{ display: 'flex',margin:'0.40rem 2rem',fontWeight: '300',fontSize: '15px' }}>
                       <b>Fee:{commission.toFixed(2)}, To account {payableAmount.toFixed(2)}</b>
               </div>
               <div style={{ margin:'0.10rem 2rem' }}>
               <div style={{marginTop:'20px'}}>
               <b  style={{color:'#e5e5e5e',fontWeight:'600',border:'0px',textDecoration:'none',fontSize:'18px'}}>Select Channel :</b><select style={{fontWeight:'400',border:'0px',textDecoration:'none',fontSize:'20px'}} value={selected} onChange={handleChange}>
             {
             withdrawoption.map(withdrawoption=>(
                  <option style={{color:'#e5e5e5e'}} key={withdrawoption.id} value={withdrawoption.id}>
                {withdrawoption.channelname}
                    </option>
            ))
           }
           </select>
           </div>
                     
                   <div>
                        <div style={{ marginTop: '1.5rem' }}>
                           <Form.Select name="BankId" aria-label="Default select example" value={userBankInfo?.BankId} onChange={HandlShow}>
                                <option style={{backgroundColor:' ',fontSize:'1.4rem'}} value={""}> Select Bank Card</option>
                                {
                                    userBankDetails && userBankDetails?.map((data, i) => {
                                       return (
                                            <option style={{backgroundColor:' ',fontSize:'1.4rem'}} value={data?.id}>{data?.actualName} {data?.bankName} {data?.accountNumber}</option> 
                                        )
                                   })
                                }
                           </Form.Select>
                          
                        </div>
                    </div>
                </div>

                <div style={{margin:'1.5rem 2rem',borderRadius:'2px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}><i class="material-icons" style={{marginLeft:'0.50rem',display:'inline-flex',lineHeight:'1',alignItems:'center',justifyContent:'center',verticalAlign:'text-bottom'}}>vpn_key</i>
                <Borderinput  type= "text" placeholder='Enter Login Password' name='userPassword' value={userBankInfo?.userPassword} onChange={HandlShow} style={{textDecoration:'none',border:'none' ,width:'90%',height: "3rem",padding: "0 0.30rem",textAlign:'left' }} /></div>
     
                

                 
               <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ margin: '1.7rem' }}>
                        <Button style={{ borderRadius:'0px',padding:'0.60rem 4rem',backgroundColor:'#0288d1',fontWeight: '400' ,fontSize:'0.80rem' }}  onClick={() => { withdrawalRequest() }} type="submit">
                            Withdrawal
                        </Button>
                    </div>
               </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    )
}
export default Withdrawal


const Borderinput =styled.input`
&:focus {
 outline:none;
  
}
`;