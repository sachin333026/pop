import React  from 'react'
import TableCom from '../adminComponent/TableCom';
import AdminBackNav from '../adminComponent/AdminBackNav';

// import { Link } from "react-router-dom"

const UserManagement = ({baseUrl}) => {
 


  return (
    <>
      <AdminBackNav />
      <TableCom baseUrl={baseUrl}/>
    </>
  )
}

export default UserManagement

