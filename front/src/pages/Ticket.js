import React, { useState } from 'react'
import { Navbar, Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'
import Footer from '../components/Footer';
function MyVerticallyCenteredModal(props) {


    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    THANK YOU
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const Ticket = ({ baseUrl }) => {
    const navigate = useNavigate()
    const [modalShow, setModalShow] = React.useState(false);

    const [userTicketInfo, setUserTicketInfo] = useState({
        userId: localStorage.getItem('token'), name: '', email: '', phoneNo: '', subject: '', message: '', status: 'Pending'
    })

    const HandlShow = (e) => {
        const { name, value } = e.target

        setUserTicketInfo((prastate) => ({
            ...prastate,
            [name]: value,
        }))
    }

    const sendTicket = (e) => {

        e.preventDefault()

        const { userId, name, email, phoneNo, subject, message, status } = userTicketInfo
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        var raw = JSON.stringify({
            userId, name, email, phoneNo, subject, message, status
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "user/tickets", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result === 'Successfully') {
                    // toast.success('Successfully send', {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    // });
                    setModalShow(true)
                    setUserTicketInfo({
                        userId: localStorage.getItem('token'), name: '', email: '', phoneNo: '', subject: '', message: '', status: 'Pending'
                    })
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

                else {
                    toast.error('Error Creating Complaint', {
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
            )
            .catch(error => console.log('error', error));
    }

    return (
        <>
        <div>
        <Navbar   variant="dark" style={{backgroundColor:'#0288D1',padding:'10px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
        <Link to='/mine' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="2.0rem"/></Link> 
          
        <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Ticket</Navbar.Brand>
        </Navbar>
    </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                <Card style={{ width: "50rem", height: "30rem", boxShadow: "10px 10px 5px lightgray" }} >
                    <h3 style={{ textAlign: "center", color: "gray", marginTop: "2rem", textShadow: "2px 2px lightgray" }}>Ticket</h3>
                    <hr ></hr>
                    <Row style={{ margin: "auto" }}>

                        <Form>
                            <Row style={{ marginBottom: "5px" }}>
                                <Col style={{ borderRadius: "8px" }}>
                                    <Form.Control placeholder="Name" name='name' value={userTicketInfo.name} onChange={HandlShow} required />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Email" name='email' value={userTicketInfo.email} onChange={HandlShow} required />
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "5px" }}>
                                <Col>
                                    <Form.Control placeholder="PhoneNo" name='phoneNo' value={userTicketInfo.phoneNo} onChange={HandlShow} required />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Subject" name='subject' value={userTicketInfo.subject} onChange={HandlShow} required />
                                </Col>
                            </Row>
                        </Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>MESSAGE</Form.Label>
                            <Form.Control as="textarea" rows={3} name='message' value={userTicketInfo.message} onChange={HandlShow} required />
                        </Form.Group>


                    </Row>
                    <div style={{ padding: '30px', margin: "auto" }}>
                        <Button   style={{ backgroundColor:'#0288D1',width: '13rem' }} onClick={(e) => sendTicket(e)} >
                            Create
                        </Button>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>

                </Card>

            </div>

            <ToastContainer />
            <Footer/>

        </>
    )
}

export default Ticket