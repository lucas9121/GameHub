import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { logOut } from "../../utilities/users-service"
import styles from './MyAccount.module.css'

export default function MyAccount({user, setUserDlt, refresh, setRefresh}) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [editBtn, setEditBtn] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const name = useRef(null)
    const username = useRef(null)
    const email = useRef(null)
    console.log(user)

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

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        console.log(name.current.value)
        try{
            await fetch(`http://localhost:3001/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value,
                    username: username.current.value,
                    email: email.current.value
                })
            })
            console.log('edit made')
            setEditBtn(false)
            setRefresh(!refresh)
        }catch(e){
            console.log(e)
        }
    }


    return(
        <div className={styles.MyAccount}>
            <h2>My Account</h2> 
            {
                editBtn ?
                <div className="account-info" onSubmit={handleSubmit}>
                    <form autoComplete="off">
                    <label>Name</label>
                    <input type="text" name="name" ref={name} defaultValue={user.name} />
                    <label>Username</label>
                    <input type="text" name="username" ref={username} defaultValue={user.username} />
                    <label>Email</label>
                    <input type="email" name="email" ref={email} defaultValue={user.email} />
                    <label>Account Type</label>
                    <select name="account" defaultValue={user.account} disabled>
                        <option  value="gamer">Gamer</option>
                        <option value='developer'>Developer</option>
                        <option value='admin'>Admin</option>
                    </select>
                    <button type="submit">Edit Account</button>
                    <button onClick={() => {setEditBtn(false)}} >Cancel</button>
                    </form>
                    <button onClick={handleDelete}>Delete Account</button>
                </div> :
                <div className="account-info">
                    <h4>Name</h4>
                    <p>{user.name}</p>
                    <h4>Username</h4>
                    <p>{user.username}</p>
                    <h4>Email</h4>
                    <p>{user.email} </p>
                    <h4>Account Type</h4>
                    <p style={{textTransform: 'capitalize'}}>{user.account}</p>
                    <button onClick={() => {setEditBtn(true)}}>Edit Account</button>
                    <button onClick={handleDelete}>Delete Account</button>
                </div>
            }
        </div>
)
}