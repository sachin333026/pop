import React from 'react'
import {Button,   Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdReorder, MdCardGiftcard, MdAccountBalanceWallet } from 'react-icons/md';
import { RiBankCardLine } from 'react-icons/ri';
import { FaRegAddressCard } from 'react-icons/fa';
import { SiSpringsecurity} from 'react-icons/si';
import { BiCommentDetail} from 'react-icons/bi';
import { BsInfoCircle} from 'react-icons/bs';
import { MdLogout} from 'react-icons/md';
import {FaTicketAlt} from 'react-icons/fa';
import {AiFillSetting} from 'react-icons/ai';
import styled from 'styled-components'
import './Footer.css';
import { useNavigate } from 'react-router-dom';
function MineDropdown() {
    const navigate = useNavigate()
    const logOutUser = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <>
    <div style={{ display:'block',margin:'0',color: 'rgba(0,0,0,.87)'}}>

                    

 
    <div  style={{ marginTop:'0.50rem',width: '100%',height:'2.5rem'}} >
        <Dropdown >
            <Dropdown.Toggle style={{textDecoration:'none',display:'flex',backgroundColor:'white', color:'black',width: '100%',border:'none'}}     >
                
            <span style={{textDecoration:'none',color:'rgba(0,0,0,.54)',padding:'0 0.50rem',paddingRight:'1.5rem'}} class="material-icons">account_balance_wallet</span> Wallet
            </Dropdown.Toggle>

            <Dropdown.Menu   style={{width: '100%' }}>
            <Dropdown.Item >  
                   <Link to='/recharge' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}> Recharge</Link>
                </Dropdown.Item > 
                <Dropdown.Item > <Link to='/withdrawal' style={{width:'100%',display: 'inline-block',display: 'inline-block',color:'black', textDecoration:'none'}}>Withdrawal</Link></Dropdown.Item>
                {/* <Dropdown.Item > <Link to='/transactions' style={{color:'black', textDecoration:'none'}}>Transactions</Link></Dropdown.Item> */}
                
            </Dropdown.Menu>
        </Dropdown>
    </div>

    <div style={{ width: '100%',height:'2.5rem'}} >
        <Dropdown>
            
            <Link to='/add/bank' style={{backgroundColor:'white',color:'black', textDecoration:'none'}}><Dropdown.Toggle style={{display:'flex',backgroundColor:'white', width: '100%', textAlign: 'inherit',color:'black' ,border:'none'}} ><span  style={{color:'rgba(0,0,0,.54)',padding:'0 0.50rem',paddingRight:'1.5rem'}} class="material-icons">credit_card</span> Bank Card
            </Dropdown.Toggle></Link>
        </Dropdown>
    </div>

    <div style={{ width: '100%',height:'2.5rem'}} >
        <Dropdown>
        <Link to='/promotion' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}><Dropdown.Toggle style={{ border:'none',display:'flex',width: '100%', textAlign: 'inherit' ,backgroundColor:'white',color:'black'}} id="dropdown-button-dark-example1" variant="light">
                
        <span  style={{color:'rgba(0,0,0,.54)',padding:'0 0.50rem',paddingRight:'1.5rem'}}  class="material-icons">redeem</span> Promotion
            </Dropdown.Toggle></Link>
        </Dropdown>
    </div>
     {/* <div style={{ marginTop: '15px' }}>
        <Dropdown>
            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                
            <MdCardGiftcard/> Promotion
           
            <Dropdown.Menu variant="light" style={{ width: '98vw' }}>
                
                <Dropdown.Item > <Link to='/promorRecord' style={{color:'black', textDecoration:'none'}}> Promotion Record</Link></Dropdown.Item>
                <Dropdown.Item > <Link to='/BonusRecord'style={{color:'black', textDecoration:'none'}}> Bonus Record</Link></Dropdown.Item>
                <Dropdown.Item > <Link to='/ApplyRecord' style={{color:'black', textDecoration:'none'}}> Apply Record</Link></Dropdown.Item>
                 
            </Dropdown.Menu> </Dropdown.Toggle>
        </Dropdown>
    </div> */}


    


    <div style={{ width: '100%',height:'2.5rem'}} >
        <Dropdown>
  
                
                <Link to='/reset/password' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}>          <Dropdown.Toggle style={{border:'none', display:'flex',width: '100%', textAlign: 'inherit' ,backgroundColor:'white',color:'black'}} id="dropdown-button-dark-example1" variant="light"><span  style={{padding:'0 0.50rem',color:'rgba(0,0,0,.54)',paddingRight:'1.5rem',paddingRight:'1.5rem'}}  class="material-icons">security</span> Reset Password
            </Dropdown.Toggle></Link>
        </Dropdown>
    </div>


   

 

    
    <div style={{ width: '100%',height:'2.5rem'}} >
        <Dropdown >
            <Dropdown.Toggle style={{ display:'flex',backgroundColor:'white', color:'black',width: '100%', textAlign: 'inherit' ,border:'none'}}    >
                
            <span  style={{color:'rgba(0,0,0,.54)',padding:'0 0.50rem',paddingRight:'1.5rem'}}  class="material-icons">speaker_notes</span> Complaints
            </Dropdown.Toggle>

            <Dropdown.Menu  variant="light" style={{ width: '100%' }}>
            <Dropdown.Item >  
                   <Link to='/user/ticket' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}> Create Complaint</Link>
                </Dropdown.Item > 
                <Dropdown.Item > <Link to='/ComplaintsSuggestions' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}>Check Complaint Status</Link></Dropdown.Item>
                {/* <Dropdown.Item > <Link to='/transactions' style={{color:'black', textDecoration:'none'}}>Transactions</Link></Dropdown.Item> */}
                
            </Dropdown.Menu>
        </Dropdown>
    </div>


    <div style={{ width: '100%',height:'2.5rem'}} >
        <Dropdown >
            <Dropdown.Toggle style={{ border:'none',display:'flex',width:'100%',backgroundColor:'white',color:'black'}} id="dropdown-button-dark-example1" variant="light">
                
            <span  style={{color:'rgba(0,0,0,.54)',padding:'0 0.50rem',paddingRight:'1.5rem'}} class="material-icons">feedback</span> About
            </Dropdown.Toggle>

            <Dropdown.Menu variant="light" style={{ width: '100%' }}>
                <Dropdown.Item>
                   
                    <Link to='/terms/condition' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}> Terms & Conditions</Link>
                </Dropdown.Item>
                <Dropdown.Item > <Link to='/privacy/policy' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}> policy</Link></Dropdown.Item>
                <Dropdown.Item > <Link to='/RiskDisclosure' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}> RiskDisclosure</Link></Dropdown.Item>
                <Dropdown.Item > <Link to='/about' style={{width:'100%',display: 'inline-block',color:'black', textDecoration:'none'}}>  About us</Link></Dropdown.Item>
               
            </Dropdown.Menu>
        </Dropdown>
    </div>
 
    <div style={{ width: '100%',height:'2.5rem'}} >
        <Dropdown>
           <Dropdown.Toggle onClick={(e) => logOutUser()} style={{border:'none', display:'flex',width: '100%', textAlign: 'inherit' ,backgroundColor:'white',color:'black'}} id="dropdown-button-dark-example1" variant="light"><span  style={{padding:'0 0.50rem',color:'rgba(0,0,0,.54)',paddingRight:'1.5rem',paddingRight:'1.5rem'}}  class="material-icons">logout</span> Logout
            </Dropdown.Toggle>
        </Dropdown>
    </div>
    
  
  
</div>

       
    </>
  )
}

export default MineDropdown


 