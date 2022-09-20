import styles from './AdminDashboard.module.css'
import { useState, useEffect } from "react";
import * as UsersAPI from '../../utilities/users-api'
import { getAllUsers } from "../../utilities/users-service";
import Chart from '../chart/Chart';
import { DataGrid } from '@mui/x-data-grid';

export default function AdminDashboard({user, games}){
    const [allUsers, setAllUsers] = useState([])
    

    useEffect(() => {
        (async() => {
            //Finds every user. Only admin can use this function
            try{
                const res = await UsersAPI.getAll()
                // setAllUsers(res)
                sessionStorage.setItem('sessionToken', res)
                setAllUsers(getAllUsers())
            } catch(e){
                console.log(e)
            } finally {
                console.log('function is working')
            }
        })()
    }, [])

    const columns = [
        {field: 'id', headerName: 'ID', width: 90, renderCell: (index) => index.api.getRowIndex(index.row._id) + 1, },
        {field: 'username', headerName: 'Username', width: 120 },
        {field: 'email', headerName: 'Email', width: 200 },
        {field: 'account', headerName: 'Account Type', width: 120},
        {field: 'createdAt', headerName: 'Account Created', width: 150, renderCell: (params) => {
            return(
                <>
                    <p>{params.row.createdAt}</p>
                </>

            )
        }} ,
        {field: 'bought', headerName: 'Games Bought', width: 100, renderCell: (params) => {
            return(
                <>
                    <p>{params.row.bought.length}</p>
                </>
            )
        } }
    ]

    return(
        <>
            {/* {console.log(allUsers[0].createdAt)} */}
            <h1>Dashboard</h1>
            {/* <Chart data={allUsers.length} title="Users" grid dataKey="username" /> */}
            <DataGrid className={styles.Table}
            rows={allUsers.filter((user) => user.account !== 'admin')}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={columns}
            checkboxSelection
            />
        </>
    )
}