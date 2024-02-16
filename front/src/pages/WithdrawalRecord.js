import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { Navbar,Table ,Row,Col} from 'react-bootstrap';
import { EmojiEvents } from '@material-ui/icons';
import { io } from "socket.io-client";
import { IoMdArrowRoundBack } from 'react-icons/io';
// import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { costomeSocket } from '../components/CostomSocket';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom'
import { BiAlignMiddle } from 'react-icons/bi';
const WithdrawalRecord = ({ baseUrl }) => {

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
            } }
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
        fetch(baseUrl + "WithdrawHistory", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserAddressDetails(result.reverse());
                
            })
            .catch(error => console.log('error', error));
    }


    const filterPeriod = userAddressDetails && userAddressDetails?.filter((data) => {
        return data?.win !== ""
    })

    return (
        <>
        <div>
        <Navbar   variant="dark" style={{backgroundColor:'#0288D1',padding:'10px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
        <Link to='/withdrawal' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="2rem" /></Link> 
        <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Withdrawal Record</Navbar.Brand>
        </Navbar>
    </div>
                <MaterialTable
                
                title="Withdrawal Record"
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
                    emptyRowsWhenPaging:  false,   // To avoid of having empty rows
                    pageSizeOptions:[10,15,20],    // rows selection options
                  }}
                    columns={[
                        
                         
                        {title: 'transaction',  cellStyle: {
                            border:'none'
                           
                          } ,render: rowData =><div>
                          {
                            rowData.status==0?
                            (<Navbar>
                             <div style={{ display: 'flex'}}><Col  ><span style={{color:'white',backgroundColor:'#FBB917',borderRadius:'50%',padding:'8px'}}  class="material-icons">monetization_on</span></Col><Col xs={10} md={10} ><Row><b style={{paddingLeft:"30px",marginInline:'0px',fontFamily:'Futura',fontWeight:'500',color: "inherit", fontSize: "0.8rem",justifyContent:'left',display:'flex',alignContent:'left',color:'#FBB917'}}><h6>₹</h6>{rowData.requestPayment}  { rowData.status==0?"Wait":rowData.status==1?"Success":"Fail"}</b></Row><Row><b style={{paddingLeft:"30px",marginInline:'0px',fontFamily:'Futura',fontWeight:'400',color: "rgba(0,0,0,.54)", fontSize: "0.7rem",justifyContent:'center',display:'flex',alignContent:'center' }}>Fee : {rowData.fee},To account: {rowData.payableAmount}</b></Row></Col></div>
                             </Navbar>)
                             :rowData.status==1?
                             (<Navbar>
                                <div style={{ display: 'flex'}}><Col  ><span style={{ color:'white',backgroundColor:'green',borderRadius:'50%',padding:'8px'}}  class="material-icons">monetization_on</span></Col><Col xs={10} md={10}><Row><b style={{paddingLeft:"30px",marginInline:'0px',fontFamily:'Futura',fontWeight:'500',color: "inherit", fontSize: "0.8rem",justifyContent:'left',display:'flex',alignContent:'left',color:'#12AD2B'}}><h6>₹</h6>{rowData.requestPayment}   { rowData.status==0?"Wait":rowData.status==1?"Success":"Fail"}</b></Row><Row><b style={{paddingLeft:"30px", marginInline:'0px',fontFamily:'Futura',fontWeight:'400',color: "rgba(0,0,0,.54)", fontSize: "0.7rem",justifyContent:'center',display:'flex',alignContent:'center' }}>Fee : {rowData.fee},To account: {rowData.payableAmount}</b></Row></Col>
                                </div>
                                </Navbar>)
                            :
                            (<Navbar>
                                <div style={{ display: 'flex'}}><Col  ><span style={{ color:'white',backgroundColor:'red',borderRadius:'50%',padding:'8px'}}  class="material-icons">monetization_on</span></Col><Col xs={10} md={10}><Row><b style={{paddingLeft:"30px",marginInline:'0px',fontFamily:'Futura',fontWeight:'500',color: "inherit", fontSize: "0.8rem",justifyContent:'left',display:'flex',alignContent:'left',color:'#F62217'}}><h6>₹</h6>{rowData.requestPayment}   {  rowData.status==0?"Wait":rowData.status==1?"Success":"Fail"}</b></Row><Row><b style={{paddingLeft:"30px",marginInline:'0px',fontFamily:'Futura',fontWeight:'400',color: "rgba(0,0,0,.54)", fontSize: "0.7rem",justifyContent:'center',display:'flex',alignContent:'center' }}>Fee : {rowData.fee},To account: {rowData.payableAmount}</b></Row></Col></div>
                                </Navbar>)
                        
                        }
                        
                        </div>
                    },
                        
                        { title: 'Date', field: 'created_at' ,cellStyle: {
                            border:'none',textAlign:'right',fontSize:'0.7rem'}},
                      ]}

                    data={filterPeriod}

                />
                  <Footer />
             
          
        </>
    )
}

export default WithdrawalRecord