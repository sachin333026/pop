import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Stack, Button, Form } from 'react-bootstrap';
import { BiRupee } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const MineNav = ({ baseUrl }) => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('token');
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + userToken);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "showUserAdmin", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.mess === "user not Found" || result?.message === "Authorization required") {
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    setUserData(result);
                }
            })
            .catch(error => console.log('error', error));

        return () => { };
    }, []);

    const logOutUser = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <div className="header-container">
                <span style={{ color: 'white', fontSize: '20px', fontWeight: '500' }}>Mine</span>
            </div>

            <div className="user-details-container">
                {userData && userData?.map((val, index) => (
                    <div key={index} className="user-details">
                        <div>
                            <span>ID:</span><span>{val.userId}</span>
                        </div>
                        <div>
                            <span>Mobile:</span><span>+91{val.userMobile}</span>
                        </div>
                        <div>
                            <span>Nick Name:</span><span>{val.userNickName}</span>
                        </div>
                        <div>
                            <span>Available balance:</span><span>₹ {val.userBalance}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MineNav;
