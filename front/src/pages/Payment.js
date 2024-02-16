import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';


const Payment = ({ baseUrl }) => {

    const [userPaymentInfo, setUserPaymentInfo] = useState([])

    useEffect(() => {
        // paymentShow()
    }, [])

    const paymentShow = () => {

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
                console.log(result);
                setUserPaymentInfo(result)
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                <Link to='/mine' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="2.0rem"/></Link> 
                <Navbar.Brand >Payment</Navbar.Brand>
                </Navbar>
            </div>

            <div style={{ marginBottom: '7rem' }}>

                {
                 userPaymentInfo &&   userPaymentInfo.map((val, index) => (
                        <div style={{ margin: '25px', boxShadow: '1px 1px 30px 1px gray', borderRadius: '10px', textAlign:'center' }}>
                            <div style={{ padding: '15px' }}>
                                <div style={{ padding: '5px' }}>
                                    <p>{val.paymentContent}</p>

                                    <hr />
                                </div>
                                {
                                    val.showImga === 'Disable' ? <p></p>

                                        :
                                        <div style={{ padding: '5px' }}>

                                            <p>{val.paymentImage === '' ? <img src='https://via.placeholder.com/300' /> : <p>{val.paymentImage}</p>}</p>
                                            <hr />
                                        </div>

                                }

                                <div style={{ padding: '5px' }}>
                                    <p>{val.paymentHeading}</p>

                                    <hr />
                                </div>
                            </div>
                        </div>
                    ))
                }



            </div>

            <Footer />
        </>
    )
}

export default Payment