import React, {useState, useEffect} from 'react'
import { Modal, Button, Container } from 'react-bootstrap';


const ModalReadRule = (props) => {
    const [gameRules, setRules] = useState([])
  
    useEffect(() => {
      showRules();
  
    },[])
  
    const showRules = async () => {
    
    }
    return (
        <>
            <div>
                <Container>
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Rule of Guess
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                        <p>30 Seconds 1 issue,  30 seconds to order, 10 seconds to show the lottery result. It opens all day. </p>
                        <p>The total number of trade is 2880 issues</p>
                        <p>If you spend 100 to trade, after deducting 5 service fee, your contract amount is 95</p>
                        <p>1. JOIN BLUE: if the result shows BLUE you will get (95*2) 190</p>
                        <p>2. JOIN RED: if the result shows RED you will get (95*2) 190</p>
                        <p>3. JOIN GREEN: if the result shows GREEN you will get (95*2) 190</p>

</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </>
    )
}

export default ModalReadRule