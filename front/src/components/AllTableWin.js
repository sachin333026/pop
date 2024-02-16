import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { Navbar,Table ,Row,Col} from 'react-bootstrap';
import { EmojiEvents } from '@material-ui/icons';
import { io } from "socket.io-client";
import { IoMdArrowRoundBack } from 'react-icons/io';
// import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { costomeSocket } from './CostomSocket';
import {  toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom'
const AllTableWin = ({  baseUrl }) => {
    const navigate = useNavigate()
    const [userAddressDetails, setUserAddressDetails] = useState([])
    const [prId, setprId] = useState({})
   
    useEffect(() => {
 
                
       showAddressDetails()
                 
    }, [prId])


   





    const userID = localStorage.getItem("token");


    const [socket, setSocket] = useState(null);



    useEffect(() => {
 
        
        if (socket === null) {
             
            setSocket(costomeSocket)
           
        } else {
                socket.on("receive_period", (data) => {
            
                    setprId(data)
               
                })
                socket.off("disconnect").on("disconnect", (data) => {
                 
                    toast.error('User Connected on another Device', {
                                              position: "top-right",
                                              autoClose: 2000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              progress: undefined,
                                          });
                                          navigate('/mine')
                                   
                              })
                              socket.on("close", (data) => {
                   
                  
                                  socket.disconnect();
                   
                               })


            }
           
 
               
       
        
        
    }, [socket])

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


    const filterPeriod = userAddressDetails && userAddressDetails?.filter((data) => {
        return data?.win !== ""
    })

    // const HandlShow = (e) => {
    //     const { name, value } = e.target

    //     setUserAddressInfo((prastate) => ({
    //         ...prastate,
    //         [name]: value,
    //     }))
    // }
    return (
        <>
        
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

export default AllTableWin