import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { Navbar,Table ,Row,Col} from 'react-bootstrap';
import { EmojiEvents } from '@material-ui/icons';
import { io } from "socket.io-client";
import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io';
// import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { costomeSocket } from '../components/CostomSocket';
import Footer from '../components/Footer';
const BonusRecord = ({ baseUrl }) => {

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




        fetch(baseUrl + "BonusHistory", requestOptions)
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
        <Link to='/promotion' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="1.5rem"/></Link> 
        <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Bonus Record</Navbar.Brand>
        </Navbar>
    </div>
                <MaterialTable
                
                title="Bonus Record"
                options={{
                    headerStyle:{textAlign:'center',textShadow:'0.50px 0.50px 0.50px black',borderTop: '0.10px solid white',padding:'0rem',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 30%),0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 20%)',fontWeight:'600',color:'white',backgroundColor:'#0288D1'},
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
                        {title: 'PERIOD ID',  cellStyle: {
                            border:'none'
                          } ,render: rowData =><div>{(<Navbar>
                             <div style={{ display: 'flex' }}><Col><span style={{color:'white',backgroundColor:'#3CB371',borderRadius:'50%',padding:'8px'}}  class="material-icons">monetization_on</span></Col><Col><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "inherit", fontSize: "14px", textShadow:'0.50px 0.50px 0.50px rgba(0,0,0,.54)'}}>Period Id</b></Row><Row><b style={{marginLeft:'5px',fontFamily:'Futura',fontWeight:'400',color: "rgba(0,0,0,.54)", fontSize: "14px" }}>{rowData.periodId} </b></Row></Col></div>
                             </Navbar>)}</div>},
                         
                        { title: 'LEVEL 1', field: 'fathidbonus' ,cellStyle: {
                            border:'none',textAlign:'center'}},
                        { title: 'LEVEL 2', field: 'gfidbonus' ,cellStyle: {
                            border:'none',textAlign:'center'}},
                      
                        
                        

                    ]}

                    data={filterPeriod}

                />
                  <Footer />
             
          
        </>
    )
}

export default BonusRecord