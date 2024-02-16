import React, {useState, useEffect} from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import {Container,Col,Row,Form,Button} from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';

function GameRules({ baseUrl }) {
  const [ruleC, setrules] = useState({
    rules:'', Id:''
  });
 
    const updateRule = (e) => {

        e.preventDefault()
        const { rules, Id} = ruleC
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          rules
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"update/rule/page", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Add', {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                }
                else {
                    toast.success('Not Successfully', {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                }
            })
            .catch(error => console.log('error', error));
    }

    const handRule = (e) => {
        const { name, value } = e.target

        setrules((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

  return (
    <>
        <AdminBackNav/>
        
        <div>
        
          <Container style={{maxWidth:"40rem",boxShadow:"10px 10px 5px gray",border:"2px solid gray",marginTop:"30px"}}>
            <Row>
            <Row style={{marginTop:"3rem"}}>
                    <Col xs s lg="3">
                    <h5>Page Name</h5>
                    </Col>
                    <Col>
                    <Form.Label><h5>Notification</h5></Form.Label>
                    </Col>
                 </Row>

                {/* row 2nd */}
                <Row style={{marginTop:"2rem"}}>
                <Col xs s lg="3">
                    <h5>Page Content</h5>
                    </Col>



                    <Col>
                    <textarea style={{width:"90%", height:"161px"}} onChange={(e) => handRule(e)} type="text" name='rules' value={ruleC.notice}/>
                    </Col>

                    
                </Row>
               
               {/* row 3rd */}
                <Row style={{marginTop:"2rem",marginBottom:"3rem"}}>
               
                    <Col>
                     <Button variant="outline-secondary" onClick={(e)=>updateRule(e)}>Submit</Button>{' '}
                    </Col>
                </Row>
           
            </Row>
               </Container>
         
          </div>
          <ToastContainer/>

    </>
  )
}

export default GameRules