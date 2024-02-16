import React, {useState, useEffect} from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {Link} from 'react-router-dom'
import Footer from '../components/Footer';

const PrivacyPolicy = ({baseUrl}) => {
    const [PrivacyPolicy, setPrivacy] = useState([])


    useEffect(() => {
        
        showPrivacy();
    
      },[])
    
      const showPrivacy = async () => {
        const ress = await fetch(baseUrl+'show/privacy')
        const privacy = await ress.json();
        setPrivacy(privacy)
      }

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{marginLeft:'42px', color:'white'}}><IoMdArrowRoundBack size="2.0rem"/></Link></Navbar.Brand>
                    <Navbar.Brand >Privacy Policy</Navbar.Brand>
                </Navbar>
            </div>
                <div style={{ padding: '30px' }}>
                    {
                        PrivacyPolicy.map(PrivacyPolicy=>(
                            <p style={{ textAlign: 'justify' }}>
                           {PrivacyPolicy.privacyContent}
                        </p>
                        ))
                    }
                    </div>
                    

            <Footer/>
        </>
    )
}

export default PrivacyPolicy