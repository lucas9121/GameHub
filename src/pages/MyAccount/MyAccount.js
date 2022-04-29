import { useNavigate, useParams } from "react-router-dom"

export default function MyAccount({user, refresh, setRefresh}) {
    const {id} = useParams()
    const navigate = useNavigate()

    const handleDelete = async (event) => {
        setRefresh(!refresh)
        navigate('/')
        try {
            const res = await fetch(`http://localhost:3001/api/users/${id}`, {method: 'DELETE'})
        } catch(e) {
            console.log(e)
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