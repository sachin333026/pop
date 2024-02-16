import {useState,useEffect} from 'react'
import { Dropdown,Navbar, Nav } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { HiMenuAlt2 } from 'react-icons/hi';
import { BiRupee } from 'react-icons/bi';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import { URL } from '../Url';
import Promotion22 from '../pages/Promotion22';
import Promotionapply from '../pages/Promotionapply';
import Button from '@material-ui/core/Button';
import {Menu,MenuItem,MenuButton,MenuDivider} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const Promotion = ({baseUrl}) => {
   
    const [promo, setpromo] = useState([])
    const [bonuss, setBonus] = useState({})
    const [modalShow1, setModalShow1] = useState(false);
      useEffect(() => {
        showpromo();
       

      
     }, [bonuss])
      
    
  
     const bonus=promo.bonusbal;
     
     
    
        const showpromo = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(URL.API_BASE_URL+"show/user/Bonus", requestOptions)
            .then(response => response.json())
            .then(result => {
                setpromo(result)
              
            })
            .catch(error => console.log('error', error));
    }


    const applybonus = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(URL.API_BASE_URL+"show/user/applybonus", requestOptions)
            .then(response => response.json())
            .then(result => {
                setpromo(result)
               
               
            })
            .catch(error => console.log('error', error));
    }

     

     
 
     
    return (
        <>
           


                 <Navbar style={{fontWeight: '500',color :'white' ,backgroundColor:'#0288d1',height: '62px',paddingTop:'14px',paddingLeft:'20px'}}  >
                    <Link to='/mine' style={{ marginLeft: '20px', color: 'white' }}><IoMdArrowRoundBack size="2.0rem" /></Link> 
                    <span style={{ marginLeft: '20px' }}>Promotion</span>  
                    <div
                     style={{ display: 'flex', justifyContent: 'flex-end', width: '85vw' }}>
                    </div>
                 <div style={{ color: 'white', marginRight: '30px', cursor: 'pointer' }}>
                    <span>
                    <div>

                      <Menu  direction="left"    menuButton={<i className="material-icons" style={{borderRadius:'0px',display:'flex',alignItems:'left'}}>subject</i>}>
            <MenuItem>
            <Link to='/BonusRecord' style={{textDecoration:'none',padding: '2px 0px',alignItems:'left',textAlign:'left',
                position: 'relative',
                textAlign: 'left',color:'black'}}> Bonus Record  </Link> 
            
            </MenuItem>
            <MenuItem>
            <Link to='/ApplyRecord' style={{textDecoration:'none',padding: '2px 0px',
            position: 'relative',
            textAlign: 'left',color:'black'}}>Apply Record</Link> 
            </MenuItem>
        </Menu>
                      </div>
                     </span>
                 </div>
                    </Navbar>   
      
            <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '1.80rem' }}>Bonus: ₹ {bonus}</span>
                    </div>
                    <div>
                        <Button  onClick={() => setModalShow1(true)} style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',  textTransform: "none",borderRadius:'3px',width: '', marginTop: '15px',backgroundColor:'#0288d1',fontWeight:'530',height:'2.5rem',fontSize:'14px',color:'white',padding:'10px',alignItems:'center' }}  type="submit">
                            Apply to Balance
                        </Button>
                    </div>
                </div>
            </div>
 
     
    <Promotion22 Level1={promo.lvl1p} Level1c={promo.lvl1amt} Level2={promo.lvl2p} Level2c={promo.lvl2amt}/>
    <Promotionapply
                setMain={setBonus}
                show={modalShow1}
                onHide={() => setModalShow1(false)}
            />




      <div style={{padding:'20px' ,marginTop:'15px'}}>
<label style={{color:'#0288d1' ,fontWeight:'bold',fontFamily:'Arail'}}>My Promotion Code</label><p>
<input style={{marginBottom:'5px',marginTop:'4px',outline: '0', borderWidth: '0 0 1px',borderColor: 'black',width:'100%'}}  type="text"  value={promo.code} readOnly  required /></p>

         
<label style={{color:'#0288d1',fontWeight:'bold',fontFamily:'Arail'}}>My Promotion Link</label>
<input style={{marginTop:'5px',outline: '0', borderWidth: '0 0 1px',borderColor: 'black',width:'100%'}}  type="text"    value={window.location.href+"/register?c="+promo.code}  readOnly  required />
</div>

<div class="col-md-12 text-center">    
       
      <Button  component={Link} to={"register?c="+promo.code} style={{ position: 'relative',width: '10rem',height:'2.20rem', marginTop: '20px' ,backgroundColor:'#DCDCDC',fontWeight:'500',fontSize:'15px',borderRadius:'3px',color:'black'}}  type="submit">
                            Open Link
                        </Button> </div>
 
                        
            <Footer />
        </>
    )
    }
 

export default Promotion

 