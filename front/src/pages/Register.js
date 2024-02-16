import React, {useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import { Form, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../firebase'
// import * as firebase from 'firebase';


export const Register = ({ baseUrl }) => {

    
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        userName: '',
        userMobile: '',
        userNickName: '',
        userPassword: '',
        verificationCode:'',
        userReCode: '',
        userBalance:'0',
        userStatus:'0',
        userDelete:'1',
    })

    //const [userData2, setUserData2] = useState({})

    
    const queryParams = new URLSearchParams(window.location.search);
    userData.userReCode= queryParams.get('c');




    const HandlShow = (e) => {
        const { name, value } = e.target

        setUserData((prastate) => ({
            ...prastate,
            [name]: value,
        }))
    }

     

    const singIn = () => {
        // e.preventDefault()

        const { userName, userBalance, userMobile, userNickName, userPassword, userReCode, userStatus, userDelete } = userData
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userName, userMobile, userNickName, userPassword, userReCode, userBalance, userStatus, userDelete
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "signUp", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('SingUp Successfully', {
                        position: "top-right",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    localStorage.setItem('token', result.token)
                    navigate('/win')

                } else {

                    toast.error('Something Went Wrong Please Try Again', {
                        position: "top-right",
                        autoClose: 1500,
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

     
     
      const onSubmitOTP = (e) =>{
        e.preventDefault()
        const code = userData.verificationCode
      
        window.confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
        //   const user = result.user;
        //   console.log(JSON.stringify(user))
          toast.success('Otp Validation Success', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                singIn()
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          toast.error('Wrong Otp Entered', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        });
      }


      const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {},
            defaultCountry: "IN"
        });
    }
     

      //usercheck

      const OnUserCheck = (e) => {
         e.preventDefault()

        const { userName,userMobile, userNickName, userPassword, userReCode} = userData
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            userName, userMobile, userNickName, userPassword, userReCode
        });
       var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
       fetch(baseUrl + "Usercheck", requestOptions)
            .then(response => response.json())
            .then(result => {
               // setUserData2(result)
               
                //
       
                if(result.otp===true)
                {

                   // console.log(result.userMobile);

                    configureCaptcha()

                    const phoneNumber = "+91" + result.userMobile
     
                    const appVerifier = window.recaptchaVerifier;
                    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                        .then((confirmationResult) => {
                            // SMS sent. Prompt user to type the code from the message, then sign the
                            // user in with confirmationResult.confirm(code).
                            window.confirmationResult = confirmationResult;
                       
                            toast.success('OTP Sent Successfully', {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
            
                            // document.getElementById('form1').style.display = 'none';
                            document.getElementById('form2').style.display = 'block';
                            // ...
                        }).catch((error) => {
                            // Error; SMS not sent
                            // ...
                     
                            
                          
                            toast.error('SMS Not Sent Please Reload And Try Again', {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        });



                }
                else if(result.error=="InvalidRefCode")
                {
                    toast.error('Invalid Refer Code', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });


                }

                else if(result.error=="ONA")
                {
                    toast.error('Mobile number is not correct', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });


                }

                
                else if(result.error=="ECN")
                {
                    toast.error('Mobile number is not correct', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });


                }

                
                else if(result.error=="AlreadyRegAc")
                {
                    toast.error('Already Registered Account', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });


                }




                //



            }
            )
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <NavBar />
            {/* <form onSubmit={onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input type="number" name="mobile" placeholder="Mobile number" required onChange={(e) => setNumber(e.target.value)}/>
          <button type="submit">Submit</button>
        </form> */}

            <div style={{ padding: '30px' }}>
                <Form  onSubmit={(e) => OnUserCheck(e)} style={{display:'block'}} id='form1'>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder='Enter Name' value={userData.userName} name='userName' onChange={HandlShow} required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type="tel"  maxlength="10" placeholder={'Mobile Number'} value={userData.userMobile} name='userMobile' onChange={HandlShow} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder='Enter Nick Name' value={userData.userNickName} name='userNickName' onChange={HandlShow} required />
                    </Form.Group>
                    {/* <div style={{ display: 'flex' }}>
                        <div style={{ width: '70rem' }}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Verification Code" required />
                            </Form.Group>
                        </div>

                        <div style={{ width: '10rem', marginLeft: '10px' }}>
                            <Button variant="secondary" type='submit'>
                                OTP
                            </Button>             
                        </div>
                    </div> */}


                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Password" value={userData.userPassword} name='userPassword' onChange={HandlShow} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Recommendation Code" value={userData.userReCode} name='userReCode' onChange={HandlShow} required />
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ marginBottom: '6rem' }}>
                            {/* <Button style={{ width: '16rem' }} variant="primary" type="submit" onClick={(e) => singIn(e)}>
                                Register
                            </Button> */}
                            <div id="sign-in-button"></div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ margin: '4rem' }}>
                        <Button style={{ width: '12rem',height:'3rem', marginBottom: '26px',backgroundColor:'#0288d1',fontWeight: '700' ,fontSize:'16px' }} variant="primary" type="submit">
                            Send Otp
                        </Button>
                    </div>
               </div>
                        </div>
                    </div>
                </Form>
                <Form onSubmit={onSubmitOTP} style={{display:'none', marginBottom:'5rem'}} id='form2'>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '70rem' }}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Verification Code" name='verificationCode'  value={userData.verificationCode} onChange={HandlShow} required />
                            </Form.Group>
                        </div>

                        <div style={{ width: '10rem', marginLeft: '10px' }}>
                            <Button variant="secondary" type='submit'>
                                Submit
                            </Button>             
                        </div>
                    </div>
                </Form>
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}



// import React from 'react'
// import firebase from '../firebase'

// class Register extends React.Component {
//   handleChange = (e) =>{
//     const {name, value } = e.target
//     this.setState({
//         [name]: value
//       })
//   }
//   configureCaptcha = () =>{
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//       'size': 'invisible',
//       'callback': (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         this.onSignInSubmit();
//         console.log("Recaptca varified")
//       },
//       defaultCountry: "IN"
//     });
//   }
//   onSignInSubmit = (e) => {
//     e.preventDefault()
//     this.configureCaptcha()
//     const phoneNumber = "+91" + this.state.mobile
//     console.log(phoneNumber)
//     const appVerifier = window.recaptchaVerifier;
//     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//           // SMS sent. Prompt user to type the code from the message, then sign the
//           // user in with confirmationResult.confirm(code).
//           window.confirmationResult = confirmationResult;
//           console.log("OTP has been sent")
//           // ...
//         }).catch((error) => {
//           // Error; SMS not sent
//           // ...
//           console.log("SMS not sent")
//         });
//   }
//   onSubmitOTP = (e) =>{
//     e.preventDefault()
//     const code = this.state.otp
//     console.log(code)
//     window.confirmationResult.confirm(code).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       console.log(JSON.stringify(user))
//       alert("User is verified")
//       // ...
//     }).catch((error) => {
//       // User couldn't sign in (bad verification code?)
//       // ...
//     });
//   }
//   render() {
//     return (
//       <div>
//         <h2>Login Form</h2>
//         <form onSubmit={this.onSignInSubmit}>
//           <div id="sign-in-button"></div>
//           <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
//           <button type="submit">Submit</button>
//         </form>

//         <h2>Enter OTP</h2>
//         <form onSubmit={this.onSubmitOTP}>
//           <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     )
//   }
// }
// export default Register

