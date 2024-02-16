import React from 'react'
import { Navbar, Col, Row } from 'react-bootstrap';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BiArrowBack} from 'react-icons/bi';

const AdminBackNav = () => {
    return (
        <>
                <NavbarDiv bg="light" expand="lg" >

                    <Row>
                        <Col style={{ cursor: 'pointer', marginLeft: '2rem' }}>
                            <Link to='/admin'>
                                <BiArrowBack style={{ height: '2rem', width: '2rem' }} />
                            </Link>
                        </Col>
                        <Col style={{ marginLeft: '3rem' }}>
                            <h4>Dashboard</h4>
                        </Col>
                    </Row>

                </NavbarDiv>
        </>
    )
}

export default AdminBackNav

const NavbarDiv = styled(Navbar)`
    box-shadow: 0px 0px 5px 1px #888888;
    height: 4rem
`;