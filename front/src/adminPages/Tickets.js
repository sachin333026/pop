import React, { useEffect, useState } from 'react'
import MaterialTable from "material-table";
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import AdminBackNav from '../adminComponent/AdminBackNav';
import { ToastContainer, toast } from 'react-toastify';
import { URL } from '../Url';


const Tickets = ({ baseUrl }) => {

    const [ticket, setTicket] = useState([])




    const [ticketData, setTicketData] = useState({
        userId: '', name: '', email: '', phone: '', subject: '', message: '', status: 'Pending', ticketId: ''
    })

    useEffect(() => {
        // showTicket()
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(URL.API_BASE_URL+ "show/admin/Ticket", requestOptions)
            .then(response => response.json())
            .then(result => {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)))
            setTicket(resultArray.reverse())
            
            })
            .catch(error => console.log('error', error));
    }, [])

    const handShow = (e) => {
        const { name, value } = e.target

        setTicketData((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    const showTicket = () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "show/admin/Ticket", requestOptions)
            .then(response => response.json())
            .then(result => {
                setTicket(result)
            })
            .catch(error => console.log('error', error));
    }


    const removeUser = (idv) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "tid": idv
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "remove/admin/userTickets", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Remove', {
                        position: "top-right",
                        autoClose: 200,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                     showTicket()
                }
            })
            .catch(error => console.log('error', error));
    }

    const editTicket = (val, rowData) => {

        if (val === 'edit') {
            document.getElementById('editDiv').style.display = 'block';
            document.getElementById('divTable').style.display = 'none';
            setTicketData({
                userId: '', name: '', email: '', phone: '', subject: '', message: '', status: ''
            })
        }

        if (val === 'cencel') {
            document.getElementById('editDiv').style.display = 'none';
            document.getElementById('divTable').style.display = 'block';
        }
        setTicketData({
            user:rowData.userId,ticketId: rowData.Id, name: rowData.name, email: rowData.email, phone: rowData.phone, subject: rowData.subject, message: rowData.message, status: rowData.status
        })

    }

    const editUserTicket = () => {
        const { user,ticketId, name, email, phone, subject, message, status } = ticketData
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            user,ticketId, name, email, phone, subject, message, status
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "edit/admin/ticketDetails", requestOptions)
            .then(response => response.json())
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
                    document.getElementById('editDiv').style.display = 'none';
                    document.getElementById('divTable').style.display = 'block';
                    showTicket()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <AdminBackNav />

    
            <div style={{ padding: '30px', display: 'block' }} id='divTable'>
                <MaterialTable
                    title="User Tickets"
                    options={{
                        paging:true,
                        pageSize:10,       // make initial page size
                        emptyRowsWhenPaging: false,   // To avoid of having empty rows
                        pageSizeOptions:[10,15,20],    // rows selection options
                      }}
                    columns={[
                        { title: 'User Id', field: 'userId' },
                        { title: 'Name', field: 'name' },
                        { title: 'Email', field: 'email' },
                        { title: 'Phone', field: 'phone' },
                        { title: 'Subject', field: 'subject', },
                        { title: 'Message', field: 'message', },
                        { title: 'Status', field: 'status' },
                    ]}
                    data={ticket}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => editTicket('edit', rowData)
                        },
                        {
                            icon: 'remove',
                            tooltip: 'Remove User',
                            onClick: (event, rowData) => removeUser(rowData.Id)
                        },
                    ]}
                />
            </div>

            <div id='editDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
                <Container style={{ padding: "5px" }}>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" onChange={(e) => handShow(e)} name='name' value={ticketData.name} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="name" name='email' value={ticketData.email} onChange={(e) => handShow(e)} placeholder="Enter nick name" />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" onChange={(e) => handShow(e)} name='phone' value={ticketData.phone} placeholder="number" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Default select example" name='status' value={ticketData.status} onChange={(e) => handShow(e)} required>
                                    <option value="Pending">Pending</option>
                                    <option value="Resolve">Resolve</option>
                                </Form.Select>
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="password" onChange={(e) => handShow(e)} name='subject' value={ticketData.subject} placeholder="Enter password" />
                                </Form.Group>    </Col>
                            <Col> <Form.Group className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control type="text" onChange={(e) => handShow(e)} name='message' value={ticketData.message} placeholder="Enter recode" />
                            </Form.Group>
                            </Col>
                        </Row>



                        <Row>
                            <Col>
                                <Button variant="light" onClick={() => editTicket('cencel')}>Cancel</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={() =>  editUserTicket()}>Save</Button>
                            </Col>
                        </Row>

                    </Form>
                </Container>
            </div>

            <ToastContainer/>
           
        </>
    )
}

export default Tickets

