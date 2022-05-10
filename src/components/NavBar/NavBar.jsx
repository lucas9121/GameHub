import AuthPage from "../../pages/AuthPage/AuthPage"
import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useState, useEffect } from "react"

export default function NavBar({ user, setUser, showSignin, setShowSignin, setActClk, actClk, setSearchClk, signClk, setSignClk}) {
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
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, <UserLogOut setUser={setUser} actClk={actClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/> ]);
            } else {
                // dropdown options if user has a developer or admin account
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/new', name: 'New Game' }, <UserLogOut setUser={setUser} actClk={actClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/>]);
            }
        } else {
            // closes dropdown if hook is false
            setOptions([])
        } 
    }, [actClk])

    return(
        <nav className={styles.NavBar} style={showSignin ? {borderRadius: '0'} : null}>
            <div>
                <Link to={'/'} onClick={() => {setActClk(false); setSearchClk(false)}} ><h1>GameHub</h1></Link>
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
                    <Link to='/cart'>Cart</Link>
                </div> :
                // if there isn't a user
                <ul className={styles.noUser}>
                    <li><h3 onClick={() => setShowSignin(!showSignin)}>Sign in</h3></li>
                    <li><Link to='/cart'>Cart</Link></li>
                    {/* <AuthPage user={user} setUser={setUser} signClk={signClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/> */}
                </ul>
            }
        </nav>
    )
}