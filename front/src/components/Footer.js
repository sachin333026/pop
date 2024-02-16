import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { GiMedal } from 'react-icons/gi';
import { FaGamepad, FaUserCircle, FaHistory } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'
import './Footer.css';
const Footer = () => {

    const location = useLocation();
    const { pathname } = location;

    const splitLocation = pathname.split("/");

 
    return (
        <>
            <div style={{marginTop:'auto', boxShadow:'3px 3px 3px -2px rgb(0 0 0 / 40%), 0 4px 4px 0 rgb(0 0 0 / 40%), 0 1px 5px 0 rgb(0 0 0 / 40%)',position: 'fixed', left: '0',bottom: '0',width: '100%',zIndex:999, textAlign: 'center', backgroundColor: "white",height:'42px' }}>
                <div>
                    <Row>
                        <Col >
                            <Link to='/home' style={{ textDecoration: 'none' }}>
                                <div style={{ courser: 'pointer', color: 'black' }} tabindex="1">
                                    <span className={splitLocation[1] == "home" ? 'active activeNav' : "active"} ><span class="material-icons">sports_esports</span></span>
                                    <p style={{marginTop:'-8px'}}  className={splitLocation[1] == "home" ? 'active activeNav' : "active"}>Home</p>
                                </div>
                            </Link>
                        </Col>

                        <Col >
                            <Link to='/win' style={{ textDecoration: 'none' }}>
                                <div style={{ courser: 'pointer', color: 'black' }} tabindex="2">
                                    <span className={splitLocation[1] == "win" ? 'active activeNav' : "active"}><span  class="material-icons" >wine_bar</span></span>
                                    <p  style={{marginTop:'-8px'}} className={splitLocation[1] == "win" ? 'active activeNav' : "active"}>Win</p>
                                </div>
                            </Link>
                        </Col>
 
                        <Col>
                            <Link to='/mine' style={{ textDecoration: 'none' }}>
                                <div style={{ courser: 'pointer', color: 'black' }} tabindex="4">
                                    <span  className={splitLocation[1] == "mine" ? 'active activeNav' : "active"}><span class="material-icons">face</span></span>
                                    <p style={{marginTop:'-8px'}} className={splitLocation[1] == "mine" ? 'active activeNav' : "active"}>Mine</p>
                                </div>
                            </Link>
                        </Col>

                    </Row>
                </div>
                <h4 id="demo" className='demoNone'></h4>
            </div>
        </>


    )
}

export default Footer