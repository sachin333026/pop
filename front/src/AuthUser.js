import React, { useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';


const AuthUser = ({cmp, baseUrl, userData, userBalance, userName}) => {

    const navigate = useNavigate();

    let Cmp = cmp;

    useEffect(() => {
         
        if(!localStorage.getItem('token')){
            navigate('/')
        }



    }, [])

    return (
        <>
            <Cmp  baseUrl={baseUrl} userData={userData} userBalance={userBalance} userName={userName}/>
        </>
    )
}

export default AuthUser