import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { Navbar,Table ,Row,Col} from 'react-bootstrap';
import { EmojiEvents } from '@material-ui/icons';
import { io } from "socket.io-client";

import { Link, useNavigate } from 'react-router-dom'
// import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { costomeSocket } from '../components/CostomSocket';
import Footer from '../components/Footer';
const ApplyRecord = ({ baseUrl }) => {

    const [userAddressDetails, setUserAddressDetails] = useState([])
    const [prId, setprId] = useState({})


    useEffect(() => {
        showAddressDetails();
    }, [prId])










    const userToken = localStorage.getItem("token")


    const [socket, setSocket] = useState(null)



    useEffect(() => {

        if (userToken) {
            if (socket === null) {
                // setSocket(io(baseUrl))
                setSocket(costomeSocket)
            }else{
                socket.on("receive_period", (data) => {
            
                    setprId(data)
               
                })
            }
           
               
       
        }
        return () => { };
    }, [socket])

    const showAddressDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + userToken);
         
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };




        fetch(baseUrl + "BonusApplyHistory", requestOptions)
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
        <div>
        <Navbar   variant="dark" style={{backgroundColor:'#0288D1',padding:'10px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
        <Link to='/promotion' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="2.0rem"/></Link> 
        
        <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Apply Record</Navbar.Brand>
        </Navbar>
    </div>


           
            
                <MaterialTable
                
                title="Apply Record"
                options={{
                    headerStyle:{display:'none'},
                    search: false,
                    border:'0px',
                    paging:true,
                    pageSize:5,
                    maxBodyHeight: 500,
                    showTitle: false,
                    toolbar:false,
                    
                     // make initial page size
                    emptyRowsWhenPaging: false,   // To avoid of having empty rows
                    pageSizeOptions:[10,15,20],    // rows selection options
                      }}
                    columns={[
                        {title: 'Date',  cellStyle: {
                            border:'none'
                          } ,render: rowData =><div>{(<Navbar>
                             <div style={{ display: 'flex' }}><Col><span style={{color:'white',backgroundColor:'#3CB371',borderRadius:'50%',padding:'8px'}}  class="material-icons">check_circle_outline</span></Col><Col><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "inherit", fontSize: "14px", textShadow:'0.50px 0.50px 0.50px rgba(0,0,0,.54)'}}>Apply to Balance
                             </b></Row><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "rgba(0,0,0,.54)", fontSize: "8px" }}> {rowData.created_at} </b></Row></Col></div>
                             </Navbar>)}</div>},
                        
                         
                        { title: 'TransactionId', field: 'transaction_id' ,cellStyle: {
                            border:'none',textAlign:'center'}},
                        
                        { title: 'Amount', field: "amount" ,cellStyle: {
                            border:'none',textAlign:'center'}},
                           
                        

                    ]}

                    data={filterPeriod}

                />
                  <Footer />
             
          
        </>
    )
}

export default ApplyRecord