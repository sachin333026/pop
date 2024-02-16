import React, { useState, useEffect } from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Pages = ({ baseUrl }) => {

   
    const [privacyC , setPrivacy] = useState({
        privacyContent: '', privacyId: ''
    });
    const [roleC , setRole] = useState({
        roleContent: '', roleId: ''
    });
    const [termsC , setTerms] = useState({
        termsContent: '', termsId: ''
    });
    const [aboutC , setAbout] = useState({
        aboutContent: '', pageId: ''
    });

    useEffect(() => {
        showAbout()
        showTerm()
        showPrivacy()
        showRole()
    }, [])

    const showAbout = (e) => {

    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl+"show/about", requestOptions)
            .then(response => response.json())
            .then(result => {
                setAbout(
                    {
                        aboutContent: result[0].aboutContent,
                        pageId: result[0].Id
                    }
                )
            })
            .catch(error => console.log('error', error));
        }
    const updateAbout = (e) => {

        e.preventDefault()
        const { aboutContent, pageId } = aboutC
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            aboutContent,pageId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"update/about/page", requestOptions)
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
                }
                else {
                    toast.error('Not Add', {
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

    const handShow = (e) => {
        const { name, value } = e.target

        setAbout((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    const showPrivacy = (e) => {

        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            fetch(baseUrl+"show/privacy", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPrivacy(
                        {
                            privacyContent: result[0].privacyContent,
                            privacyId: result[0].Id
                        }
                    )
                })
                .catch(error => console.log('error', error));
            }
        const updatePrivacy = (e) => {
    
            e.preventDefault()
            const { privacyContent, privacyId } = privacyC
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                privacyContent,privacyId
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch(baseUrl+"update/privacy/page", requestOptions)
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
                    }
                    else {
                        toast.error('Not Add', {
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
    
        const handPrivacy = (e) => {
            const { name, value } = e.target
    
            setPrivacy((prastate) => ({
                ...prastate,
                [name]: value,
            }));
        }

        
        const showRole = (e) => {

            var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
        
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
        
                fetch(baseUrl+"show/role", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setRole(
                            {
                                roleContent: result[0].roleContent,
                                roleId: result[0].Id
                            }
                        )
                    })
                    .catch(error => console.log('error', error));
                }
            const updateRole = (e) => {
        
                e.preventDefault()
                const { roleContent, roleId } = roleC
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
        
                var raw = JSON.stringify({
                    roleContent,roleId
                });
        
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
        
                fetch(baseUrl+"update/role/page", requestOptions)
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
                        }
                        else {
                            toast.success('Not Add', {
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
        
            const handRole = (e) => {
                const { name, value } = e.target
        
                setRole((prastate) => ({
                    ...prastate,
                    [name]: value,
                }));
            }

            
            const showTerm = (e) => {

                var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
            
                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    };
            
                    fetch(baseUrl+"show/terms", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            setTerms(
                                {
                                    termsContent: result[0].termsContent,
                                    termsId: result[0].Id
                                }
                            )
                        })
                        .catch(error => console.log('error', error));
                    }
                const updateTerms = (e) => {
            
                    e.preventDefault()
                    const { termsContent, termsId } = termsC
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
            
                    var raw = JSON.stringify({
                        termsContent,termsId
                    });
            
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
            
                    fetch(baseUrl+"update/terms/page", requestOptions)
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
                            }
                            else {
                                toast.error('Not Add', {
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
            
                const handTerm = (e) => {
                    const { name, value } = e.target
            
                    setTerms((prastate) => ({
                        ...prastate,
                        [name]: value,
                    }));
                }
            


    return (
        <>
            <AdminBackNav />

            <div >
                <Container style={{ maxWidth: "50rem", boxShadow: "10px 10px 5px lightgray", border: "2px solid lightgray", marginTop: "5rem" }}>
                    <Row className="justify-content-md-center">
                        <Row style={{ marginTop: "3rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Name</h5>
                            </Col>
                            <Col>
                                <Form.Label><h5>About</h5></Form.Label>
                            </Col>
                        </Row>

                        {/* row 2nd */}
                        <Row style={{ marginTop: "2rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Content</h5>
                            </Col>

                            <Col>
                                <textarea type="name" onChange={(e) => handShow(e)} name='aboutContent' value={aboutC.aboutContent} style={{width:"90%", height:"161px"}} />


                            </Col>

                        </Row>

                        {/* row 3rd */}
                        <Row style={{ marginTop: "2rem", marginBottom: "3rem" }}>
                            <Col>
                                <Button variant="success" type='submit' onClick={(e) => updateAbout(e)}>Save</Button>
                            </Col>
                        </Row>
                    </Row>
                </Container>


                {/* term and condition */}
                <Container style={{ maxWidth: "50rem", boxShadow: "10px 10px 5px lightgray", border: "2px solid lightgray", marginTop: "5rem" }}>
                    <Row className="justify-content-md-center">
                        <Row style={{ marginTop: "3rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Name</h5>
                            </Col>
                            <Col>
                                <Form.Label><h5>Terms & Conditions</h5></Form.Label>
                            </Col>
                        </Row>

                        {/* row 2nd */}
                        <Row style={{ marginTop: "2rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Content</h5>
                            </Col>
                            <Col>
                            <textarea type="name" onChange={(e) => handTerm(e)} name='termsContent' value={termsC.termsContent} style={{width:"90%", height:"161px"}} />
                            </Col>
                        </Row>

                        {/* row 3rd */}
                        <Row style={{ marginTop: "2rem", marginBottom: "3rem" }}>
                            <Col>
                                <Button variant="success" type="submit" onClick={(e) => updateTerms(e)}>Save</Button>{' '}
                            </Col>
                        </Row>

                    </Row>
                </Container>

                {/* privacy and policy */}
                <Container style={{ maxWidth: "50rem", boxShadow: "10px 10px 5px lightgray", border: "2px solid lightgray", marginTop: "5rem" }}>
                    <Row className="justify-content-md-center">
                        <Row style={{ marginTop: "3rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Name</h5>
                            </Col>
                            <Col>
                                <Form.Label><h5>Privacy & Policy</h5></Form.Label>
                            </Col>
                        </Row>

                        {/* row 2nd */}
                        <Row style={{ marginTop: "2rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Content</h5>
                            </Col>
                            <Col>
                            <textarea type="name" onChange={(e) => handPrivacy(e)} name='privacyContent' value={privacyC.privacyContent} style={{width:"90%", height:"161px"}} />
                            </Col>
                        </Row>

                        {/* row 3rd */}
                        <Row style={{ marginTop: "2rem", marginBottom: "3rem" }}>
                            <Col>
                                <Button variant="success" onClick={(e) => updatePrivacy(e)}>Save</Button>{' '}
                            </Col>
                        </Row>
                    </Row>
                </Container>

                {/* risk disclousere */}

                <Container style={{ maxWidth: "50rem", boxShadow: "10px 10px 5px lightgray", border: "2px solid lightgray", marginTop: "5rem" }}>
                    <Row className="justify-content-md-center">
                        <Row style={{ marginTop: "3rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Name</h5>
                            </Col>
                            <Col>
                                <Form.Label><h5>Risk Disclousere</h5></Form.Label>
                            </Col>
                        </Row>

                        {/* row 2nd */}
                        <Row style={{ marginTop: "2rem" }}>
                            <Col xs s lg="3">
                                <h5>Page Content</h5>
                            </Col>
                            <Col>
                            <textarea type="name" onChange={(e) => handRole(e)} name='roleContent' value={roleC.roleContent} style={{width:"90%", height:"161px"}} />
                            </Col>
                        </Row>

                        {/* row 3rd */}
                        <Row style={{ marginTop: "2rem", marginBottom: "3rem" }}>
                            <Col>
                                <Button variant="success" onClick={(e) => updateRole(e)}>Save</Button>{' '}
                            </Col>
                        </Row>


                    </Row>
                </Container>
            </div>

            <ToastContainer/>
        </>
    )
}

export default Pages