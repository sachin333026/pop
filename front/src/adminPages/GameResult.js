import React from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import TableGameResult from '../adminComponent/TableGameResult';

function GameResult({baseUrl}) {
  return (
  <>
     <AdminBackNav/>
     <TableGameResult baseUrl={baseUrl} />
  </>
  )
}

export default GameResult