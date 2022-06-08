import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useState, useEffect } from "react"
import {BsCart, BsJoystick} from 'react-icons/bs'
import {BiBarChart} from 'react-icons/bi'

export default function NavBar({ user, setUser, cart, setCart, newQty, showSignin, setShowSignin, setActClk, actClk, setSearchClk, signClk, setSignClk, refresh, setRefresh}) {
    // dropdown hook
    const [options, setOptions] = useState([])

    const dropdown = () => {
        // opens or closes dropdown on navbar
        setActClk(!actClk)
        //removes focus from search bar
        setSearchClk(false)
    }

    useEffect(() => {
        // if hook is true
        if(actClk){
            // dropdown options if user has a gamer account
            if(user.account ===  "gamer"){
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, <UserLogOut setUser={setUser} cart={cart} setCart={setCart} refresh={refresh} setRefresh={setRefresh} actClk={actClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/> ]);
            } else if(user.account ===  "developer") {
                // dropdown options if user has a developer account
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/new', name: 'New Game' }, <UserLogOut setUser={setUser} cart={cart} setCart={setCart} refresh={refresh} setRefresh={setRefresh} actClk={actClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/>]);
            } else {
                //dropdown options if user has an admin account
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, <UserLogOut setUser={setUser} cart={cart} setCart={setCart} refresh={refresh} setRefresh={setRefresh} actClk={actClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/>]);
            }
        } else {
            // closes dropdown if hook is false
            setOptions([])
        } 
    }, [actClk])

    return(
        <nav className={styles.NavBar} style={showSignin ? {borderRadius: '0'} : null}>
            <div>
                <Link to={'/games'} onClick={() => {setActClk(false); setSearchClk(false)}}><BsJoystick /><h1>GameHub</h1></Link>
            </div>
            {
                // if there is a user
                user  ?
                <div>
                    <ul className={styles.dropdown}>
                        {/* I had to add this div to center the dropdown item */}
                        <div><p style={{margin: '1.5vh'}}></p></div>
                            <li style={actClk ? {listStyleType: 'disclosure-open'} : null}><button onClick={dropdown}>Hello {user.name}</button></li>
                                {
                                    options.map((option, idx) => {
                                        return(
                                            // adds bottom border radius to last item
                                            idx === options.length - 1 ?
                                            <li key={idx} style={{borderRadius: '0 0 10px 10px'}}>{option}</li>
                                            :
                                            <li key={idx}><Link to={`${option.url}`} onClick={dropdown}>{option.name}</Link></li>
                                        )
                                    })
                                }

                    </ul>
                    {
                        user.account === 'gamer' ?
                            <Link to='/cart' className={styles.CartLink}><BsCart/><p>{newQty}</p></Link> :
                        user.account === 'developer' ?
                            <Link to='/data' className={styles.CartLink}><BiBarChart/></Link> 
                        :
                            <Link to='/data' className={styles.CartLink}><BiBarChart/></Link>
                    }
                </div> :
                // if there isn't a user
                <ul className={styles.noUser}>
                    <li><h3 onClick={() => setShowSignin(!showSignin)}>Sign in</h3></li>
                    <li><Link to='/cart' className={styles.CartLink}><BsCart/><p>{newQty}</p></Link></li>
                </ul>
            }
        </nav>
    )
}