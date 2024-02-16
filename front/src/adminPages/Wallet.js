import React ,{useState ,useEffect} from 'react'
import MaterialTable from "material-table";
import AdminBackNav from '../adminComponent/AdminBackNav';

const TableCom = ({baseUrl}) => {
    const [walletList ,setWalletList] = useState([])



    useEffect(() => {

        // showUser();
        // const showUser = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Cookie", "Cookie_1=value");
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            fetch(baseUrl+"showWalletList", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setWalletList(result)
                })
                .catch(error => console.log('error', error));
        // }

    }, [])





    return (
        <>
          <AdminBackNav />
        <div style={{padding:'30px'}}>

            <MaterialTable
                title="Wallet"
                options={{
                    paging:true,
                    pageSize:10,       // make initial page size
                    emptyRowsWhenPaging: false,   // To avoid of having empty rows
                    pageSizeOptions:[10,15,20],    // rows selection options
                  }}
                columns={[
                    { title: 'Wallet Id', field: 'Id' },
                    { title: 'User id', field: 'userId' },
                    { title: 'Start Balance', field: 'startBal', type: 'numeric' },
                    { title: 'Close Balance', field: 'closeBal', type: 'numeric' },
                  
    
                ]}
                data={
                    walletList  }
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    }
                ]}
            />
        </div>
               
        </>
    )
}

export default TableCom

