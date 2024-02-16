import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

function TablePeriod({ baseUrl }) {




    const [userPeriods, setUserPeriods] = useState([])


    useEffect(() => {
        showPeriods();
    }, [])


    const userID = localStorage.getItem("token")


    const [socket, setSocket] = useState(null)



    useEffect(() => {

        if (userID) {
            if (socket === null) {
                setSocket(io(baseUrl))
            }
            if (socket) {
                socket.on("receive_period", (data) => {
                    showPeriods();
                })
            }
        }

    }, [socket])

    const showPeriods = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userId: localStorage.getItem('token')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "allGameHisory", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserPeriods(result.data);

            })
            .catch(error => console.log('error', error));
    }




const filterPeriod = userPeriods && userPeriods?.filter((data)=>{
    return data?.win !== ""
})




    return (
        <div>
            <div style={{ padding: '30px', display: 'block' }} id='divTable' >

                <MaterialTable
                    title="Periods"
                    options={{
                        paging:true,
                        pageSize:20,       // make initial page size
                        emptyRowsWhenPaging: false,   // To avoid of having empty rows
                        pageSizeOptions:[20,50,100],    // rows selection options
                      }}
                    columns={[
                        { title: 'Result id', field: 'Id' },
                        { title: 'Period Is', field: 'period' },
                        { title: 'Win', field: 'win' },
                        // { title: 'Date', field: 'date' },
                        {
                            title: "Win Color",
                            field: "win",
                            editable: false,
                            render: (rowData) =>
                                rowData && (
                                    <div
                                    className={rowData?.win== "andar" ?'yourSelecta':rowData?.win == "bahar" ? "yourSelectB" : "yourSelectt" }

                                    >
                                        {/* {(rowData?.date).split('T')[0]} */}


                                

                                    </div>
                                )
                        }

                    ]}

                    data={filterPeriod}

                />
            </div>


        </div>
    )
}

export default TablePeriod