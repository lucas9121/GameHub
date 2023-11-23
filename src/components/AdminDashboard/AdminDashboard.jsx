import styles from './AdminDashboard.module.css'
import { useState, useEffect } from "react";
import * as UsersAPI from '../../utilities/users-api'
import { getAllUsers } from "../../utilities/users-service";
import Chart from '../chart/Chart';
import { DataGrid } from '@mui/x-data-grid';

export default function AdminDashboard({allUsers}){
    // const [allUsers, setAllUsers] = useState([])
    // const [date, setDate] = useState(new Date())
    

    // useEffect(() => {
    //     (async() => {
    //         //Finds every user. Only admin can use this function
    //         try{
    //             const res = await UsersAPI.getAll()
    //             // setAllUsers(res)
    //             sessionStorage.setItem('sessionToken', res)
    //             setAllUsers(getAllUsers())
    //         } catch(e){
    //             console.log(e)
    //         }
    //     })()
    // }, [])
    
    const columns = [
        {field: 'username', headerName: 'Username', headerAlign: 'center', align: 'center', width: 120 },
        {field: 'email', headerName: 'Email', headerAlign: 'center', align: 'center', width: 200 },
        {field: 'account', headerName: 'Account Type', headerAlign: 'center', align: 'center', width: 120},
        {field: 'createdAt', headerName: 'Account Created', headerAlign: 'center', align: 'center', width: 180, renderCell: (params) => {
            const date = new Date(params.row.createdAt)
            const year = date.getFullYear()
            const month = date.toLocaleString('default', {month: 'long'})
            const day = date.getDate()
            return(
                <>
                    <p>{`${month} ${day}, ${year}`}</p>
                </>

            )
        }} ,
        {field: 'bought', headerName: 'Games Bought', align: 'center', width: 120, renderCell: (params) => {
            const acc = params.row.account;
            return(
                
                <>
                    <p>{acc === 'gamer' ? params.row.bought.length : 'N/A'}</p>
                </>
            )
        } }
    ]

    const gridStyle = {
        color: 'white', // Set the background color of the DataGrid
        // ... other styles
      };

    return(
        <>
            <h1>Dashboard</h1>
            {/* <Chart data={allUsers.length} title="Users" grid dataKey="username" /> */}
            <DataGrid className={styles.Table}
            autoHeight
            rows={allUsers.filter((user) => user.account !== 'admin')}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={columns}
            initialState={{
                // ...data.initialState,
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection
            sx={{
                // boxShadow: 2,
                // border: 2,
                color: 'white',
                // borderColor: 'white',
                '.MuiDataGrid-row:hover': {
                    backgroundColor: 'rgb(28, 118, 132)',
                    color: '#e1dfdf',
                    cursor: 'pointer',
                    '.MuiCheckbox-root': {
                        color: '#e1dfdf'
                    },
                },
                '.MuiCheckbox-root': {
                    color: 'white',
                },
                '.MuiDataGrid-withBorderColor > div':{
                    color: 'white' // Set color for the toolbar
                }, 
                '.MuiDataGrid-withBorderColor > div > div > div > svg': {
                    color: 'white', // Set color for the toolbar input arrow
                },
              }}
            />
        </>
    )
}