import React, { useEffect, useState } from 'react'
import MaterialTable from "material-table";
import { IoMdAddCircle } from 'react-icons/io';
import {  Form, Button, Container } from 'react-bootstrap';


const BandhanToken = ({ baseUrl }) => {

   

    const [bandhandata, setbandhandata] = useState({id:'',refid:'',pass:''})
    



    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "show/admin/Bandhantoken", requestOptions)
            .then(response => response.json())
            .then(result => {
                setbandhandata(result)
            })
            .catch(error => console.log('error', error));
    }, [])

    const HandShow = (e) => {
        const { name, value } = e.target

        setbandhandata((prastate) => ({
            ...prastate,
            [name]: value,
        }))
    }

   
 

    const Update = (e) => {

        e.preventDefault()

        const { } = bandhandata

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "add/UpdateBandhan", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result === 'Successfully') {
                    alert('Successfully Add')
                    // showPayment()
                    
                }
            })
            .catch(error => console.log('error', error));
    }
 

    return (
    <>   
           <div id='editDiv' style={{ display: 'block', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
              <h4 style={{textAlign:'center'}}>Bandhan Token Update</h4>
                <Container style={{ padding: "20px" }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Id" name='paymentHeading' value={bandhandata.id} onChange={HandShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Password" name='paymentContent' value={bandhandata.pass} onChange={HandShow} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="RefId" name='paymentContent' value={bandhandata.refid} onChange={HandShow} required />
                        </Form.Group>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              
                                        <Button variant="primary" style={{ width: '7rem' }} type="submit" onClick={(e) => Update(e)}>
                                            Save
                                        </Button>
                                 
                            </div>
                        </div>
                    </Form>
                </Container>
            </div>

        </>
    )
}

export default BandhanToken
