import React, { useEffect, useState } from 'react'
import { Container, Button,Form, Col, Row, Card } from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';
import MaterialTable from "material-table";
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';


const TableCom = ({baseUrl}) => {
    // console.log(baseUrl);
    const [userData, setuser] = useState([])

    const [userEditData, setUserEditData] = useState({
        userId: '', userName: '', userMobile: '', userPassword: '', userReCode: '', userBalance: '', userNickName:'', userStatus:''
    })

    const [userAddressData, setAddressData] = useState()
    const [userBankData, setBankData] = useState()
    const [userInfoData, setInfoData] = useState()

    const [addUserData, setAddUserData] = useState({
        userName: '', userMobile: '', userPassword: '', userReCode: '', userBalance: '0', userDelete: '1', userStatus: '', userNickName: ''
    })

    useEffect(() => {

        showUser();
        // const showUser = async () => {
            // var myHeaders = new Headers();
            // myHeaders.append("Cookie", "Cookie_1=value");
    
            // var requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     redirect: 'follow'
            // };
    
            // fetch(baseUrl+"showUser", requestOptions)
            //     .then(response => response.json())
            //     .then(result => {
            //         setuser(result)
            //     })
            //     .catch(error => console.log('error', error));
        // }

    }, [])

    const showUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl+"showUser", requestOptions)
            .then(response => response.json())
            .then(result => {
                setuser(result)
            
            })
            .catch(error => console.log('error', error));
    }




    const editUser = (val, rowData) => {

        if (val === 'edit') {
            document.getElementById('editDiv').style.display = 'block';
            document.getElementById('divTable').style.display = 'none';
        }

        if (val === 'cencel') {
            document.getElementById('editDiv').style.display = 'none';
            document.getElementById('divTable').style.display = 'block';
        }
        setUserEditData({
            userId: rowData.userId, userName: rowData.userName,userNickName:rowData.userNickName, userMobile: rowData.userMobile, userPassword: rowData.userPassword, userReCode: rowData.userReCode, userBalance: rowData.userBalance
        })

    }

    const editUserData = () => {
        const { userId, userName, userNickName, userMobile, userPassword, userReCode, userBalance } = userEditData
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": userId,
            "userName": userName,
            "userMobile": userMobile,
            "userNickName": userNickName,
            "userPassword": userPassword,
            "userReCode": userReCode,
            // "userBalance": userBalance
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"edit/adminUser", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully d', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    document.getElementById('editDiv').style.display = 'none';
                    document.getElementById('divTable').style.display = 'block';
                    showUser()
                }
            })
            .catch(error => console.log('error', error));
    }

    const handShow = (e) => {
        const { name, value } = e.target

        setUserEditData((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    const handShowAdd = (e) => {
        const { name, value } = e.target

        setAddUserData((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }
   let bhaiya;
   
    const block = (a,b) => {
        if(a==0)
        {
             bhaiya=1;
        }
        else
        {
             bhaiya=0;
        }
        var raw = JSON.stringify({bhaiya,b});
         
        
        console.log(a.userId);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow", };
        fetch(baseUrl+"userblock", requestOptions)
            .then((response) => response.json())
            .then(result => {
                if (result.mess === 'success') {
                    toast.success('Successfully', {
                        position: "top-right",
                        autoClose: 100,
                       
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        });
                        showUser()
                    }
                if (result.mess === 'fail') {
                            toast.success('Failed', {
                                position: "top-right",
                                autoClose: 100,

                                hideProgressBar: false,
                                closeOnClick: true,
                                draggable: true,
                                progress: undefined,
                                });
                }
            })

            
        }


    const sendData = (e) => {
        e.preventDefault()

        const { userName, userMobile, userPassword, userReCode, userBalance, userDelete, userStatus, userNickName } = addUserData

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ userName, userMobile, userPassword, userReCode, userBalance, userDelete, userStatus, userNickName });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(baseUrl+"signUp", requestOptions)
            .then((response) => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Add', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    document.querySelector("#divTable").style.display = "block";
                    document.querySelector("#show1").style.display = "none";
                    showUser()
                }
            })
            .catch((error) => console.log("error", error));
    };


    const [addPayment, setaddPayment] = useState({})

// console.log(addPayment);



const handAdduserFund = (e) => {
    const { name, value } = e.target

    setaddPayment((prastate) => ({
        ...prastate,
        [name]: value,
    }));
}


const hendlePaymentAdd = ((e ,rowData)=>{


    if (e === 'addFund') {
        document.getElementById('addfundDiv').style.display = 'block';
        document.getElementById('divTable').style.display = 'none';
    }

    if (e === 'cencel') {
        document.getElementById('addfundDiv').style.display = 'none';
        document.getElementById('divTable').style.display = 'block';
    }
    if (e === 'block') {
        document.getElementById('addfundDiv').style.display = 'block';
        document.getElementById('divTable').style.display = 'none';
    }
    setaddPayment({
        userId: rowData.userId,  userName : rowData.userName 
    })



})

    const addUserFund = (e) => {
        // e.preventDefault()
        const { userId, payment , transaction_id  } = addPayment

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({userId, payment, transaction_id});

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(baseUrl+"userBalanceUpdate", requestOptions)
            .then((response) => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Add', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    document.querySelector("#divTable").style.display = "block";
                    document.querySelector("#addfundDiv").style.display = "none";
                    showUser()
                    setaddPayment({payment:"" ,transaction_id:""})

                }
            })
            .catch((error) => console.log("error", error));
    };




    const showRegister = (val) => {

        if (val === 'add') {
            document.querySelector("#divTable").style.display = "none";
            document.querySelector("#show1").style.display = "block";
        }

        if (val === 'cancel') {
            document.querySelector("#divTable").style.display = "block";
            document.querySelector("#show1").style.display = "none";
        }
    };

    const removeUser = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"remove/UserDetails", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Remove', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    showUser()
                }
            })
            .catch(error => console.log('error', error));
    }

    const viewUser = (id) => {
        document.querySelector("#divTable").style.display = "none";
        document.querySelector("#show2").style.display = "block";

        userDetails(id)
        userAddressDetails(id)
        userBankDetails(id)
    }

    const userDetails = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"showUserAdmin", requestOptions)
            .then(response => response.json())
            .then(result => setInfoData(result[0]))
            .catch(error => console.log('error', error));
    }
    
    const userAddressDetails = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"showAddressAdmin", requestOptions)
            .then(response => response.json())
            .then(result => setAddressData(result[0]))
            .catch(error => console.log('error', error));
    }

    const userBankDetails = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"showBankAdmin", requestOptions)
            .then(response => response.json())
            .then(result => setBankData(result[0]))
            .catch(error => console.log('error', error));
    }
   

    return (
        <>
            <div style={{ marginLeft: "2rem", marginTop: "2rem", display: "flex", cursor: 'pointer' }}>
                <IoMdAddCircle style={{ width: "2rem", height: "2rem" }} onClick={() => showRegister('add')} />
                <span style={{ marginLeft: "0.7rem", fontSize: "1.5rem", fontWeight: "" }}>Add User</span>
            </div>

            <div style={{ padding: '30px', display: 'block' }} id='divTable' >

                <MaterialTable
                    title="Users"
                    options={{
                        paging:true,
                        pageSize:20,       // make initial page size
                        emptyRowsWhenPaging: false,   // To avoid of having empty rows
                        pageSizeOptions:[20,50,100],    // rows selection options
                      }}
                    columns={[
                        { title: 'UserId', field: 'userId' },
                        { title: 'Name', field: 'userName' },
                      
                        { title: 'Mobile No.', field: 'userMobile' },
                        { title: 'Password', field: 'userPassword' },
                        { title: 'Balance', field: 'userBalance' },
                        { title: 'Total Recharge', field: 'userNickName' },
                        { title: 'Total Withdrawals', field: 'userReCode' },
                            
                       { title: 'Refer Code', field: 'userReCode' },
                        // { title: 'Nick', field: 'userNickName' },
                       // { title: 'Status', field: 'userStatus' },

                         

                        {
                            title: "Add fund",
                            field: "internal_action",
                            editable: false,
                            render: (rowData) =>
                              rowData && (
                                <Button
                                   
                                color="secondary"
                                  onClick={(e) =>{hendlePaymentAdd("addFund" , rowData)}}
                                >

                                    Add Fund
                                  {/* <AddIcon /> */}
                                </Button>
                              )
                          }
,


{
    title: "Block",
    editable: true,

    
   
    render: (rowData) =>
      rowData.userStatus==0?(
        <Button
        style={{color:'red',color:'white',background:rowData.userStatus==0?"green":"red",content:'ddd' }}   
        onClick={(e) =>{block(rowData.userStatus,rowData.userId)}}
        >
          
           Normal
          {/* <AddIcon /> */}
        </Button>
      ):(
        <Button
        style={{color:'red',color:'white',background:rowData.userStatus==0?"green":"red",content:'ddd' }}   
        onClick={(e) =>{block(rowData.userStatus,rowData.userId)}}
        >
          
             Blocked
          {/* <AddIcon /> */}
        </Button>
      )
  }
  
                    ]}
                    data={userData}


                      

                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => editUser('edit', rowData)
                        },
                        {
                            icon: 'remove',
                            tooltip: 'Remove User',
                            onClick: (event, rowData) => removeUser(rowData.userId)
                        },
                        {
                            icon: 'save',
                            tooltip: 'View Detail',
                            onClick: (event, rowData) => viewUser(rowData.userId)
                        }
                        

                    ]}
                   
 

                />
            </div>

            <div id='editDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
                <Container style={{ padding: "20px" }}>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" onChange={(e) => handShow(e)} name='userName' value={userEditData.userName} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label>Nick Name</Form.Label>
                                <Form.Control type="name" name='userNickName' value={userEditData.userNickName} onChange={(e) => handShow(e)} placeholder="Enter nick name" />
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="number" onChange={(e) => handShow(e)} name='userMobile' value={userEditData.userMobile} placeholder="number" />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => handShow(e)} name='userPassword' value={userEditData.userPassword} placeholder="Enter password" />
                                </Form.Group>    </Col>
                            <Col> <Form.Group className="mb-3">
                                <Form.Label>Recode</Form.Label>
                                <Form.Control type="text" onChange={(e) => handShow(e)} name='userReCode' value={userEditData.userReCode} placeholder="Enter recode" />
                            </Form.Group>
                            </Col>
                            {/* <Col> <Form.Group className="mb-3">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control type="text" onChange={(e) => handShow(e)} name='userBalance' value={userEditData.userBalance} placeholder="Enter Balance" />
                            </Form.Group>
                            </Col> */}
                        </Row>

                        <Row>
                            <Col>
                                <Button variant="light" onClick={() => editUser('cencel')}>Cencel</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={() => { editUserData() }}>Save</Button>
                            </Col>
                        </Row>

                    </Form>
                </Container>
            </div>








            <div id='addfundDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
                <Container style={{ padding: "20px" }}>
                    <Form >
                        <Form.Group className="mb-3">

                            
                            <Form.Label>User Id :  {addPayment?.userId}</Form.Label> 

                            {/* <Form.Control type="name" onChange={(e) => handShow(e)} name='userName' value={userEditData.userName} placeholder="Enter name" /> */}
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label> Name : {addPayment?.userName}</Form.Label>
                                {/* <Form.Control type="name" name='userNickName' value={userEditData.userNickName} onChange={(e) => handShow(e)} placeholder="Enter nick name" /> */}
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fund </Form.Label>
                            <Form.Control type="number" onChange={(e) => handAdduserFund(e)} name='payment' value={addPayment.payment} placeholder="Enter  Fund" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Transaction id </Form.Label>
                            <Form.Control type="text" onChange={(e) => handAdduserFund(e)} name='transaction_id' value={addPayment.transaction_id} placeholder="Enter Transaction id" />
                        </Form.Group>

                        {/* <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => handShow(e)} name='userPassword' value={userEditData.userPassword} placeholder="Enter password" />
                                </Form.Group>    </Col>
                            <Col> <Form.Group className="mb-3">
                                <Form.Label>Recode</Form.Label>
                                <Form.Control type="text" onChange={(e) => handShow(e)} name='userReCode' value={userEditData.userReCode} placeholder="Enter recode" />
                            </Form.Group>
                            </Col>
                            <Col> <Form.Group className="mb-3">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control type="text" onChange={(e) => handShow(e)} name='userBalance' value={userEditData.userBalance} placeholder="Enter Balance" />
                            </Form.Group>
                            </Col>
                        </Row> */}

                        <Row>
                            <Col>
                                <Button variant="light" onClick={() => hendlePaymentAdd('cencel')}>Cencel</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={(e) => { addUserFund() }}>Save</Button>
                            </Col>
                        </Row>

                    </Form>
                </Container>
            </div>




















            <div id='show1' style={{ display: "none" }} >
                <div style={{ border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 29px 1px #888888", margin: "30px" }}>
                    <Container style={{ padding: "20px" }}>
                        <Form >
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" name='userName' value={addUserData.userName} onChange={(e) => handShowAdd(e)} placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nick Name</Form.Label>
                                <Form.Control type="name" name='userNickName' value={addUserData.userNickName} onChange={(e) => handShowAdd(e)} placeholder="Enter nick name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile No.</Form.Label>
                                <Form.Control type="number" name='userMobile' value={addUserData.userMobile} onChange={(e) => handShowAdd(e)} placeholder="number" />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name='userPassword' value={addUserData.userPassword} onChange={(e) => handShowAdd(e)} placeholder="Enter password" />
                                    </Form.Group>    </Col>
                                <Col> <Form.Group className="mb-3">
                                    <Form.Label>Recode</Form.Label>
                                    <Form.Control type="recode" name='userReCode' value={addUserData.userReCode} onChange={(e) => handShowAdd(e)} placeholder="Enter recode" />
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                {/* <Col>
                                    <Form.Group className="mb-3" controlId="formGroupbalance">
                                        <Form.Label>Balance</Form.Label>
                                        <Form.Control type="balance" name='userBalance' value={addUserData.userBalance} onChange={(e) => handShowAdd(e)} placeholder="Enter balance" />
                                    </Form.Group>    </Col> */}
                                {/* <Col> <Form.Group className="mb-3" controlId="formGroupdelete">
                                    <Form.Label>Delete</Form.Label>

                                    <Form.Select aria-label="Default select example" name='userDelete' value={addUserData.userDelete} onChange={(e) => handShowAdd(e)}>
                                        <option value="1">Enable</option>
                                        <option value="0">Disable</option>
                                    </Form.Select>
                                </Form.Group>
                                </Col> */}
                                <Col>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select aria-label="Default select example" name='userStatus' value={addUserData.userStatus} onChange={(e) => handShowAdd(e)}>
                                        <option value="0">NORMAL</option>
                                        <option value="1">BLOCKED</option>

                                    </Form.Select>
                                </Col>
                            </Row>
                            <Button variant="secondary" onClick={() => showRegister('cancel')}>Cancel</Button>
                            <Button variant="success" type="submit" onClick={(e) => sendData(e)}>Submit</Button>
                        </Form>

                    </Container>
                </div>
            </div>

            <div style={{ display: 'none' }} id='show2'>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "50px" }} >
                    <Container >
                        <Row className="justify-content-md-center">
                            <Col xs s lg="3">
                                <Card style={{ width: '18rem', border: "2px solid lightgray", margin: "auto", minHeight: "20rem", boxShadow: "10px 10px 5px lightgray", marginTop: "5px" }}>

                                    <Card.Body>
                                        <h4 style={{ textAlign: "center" }}>User Details</h4>
                                        <h6>User Name: {!userInfoData ? '' :userInfoData.userName}  </h6>
                                        <h6>Mobile Number: {!userInfoData ? '' :userInfoData.userMobile}  </h6>
                                        <h6>User NickName: {!userInfoData ? '' :userInfoData.userNickName} </h6>
                                        <h6>User Password: {!userInfoData ? '' :userInfoData.userPassword} </h6>
                                        <h6>Recode: {!userInfoData ? '' :userInfoData.userReCode} </h6>
                                        <h6>Balance: {!userInfoData ? '' :userInfoData.userBalance} </h6>
                                        <h6>Status: {!userInfoData ? '' :userInfoData.userStatus} </h6>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs s lg="3">
                                <Card style={{ width: '18rem', border: "2px solid lightgray", margin: "auto", minHeight: "20rem", boxShadow: "10px 10px 5px lightgray", marginTop: "5px" }}>

                                    <Card.Body>
                                        <h4 style={{ textAlign: "center" }}>User Address</h4>
                                        <h6>User Name: {!userAddressData ? '' :userAddressData.fullName}</h6>
                                        <h6>Mobile Number: {!userAddressData ? '' :userAddressData.mobileNumber}</h6>
                                        <h6>PinCode: {!userAddressData ? '' :userAddressData.pinCode}</h6>
                                        <h6>Address: {!userAddressData ? '' :userAddressData.detaileAddress}</h6>
                                        <h6>State: {!userAddressData ? '' :userAddressData.state}</h6>
                                        <h6>City: {!userAddressData ? '' :userAddressData.city}</h6>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs s lg="3">
                                <Card style={{ width: '18rem', border: "2px solid lightgray", margin: "auto", minHeight: "20rem", boxShadow: "10px 10px 5px lightgray", marginTop: "5px" }}>
                                    <Card.Body>
                                        <h4 style={{ textAlign: "center" }}>Bank Details</h4>
                                        <h6>User Name: { !userBankData ? '' :  userBankData.actualName }</h6>
                                        <h6>Bank Name: {!userBankData ? '' : userBankData.bankName}</h6>
                                        <h6>Account Number: {!userBankData ? '' : userBankData.accountNumber}</h6>
                                        <h6>IFSC Code: {!userBankData ? '' : userBankData.ifseCode}</h6>
                                        <h6>UPI Number: {!userBankData ? '' : userBankData.upiAccount}</h6>
                                        <h6>State: {!userBankData ? '' : userBankData.state}</h6>
                                        <h6 >Address <span>(Bank)</span>: {!userBankData ? '' : userBankData.address}</h6>
                                        <h6>Mobile Number: {!userBankData ? '' : userBankData.mobileNumber}</h6>
                                        <h6>Email Address : {!userBankData ? '' : userBankData.email}</h6>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <ToastContainer/>

        </>
    )
}

export default TableCom

// const P = styled.p`
//     font-size:'12px';
// `;

// const Buttons = styled.button`

 
//   background-color: #19AE0C;
//   font-size: 23px;
//   color: white;
//   font-weight:bold;
//   border-radius:4px;
//   border:none;
   
 
// `;