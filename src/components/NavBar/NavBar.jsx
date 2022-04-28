import AuthPage from "../../pages/AuthPage/AuthPage"
import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"

export default function NavBar({ user, setUser}) {
    return(
        <nav className="nav">
            <Link to={'/'}><h1>GameHub</h1></Link>
            {
                user  ?
                <div>
                    {/* <p>Hello {user.name}</p> */}
                    <UserLogOut user={user} setUser={setUser} />
                </div> :
                <AuthPage user={user} setUser={setUser} />
            }
        </nav>
    )
}