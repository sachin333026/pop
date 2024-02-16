import React, { useState, useEffect } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import MaterialTable from "material-table";
const TableSetting = ({baseUrl}) => {
    const [Editsettings, seteditsettings] = useState({
        id: '', name: '', upi: ''
    })
    const [addsettings, setaddsettings] = useState({
         name: '', upi: ''
    })
    const [settings, setsettings] = useState([])

    useEffect(() => {

         showstable();
        

    }, [])


    const showstable = () => {

    var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "show/admin/setting", requestOptions)
            .then(response => response.json())
            .then(result => {
                setsettings(result)
            })
            .catch(error => console.log('error', error));

        }



    const showSettings = () => {
        document.querySelector("#addSetting").style.display = "block";
        document.querySelector("#settingTable").style.display = "none";
    };
    const hideSettings = () => {
        document.querySelector("#addSetting").style.display = "none";
        document.querySelector("#settingTable").style.display = "block";
    };

    const handleShow = (e) => {
        const { name, value } = e.target

        seteditsettings((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }
    const handleShow2 = (e) => {
        const { name, value } = e.target
         
        setaddsettings((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    let bhaiya;
   
    const block = (a,b) => {
        if(a==0)
        {
             bhaiya=1;
        }
        else
        {
             bhaiya=0;
        }
        var raw = JSON.stringify({bhaiya,b});
         
        
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow", };
        fetch(baseUrl+"channelSet", requestOptions)
            .then((response) => response.json())
            .then(result => {
                if (result.mess === 'success') {
                    toast.success('Successfully', {
                        position: "top-right",
                        autoClose: 100,
                       
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        });
                        showstable()
                    }
                if (result.mess === 'fail') {
                            toast.success('Failed', {
                                position: "top-right",
                                autoClose: 100,

                                hideProgressBar: false,
                                closeOnClick: true,
                                draggable: true,
                                progress: undefined,
                                });
                }
            })

            
        }
    // const showsettings = async () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Cookie", "Cookie_1=value");

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch(baseUrl+"show/admin/setting", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             setsettings(result)
    //         })
    //         .catch(error => console.log('error', error));
    // }

    const addSetting = (e) => {
        e.preventDefault()
        const {name, upi } = addsettings
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "Cookie_1=value");

        var raw = JSON.stringify({
             name, upi
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"settings", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Added', {
                        position: "top-right",
                        autoClose: 1000,
                       
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        });
                        hideSettings()
                        showstable()
                    }

                    else if (result.mess === 'NE') {
                        toast.error('Please Enter All Details', {
                            position: "top-right",
                            autoClose: 1000,
                           
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                            });
                          
                        }
                   
                 
            })
            .catch(error => console.log('error', error));
    }

    const editSettings = (val, rowData) => {

        if (val === 'edit') {
            document.getElementById('editDiv').style.display = 'block';
            document.getElementById('settingTable').style.display = 'none';
        }

        if (val === 'cencel') {
            document.getElementById('editDiv').style.display = 'none';
            document.getElementById('settingTable').style.display = 'block';
        }
        seteditsettings({
            id: rowData.id, name: rowData.channelname, upi: rowData.upi
        })
      
    }

    const editSettingData = (e) => {
        e.preventDefault()
        const {id,name,upi} = Editsettings
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            id ,name,upi });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"edit/settings", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Edited', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    document.getElementById('editDiv').style.display = 'none';
                    document.getElementById('settingTable').style.display = 'block';
                    showstable()
                } else {
              
                }
            })
            .catch(error => console.log('error', error));
    }

    const removeSettings = (settingsId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            settingsId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"remove/settings", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    alert('Successfully Remove')
                    // showsettings()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div style={{ marginLeft: "2rem", marginTop: "2rem", display: "flex" }}>
                <IoMdAddCircle style={{ width: "2rem", height: "2rem" }} onClick={() => showSettings()} />
                <span style={{ marginLeft: "0.7rem", fontSize: "1.5rem" }}>Add Channel</span>
            </div>


            <div style={{ padding: '30px', display: "block" }} id="settingTable">

                <MaterialTable
                    title="Recharge Channel"
                    options={{
                        paging:true,
                        pageSize:10,       // make initial page size
                        emptyRowsWhenPaging: false,   // To avoid of having empty rows
                        pageSizeOptions:[10,15,20],    // rows selection options
                      }}
                    columns={[
                        // { title: 'Calling Number', field: 'callNumber' },
                        // { title: 'Whatsapp Number', field: 'wpNumber' },
                        // { title: 'Name', field: 'name' },
                        // { title: 'Email', field: 'email' },
                        // { title: 'UPI Id', field: 'upiId' },

                        { title: 'Channel Name', field: 'channelname' },
                        { title: 'Upi ID', field: 'upi' },
                        { title: 'Total Recharge', field: 'totalrc' },
                        {
                            title: "Status",
                            editable: true,

                            
                           
                            render: (rowData) =>
                              rowData.Status==0?(
                                <Button
                                style={{color:'red',color:'white',background:rowData.Status==0?"green":"red",content:'ddd' }}   
                                onClick={(e) =>{block(rowData.Status,rowData.id)}}
                                >
                                  
                                   Enabled
                                  {/* <AddIcon /> */}
                                </Button>
                              ):(
                                <Button
                                style={{color:'red',color:'white',background:rowData.Status==0?"green":"red",content:'ddd' }}   
                                onClick={(e) =>{block(rowData.Status,rowData.id)}}
                                >
                                  
                                     Disabled
                                  {/* <AddIcon /> */}
                                </Button>
                              )
                          }
                    ]}
                    data={settings}
                    actions={[
                      
                        {
                            icon: 'edit',
                            tooltip: 'Edit Settings',
                            onClick: (event, rowData) => editSettings('edit', rowData)
                        }
                        // ,
                        // {
                        //     icon: 'remove',
                        //     tooltip: 'Remove Settings',
                        //     onClick: (event, rowData) => removeSettings(rowData.Id)
                        // }
                    ]}
                />
            </div>

            <div id='addSetting' style={{ display: "none" }} >
                <div style={{ border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 29px 1px #888888", margin: "30px" }}>
                    <Container style={{ padding: "20px" }}>
                        <Form>
                        <Form.Group className="mb-3">
                                        <Form.Label>Channel Name</Form.Label>
                                        <Form.Control type="text" name="name"    value={addsettings.name} onChange={(e) => handleShow2(e)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Upi</Form.Label>
                                        <Form.Control type="text" name="upi"   value={addsettings.upi} onChange={(e) => handleShow2(e)} />
                                    </Form.Group>
  
                            <Row>
                                <Col>
                                    <Button variant="secondary" onClick={() => hideSettings()}>Back</Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" onClick={(e) => addSetting(e)}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Container>
                </div>
            </div>

            <div id='editDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
                <Container style={{ padding: "20px" }}>
                <Form>

                <Form.Group className="mb-3">
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" name="id" value={Editsettings.id} onChange={(e) => handleShow(e)} />
            </Form.Group>
                        <Form.Group className="mb-3">
                                        <Form.Label>Channel Name</Form.Label>
                                        <Form.Control type="text" name="name" value={Editsettings.name} onChange={(e) => handleShow(e)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Upi</Form.Label>
                                        <Form.Control type="text" name="upi" value={Editsettings.upi} onChange={(e) => handleShow(e)} />
                                    </Form.Group>
                            <Row>
                                <Col>
                                    <Button variant="secondary" onClick={() => hideSettings()}>Back</Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" onClick={(e) =>editSettingData(e)}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                </Container>
            </div>
        </>
    )
}


export default TableSetting
