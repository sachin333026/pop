import React, {useState, useEffect} from 'react'
import MaterialTable from "material-table";
const TableOrders = ({baseUrl}) => {

    const [order, setorder] = useState([])

    useEffect(() => {
       

  


        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(baseUrl + "showOrder", requestOptions)
          .then(response => response.json())
          .then(result => {
            setorder(result.reverse())
           
          })
          .catch(error => console.log('error', error));
    
      },[])
     

     

    return (
        <>
        
        <div style={{padding:'0px'}} id="table">

            <MaterialTable
                title=""
                options={{
                  paging:true,
                  pageSize:10,       // make initial page size
                  emptyRowsWhenPaging: false,   // To avoid of having empty rows
                  pageSizeOptions:[10,15,20],    // rows selection options
                }}
                columns={[
                    { title: 'OrderID',field:'Id', type: 'numeric' },
                    { title: 'UserID',field:'UserId' },
                    { title: 'Time',field:'time' },
                    { title: 'CardType', field: 'cardtype'},
                    { title: 'Amount', field: 'amount'},
                    { title: 'Period',field:'Period' },
                    { title: 'UserName',field:'userName'},
                ]}
                data={order}
             
            />
        </div>
               
        </>
    )
}

export default TableOrders
