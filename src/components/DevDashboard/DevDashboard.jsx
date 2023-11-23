import styles from '../AdminDashboard/AdminDashboard.module.css'
import { useState, useEffect } from "react";
import * as UsersAPI from '../../utilities/users-api'
import { getAllUsers } from "../../utilities/users-service";
import { DataGrid } from '@mui/x-data-grid';

export default function DevDashboard({games}){
    
    const columns = [
        {field: 'name', headerName: 'Game', headerAlign: 'center', align: 'center', width: 120 },
        {field: 'price', headerName: 'Price', headerAlign: 'center', align: 'center', width: 200 },
        {field: 'qty', headerName: 'Quantity', headerAlign: 'center', align: 'center', width: 120},
        {field: 'approved', headerName: 'Approved', headerAlign: 'center', align: 'center', width: 120},
        {field: 'sold', headerName: 'Sold', align: 'center', width: 120 },
        {field: 'createdAt', headerName: 'Created', headerAlign: 'center', align: 'center', width: 180, renderCell: (params) => {
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
        {field: 'updatedAt', headerName: 'Updated', headerAlign: 'center', align: 'center', width: 180, renderCell: (params) => {
            const date = new Date(params.row.updatedAt)
            const year = date.getFullYear()
            const month = date.toLocaleString('default', {month: 'long'})
            const day = date.getDate()
            return(
                <>
                    <p>{`${month} ${day}, ${year}`}</p>
                </>

            )
        }} ,
    ]

    const gridStyle = {
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
      };

    return(
        <>
            <h1>Dashboard</h1>
            <DataGrid className={styles.Table}
            autoHeight
            rows={games}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={columns}
            initialState={{
                // ...data.initialState,
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection
            sx={gridStyle}
            />
        </>
    )
}