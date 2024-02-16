import React from 'react'
import { Button,Navbar ,Card , Row} from 'react-bootstrap'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import wa  from './img/wa.png'

function SettingUser() {
  return (
    <div>
         <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack size="2.0rem"/></Link></Navbar.Brand>
                    <Navbar.Brand >Setting</Navbar.Brand>
                </Navbar>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
            
                <Card style={{ width: "50rem", height: "30rem", boxShadow: "5px 5px 5px gray" }} >
                    <h3 style={{ textAlign: "center", color: "green", marginTop: "40px", textShadow: "2px 2px lightgray" }}>Whatsapp</h3>
                   <p style={{textAlign: "center"}}>Contact On Whatsapp For Any Query</p>
                   
                       <div  style={{margin:"auto",marginTop:"2rem"}}>
                           <Row>
                           <img src={wa} height="90" width="60" alt='wa'/>
                           </Row>

                           <Row>
                            
                    <Button variant="success" style={{marginTop:"12rem",width:"8rem",margin:"auto"}} onClick={event =>  window.location.href='https://api.whatsapp.com/send?phone=917877444069'}>Whatsapp</Button>
                    </Row>
                    </div>
                   

                 
                </Card>
            </div>
    </div>
  )
}

export default SettingUser