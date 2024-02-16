import React, { useState } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import TableWin from '../components/TableWin';
import Footer from '../components/Footer';
import AllTableWin from '../components/AllTableWin';

const History = ({ baseUrl }) => {

  
  return (
    <>
         
 


      {
         <AllTableWin baseUrl={baseUrl}/>  
           
      }

      <Footer />
    </>
  )
}

export default History