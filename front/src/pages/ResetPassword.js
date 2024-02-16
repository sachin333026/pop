import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../firebase'
import Button from '@material-ui/core/Button';

const ResetPassword = ({ baseUrl }) => {
    const navigate = useNavigate()
    const [resetPassUser, setResetPassUser] = useState({
        userMobile: '', userPassword: '', verificationCode: ''
    })
    const handShow = (e) => {
        const { name, value } = e.target

        setResetPassUser((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    const resetPassword = (e) => {
        // e.preventDefault()
        const { userMobile, userPassword } = resetPassUser
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userMobile, userPassword
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "user/resetPassword", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    // alert('Successfully Reset Password')
                    toast.success('Successfully Reset Password', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setResetPassUser({
                        userMobile: '', userPassword: ''
                    })
                } else {
                    toast.error('Not Reset Password', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(error => console.log('error', error));
    }
    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
                // console.log("Recaptca varified")
            },
            defaultCountry: "IN"
        });
    }
    const onSignInSubmit = (e) => {
        e.preventDefault()







        const { userMobile, userPassword } = resetPassUser
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userMobile
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "userExist", requestOptions)
            .then(response => response.json())
            .then(result => {




                if (result.data === '1') {


                    configureCaptcha()
                    const phoneNumber = "+91" + resetPassUser.userMobile

                    const appVerifier = window.recaptchaVerifier;
                    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                        .then((confirmationResult) => {

                            window.confirmationResult = confirmationResult;

                            toast.success('OTP has been sent', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });


                            document.getElementById('form2').style.display = 'block';

                        }).catch((error) => {

                            toast.error('SMS not sent', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        });
                } else {
                    toast.error('User Not found', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });


                    // navigate('/')
                }
            })
            .catch(error => console.log('error', error));
    }


    const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = resetPassUser.verificationCode

        window.confirmationResult.confirm(code).then((result) => {

            toast.success('User is verified', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            resetPassword()
            navigate('/')
        }).catch((error) => {

            toast.error('User is not verified', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    return (
        <>
           <div>
               <Navbar   variant="dark" style={{backgroundColor:'#0288D1',padding:'7px',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}}>
               <Link to='/mine' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="2.0rem"/></Link> 
        
                    <Navbar.Brand style={{ marginLeft: '15px',lineHeight:'4px',verticalAlign:'center' }}>Reset Password</Navbar.Brand>
                </Navbar>
            </div>

            <div style={{ padding: '30px' }}>
                <Form onSubmit={onSignInSubmit} style={{ display: 'block' }} id='form1'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}} type="text" placeholder={'Mobile Number'} name='userMobile' value={resetPassUser.userMobile} onChange={handShow} required />
                        {/* <Form.Control type="text" placeholder={<FaMobileAlt/> + 'Mobile Number'} /> */}
                    </Form.Group>
                    {/* <div style={{ display: 'flex'}}>
                        <div style={{ width: '70rem' }}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Verification Code"  required />
                            </Form.Group>
                        </div>

                        <div  style={{ width: '10rem', marginLeft:'10px' }}>
                            <Button variant="secondary" type="submit">
                                OTP
                            </Button>
                        </div>
                    </div> */}

                    <div id="sign-in-button"></div>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}} type="password" placeholder="New Password" name='userPassword' value={resetPassUser.userPassword} onChange={handShow} required />
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ marginBottom: '6rem' }}>
                            {/* <Button style={{ width: '16rem' }} variant="primary" type="submit" onClick={(e)=>resetPassword(e)}>
                               Continue
                            </Button> */}
                            <Button style={{ whiteSpace:'inherit',marginTop:'15px',width: '14.80rem' ,backgroundColor:'#0288D1' ,color:'white',transition:'.3s cubic-bezier(.25,.8,.5,1)',height:'2.6rem',fontSize:'11px',textTransform: "none",borderRadius:'0px',fontWeight:'400',boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}} type="submit">
                                Send Otp
                            </Button>
                        </div>
                    </div>
                </Form>
                <Form onSubmit={onSubmitOTP} style={{ display: 'none', marginBottom: '5rem' }} id='form2'>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '70rem' }}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Verification Code" name='verificationCode' value={resetPassUser.verificationCode} onChange={handShow} required />
                            </Form.Group>
                        </div>

                        <div style={{ width: '10rem', marginLeft: '10px' }}>
                            <Button variant="secondary" type='submit'>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>

            <Footer />
            <ToastContainer />
        </>
    )
}

export default ResetPassword
