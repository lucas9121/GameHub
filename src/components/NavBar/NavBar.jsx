import AuthPage from "../../pages/AuthPage/AuthPage"
import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useState } from "react"

export default function NavBar({ user, setUser}) {
    const [options, setOptions] = useState([])
    const [toggle, setToggle] = useState(false)
    const dropdown = () => {
        setToggle(!toggle)
        if(toggle){
            if(user.account ===  "gamer"){
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/cart', name: 'Cart' } ]) 
    
            } else {
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/new', name: 'New Game' }])
            }
            <UserLogOut setUser={setUser}/>
        } else {
            setOptions([])
        }
        
    }
    return(
        <nav className={styles.NavBar}>
            <Link to={'/'}><h1>GameHub</h1></Link>
            {
                user  ?
                <div>
                    <div className={styles.dropdown}>
                        {/* I had to add this div to center the dropdown item */}
                        <div><p style={{margin: '15%'}} ></p></div>
                        <button onClick={dropdown} onToggle={(evt) => {
                            console.log('toggle')
                        }} >Hello {user.name}</button>
                            {
                                options.map((option) => {
                                    return(
                                        <Link to={option.url}>{option.name}</Link>
                                    )
                                })
                            }
                    </div>
                    <UserLogOut setUser={setUser}/>
                </div> :
                <AuthPage user={user} setUser={setUser} />
            }
        </nav>
    )
}