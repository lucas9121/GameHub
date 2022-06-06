import { useState } from "react";
import * as UsersAPI from '../../utilities/users-api'
import { getAllUsers } from "../../utilities/users-service";
import AdminHomePage from "../../components/AdminHomePage/AdminHomePage";
import InitialHomePage from "../../components/InitialHomePage/InitialHomePage";
import DevHomePage from "../../components/DevHomePage/DevHomePage";
import GamerHomePage from "../../components/GamerHomePage/GamerHomePage";

export default function Home({games, user}) {
    const [allUsers, setAllUsers] = useState([])

    //Finds every user. Only admin can use this function
    const handleClick = async() => {
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
    }

    console.log(allUsers)


    return(
        // null error prevention
        //if nobody is logged in
        !user ?
            <InitialHomePage games={games}/> :
        // if developer account is logged in
        user.account === 'developer' ?
            <DevHomePage games={games} user={user}/> :
        // if admin account is logged in
        user.account === 'admin' ?
            <AdminHomePage games={games} handleClick={handleClick} /> :
        // if gamer account is logged in
        <GamerHomePage games={games}/>
    )
}