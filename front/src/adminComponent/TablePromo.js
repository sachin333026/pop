import React, { useState, useEffect } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdAddCircle } from 'react-icons/io';
import MaterialTable from "material-table";
const TablePromo = ({baseUrl}) => {
    const [Addpromotion, setaddpromo] = useState({
        promoCode: '', promoDes: '', validity: '', promoStatus: ''
    })
    const [userPromoData, setPromoEditData] = useState({
        promoId: '', promoCode: '', promoDes: '', validity: '', promoStatus: ''
    })

    const [promo, setpromo] = useState([])

    useEffect(() => {

        // showpromo();
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch( baseUrl+"show/admin/Promo", requestOptions)
            .then(response => response.json())
            .then(result => {
                setpromo(result)
            })
            .catch(error => console.log('error', error));

    }, [])

    const showPromo = () => {
        document.querySelector("#addPromo").style.display = "block";
        document.querySelector("#promoTable").style.display = "none";
    };
    const hidePromo = () => {
        document.querySelector("#addPromo").style.display = "none";
        document.querySelector("#promoTable").style.display = "block";
    };

    const handleShow = (e) => {
        const { name, value } = e.target

        setaddpromo((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    const handShow = (e) => {
        const { name, value } = e.target

        setPromoEditData((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }
    const showpromo = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl+"show/admin/Promo", requestOptions)
            .then(response => response.json())
            .then(result => {
                setpromo(result)
            })
            .catch(error => console.log('error', error));
    }

    const addPromo = (e) => {
        e.preventDefault()
        const { promoCode, promoDes, validity, promoStatus } = Addpromotion
     
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "Cookie_1=value");

        var raw = JSON.stringify({
            promoCode, promoDes, validity, promoStatus
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"promo", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result === 'Successfully') {
                    toast.success('Successfully Add', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    hidePromo()
                    showpromo()
                }
            })
            .catch(error => console.log('error', error));
    }

    const editPromo = (val, rowData) => {

        if (val === 'edit') {
            document.getElementById('editDiv').style.display = 'block';
            document.getElementById('promoTable').style.display = 'none';
        }

        if (val === 'cencel') {
            document.getElementById('editDiv').style.display = 'none';
            document.getElementById('promoTable').style.display = 'block';
        }
        setPromoEditData({
            promoId: rowData.Id, promoCode: rowData.promoCode, promoDes: rowData.promoDes, validity: rowData.validity, promoStatus: rowData.promoStatus
        })
      
    }

    const editPromoData = () => {
        const { promoId, promoCode, promoDes, validity, promoStatus } = userPromoData
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            promoId, promoCode, promoDes, validity, promoStatus
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"edit/promotion", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Edit', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    document.getElementById('editDiv').style.display = 'none';
                    document.getElementById('promoTable').style.display = 'block';
                    showpromo()
                }
            })
            .catch(error => console.log('error', error));
    }

    const removePromo = (Id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            Id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"remove/promotion", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Remove', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    showpromo()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div style={{ marginLeft: "2rem", marginTop: "2rem", display: "flex" }}>
                <IoMdAddCircle style={{ width: "2rem", height: "2rem" }} onClick={() => showPromo()} />
                <span style={{ marginLeft: "0.7rem", fontSize: "1.5rem" }}>Add Promotions</span>
            </div>


            <div style={{ padding: '30px', display: "block" }} id="promoTable">

                <MaterialTable
                    title="Promotion"
                    options={{
                        paging:true,
                        pageSize:10,       // make initial page size
                        emptyRowsWhenPaging: false,   // To avoid of having empty rows
                        pageSizeOptions:[10,15,20],    // rows selection options
                      }}
                    columns={[
                        // { title: 'Promotion ID', field: 'Id', type: 'numeric' },
                        { title: 'Promotion Code', field: 'promoCode' },
                        { title: 'Promotion Description', field: 'promoDes' },
                        { title: 'Validity', field: 'validity' },
                        { title: 'Status', field: 'promoStatus' },

                    ]}
                    data={promo}
                    actions={[
                        // {
                        //     icon: 'save',
                        //     tooltip: 'Save User',
                        //     onClick: (event, rowData) => alert("You saved " + rowData.name)
                        // },
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => editPromo('edit', rowData)
                        },
                        {
                            icon: 'remove',
                            tooltip: 'Remove Code',
                            onClick: (event, rowData) => removePromo(rowData.Id)
                        }
                    ]}
                />
            </div>

            <div id='addPromo' style={{ display: "none" }} >
                <div style={{ border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 29px 1px #888888", margin: "30px" }}>
                    <Container style={{ padding: "20px" }}>
                        <Form>
                            <Form.Group className="mb-3"    >
                                <Form.Label>Promotion Code</Form.Label>
                                <Form.Control type="text" name="promoCode" value={Addpromotion.promoCode} placeholder="Enter code" onChange={(e) => handleShow(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Promotion Description</Form.Label>
                                <Form.Control type="text" name="promoDes" placeholder="Describe" value={Addpromotion.promoDes} onChange={(e) => handleShow(e)} />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Validty</Form.Label>
                                        <Form.Control type="date" name="validity" value={Addpromotion.validity} onChange={(e) => handleShow(e)} />
                                    </Form.Group></Col>
                                <Col>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select aria-label="Default select example" name="promoStatus" value={Addpromotion.promoStatus} onChange={(e) => handleShow(e)}>
                                        <option value="Enable">Enable</option>
                                        <option value="Disable">Disable</option>
                                    </Form.Select>
                                </Col>
                            </Row>


                            <Row>
                                <Col>
                                    <Button variant="secondary" onClick={() => hidePromo()}>Back</Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" onClick={(e) => addPromo(e)}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Container>
                </div>
            </div>

            <div id='editDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
                <Container style={{ padding: "20px" }}>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label>Promotion Code</Form.Label>
                            <Form.Control type="name" onChange={(e) => handShow(e)} name='promoCode' value={userPromoData.promoCode} placeholder="Enter Promotion Code" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Promotion Description</Form.Label>
                            <Form.Control type="text" onChange={(e) => handShow(e)} name='promoDes' value={userPromoData.promoDes} placeholder="Promotion Description" />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Validity</Form.Label>
                                    <Form.Control type="date" onChange={(e) => handShow(e)} name='validity' value={userPromoData.validity} placeholder=" Validity" />
                                </Form.Group>    </Col>
                            <Col> <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => handShow(e)} name='promoStatus' value={userPromoData.promoStatus}>
                                    <option>Select</option>
                                    <option value="Enable">Enable</option>
                                    <option value="Disable">Disable</option>
                                </Form.Select>
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button variant="secondary" onClick={() => editPromo('cencel')}>Back</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={() => { editPromoData() }}>Save</Button>
                            </Col>
                        </Row>

                    </Form>
                </Container>
            </div>
            <ToastContainer/>
        </>
    )
}


export default TablePromo
