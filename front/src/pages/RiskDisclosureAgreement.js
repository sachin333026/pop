import React, {useState, useEffect} from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {Link} from 'react-router-dom'
import Footer from '../components/Footer';

const RiskDisclosure = ({baseUrl}) => {
    const [RoleRisk, setRole] = useState([])


    useEffect(() => {
        showRole();
    
      },[])
    
      const showRole = async () => {
        const ress = await fetch(baseUrl+'show/role')
        const role = await ress.json();
        setRole(role)
      }

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{marginLeft:'42px', color:'white'}}><IoMdArrowRoundBack size="2.0rem"/></Link></Navbar.Brand>
                    <Navbar.Brand >Risk Disclosure</Navbar.Brand>
                </Navbar>
            </div>
                <div style={{ padding: '30px' }}>
                    {
                        RoleRisk.map(RoleRisk=>(
                            <p style={{ textAlign: 'justify' }}>
                           {RoleRisk.roleContent}
                        </p>
                        ))
                    }
                    </div>
                    

            <Footer/>
        </>
    )
}

export default RiskDisclosure