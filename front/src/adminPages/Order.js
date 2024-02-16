import React from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import TableOrders from '../adminComponent/TableOrders';

function Promotions({baseUrl}) {

  
  return (
  <>
     <AdminBackNav/>
     <TableOrders  baseUrl={baseUrl} />
  </>
  )
}
 
export default Promotions