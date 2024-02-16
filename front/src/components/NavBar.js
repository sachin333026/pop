import React from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';

const NavBar = ({page}) => {

   
    return (
        <>  
        {
            page?
            <div>
                <Navbar   variant="dark" style={{backgroundColor:'#0288D1',padding:'7px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
                    <Navbar.Brand  style={{ marginLeft: '10px',lineHeight:'4px',verticalAlign:'center' }}><IoMdArrowRoundBack size="1.5rem"/></Navbar.Brand>
                    <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Login</Navbar.Brand>
                </Navbar>
            </div>
            :
            <div>
               <Navbar   variant="dark" style={{backgroundColor:'#0288D1',padding:'7px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
                    <Navbar.Brand  href='/' style={{ marginLeft: '10px',lineHeight:'4px',verticalAlign:'center' }}><IoMdArrowRoundBack size="1.5rem"/></Navbar.Brand>
                    <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Register</Navbar.Brand>
                </Navbar>
            </div>
        }   
        </>
    )
}

export default NavBar