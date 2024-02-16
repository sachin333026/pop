import React, {useState, useEffect} from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {Link} from 'react-router-dom'
import Footer from '../components/Footer';

const About = () => {
    const [About, setAbout] = useState([])


    useEffect(() => {
        showAbout();
    
      },[])
    
      const showAbout = async () => {
        const ress = await fetch('http://localhost:5000/show/about')
        const about = await ress.json();
        setAbout(about)
      }

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{marginLeft:'42px', color:'white'}}><IoMdArrowRoundBack size="2.0rem"/></Link></Navbar.Brand>
                    <Navbar.Brand >About</Navbar.Brand>
                </Navbar>
            </div>
                <div style={{ padding: '30px' }}>
                    {
                        About.map(About=>(
                            <p style={{ textAlign: 'justify' }}>
                           {About.aboutContent}
                        </p>
                        ))
                    }
                    </div>
                    

            <Footer/>
        </>
    )
}

export default About