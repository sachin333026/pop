import React from 'react'
import { Navbar, Col, Row } from 'react-bootstrap';
import styled from 'styled-components'
import { AiOutlineDoubleRight, AiFillHome, AiOutlineTrophy, AiOutlineSetting ,AiOutlineTransaction} from 'react-icons/ai';
import { BiUserCircle, BiLogOutCircle } from 'react-icons/bi';
import { FaGamepad } from 'react-icons/fa';
import { RiPagesLine } from 'react-icons/ri';
import { BsStar, BsWallet2 } from 'react-icons/bs';
import { MdPayments } from 'react-icons/md';
import { GoRequestChanges,GoReport } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DashBoard from '../adminComponent/DashBoard';

const AdminPage = ({baseUrl}) => {

    const navigate = useNavigate()

    const [click, setClick] = React.useState(false);
    const handleClick = () => setClick(!click);

    const logOutAdmin = () => {
        localStorage.removeItem('adtoken')
        navigate('/')
    }

    return (
        <>
            <div>
                <div>
                    <NavbarDiv bg="light" expand="lg" >

                        <Row>
                            <Col style={{ cursor: 'pointer', marginLeft: '2rem' }}>
                                <AiOutlineDoubleRight clicked={click} onClick={() => handleClick()} style={{ height: '4rem', width: '2.5rem' }} />
                            </Col>
                            <Col style={{ marginLeft: '3rem' }}>
                                <h4>Dashboard</h4>
                            </Col>
                        </Row>

                    </NavbarDiv>
                </div>

                {/* Side Bar */}

                <Containers>
                    <SidebarContainer className='adminSider'>
                        <SlickBar clicked={click}>

                        <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/user/management"
                            >
                                <BiUserCircle />
                                <Text clicked={click}>User Management</Text>
                            </Item>
                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/admin/report"
                            >
                                <GoReport />
                                <Text clicked={click}>Reports</Text>
                            </Item>


                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/admin/gamesettings"
                            >
                                <AiOutlineSetting />
                                <Text clicked={click}>Game Setting</Text>
                            </Item>
                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/admin/WithdrawalPayments"
                            >
                                <MdPayments />
                                <Text clicked={click}>Withdrawal List</Text>
                            </Item>
                            
                            <Item
                            onClick={() => setClick(true)}
                            activeClassName="active"
                            to="/admin/RechargePayments"
                        >
                            <MdPayments />
                            <Text clicked={click}>Recharge List</Text>
                        </Item>

                            <Item
                            onClick={() => setClick(true)}
                            activeClassName="active"
                            to="/admin/BandhanPayments"
                        >
                            <FaGamepad />
                            <Text clicked={click}>Bandhan Payment</Text>
                        </Item>
                        <Item
                        onClick={() => setClick(true)}
                        activeClassName="active"
                        to="/admin/BandhanToken"
                    >
                        <FaGamepad />
                        <Text clicked={click}>Bandhan Token</Text>
                    </Item>

                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/user/wallet"
                            >
                                <BsWallet2 />
                                <Text clicked={click}>Wallet</Text>
                            </Item>

                            <Item
                                onClick={() => setClick(true)}
                                exact
                                activeClassName="active"
                                to="/Order"
                            >
                                <AiFillHome />

                                <Text clicked={click}>Order</Text>
                            </Item>

                          
                           
                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/GameResult"
                            >
                                <BsStar />
                                <Text clicked={click}>Game Result</Text>
                            </Item>
                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/admin/Period"
                            >
                                <AiOutlineTrophy />
                                <Text clicked={click}>Period</Text>
                            </Item>
                           

                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/admin/transactions"
                            >
                                <AiOutlineTransaction />
                                <Text clicked={click}>Transaction</Text>
                            </Item>

                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/admin/ticket"
                            >
                                <GoRequestChanges />
                                <Text clicked={click}>Tickets</Text>
                            </Item>

                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/admin/RechargeSetting"
                            >
                                <AiOutlineSetting />
                                <Text clicked={click}>RechargeSetting</Text>
                            </Item>
                            <Item
                            onClick={() => setClick(true)}
                            activeClassName="active"
                            to="/admin/WithdrawSetting"
                        >
                            <AiOutlineSetting />
                            <Text clicked={click}>WithdrawSetting</Text>
                        </Item>
                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/GameRules"
                            >
                                <FaGamepad />
                                <Text clicked={click}>Game Notification</Text>
                            </Item>
                            
                            <Item
                                onClick={() => setClick(true)}
                                activeClassName="active"
                                to="/user/pages"
                            >
                                <RiPagesLine />
                                <Text clicked={click}>Pages</Text>
                            </Item>

                            <Item
                                onClick={() => logOutAdmin()}
                                activeClassName="active"
                                to="/admin/login"
                            >
                                <BiLogOutCircle />
                                <Text clicked={click}>Logout</Text>
                            </Item>
                        </SlickBar>
                    </SidebarContainer>
                </Containers>

                <DashBoard  baseUrl={baseUrl}/>

                {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ marginTop: '15rem', padding: '3rem' }}>
                        <h4>Welcome Dashboard </h4>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default AdminPage


const NavbarDiv = styled(Navbar)`
    box-shadow: 0px 0px 5px 1px #888888;
    height: 4rem
`;

const Containers = styled.div`
position: fixed;
.active {
  border-right: 4px solid var(--white);
  img {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
      brightness(103%) contrast(103%);
  }
}
`;


const SidebarContainer = styled.div`
background-color: var(--black);
width: 3.5rem;
margin-top: 1rem;
border-radius: 0 30px 30px 0;
padding: 1rem 0;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
position: relative;
`;


const SlickBar = styled.ul`
box-shadow: 0px 0px 5px 1px #888888;
color: var(--white);
list-style: none;
display: flex;
flex-direction: column;
align-items: center;
background-color: black;
padding: 1rem 0;
position: absolute;
top: 0rem;
left: 0;
width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
transition: all 0.5s ease;
border-radius: 0 30px 30px 0;
`;

const Item = styled(Link)`
text-decoration: none;
color: gray;
width: 100%;
padding: 1rem 0;
cursor: pointer;
display: flex;
padding-bottom: 0rem;
padding-left: 1rem;
&:hover {
  border-right: 4px solid var(--white);
  svg {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
      brightness(103%) contrast(103%);
  }
}
svg {

  width: 1.2rem;
  height: auto;
  filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
    brightness(78%) contrast(85%);
}
`;

const Text = styled.span`
width: ${(props) => (props.clicked ? "100%" : "0")};
overflow: hidden;
margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
transition: all 0.3s ease;
`;