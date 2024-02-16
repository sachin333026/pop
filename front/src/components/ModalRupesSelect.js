import React from 'react'
import { Modal, Button, Container } from 'react-bootstrap';
import '../App.css'


const ModalRupesSelect = (props) => {
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
                                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                </svg>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> Rupees {props.value}, Bid Added Successfully on {props.cardValue}</p>
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

export default ModalRupesSelect