
import React, { Component, useEffect, useState } from "react";
import { Card, Row, Form, Col,  Button } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify";
import AdminBackNav from '../adminComponent/AdminBackNav';

function Gamesetting({baseUrl}) {



  const [userEditData, setUserEditData] = useState({
    startid: '', endid: '', win: '', loss: '', tie: ''
})




  const editUserData = () => {
    const { startid, endid, win, loss,tie} = userEditData
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "startid": startid,
        "endid": endid,
        "win": win,
        "loss": loss,
        "tie": tie
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl+"gamesetting", requestOptions)
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
                // document.getElementById('editDiv').style.display = 'none';
                // document.getElementById('divTable').style.display = 'block';
                setUserEditData({ "startid": "",
                "endid": "",
                "win": "",
                "loss": "",
                "tie": ""})
            }
        })
        .catch(error => console.log('error', error));
}


const [status, setstatus] = useState(false)
const [data, setdata] = useState(false)




useEffect(() => {
  getSetting();
}, [userEditData])







const getSetting =(()=>{
  // getgamesetting
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "Cookie_1=value");

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
  };

  fetch(baseUrl+"getgamesetting", requestOptions)
      .then(response => response.json())
      .then(result => {
          // setuser(result)
       ;
         setdata(result?.data)
         console.log(result?.data?.status);

         if (result?.data?.status == "false") {
           
           setstatus(false)
         }else{
          setstatus(true)

         }
      })
      .catch(error => console.log('error', error));



})






  const settingActive = (e) => {

    setstatus(e)


    // const { startid, endid, maxamountprobability, minamountprobability } = userEditData
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "status": e,
       
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl+"gamesettingactive", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.mess === 'Successfully') {
           
                toast.success('Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                // document.getElementById('editDiv').style.display = 'none';
                // document.getElementById('divTable').style.display = 'block';
               
            }
        })
        .catch(error => console.log('error', error));
}







const handShow = (e) => {
  const { name, value } = e.target

  setUserEditData((prastate) => ({
      ...prastate,
      [name]: value,
  }));
}

 

const handShowtie = (e) => {
  const { name, value } = e.target

  const maxvalue = 100 - userEditData.win-value
  
  
    setUserEditData((prastate) => ({
        ...prastate,
        tie: maxvalue,
    }));
    

}

const Difference=userEditData?.endid-userEditData?.startid

  return (
    <>
        <AdminBackNav />
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
          <Card style={{ backgroundColor:'#f5f5f5',width: "50rem", height: "40rem", boxShadow: "1px 1px 1px 1px green" }} >
            <h4 style={{ textAlign: "center", color: "green", marginTop: "1rem",fontFamily: 'Roboto' }}>Game Settings</h4>
            <hr></hr>
            <Form style={{ margin: "auto", padding: "20px" }}>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <div className="preSetting">
<h2>Predefined settings</h2>
                 
                    <div className="row">
                    <div className="col-12 col-sm-6">
                      <h6>Start Period : </h6>{data?.startid}
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6>End Period : </h6>{data?.endid}
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6>WIN Ratio : </h6>{data?.win}
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6>LOOSE Ratio : </h6>{data?.loss}
                    </div>
                    <div className="col-12 col-sm-6">
                    <h6>Tie Ratio : </h6>{data?.tie}
                  </div>
                    </div>
                    </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Row>

               

                      <div className="gameSetting">
                        <div>
                          <div>
                         
                           <Form.Check 
                              type="switch"
                              id="custom-switch"
                              checked={status}
                              onChange={(e)=>settingActive(e.target.checked)}
                              label="Enable"
                            />              
                      </div>
                          <h2>Set Period</h2>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <h6>Start Period</h6>
                              <input type={"number"} name="startid" value={userEditData?.startid}  onChange={(e)=>{handShow(e)}} />
                            </div>
                            <div className="col-12 col-sm-6">
                              <h6>End Period</h6>
                              <input type={"number"}  name="endid" value={userEditData?.endid}   onChange={(e)=>{handShow(e)}}/>
                            </div>
                          </div>
                
                          <p style={{fontSize:'25px',fontWeight:'BOLD'}}>Period Difference : {Difference}</p>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <h6>Win Ratio</h6>
                              <input type={"number"}  name="win"  value={userEditData?.win} onChange={(e)=>{handShow(e)}}  required/>
                            </div>
                            <div className="col-12 col-sm-6">
                              <h6>Loose Ratio</h6>
                              <input type={"number"} name="loss" value={userEditData?.loss}  onChange={e => { handShow(e); handShowtie(e) }} required/>
                            </div>
                            <div className="col-12 col-sm-6">
                              <h6>Tie Ratio</h6>
                              <input type={"number"} name="tie" value={userEditData?.tie}   onChange={(e)=>{handShow(e)}}    required />
                            </div>
                          </div>
                        </div>


                      </div>     
                       <Row style={{ marginTop: "3rem" }}>
                        <Col>

                        </Col>

                        <Col>
                          <Button variant="success" onClick={(e)=>{editUserData()}}>Save</Button>{' '}
                        </Col>

                        <Col >

                        </Col>


                      </Row>

             


                    </Row>
                  </div>
                </div>

              )
              )}
            </Form>
          </Card>
        </div>
        <ToastContainer/>
      </>
  )
}

export default Gamesetting



// export default class Gamesetting extends Component {
//   constructor() {
//     super();
//     this.state = { checked: false };
//     this.handleChange1 = this.handleChange1.bind(this);
//     this.handleChange2 = this.handleChange2.bind(this);
//     this.handleChange3 = this.handleChange3.bind(this);
//   }

//   handleChange1(checked1) {
//     this.setState({ checked1 });
//   }

//   handleChange2(checked2) {
//     this.setState({ checked2 });
//   }

//   handleChange3(checked3) {
//     this.setState({ checked3 });
//   }

//   check = () => {
//     //  document.getElementById('showDiv').style.display= 'Block'
//   }

//   render() {
//     return (
     
//     );
//   }
// }