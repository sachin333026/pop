import React, {useState, useEffect} from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {Link} from 'react-router-dom'
import Footer from '../components/Footer';

const Terms = ({baseUrl}) => {
    const [TermsCondition, setTerms] = useState([])


    useEffect(() => {
        showTerms();
      },[])
    
      const showTerms = async () => {
        const ress = await fetch(baseUrl+'show/terms')
        const terms = await ress.json();
        setTerms(terms)
      
      }

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{marginLeft:'42px', color:'white'}}><IoMdArrowRoundBack/></Link></Navbar.Brand>
                    <Navbar.Brand >Terms & Condition</Navbar.Brand>
                </Navbar>
            </div>
                <div style={{ padding: '30px' }}>
                    {
                        TermsCondition.map(TermsCondition=>(
                            <p style={{ textAlign: 'justify' }}>
                           {TermsCondition.termsContent}
                        </p>
                        ))
                    }
                    </div>
                    

            <Footer/>
        </>
    )
}

export default Terms