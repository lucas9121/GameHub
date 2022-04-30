import AuthPage from "../../pages/AuthPage/AuthPage"
import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"

export default function NavBar({ user, setUser, refresh, setRefresh}) {
    return(
        <nav className="nav">
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
                    <UserLogOut user={user} setUser={setUser} refresh={refresh} setRefresh={setRefresh}/>
                </div> :
                <AuthPage user={user} setUser={setUser} />
            }
        </nav>
    )
}