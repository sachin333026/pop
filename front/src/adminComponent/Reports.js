import React, { useEffect, useState } from 'react'
import AdminBackNav from './AdminBackNav'
import DatePicker from "react-datepicker";

function Reports({baseUrl}) {
    const [startDate, setStartDate] = useState(new Date());
    const [allReports, setAllReports] = useState(new Date());




// console.log((startDate).toISOString().split('T')[0]);

// (new Date()).toISOString().split('T')[0];


useEffect(() => {
    showAddressDetails()


}, [startDate])






const showAddressDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        date: (startDate).toISOString().split('T')[0]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl + "allreports", requestOptions)
        .then(response => response.json())
        .then(result => {
            setAllReports(result);

        })
        .catch(error => console.log('error', error));
}












    return (
        <div>
            <AdminBackNav />
            <div class="container"><div>
                <div class="roportsHeader">
                    <div>

                    <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        //   showTimeSelect
                        //   timeFormat="HH:mm:ss"
                          className="form-control"
                        //   minDate={new Date()}
                          placeholderText="Date & Time"
                          dateFormat="yyyy-MM-dd"
                        />
                        {/* <div class="react-datepicker-wrapper">
                            <div class="react-datepicker__input-container">

                                <input type="text" placeholder="Select date" class="form-control" value="04/16/2022" />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div class="row"><div class="col-12 col-md-6">
                    <div style={{color:'black', backgroundColor:'#EFE57B' }} class="reportCard">
                        <h3>WIN &amp; LOOSE</h3>
                        <div class="row ">
                            <div class="col-4">
                                <h5>Win</h5>

                                <div style={{color:'red' }}>{allReports?.admintotalWinningAmount}</div>
                            </div>
                            <div class="col-4">
                                <h5>Loss</h5>
                                <div style={{color:'red' }}>{allReports?.userWinningAmounts}</div>
                               
                            </div>
                            <div class="col-4">
                                <h5>Total Admin Win</h5>

                                <div style={{color:'red' }}>{allReports?.admintotalAmount}</div>


                               
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="col-12 col-md-6">
                        
                        <div style={{color:'black', backgroundColor:'#EFE57B' }}class="reportCard">
                            <h3>COMMISSION </h3><div class="row "><div class="col-4">
                                
                                <h5>Game Commission</h5>

                                <div style={{color:'red' }}>{allReports?.gameCommission}</div>
                    </div>
                        <div class="col-4">
                            <h5>Withdrawal Commission</h5>


                            <div style={{color:'red' }}>{allReports?.withdawalCommission}</div>
                           
                        </div>
                        <div class="col-4">
                            <h5>Total Commission</h5>

                            <div style={{color:'red' }}>{allReports?.withdawalCommission + allReports?.gameCommission}</div>
                            
                        </div>
                    </div>
                    </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }} class="reportCard">
                            <h3>RECHARGE </h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Total Rechage</h5>


                                    <div style={{color:'red' }}>{allReports?.TotalRechageAmount}</div>
                            
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }} class="reportCard">
                            <h3>WITHDRAWAL</h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Total Withdrawal</h5>

                                    
                                    <div style={{color:'red' }}>{allReports?.Totalwithdrawal}</div>
                   
                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div style={{color:'black', backgroundColor:'#EFE57B' }} class="reportCard">
                            <h3>BONUS TO USERS </h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Total Bonus</h5>


                                    <div style={{color:'red' }}>{allReports?.TotalBonus}</div>
                            
                                    
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

export default Reports