import React from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import TableSetting from '../adminComponent/TableSetting';

function RechargeSetting({baseUrl}) {
  return (
  <>
     <AdminBackNav/>
     <TableSetting baseUrl={baseUrl} />
  </>
  )
}

export default RechargeSetting