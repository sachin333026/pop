import React, { useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';

const AuthAdmin = ({cmp, baseUrl}) => {
    const navigate = useNavigate();

    let Cmp = cmp;

    useEffect(() => {
         
        if(!localStorage.getItem('adtoken')){
            navigate('/admin/login')
        }
    }, [])

  return (
    <>
         <>
            <Cmp  baseUrl={baseUrl}/>
        </>
    </>
  )
}

export default AuthAdmin