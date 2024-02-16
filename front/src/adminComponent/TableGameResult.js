import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
const TableGameResult = ({ baseUrl }) => {
    const [result, setresult] = useState([])

    useEffect(() => {

        // showResult();
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl +"showResult", requestOptions)
            .then(response => response.json())
            .then(result => {
                setresult(result.reverse())
            })
            .catch(error => console.log('error', error));

    }, [])

  

    return (


<>
        <div style={{padding:'15px'}} id="table" >

            <MaterialTable
                title=""
                options={{
                    paging:true,
                    pageSize:30,       // make initial page size
                    emptyRowsWhenPaging: false,   // To avoid of having empty rows
                    pageSizeOptions:[30,60,120],    // rows selection options
                }}
                columns={[
                    { title: 'Period ID', field: 'periodId' },
                    { title: 'A', field: 'ona'  },
                       { title: 'B', field: 'onb' },
                     { title: 'T', field: 'ont'  },
                   { title: 'Minimum Side', field: 'less' },
                      { title: 'Result', field: 'results'  },
                     { title: 'Condition', field: 'conditions' },
                                                                       ]}
                data={result}
             
            />
        </div>
     
        </>
 
    )
}

export default TableGameResult
