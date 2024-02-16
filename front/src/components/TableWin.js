import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { AiFillTrophy } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { io } from "socket.io-client";
import { costomeSocket } from './CostomSocket';
// import { RiCheckboxBlankCircleLine } from 'react-icons/ri';

const TableWin = ({ baseUrl }) => {




    const [userAddressDetails, setUserAddressDetails] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        showAddressDetails();
        return () => { };
    }, [])



    const userID = localStorage.getItem("token")





    const [socket, setSocket] = useState(null)



    useEffect(() => {



        if (userID) {
            if (socket === null) {
                // setSocket(io(baseUrl))
                setSocket(costomeSocket)
            }
          else{
            socket.on("receive_period", (data) => {
                showAddressDetails();
            })
          }

               
          
        }


        return () => { };

    }, [socket])




    const userToken = localStorage.getItem('token')

    const showAddressDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + userToken);

        // var raw = JSON.stringify({
        //     userId: localStorage.getItem('token')
        // });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            // body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "userHisory", requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result?.message == "Authorization required") {
                    toast.error(result.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    localStorage.removeItem('token')
                    navigate('/')

                } else {
                    setUserAddressDetails(result.data);
                }







            })
            .catch(error => console.log('error', error));
    }





    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    < AiFillTrophy />
                </div>
                <div>
                    {/* <h6>Partiy Record</h6> */}
                </div>
            </div>
            <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Selected</th>
                            <th>Amount</th>
                            <th>Win</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            userAddressDetails && userAddressDetails?.map((data, i) => {
                                const winAmount = data?.amount - (2 / 100 * data?.amount)
                                return (
                                    data?.win?.length > 0 && <tr key={i}>
                                        <td>{data?.Period}</td>
                                        <td>{/* {data?.cardtype}   */}<div className={data?.cardtype == "andar" ? 'yourSelecta' : data?.cardtype == "bahar" ? "yourSelectB" : "yourSelectt"}></div></td>
                                        <td className={data?.cardtype == data?.win ? 'preWin' : "preloss"}>{data?.amount}</td>
                                        <td>{data?.cardtype == data?.win ? winAmount.toFixed(2) : "0"}</td>
                                        <td>{/* {data?.win == "andar" ? "A" : data?.win == "bahar" ? "B" : "T"} */} <div className={data?.win == "andar" ? 'yourSelecta' : data?.win == "bahar" ? "yourSelectB" : "yourSelectt"}></div></td>
                                    </tr>


                                )
                            })
                        }




                    </tbody>

                </Table>
                <h4 id="demo" className='demoNone'></h4>
            </div>
        </>
    )
}

export default TableWin