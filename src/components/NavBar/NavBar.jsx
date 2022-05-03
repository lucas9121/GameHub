import AuthPage from "../../pages/AuthPage/AuthPage"
import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

export default function NavBar({ user, setUser}) {
    return(
        <nav className={styles.NavBar}>
            <Link to={'/'}><h1>GameHub</h1></Link>
            {
                user  ?
                <div>
                    <p>Hello {user.name}</p>
                    <Link to={`/account/${user._id}`} >My Account</Link>
                    {
                        user.account === "gamer" ?
                        <Link to={'/cart'} >Cart</Link> :
                        <Link to={'/new'}>New Game</Link>
                    }
                    <UserLogOut setUser={setUser}/>
                </div> :
                <AuthPage user={user} setUser={setUser} />
            }
        </nav>
    )
}