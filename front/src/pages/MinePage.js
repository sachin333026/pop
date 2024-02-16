import React from 'react'
import MineDropdown from '../components/MineDropdown';
import Footer from '../components/Footer';
import MineNav from '../components/MineNav';


const MinePage = ({baseUrl, userData}) => {
    return (
        <>
           <MineNav baseUrl={baseUrl} userData={userData} />
            
            <MineDropdown/>

            <Footer/>
           
        </>
    )
}

export default MinePage