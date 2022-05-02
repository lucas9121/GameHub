import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { logOut } from "../../utilities/users-service"

export default function MyAccount({user, setUserDlt, refresh, setRefresh}) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [userCard, setUserCard] = useState([])

    const handleDelete = (event) => {
        // making this an async await makes the code terminate after the fetch request
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
                <h4>Card</h4>
                {
                    user.card.length === 0 ?
                    <p>no card info</p> :
                    <p></p>
                }
                <button>Add card info</button>
                <button onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
)
}