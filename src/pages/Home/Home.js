import { Link } from "react-router-dom"
import styles from './Home.module.css'
import { useEffect, useState } from "react";
import * as UsersAPI from '../../utilities/users-api'
import { getAllUsers } from "../../utilities/users-service";
import AdminHomePage from "../../components/AdminHomePage/AdminHomePage";

export default function Home({games, user}) {
    const newArr = [...games];
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
        <main className={styles.main}>
            {
                games.map((game) => {
                    return(
                        // if admin approved the game display it
                        game.approved === 'yes' ?
                        <div className={styles.sub} style={game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
                            <div className={styles.banner}>
                                <h2>{game.name} </h2>
                                <div> 
                                    {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                    {game.qty > 0 ? <p style={{color: 'green', fontSize: 'small'}}>Available</p> : <p style={{color: 'red', fontSize: 'small'}}>Sold Out</p> }
                                </div>
                            </div>
                        </div> : null
                    )
                })
            }
        </main> :
        // if developer account is logged in
        user.account === 'developer' ?
        <main className={styles.main}>
            {
                games.map((game) => {
                    return(
                        // return only developer games
                        user.name === game.dev ?
                        <div className={styles.sub} style={game.approved === 'review' ? {border: 'solid gold'} : game.approved === 'yes' && game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
                            <div className={styles.banner}>
                                <h2>{game.name} </h2>
                                <div> 
                                    {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                    {game.qty > 0 ? <p style={{color: 'green', fontSize: 'small'}}>Available</p> : <p style={{color: 'red', fontSize: 'small'}}>Sold Out</p> }
                                </div>
                            </div>
                        </div> :
                        null
                    )
                })
            }
        </main> :
        user.account === 'admin' ?
            // admin accounts
            <AdminHomePage games={games} handleClick={handleClick} />
        :
        //gamer account
        <main className={styles.main}>
            {
                newArr.sort((a, b) => {
                    if(a.name.toUpperCase() > b.name.toUpperCase()){
                        return 1
                    }
                    if(a.name.toUpperCase() < b.name.toUpperCase()){
                        return -1
                    }
                    return 0
                }).reverse().map((game) => {
                    return(
                        // if admin approved the game display it
                        game.approved === 'yes' ?
                        <div className={styles.sub} style={game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
                            <div className={styles.banner}>
                                <h2>{game.name} </h2>
                                <div> 
                                    {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                    {game.qty > 0 ? <p style={{color: 'green', fontSize: 'small'}}>Available</p> : <p style={{color: 'red', fontSize: 'small'}}>Sold Out</p> }
                                </div>
                            </div>
                        </div> : null
                    )
                })
            }
        </main>
    )
}