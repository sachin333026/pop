import React from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import TableSettingwd from '../adminComponent/TableSettingwd';

function WithdrawSetting({baseUrl}) {
  return (
  <>
     <AdminBackNav/>
     <TableSettingwd baseUrl={baseUrl} />
  </>
  )
}

export default WithdrawSetting