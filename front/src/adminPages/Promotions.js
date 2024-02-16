import React from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import TablePromo from '../adminComponent/TablePromo';

function Promotions({baseUrl}) {
  return (
  <>
     <AdminBackNav/>
     <TablePromo baseUrl={baseUrl} />
  </>
  )
}

export default Promotions