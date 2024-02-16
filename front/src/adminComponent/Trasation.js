
import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
import AdminBackNav from './AdminBackNav';

function Trasation({baseUrl}) {
    const [Tansaction, setTansaction] = useState([])



    useEffect(() => {
        showTansaction();
    }, [])

    const showTansaction = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "alltransaction", requestOptions)
            .then(response => response.json())
            .then(result => {
                setTansaction(result)
            })
            .catch(error => console.log('error', error));
    }




    return (
     
            <>
                    <AdminBackNav />
                <div style={{ padding: '30px' }}>

                    <MaterialTable
                        title="Transaction"
                        options={{
                            paging:true,
                            pageSize:20,       // make initial page size
                            emptyRowsWhenPaging: false,   // To avoid of having empty rows
                            pageSizeOptions:[20,50,100],    // rows selection options
                          }}
                        columns={[
                            // { title: 'OrderID', field: 'Id', type: 'numeric' },
                            { title: 'Name', field: 'name' },
                            { title: 'Wallet Id', field: 'wallet_id' },
                            { title: 'form_id', field: 'form_id' },
                            { title: 'to_id', field: 'to_id' },
                            { title: 'Amount', field: 'amount' },
                            { title: 'previous_balance', field: 'previous_balance' },
                            { title: 'current_balance', field: 'current_balance' },
                            { title: 'transaction_id', field: 'transaction_id' },
                            { title: 'type', field: 'type' },
                            { title: 'status', field: 'status' },
                            { title: 'created_at', field: 'created_at' },
                        ]}
                        data={Tansaction?.data}
                        // actions={[
                        //     {
                        //         icon: 'remove',
                        //         tooltip: 'Remove Order',
                        //         onClick: (event, rowData) => removeOrder(rowData.Id)
                        //     }
                        // ]}
                    />
                </div>

            </>



    )
}

export default Trasation