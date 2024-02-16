import React from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import TablePeriod from '../adminComponent/TablePeriod';

const Period = ({baseUrl}) => {
  return (
      <>
    <AdminBackNav/>

<TablePeriod  baseUrl={baseUrl}/>


    {/* <div style={{textAlign:'center', fontSize:'100px'}}>Period</div> */}
      </>
  )
}

export default Period