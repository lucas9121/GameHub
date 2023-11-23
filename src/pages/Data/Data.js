import styles from './Data.module.css'
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard'
import DevDashboard from '../../components/DevDashboard/DevDashboard'
import { useState, useEffect } from "react";
import * as UsersAPI from '../../utilities/users-api'
import { getAllUsers } from "../../utilities/users-service";

export default function DataPage({user, games}){
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
            }
        })()
    }, [])
    
    return(  
        <div className={styles.Data}>
            {
                // if admin account is logged in
                user.account === 'admin' ?
                <AdminDashboard allUsers={allUsers} /> :
                // if developer account is logged in
                <DevDashboard  games={games.filter(game => game.dev === user._id)} />
            }
        </div>
    )
}