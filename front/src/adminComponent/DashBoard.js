import React, { useEffect, useState } from 'react'
import { BiFontSize } from 'react-icons/bi'
import { io } from 'socket.io-client'
import { costomeSocket } from '../components/CostomSocket'

function DashBoard({ baseUrl }) {
    const [allDate, setAllDeta] = useState({})
    const [socket, setSocket] = useState(null)
    const [liveUser, setLiveUser] = useState("0")

    const userID = localStorage.getItem("token")



    useEffect(() => {
        if (userID) {
            if (socket === null) {
                // setSocket(io(baseUrl))
                setSocket(costomeSocket)
            }else{
                // get_user_Live
               
                socket.on("receive_history", (data) => {

                    run();
                })
                

                function run() {
                socket.emit("get_user_Live");
                }
                socket.on("user_Live", (data) => {
                    setLiveUser(data)
                })
            }
           
        }
    }, [socket])







    useEffect(() => {
        showUser();
    }, [])


  

    const showUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "gameCommission", requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllDeta(result)
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div>
            <div class="container"><div><div class="roportsHeader"></div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }}class="reportCard desB">
                            <h3>GAME PLAY</h3>
                            <div class="row "><div class="col-12">
                                <h5>Total game play</h5>
                                <div style={{color:'red' }}>{allDate?.totalGamePlay}</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }}class="reportCard desB">
                            <h3>ACTIVE USER </h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Live Active user</h5>

                                    <div style={{color:'red' }}>{liveUser-1}</div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }}class="reportCard desB">
                            <h3>RECHARGE </h3>
                            <div class="row ">
                                <div class="col-6">

                                    <h5>Total Rechage</h5>

                                    <div style={{color:'red' }}>{allDate?.TotalRechage}</div>
                                 
                                </div>
                                <div class="col-6">
                                    <h5>Total Rechage Amount</h5>

                                    <div style={{color:'red' }}>{allDate?.TotalRechageAmount}</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }}class="reportCard desB">
                            <h3>COMMISSION</h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Total commission</h5>

                                    <div style={{color:'red' }}>{allDate?.withdawalCommission + allDate?.gameCommission}</div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }}class="reportCard desB">
                            <h3>Withdrawal</h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Total withdrawal</h5>

                                    <div style={{color:'red' }}>{allDate?.TotalWinAmountw}</div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div>

    )
}

export default DashBoard