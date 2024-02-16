import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Phone, Lock } from '@material-ui/icons';
import './Login.css';

export const Login = ({ baseUrl }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(true);
    const [userInfo, setUserInfo] = useState({
        userMobile: '',
        userPassword: ''
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/win');
        }
    }, []);

    const HandlShow = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const LoginPage = (e) => {
        e.preventDefault();

        const { userMobile, userPassword } = userInfo;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userMobile": userMobile,
            "userPassword": userPassword
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "userLogin", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    localStorage.setItem('token', result.token);
                    navigate('/win');
                } else if (result === 'User Blocked For Login') {
                    toast.error('User Blocked For Login', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Mobile number and Password are wrong', {
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
    };

    return (
        <>
            <NavBar page={page} />

            <div style={{ padding: '20px' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div className="input-icon">
                            <Phone className="icon" />
                            <Form.Control
                                className="mb-2 form-control"
                                type="text"
                                placeholder="Mobile Number"
                                name="userMobile"
                                value={userInfo.userMobile}
                                onChange={HandlShow}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <div className="input-icon">
                            <Lock className="icon" />
                            <Form.Control
                                className="mb-2 form-control"
                                type="password"
                                placeholder="Password"
                                name="userPassword"
                                value={userInfo.userPassword}
                                onChange={HandlShow}
                            />
                        </div>
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div>
                            <Button
                                style={{ whiteSpace: 'inherit', marginTop: '15px', width: '14.80rem', backgroundColor: '#0288D1', color: 'white', transition: '.3s cubic-bezier(.25,.8,.5,1)', height: '2.6rem', fontSize: '11px', textTransform: "none", borderRadius: '0px', fontWeight: '400', boxShadow: '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)' }}
                                type="submit"
                                onClick={(e) => LoginPage(e)}
                            >
                                Login
                            </Button>
                        </div>

                        <div style={{ marginBottom: '6rem', marginTop: '32px' }}>
                            <Link to='/register' onClick={() => setPage(false)} style={{ textDecoration: 'none' }}>
                                <Button
                                    style={{ whiteSpace: 'inherit', transition: '.3s cubic-bezier(.25,.8,.5,1)', textTransform: "none", width: '6rem', height: '2rem', fontSize: '10px', margin: '2px', backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,.87)', fontWeight: '400', boxShadow: '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', borderRadius: '0px' }}
                                    type="submit"
                                >
                                    Register
                                </Button>
                            </Link>
                            <Link to='/reset/password' style={{ textDecoration: 'none' }}>
                                <Button
                                    style={{ whiteSpace: 'inherit', textTransform: "none", transition: '.3s cubic-bezier(.25,.8,.5,1)', width: '8.80rem', height: '2rem', margin: '7px', fontSize: '10px', backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,.87)', fontWeight: '400', boxShadow: '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)', borderRadius: '0px' }}
                                    type="submit"
                                >
                                    Forgot Password?
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
};
