import React, { useEffect, useState } from 'react'
import MaterialTable from "material-table";
import { IoMdAddCircle } from 'react-icons/io';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';


const BandhanPayments = ({ baseUrl }) => {

    const [userPaymentInfo, setUserPaymentInfo] = useState({
        Id: '', paymentHeading: '', paymentContent: '', paymentImage: '', status: '', dateTime: new Date(), showImga: ''
    })

    const [paymentEditData, setPaymentEditData] = useState({
        Id: '', paymentHeading: '', paymentContent: '', paymentImage: '', status: '', showImga: ''
    })

    const [paymentInfo, setPaymentInfo] = useState([])
    const [paymentImg, setPaymentImg] = useState('')




    useEffect(() => {
        // showPayment();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "show/admin/BandhanPayment", requestOptions)
            .then(response => response.json())
            .then(result => {
                setPaymentInfo(result)
            })
            .catch(error => console.log('error', error));
    }, [])

 


 

     

   
     
   

    

    return (
        <>

          

            <div style={{ padding: '30px', display: 'block' }} id='divTable' >

                <MaterialTable
                    title="Payment"
                    options={{
                        paging:true,
                        pageSize:10,       // make initial page size
                        emptyRowsWhenPaging: false,   // To avoid of having empty rows
                        pageSizeOptions:[10,15,20],    // rows selection options
                      }}
                    columns={[
                        { title: 'ID', field: 'Id' },
                        { title: 'Date', field: 'Date' },
                        { title: 'Name', field: 'NAME' },
                        { title: 'Account', field: 'ACCOUNT' },
                        { title: 'Ifsc', field: 'IFSC' },
                        { title: 'Amount', field: 'AMOUNT' },
                        { title: 'Utr', field: 'UTR' },
                        { title: 'Upi', field: 'Upi' },

                    ]}

                    data={paymentInfo?.data}

            
                />
            </div>
            

        </>
    )
}

export default BandhanPayments
