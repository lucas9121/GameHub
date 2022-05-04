import AuthPage from "../../pages/AuthPage/AuthPage"
import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useState, useEffect } from "react"

export default function NavBar({ user, setUser}) {
    const [options, setOptions] = useState([])
    const [toggle, setToggle] = useState(false)

    const dropdown = () => {
        setToggle(!toggle) 
    }
    
    useEffect(() => {
        if(toggle){
            if(user.account ===  "gamer"){
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/cart', name: 'Cart' } ]);
            } else {
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/new', name: 'New Game' }]);
            }
        } else {
            setOptions([])
        } 
    }, [toggle])

    return(
        <nav className={styles.NavBar}>
            <Link to={'/'}><h1>GameHub</h1></Link>
            {
                user  ?
                <div>
                    <div className={styles.dropdown}>
                        {/* I had to add this div to center the dropdown item */}
                        <div><p style={{margin: '1.5vh'}}></p></div>
                        <button onClick={dropdown}>Hello {user.name}</button>
                            {
                                options.map((option, idx) => {
                                    return(
                                        idx === options.length - 1 ?
                                        <Link key={idx} to={option.url} style={{borderRadius: '0 0 10px 10px'}} onClick={dropdown} >{option.name}</Link>
                                        :
                                        <Link key={idx} to={option.url} onClick={dropdown}>{option.name}</Link>
                                    )
                                })
                            }
                    </div>
                    <UserLogOut setUser={setUser}/>
                </div> :
                <div className="AuthPage">
                    <AuthPage user={user} setUser={setUser} />
                </div>
            }
        </nav>
    )
}