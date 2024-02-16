import React, {useState, useEffect} from 'react'
import { Modal, Button, Container } from 'react-bootstrap';
import { URL } from '../Url';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
const Promotionapply = (props) => {
    const navigate = useNavigate()
    const [bonus, setBonus] = useState({amount: ''})

    const HandlShow = (e) => {
        const { name, value } = e.target

        setBonus((prastate) => ({
            ...prastate,
            [name]: value,
        }))
    }
    const applybonus = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        e.preventDefault()

        const { amount } = bonus
        var raw = JSON.stringify({
           amount
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(URL.API_BASE_URL+"show/user/applybonus", requestOptions)
            .then(response => response.json())
            .then(result => {
                //setpromo(result)
                if (result.mess === 'AmountGreaterthanBonus') {
                    toast.error('Bonus not enough, please reload page and try again', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }


                else if (result.mess === 'AmountLessthan100') {
                    toast.error('Bonus must greater than 100', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                
                else if (result.mess === 'AmountNotValid') {
                    toast.error('Enter a Valid Amount', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else if (result.mess === 'okk') {
                    toast.success('Bonus Successfully Added', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                   props.setMain({msg:"true"});
                   
                   props.onHide()
                }
                
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <div>
                <Container>
                    <Modal
                        {...props}
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header  style={{backgroundColor:'#e0e0e0' ,borderColor:'#e0e0e0',}}>
                            <Modal.Title id="contained-modal-title-vcenter"  style={{fontSize:'20px'}}>
                            Apply to Balance
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       <pre> <b for="amount" style={{fontSize:'17px',fontWeight:'500'}}>Amount  :  </b>
                        <input style={{outline: '0', borderWidth: '0 0 2px',borderColor: 'black'}} name="amount" placeholder='Bonus ₹' type="text" value={bonus.amount} onChange={HandlShow}   required /></pre>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{backgroundColor:'#FF5733',width:'70px',fontWeight:'400'}}  onClick={props.onHide}   >Cancel</Button>
                            <Button style={{backgroundColor:'#0288d1',width:'70px',fontWeight:'400'}} onClick={(e) => applybonus(e) }  >Apply</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
            
        </>
    )
}

export default Promotionapply