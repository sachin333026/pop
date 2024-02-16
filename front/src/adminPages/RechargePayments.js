import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import MaterialTable from "material-table";
import AdminBackNav from '../adminComponent/AdminBackNav';
function RechargePayments({baseUrl}) {
  const [userPaymentInfo, setUserPaymentInfo] = useState({
    Id: '', paymentHeading: '', paymentContent: '', paymentImage: '', status: '', dateTime: new Date(), showImga: ''
})

const [paymentEditData, setPaymentEditData] = useState({
    Id: '', paymentHeading: '', paymentContent: '', paymentImage: '', status: '', showImga: ''
})

const [paymentInfo, setPaymentInfo] = useState([])
const [paymentImg, setPaymentImg] = useState('')




useEffect(() => {
    // showPayment();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(baseUrl + "show/admin/Payment", requestOptions)
        .then(response => response.json())
        .then(result => {
            setPaymentInfo(result)
        })
        .catch(error => console.log('error', error));
}, [])

const HandlShow = (e) => {
    const { name, value } = e.target

    setUserPaymentInfo((prastate) => ({
        ...prastate,
        [name]: value,
    }))
}

const editHandShow = (e) => {
    const { name, value } = e.target

    setPaymentEditData((prastate) => ({
        ...prastate,
        [name]: value,
    }));
}


// const showPayment = () => {

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         redirect: 'follow'
//     };

//     fetch(baseUrl + "show/admin/Payment", requestOptions)
//         .then(response => response.json())
//         .then(result => {
//             setPaymentInfo(result)
//         })
//         .catch(error => console.log('error', error));
// }

const addPayment = (e) => {

    e.preventDefault()

    const { paymentHeading, paymentContent, paymentImage, status, dateTime, showImga } = userPaymentInfo

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        paymentHeading, paymentContent, paymentImage, status, dateTime, showImga
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl + "add/adminPayment", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result === 'Successfully') {
                alert('Successfully Add')
                // showPayment()
                document.querySelector("#divTable").style.display = "block";
                document.querySelector("#show1").style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
}

const showRegister = (e, val) => {
    e.preventDefault()

    if (val === 'add') {
        document.querySelector("#divTable").style.display = "none";
        document.querySelector("#show1").style.display = "block";
    }

    if (val === 'cancel') {
        document.querySelector("#divTable").style.display = "block";
        document.querySelector("#show1").style.display = "none";
        document.getElementById('editDiv').style.display = 'none';

    }
};

const removePayment = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Id": id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl + "remove/admin/paymentDetails", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.mess === 'Successfully') {
                alert('Successfully Remove')
                // showPayment()
            }
        })
        .catch(error => console.log('error', error));
}

const editPayment = (val, rowData) => {


    if (val === 'edit') {
        document.getElementById('editDiv').style.display = 'block';
        document.getElementById('divTable').style.display = 'none';
    }

    if (val === 'cencel') {
        document.getElementById('editDiv').style.display = 'none';
        document.getElementById('divTable').style.display = 'block';
    }
    setPaymentImg(rowData.paymentImage
    )
    setPaymentEditData({
        Id: rowData.Id, paymentHeading: rowData.paymentHeading, paymentContent: rowData.paymentContent,
        // paymentImage: rowData.paymentImage, 
        status: rowData.status,
        showImga: rowData.showImga
    })

}

const editPaymentData = (e) => {

    e.preventDefault()
    const { Id, paymentHeading, paymentContent, paymentImage, status, dateTime, showImga } = paymentEditData
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        Id, paymentHeading, paymentContent, paymentImage, status, dateTime, showImga
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl + "edit/admin/paymentDetails", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.mess === 'Successfully') {
                alert('Successfully Edit')
                document.getElementById('editDiv').style.display = 'none';
                document.getElementById('divTable').style.display = 'block';
                // showPayment()
            }
        })
        .catch(error => console.log('error', error));
}

return (
    <>
    <AdminBackNav/>
 
        <div style={{ padding: '30px', display: 'block' }} id='divTable' >

            <MaterialTable
                title="Payment"
                options={{
                    paging:true,
                    pageSize:10,       // make initial page size
                    emptyRowsWhenPaging: false,   // To avoid of having empty rows
                    pageSizeOptions:[10,15,20],    // rows selection options
                  }}
                columns={[
                  { title: 'S.No', field: 'id' },
                    { title: 'User id', field: 'userId' },
                    { title: 'UPI ID', field: 'Upi' },
                    { title: 'amount', field: 'amount' },
                    { title: 'transaction_id', field: 'transaction_id' },
                    // { title: 'Date', field: 'date' },
                    {
                        title: "Date",field: "date",
                        editable: false,
                        render: (rowData) =>
                            rowData && (
                                <p
                                    // color="secondary"

                                >
                                    {(rowData?.date).split('T')[0]}




                                </p>
                            )
                    },
                    { title: 'Status', field: 'status', render: (rowData) =>
                    rowData && (
                    rowData.status==1?"Wait":"Success"
                    ) },
                    { title: 'UTR', field: 'Utr' }

                  
                ]}

                data={paymentInfo?.data}

            // actions={[
            //     {
            //         icon: 'edit',
            //         tooltip: 'Edit User',
            //         onClick: (event, rowData) => editPayment('edit', rowData)
            //     },
            //     {
            //         icon: 'remove',
            //         tooltip: 'Remove User',
            //         onClick: (event, rowData) => removePayment(rowData.Id)
            //     }

            // ]}

            />
        </div>
        <div style={{ display: 'none' }} id='show1'>
            <div style={{ padding: '30px' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Payment Heading " name='paymentHeading' value={userPaymentInfo.paymentHeading} onChange={HandlShow} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Payment Content" name='paymentContent' value={userPaymentInfo.paymentContent} onChange={HandlShow} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Payment Images</Form.Label>
                                <Form.Control type="text" name='paymentImage' value={userPaymentInfo.paymentImage} onChange={HandlShow} multiple />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" name='status' value={userPaymentInfo.status} onChange={HandlShow}>

                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>

                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Show Image</Form.Label>
                            <Form.Select aria-label="Default select example" name='showImga' value={userPaymentInfo.showImga} onChange={HandlShow}>

                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>

                            </Form.Select>
                        </Col>
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <Row>
                                <Col>
                                    <Button variant="secondary" style={{ width: '7rem' }} type="submit" onClick={(e) => showRegister(e, 'cancel')}>
                                        Cancel
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" style={{ width: '7rem' }} type="submit" onClick={(e) => addPayment(e)}>
                                        Add
                                    </Button>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </Form>
            </div>
        </div>
        <div id='editDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
            <Container style={{ padding: "20px" }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Payment Heading " name='paymentHeading' value={paymentEditData.paymentHeading} onChange={editHandShow} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Payment Content" name='paymentContent' value={paymentEditData.paymentContent} onChange={editHandShow} required />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Payment Images</Form.Label>
                                <Form.Control type="file" name='paymentImage' value={paymentEditData.paymentImage} onChange={editHandShow} required />
                            </Form.Group>
                            <p>{paymentImg}</p>
                        </Col>
                        <Col>
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" name='status' value={paymentEditData.status} onChange={editHandShow} required>
                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>

                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Show Image</Form.Label>
                            <Form.Select aria-label="Default select example" name='showImga' value={paymentEditData.showImga} onChange={editHandShow} required>
                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>

                            </Form.Select>

                        </Col>
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <Row>
                                <Col>
                                    <Button variant="secondary" style={{ width: '7rem' }} type="submit" onClick={(e) => showRegister(e, 'cancel')}>
                                        Cancel
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" style={{ width: '7rem' }} type="submit" onClick={(e) => editPaymentData(e)}>
                                        Save
                                    </Button>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </Form>
            </Container>
        </div>

    </>
)
}

export default RechargePayments