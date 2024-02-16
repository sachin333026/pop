import React from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';

const Transactions = () => {
    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack /></Link></Navbar.Brand>
                    <Navbar.Brand >Transactions</Navbar.Brand>
                </Navbar>
            </div>

            <Footer />
        </>
    )
}

export default Transactions