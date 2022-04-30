import { useNavigate, useParams } from "react-router-dom"
import { logOut } from "../../utilities/users-service"

export default function MyAccount({user, setUserDlt, refresh, setRefresh}) {
    const {id} = useParams()
    const navigate = useNavigate()

    const handleDelete = (event) => {
        // making this an async await makes the code terminate after the try block
        try {
            fetch(`http://localhost:3001/api/users/delete/${id}`, {method: 'DELETE'})
        } catch(e) {
            console.log(e)
        } finally {
            console.log('user deleted')
            setRefresh(!refresh)
            setUserDlt(true)
            navigate('/')
            logOut()
        }
    }
    return(
        <div className='myAccount'>
            <h2>My Account</h2>
            <div className="account-info">
                <h4>Name</h4>
                <p>{user.name}</p>
                <h4>Email</h4>
                <p>{user.email} </p>
                <h4>Account Type</h4>
                <p style={{textTransform: 'capitalize'}}>{user.account}</p>
                <button onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
)
}