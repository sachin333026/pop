import React, {  useState, useEffect } from 'react'
//import { BiRupee, BiRefresh } from 'react-icons/bi';
//import { AiFillTrophy } from 'react-icons/ai';
import MaterialTable from 'material-table';
import { Button, Container, Card, Row, Col ,Navbar} from 'react-bootstrap';
import ModalReadRule from './ModalReadRule';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import coin1 from '../image/coins-img/100-01.png'
import coin2 from '../image/coins-img/500-01.png'
import coin3 from '../image/coins-img/1000-01.png'
import coin6 from '../image/coins-img/10000-01.png'
import coin10 from '../image/coins-img/10-01.png'
import coin1x from '../image/coins-img/100-02.png'
import coin2x from '../image/coins-img/500-02.png'
import coin3x from '../image/coins-img/1000-02.png'
import coin6x from '../image/coins-img/10000-02.png'
import coin10x from '../image/coins-img/10-02.png'
import ModalRupesSelect from './ModalRupesSelect';
import styled from 'styled-components'
import AllTableWin from '../components/AllTableWin';
import { ToastContainer, toast } from 'react-toastify';
import Autorenew from '@material-ui/icons/Autorenew';
import 'react-toastify/dist/ReactToastify.css';
//import { io } from "socket.io-client";
//import Countdown from 'react-countdown';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
//import { FaWindowClose, FaUsers } from 'react-icons/fa';
//import jwt_decode from "jwt-decode";
import { costomeSocket } from './CostomSocket';
//import { BsShieldExclamation } from 'react-icons/bs'
//import CryptoJS from 'crypto-js';
import UserWindow from "../components/UserWindow"
 
const WinHeader = ({ baseUrl, userBalance, userName }) => {

   
    const location = useLocation();
    const [periodDemo, setperiodDemo] = useState();
    const [userDetails, setuserDetails] = useState("");
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [valueRupess, setValueRupess] = useState('10');
    const [cardValue, setCardValue] = useState('');
    const [history, setHistory] = useState({});
    const [messageList, setMessageList] = useState(1);
    const [periodTime, setperiodTime] = useState(0);
    const [periodDetails, setperiodDetails] = useState(0);
    const [disable, setDisable] = useState("false");
    const [socket, setSocket] = useState(null)
    const [TermsCondition, setNotice] = useState([])
    const start = Date.now();
    const myRef = React.createRef()
    const navigate = useNavigate()
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const [tievalue, settievalue] = useState(0);
    const [andarValue, setandarValue] = useState(0);
    const [baharValue, setbaharValue] = useState(0);
    

    const userID = localStorage.getItem("token")


    const [userData, setUserData] = useState([])


    const userToken = localStorage.getItem('token')

     const cookies = new Cookies();

     const [prId, setprId] = useState({})

    const userIId = userData[0]?.userId
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
      const showTerms = async () => {
        const ress = await fetch(baseUrl+'Notification')
        const terms = await ress.json();
        setNotice(terms)
        document.getElementById('detailsId').style.display = 'flex';
      
      }

      
      const handle = () => {
 
   cookies.set('Notice', '1', { path: '/'});
         
         
     };

     useEffect(() => {
       


        if(cookies.get('Notice') == 1)
        {}
        else
        {
        showTerms()
        }
        //showAddressDetails()

      }, []);
    
  
      
      

    useEffect(() => {
       


        if (socket === null) {
             
            setSocket(costomeSocket)
           
        } else {
           

            
            socket.on("close", (data) => {
            socket.disconnect();
            toast.error('User Connected on another Device', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });
            navigate('/mine')
 
             })
            socket.emit("receive_message_sub");
            socket.on("receive_period", (data) => {
 
                setperiodTime(data?.period)
                setperiodDetails(data)
            })
          
            socket.on("receive_message", (data) => {

                setMessageList(data?.endTime)
            })
            
            socket.on("receive_history", (data) => {

                setUserAddressDetail(data);
            })

            
            socket.on("winner_card", (data) => {
                if(data=="andar")
                {
                    document.getElementById("demo").innerHTML = '<div style="margin: 12px 0px; text-align: center; font-size: 18px; color: rgb(3, 169, 244); font-weight: bold;">Andar Win</div>';
                }
                else if(data=="bahar")
                {
                    document.getElementById("demo").innerHTML = '<div style="margin: 12px 0px; text-align: center; font-size: 18px; color: rgb(3, 169, 244); font-weight: bold;">Bahar Win</div>';
                }
                else if(data=="tie")
                {
                    document.getElementById("demo").innerHTML = '<div style="margin: 12px 0px; text-align: center; font-size: 18px; color: rgb(3, 169, 244); font-weight: bold;">Tie Win</div>';
                }
                else if(data=="waiting")
                    {
                        document.getElementById("demo").innerHTML = '<div style="margin: 12px 0px; text-align: center; font-size: 18px; color: rgb(3, 169, 244); font-weight: bold;">Waiting..</div>';
                    }
                    else if(data=="waiting2")
                    {
                        document.getElementById("demo").innerHTML = '<div style="margin: 12px 0px; text-align: center; font-size: 18px; color: rgb(3, 169, 244); font-weight: bold;">Starting..</div>';
                     }
                    else
                
                    {
 
                        document.getElementById("demo").innerHTML = '<div style="margin: 12px 0px; text-align: center; font-size: 18px; color: rgb(3, 169, 244); font-weight: bold;">'+data+'</div>';
                 

                    }
                   
                
            })




            socket.off("receive_period").on("receive_period", (data) => {

                const myTimeout = setTimeout(run, 600);

                function run() {
                    socket.emit("user_Details_Get", userToken);
                    settievalue(0)
                    setandarValue(0)
                    setbaharValue(0)
                }


               
                    setprId(data)
               
               
                setperiodTime(data?.period)
                setperiodDetails(data)
            })


          

           // socket.emit("user_Details_Get", userToken);
            socket.on("user_Details", (data) => {
 

               setuserDetails(data)

            })
           

             
          



        }


    }, [socket])

     
    const userDetailsHendle = () => {
        if (userToken) {


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + userToken);
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
                    }
                    else {

                        setUserData(result)
                        setuserDetails(result[0])

                    }
                })
                .catch(error => console.log('error', error));

        }
    }











    var nows = new Date().getTime();
    var distances = messageList - (nows + 10000);

    console.log(messageList+" : "+nows);
    React.useEffect(() => {



        

            var x = setInterval(function () {
                var now = new Date().getTime();
                var distance = messageList - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                // document.getElementById("demo").innerHTML = + minutes + ":" + seconds + "";
                document.getElementById("demo").innerHTML = seconds < 10 ? "0" + seconds : seconds;
                // setminute(minutes)
                // setseconds(seconds)
    
    
                if (distance <=0) {
                    clearInterval(x);
                    setDisable("true")
                    document.getElementById("demo").innerHTML = "00";
                   
                    // //showAddressDetails();
                    // if (socket !== null) {
                    //   // socket.emit("user_Details_Get", userToken);
                    // }
    
                    // userDetailsHendle()
                }
             else {
                    
                    setDisable("false")
               
                   
                }
            }, 0);
     


     
       

    }, [messageList])


    const [userAddressDetails, setUserAddressDetails] = useState([])

    const [userAddressDetail, setUserAddressDetail] = useState([])

 
   
    useEffect(() => {
 
                
       showAddressDetails()
                 
    }, [prId])
    const showAddressDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userId: localStorage.getItem('token')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };




        fetch(baseUrl + "history", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserAddressDetails(result.reverse());
                
            })
            .catch(error => console.log('error', error));
    }


    const showAddressDetail = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + userToken);

        // var raw = JSON.stringify({
        //     userId: localStorage.getItem('token')
        // });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            // body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "allGameHisory", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserAddressDetail(result.data);
      





            })
            .catch(error => console.log('error', error));
    }








 
    const existTime = messageList - Date.now()

    const [minute, setminute] = useState('');
    const [seconds, setseconds] = useState('');




   



    const checkoutOrder = (val) => {


        if (parseFloat(userDetails?.userBalance) >= parseInt(valueRupess)) {
            // showModal2(val)
           
            var now = new Date().getTime();
            var distance = messageList - now;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
           

            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + userToken);
            var raw = JSON.stringify({ "userId": userIId, "userName": userDetails?.userName, "time": minutes + "." + seconds, "cardtype": val, "amount": valueRupess, "Period": periodTime /* 20220210208 */ });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(baseUrl + "orders", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result === 'Successfully') {
                        // toast.success('Successfully', {
                        //     position: "top-right",
                        //     autoClose: 200,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        //     progress: undefined,
                        // });
                        userDetailsHendle()
                        if (val == "tie") {
                            settievalue(tievalue + parseInt(valueRupess))
                        }
                        else if (val == "andar") {
                            setandarValue(andarValue + parseInt(valueRupess))
                        }
                        else if (val == "bahar") {
                            setbaharValue(baharValue + parseInt(valueRupess))
                        }
                    } else if (result?.message == "Authorization required") {
                        toast.error(result.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        localStorage.removeItem('token')
                        navigate('/')

                    }
                     else if (result?.message == "balance insufficient") {
                        toast.error(result.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        // localStorage.removeItem('token')
                        // navigate('/')

                    }
                    else if (result?.message == "Wrong Period Provided") {
                        toast.error(result.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        // localStorage.removeItem('token')
                        // navigate('/')

                    }
                    else if (result?.message == "Betting Time Close") {
                        toast.error(result.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        // localStorage.removeItem('token')
                        // navigate('/')

                    }

                    
                     else {
                        alert('Login Required')
                        toast.error('Login Required', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        localStorage.removeItem('token')
                        navigate('/')
                    }
                })
                .catch(error => console.log('error', error));

        }
        else {

           // alert('balance insufficient')
            toast.error('balance insufficient', {
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


    const changePeriod = () => {
        const d = new Date()
        const p = d.toISOString().slice(0, 10)
        const startTime = p.replaceAll('-', '')
    }

  
    useEffect(() => {
        
        const d = new Date()
        const p = d.toISOString().slice(0, 10)
        setperiodDemo(p.replaceAll('-', ''))
        changePeriod();
    }, [])

    const showModal2 = (val) => {

        setCardValue(val)
        setModalShow2(true)

        if (val === 'tie') {
            document.getElementById('tie').style.boxShadow = '0px 0px 30px 2px  green';
        } else {
            document.getElementById('tie').style.boxShadow = '1px 1px gray';
        }

        if (val === 'andar') {
            document.getElementById('andar').style.boxShadow = '0px 0px 30px 2px  blue';
        } else {
            document.getElementById('andar').style.boxShadow = '1px 1px gray';
        }

        if (val === 'bahar') {
            document.getElementById('bahar').style.boxShadow = '0px 0px 30px 2px  red';
        } else {
            document.getElementById('bahar').style.boxShadow = '1px 1px gray';
        }


    }
    const showDiv = (val) => {

        setValueRupess(val)

        if (val === "10") {
            document.getElementById("img10").src=coin10x;
        }
        else {
            
            document.getElementById("img10").src=coin10;
        }
        if (val === "100") {
            
            document.getElementById("img100").src=coin1x;
        } else {
            
            document.getElementById("img100").src=coin1;

        } if (val === "500") {
            
            document.getElementById("img500").src=coin2x;
        } else {
           
            document.getElementById("img500").src=coin2;
        } if (val === "1000") {
           
            document.getElementById("img1000").src=coin3x;
        } else {
            
            document.getElementById("img1000").src=coin3;
        } if (val === "10000") {
          
            document.getElementById("img10000").src=coin6x;
        } else {
          
            document.getElementById("img10000").src=coin6;
        }
        /*  if (val === "green") {
            document.getElementById("green").style.boxShadow = "0px 0px 30px 2px green"
        } else {
            document.getElementById("green").style.boxShadow = "1px  1px grey"

        } */
    }
  
    

    const detailsHide = (() => {
        document.querySelector("#detailsId").style.display = "none";
        
    })


 





    const filterPeriod = userAddressDetails && userAddressDetails?.filter((data) => {
        return data?.win !== ""
    })





    return (
         <>
     
         <Navbar  id='detailsId' style={{display:'none' ,borderColor:'rgba(0,0,0,.12)!important', backgroundColor: "#039BE5", height: "auto", marginTop: "1",marginBottom:'.06rem',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)' }}>
         
          <div><div style={{marginLeft:'1.2rem'}}><p style={{fontFamily:'Futura',fontWeight:'400',position:'relative', display:'flex',color: "white", fontSize: "1rem"}}>{
                        TermsCondition.map(TermsCondition=>(
                            <span style={{ textAlign: 'justify' }}>
                           {TermsCondition.notice}
                        </span>
                        ))
                    }  
                  
                    </p></div><div  style={{marginLeft:'1.2rem'}}>
                    <Button onClick={() => { detailsHide();handle(); }} style={{backgroundColor: "#039BE5",borderColor:'silver',borderTopLeftRadius:'2px',borderTopRightRadius:'2px',borderBottomLeftRadius:'2px',borderBottomRightRadius:'2px', width: 'auto', line:'1rem',lineHeight: '1rem',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}>GOT IT</Button>
                    </div> </div>
        </Navbar>
      

            <div style={{ display: 'flex', padding:'1.4rem',paddingBottom:'0.20rem',backgroundColor: '#0288D1', color: 'white'}}>
                 
                    <Ah6 style={{ width:'100%',textShadow:'0.25px 0.25px 0.25px white',marginTop: '0rem',textShadow:'0.25px 0.25px 0.25px white'}}>Available balance: ₹ {userDetails?.userBalance}{/* {userBalance} */}</Ah6>
                    </div>

                
                    <div style={{display: 'flex', padding:'0.70rem',backgroundColor: '#0288D1'}}>
                        <Link to='/recharge'><HeaderButton2 style={{backgroundColor:'#039BE5',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 30%), 0 2px 2px 0 rgb(0 0 0 / 30%), 0 1px 5px 0 rgb(0 0 0 / 30%)'}}>Recharge</HeaderButton2></Link>
                    
                    
                        <HeaderButton2    onClick={() => setModalShow1(true)} style={{display:'block',color:'black',backgroundColor:'#E0E0E0', boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 30%), 0 2px 2px 0 rgb(0 0 0 / 30%), 0 1px 5px 0 rgb(0 0 0 / 30%)'}}>Rules </HeaderButton2>
                   

                   <Icon/>
                        </div>

                         
                         

            <div style={{ backgroundColor: '#FAF9F6' }}>
                <div style={{ display: 'flex', padding: '0.62rem', justifyContent: 'space-around' }}>


                    <div>
                        <Row>
                            <Col style={{ marginRight: "-25px" }}>

                            <span  style={{ textShadow:'0.50px 0.50px 0.50px #039BE5'}} class="material-icons" >emoji_events</span>

                            </Col>
                            <Col>
                                <div style={{ marginLeft: '10px' ,textShadow:'0.50px 0.50px 0.50px #039BE5'}}>
                                    <HeaderCount>Period</HeaderCount>
                                    <h5>{periodTime}{/* 20220210208 */}</h5>
                                    <h5>{/* {periodDemo} */} {/* 20220210208 */}</h5>
                                </div>
                            </Col>
                        </Row>
                    </div>
                     
     
                         {screenWidth > 768 ? <Row>
                           
                           <Col>
                               <div style={{ marginLeft: '10px' ,textShadow:'0.50px 0.50px 0.50px #039BE5'}}>
                                   <center><HeaderCount>History</HeaderCount></center>
                                   <h5>               <div style={{display:'flex',justifyContent:'center',color:'rgba(0,0,0,.54)'}}><HorizontalViewContainer>
  {userAddressDetail.map((item, index) => (
    <HorizontalItem key={index}>
      {item === 'bahar' ? (
        // Render content if item meets condition1
        <b style={{ border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='baharBc'>B</b>
      ) : item === 'andar' ? (
        // Render content if item meets condition2
        <b style={{ border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='anderBc'>A</b>
      ) : item === 'tie' ?(
        // Render default content if none of the conditions match
        <b style={{ border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='tiaBc'>T</b>
      ) : (
        // Render default content if none of the conditions match
     '' )}
    </HorizontalItem>
  ))}
</HorizontalViewContainer></div> 
</h5>
                                     
                                </div>
                            </Col>
                        </Row>:''}
                         

                    <div style={{ marginLeft: '3.10rem', textShadow:'0.50px 0.50px 0.50px #039BE5'}} >
                        <HeaderCount>Count Down</HeaderCount>
                       

                       <div style={{textAlign:'center'}}> <h4 id="demo"></h4></div>



                    </div>
        </div>


                <div style={{ display: "flex", justifyContent: 'center', borderRadius: "25px" }}>



                    <CardDiv id="tie" className={disable == "true" ? "disable" : ''} onClick={() => checkoutOrder('tie')} style={{
                        width: '58rem', backgroundColor: "#079254", borderRadius: "25px",
                        border: "1.5px solid #F5BD02", marginBottom: "5px"
                        ,boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}><div className='main1' style={{ height: "2rem", borderRadius: "25px 26px 0px 0px", backgroundColor: "#10613e", display: "flex", justifyContent: "space-between",boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)' }} >
                        </div>
                                  <FontSize >TIE</FontSize>
                        <div>
                            <span style={{ color: 'white', alignSelf: `flex-end`, border: '1px solid #F5BD02', borderRadius: '10px', padding: '1px 5px', marginLeft: '10px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)' }}><HiOutlineCurrencyRupee /> :{tievalue}</span>
                        </div>
                        <Card.Img variant="top" src="" />
                        {/* <div className='tieCount'>
                            <p> {tievalue}</p>
                        </div> */}
                    </CardDiv>

                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CardDiv id="andar" className={disable == "true" ? "disable" : ''} onClick={() => checkoutOrder('andar')} style={{
                        width: '29rem', borderRadius: "25px 25px 25px 180px", backgroundColor: "#275ac2",
                        border: "1.5px solid #F5BD02", marginRight: "4px", marginBottom: "10px"
                        ,boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}>
                        <div style={{ height: "2rem", borderRadius: "10px 10px 5px 4px", backgroundColor: "#1b3789", display: "flex", justifyContent: "space-between",boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)' }}>
                        </div>
                                 <FontSize2 >ANDAR</FontSize2>
                        <div>

                            <span style={{ color: 'white', alignSelf: `flex-end`, border: '1px solid #F5BD02', borderRadius: '10px', padding: '1px 5px', marginLeft: '50px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}><HiOutlineCurrencyRupee /> :{andarValue}</span>
                        </div>
                        <Card.Img variant="top" src="" />
                        {/* <div className='tieCount'>
                            <p> {andarValue}</p>
                        </div> */}
                    </CardDiv>
                    <CardDiv id="bahar" className={disable == "true" ? "disable" : ''} onClick={() => checkoutOrder('bahar')} style={{
                        width: '29rem', borderRadius: "25px 25px 180px 25px",
                        backgroundColor: "#bc2d35",
                        border: "1.5px solid #F5BD02"
                        ,boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}><div style={{ height: "2rem", borderRadius: "10px 10px 5px 0px", backgroundColor: "#891d26", display: "flex", justifyContent: "space-between" ,boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}}>
                        </div>
                                  <FontSize3 >BAHAR</FontSize3>
                        <div>

                            <span style={{ color: 'white', alignSelf: `flex-end`, border: '1px solid #F5BD02', borderRadius: '10px', padding: '1px 5px', marginLeft: '10px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)' }}><HiOutlineCurrencyRupee /> :{baharValue}</span>
                        </div>
                        <Card.Img variant="top" src="" />
                        {/* <div className='baharCount'>
                            <p> {baharValue}</p>
                        </div> */}
                    </CardDiv>
                </div>


            </div>
<div style={{backgroundColor:'#FAF9F6' ,height:'100%'}}>
            <CoinDiv>
                <Container>
                    <CoinCnterDiv>
                         
                            <Yoimg id='img10' className={disable == "true" ? "disable" : ''} src={coin10x} style={{ boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)',borderRadius: '50rem', padding: "", background: '' }} alt='coin10' onClick={() => showDiv('10')} />
                       
                            <Yoimg id="img100" className={disable == "true" ? "disable" : ''} src={coin1} style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)', borderRadius: '50rem', padding: "", background: '' }} alt='coin1' onClick={() => showDiv('100')} />
                         
                            <Yoimg id="img500" className={disable == "true" ? "disable" : ''} src={coin2} style={{ boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)', borderRadius: '50rem', padding: "", background: '' }} alt='coin2' onClick={() => showDiv('500')} />
                        
                            <Yoimg id="img1000" className={disable == "true" ? "disable" : ''} src={coin3} style={{ boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)',   borderRadius: '50rem', padding: "", background: '' }} alt='coin3' onClick={() => showDiv('1000')} />

                            <Yoimg id="img10000" className={disable == "true" ? "disable" : ''} src={coin6} style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)',  borderRadius: '50rem', padding: "", background: '' }} alt='coin6' onClick={() => showDiv('10000')} />
                        

                    </CoinCnterDiv>
                </Container>
            </CoinDiv>

       
            </div>  
            
            
             
           
            <ModalReadRule
            show={modalShow1}
            onHide={() => setModalShow1(false)}
        />

        <ModalRupesSelect
            show={modalShow2}
            onHide={() => setModalShow2(false)}
            value={valueRupess}
            cardValue={cardValue}
        />

        <ToastContainer />
  

  <div style={{display:'flex',justifyContent:'center',color:'rgba(0,0,0,.54)'}}>{screenWidth < 768 ? <HorizontalViewContainer>
  {userAddressDetail.map((item, index) => (
    <HorizontalItem key={index}>
      {item === 'bahar' ? (
        // Render content if item meets condition1
        <b style={{ border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='baharBc'>B</b>
      ) : item === 'andar' ? (
        // Render content if item meets condition2
        <b style={{ border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='anderBc'>A</b>
      ) : item === 'tie' ?(
        // Render default content if none of the conditions match
        <b style={{ border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='tiaBc'>T</b>
      ) : (
        // Render default content if none of the conditions match
     '' )}
    </HorizontalItem>
  ))}
</HorizontalViewContainer>:''}</div> 
     
        
        <div style={{borderBottom:'3px solid #0288d1',fontSize:'1.5rem',display:'block',justifyContent:'center',backgroundColor:'',padding:'4px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
        <i class="material-icons" style={{display:'flex',justifyContent:'center' ,color:'rgba(0,0,0,.54)'}}>emoji_events</i>
        <div style={{display:'flex',justifyContent:'center',color:'rgba(0,0,0,.54)'}}>History </div> 
        </div>

        <MaterialTable style={{marginBottom:'50px'}}
                title="History"
                    options={{
                        headerStyle:{padding:'0.60rem',color:'rgba(0,0,0,.54)'},
                        search: false,
                        border:'2px',
                        paging:true,
                        pageSize:5,
                        maxBodyHeight: 500,
                         
                        toolbar:false,
                        
                         // make initial page size
                        emptyRowsWhenPaging: false,   // To avoid of having empty rows
                        pageSizeOptions:[10,15,20],    // rows selection options
                      }}
                    columns={[
                        { title: "Period",cellStyle: {
                            border:'none'
                          } ,render: rowData =><div>{
                            rowData.changeoverall<0?
                            (<Navbar>
                             <div style={{ display: 'flex' }}><Col><span style={{color:'white',backgroundColor:'red',borderRadius:'50%',padding:'5px'}}  class="material-icons">gavel</span></Col><Col><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "inherit", fontSize: "14px", textShadow:'0.50px 0.50px 0.50px rgba(0,0,0,.54)'}}>ABFun Loss</b></Row><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "rgba(0,0,0,.54)", fontSize: "14px" }}>{rowData.periodId} </b></Row></Col></div>
                             </Navbar>)
                            :
                            (<Navbar>
                                <div style={{ display: 'flex' }}><Col><span style={{color:'white',backgroundColor:'green',borderRadius:'50%',padding:'5px'}}  class="material-icons">gavel</span></Col><Col><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "inherit", fontSize: "14px", textShadow:'0.50px 0.50px 0.50px rgba(0,0,0,.54)'}}>ABFun Win</b></Row><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "rgba(0,0,0,.54)", fontSize: "14px" }}>{rowData.periodId} </b></Row></Col></div>
                             </Navbar>)}</div>},
                       
                             
                        { title: "Result",cellStyle: {
                            border:'none'  },render: rowData =><div>{
                                rowData.result == "andar" ? (<h6 style={{ border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='anderBc'>A</h6>) : rowData.result == "bahar" ? (<h6 style={{border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='baharBc'>B</h6> ): (<h6 style={{border: '0.10px solid white',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)'}} className='tiaBc'>T</h6>)}</div>},
                        
                        {title: "Win/Loss", cellStyle: {
                            border:'none'  },render: rowData =><div>{
                                rowData.changeoverall<0?(<b style={{color:'red',fontWeight:'400',textShadow:'0.50px 0.50px 0.50px rgba(0,0,0,.54)'}}>{rowData.changeoverall} ₹ </b>):(<b style={{color:'green',fontWeight:'400',textShadow:'0.50px 0.50px 0.50px rgba(0,0,0,.54)'}}> {rowData.changeoverall} ₹ </b>)}</div>},
                         
                        
                     
                        
                      

                    ]}
                    
       

                    data={filterPeriod}

                />

              </>
    )

    

}

export default WinHeader

const HorizontalViewContainer = styled.div`
  
  display: flex; /* Use flexbox to make items display in a row */
  overflow-x: auto; /* Enable horizontal scrolling if needed */
  padding: 10px; /* Optional: Add padding to the horizontal view */
`;

// Define a styled component for the horizontal item
const HorizontalItem = styled.div`
  flex: 0 0 auto; /* Allow items to grow and shrink, but don't allow them to grow beyond their content */
  margin-right: 10px; /* Optional: Add spacing between items */
  padding: 1px; /* Optional: Add padding to each item */
  justify-content: center;
  border-radius: 5px; /* Optional: Add rounded corners */
`;

const CardDiv = styled.div`
margin: 0.3rem;
cursor:pointer;
@media (max-width: 2000px) {
    height:10rem;
 }
 @media (max-width: 1024px) {
    height:10rem;
 }
 @media (max-width: 768px) {
    height:9.5rem;
 }
 @media (max-width: 480px) {
    height:8.5rem;
 }
 @media (max-width: 280px) {
     height:8.5rem;
 }

`;

 

const CoinCnterDiv = styled.div`
cursor:pointer;
display: flex; 
margin-top:0.40rem;
justify-items: center; 
grid-gap: 0.40rem; 
margin-bottom:1rem;
display: flex;
justify-content: center;
`












const HeaderCount = styled.h4`
font-weight: 700;
@media (max-width: 2000px) {
   font-size:1.5rem;
}
@media (max-width: 1024px) {
    font-size:1.5rem;
}
@media (max-width: 768px) {
    font-size:1.5rem;
}
@media (max-width: 480px) {
    font-size:1.5rem;
}
@media (max-width: 280px) {
    font-size:0.7rem;
}

`;



const FontSize = styled.div`
display: flex;
justify-content: center;
 align-items: center;
 color: #41d995;
 font-size: 40px;
 font-weight:500;
 @media screen and (max-width: 426px) {
    font-size: 30px;
  }

`;
const FontSize2 = styled.div`
display: flex;
justify-content: center;
 align-items: center;
 color: #6a98f3;
 font-size: 2.5rem;
 font-weight:500;
 @media screen and (max-width: 426px) {
    font-size: 1.87rem;
  }

`;
const FontSize3 = styled.div`
display: flex;
justify-content: center;
 align-items: center;
 color: #f89790;
 font-weight:500;
 font-size: 2.5rem;

 @media screen and (max-width: 426px) {
    font-size: 1.87rem;
  
  }

`;

const CoinDiv = styled.div`
display: flex;
`;

const Yoimg = styled.img`
@media (max-width: 3000px) {
    width:4rem;
}
@media (max-width: 1024px) {
    width:4rem;

}
@media (max-width: 768px) {
    width:3rem;
}
@media (max-width: 480px) {
    width:3rem;
}
@media (max-width: 280px) {
    width:1.9rem;
}

`;


const HeaderButton = styled(Button)`
@media (max-width: 2000px) {
    width:1rem;
}
@media (max-width: 1024px) {
    width:1rem;

}
@media (max-width: 768px) {
    width:1rem;
}
@media (max-width: 480px) {
    width:3rem;
}
@media (max-width: 280px) {
    width:1rem;
}

`;

const HeaderButton2 = styled(Button)`
 
text-decoration:none;
font-weight:300;

@media (max-width: 2000px) {
    padding:0.40rem;
    width:9.50rem;
    align-items:center;
    text-align: center;
      
    margin-left:0.85rem;
    font-size:1.20rem;
    align-items:center;
    border-radius:0.20rem;
}
@media (max-width: 1024px) {
    padding:0.40rem;
    width:10.67rem;
    
    margin-left:0.85rem;
    font-size:1.10rem;
    align-items:center;
    border-radius:0.20rem;
}
@media (max-width: 768px) {
     
    padding:0.40rem;
    width:8rem;
    
    margin-left:0.64rem;
    font-size:1.20rem;
    align-items:center;
    border-radius:0.20rem;
}
@media (max-width: 480px) {
    
    padding:0.40rem;
    width:5rem;
    
    height:2rem;
    margin-left:0.40rem;
    font-size:0.80rem;
    align-items:center;
    border-radius:0.10rem;
}
@media (max-width: 280px) {
    padding:0.233rem;
    width:2.916rem;
    
    margin-left:0.233rem;
    font-size:0.495rem;
    align-items:center;
    border-radius:0.10rem;
}

`;
const Ah6 =styled.div`
font-weight:300;
@media (max-width: 2000px) {
    font-size:1.60rem;
}
@media (max-width: 1024px) {
    font-size:1.60rem;
    

}
@media (max-width: 768px) {
    font-size:1.60rem;
}
@media (max-width: 480px) {
    font-size:1.20rem;
 
}
@media (max-width: 280px) {
    font-size:0.80rem;
   
}

`;
const refreshPage = (props) => {
    window.location.reload();
     
}
const MaterialIcon = (props) => (
    <i onClick={refreshPage} className={`material-icons ${props.className}`}>autorenew</i>
  );
 
const Icon =styled(MaterialIcon)`
 
cursor:pointer;
border-radius:50%;
 color: white;
 box-shadow:0 3px 1px -2px rgb(0 0 0 / 80%),0 3px 1px -2px rgb(0 0 0 / 80%), 0 2px 2px 0 rgb(0 0 0 / 80%), 0 1px 5px 0 rgb(0 0 0 / 80%);

@media (max-width: 3000px) {
    margin-left:15px;
    padding:9px;
  
}
@media (max-width: 1024px) {
    margin-left:15px;
    padding:8px;
}
@media (max-width: 768px) {
    margin-left:15px;
    padding:8px;
}
@media (max-width: 480px) {
   margin-left:15px;
 
   padding:3px;
 }
@media (max-width: 280px) {
    padding:1px;
    margin-left:15px;
}

`;