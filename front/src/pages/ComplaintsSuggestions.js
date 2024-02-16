import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Card } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import styled from 'styled-components'
 

const ComplaintsSuggestions = ({ baseUrl }) => {

    const [ticketData, setTicketData] = useState([])

    useEffect(() => {
        showTicket()
    }, [])

    const userToken = localStorage.getItem('token')
   
    
    const showTicket = () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

      

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "show/user/Ticket", requestOptions)
            .then(response => response.json())
            .then(result => {
                setTicketData(result)
            })
            .catch(error => console.log('error', error));
    }

    const changeComp = (val) => {

        if (val === 'completed') {
            document.getElementById('wait').style.display = 'none'
            document.getElementById('completed').style.display = 'block'
        } else if (val === 'wait') {
            document.getElementById('wait').style.display = 'block'
            document.getElementById('completed').style.display = 'none'
        }
    }

    return (
        <>
        <div>
        <Navbar   variant="dark" style={{backgroundColor:'#0288D1',padding:'10px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
        <Link to='/mine' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="2.0rem"/></Link> 
        <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Ticket</Navbar.Brand>
        
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ padding: '10px' }}>
                    <Nav>
                    <Nav.Link onClick={() => changeComp('wait')}>PENDING</Nav.Link>
                    <Nav.Link onClick={() => changeComp('completed')}>COMPLETED</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div id='wait' style={{ display: 'block' }}>
                <div style={{ display: 'grid',  gridTemplateColumns: " repeat(auto-fill, 300px) " }}>
                    {
                        ticketData.filter(val => {
                           
                            if (val.status === 'Pending') {
                                return val
                            } 
                        }).map(val => (
                            <div style={{ margin: '2rem', }}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title style={{display:'flex'}}>
                                            <div>
                                                <h3>Tickets</h3>
                                            </div>
                                            <div style={{margin:'10px'}}>
                                            <div style={{paddingLeft:'5rem', color:'red'}}>
                                                <h6>{val.status}</h6>
                                            </div>
                                            </div>
                                            
                                        </Card.Title>
                                        <Card.Text>
                                            <h6>Name: <Span>{val.name}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Email: <Span>{val.email}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Mobile Number:  <Span>{val.phone}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Subject: {val.subject} <Span></Span></h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Message: <Span>{val.message}</Span> </h6>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </div>
                        ))

                    }

                </div>
            </div>

            <div id='completed' style={{ display: 'none' }}>
                <div style={{ display: 'grid',  gridTemplateColumns: " repeat(auto-fill, 300px) " }}>
                    {
                        ticketData.filter(val => {
                          
                            if (val.status === 'Resolve') {
                                return val
                            } 
                        }).map(val => (
                            <div style={{ margin: '2rem', }}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title style={{display:'flex'}}>
                                            <div>
                                                <h3>Tickets</h3>
                                            </div>
                                            <div style={{margin:'10px'}}>
                                            <div style={{paddingLeft:'5rem', color:'green'}}>
                                                <h6>{val.status}</h6>
                                            </div>
                                            </div>
                                            
                                        </Card.Title>
                                        <Card.Text>
                                            <h6>Name: <Span>{val.name}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Email: <Span>{val.email}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Mobile Number:  <Span>{val.phone}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Subject: {val.subject} <Span></Span></h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Message: <Span>{val.message}</Span> </h6>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </div>
                        ))

                    }

                </div>
            </div>

            <Footer />
        </>
    )
}

export default ComplaintsSuggestions

const Span = styled.span`
color: gray;
`;