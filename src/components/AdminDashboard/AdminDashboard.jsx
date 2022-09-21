import styles from './AdminDashboard.module.css'
import { useState, useEffect } from "react";
import * as UsersAPI from '../../utilities/users-api'
import { getAllUsers } from "../../utilities/users-service";
import Chart from '../chart/Chart';
import { DataGrid } from '@mui/x-data-grid';

export default function AdminDashboard({user, games}){
    const [allUsers, setAllUsers] = useState([])
    const [date, setDate] = useState(new Date())
    

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
        {field: 'id', headerName: 'ID', headerAlign: 'center', width: 90, renderCell: (index) => index.api.getRowIndex(index.row._id) + 1, },
        {field: 'username', headerName: 'Username', headerAlign: 'center', width: 120 },
        {field: 'email', headerName: 'Email', headerAlign: 'center', width: 200 },
        {field: 'account', headerName: 'Account Type', headerAlign: 'center', width: 120},
        {field: 'createdAt', headerName: 'Account Created', headerAlign: 'center', width: 180, renderCell: (params) => {
            let date = new Date(params.row.createdAt)
            let year = date.getFullYear()
            let month = date.toLocaleString('default', {month: 'long'})
            let day = date.getDay()
            return(
                <>
                    <p>{`${month} ${day}, ${year}`}</p>
                </>

            )
        }} ,
        {field: 'bought', headerName: 'Games Bought', width: 120, renderCell: (params) => {
            return(
                <>
                    <p>{params.row.bought.length}</p>
                </>
            )
        } }
    ]

    return(
        <>
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