import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { logOut } from "../../utilities/users-service"
import styles from './MyAccount.module.css'
import { getUser} from '../../utilities/users-service'

export default function MyAccount({user, setUser, setUserDlt, refresh, setRefresh}) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [editBtn, setEditBtn] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const name = useRef(null)
    const username = useRef(null)
    const email = useRef(null)

    const handleDelete = (event) => {
        // making this an async await makes the code terminate after the fetch request
        try {
            fetch(`/api/users/delete/${id}`, {method: 'DELETE'})
        } catch(e) {
            console.log(e)
        } finally {
            console.log('user deleted')
            // activates use effect on app page to refresh page
            setRefresh(!refresh)
            // activates conditional on app page to remove token, which will log user out after being deleted
            setUserDlt(true)
            navigate('/')
            logOut()
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        let data;
        try{
            const res = await fetch(`/api/users/${id}`, {
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
            // I need to turn data into json
            ///////////////////////// ALWAYS PUT AWAIT //////////////////////////////
            data = await res.json()
            // makes new token
            localStorage.setItem('token', data);
            // takes token, decodes and sets user to it
            setUser(getUser())
            console.log('edit made')
            setEditBtn(false)
            // activates use effect on app page to refresh page
            setRefresh(!refresh)
        }catch(e){
            console.log(e)
        }
    }


    return(
        <div className={styles.MyAccount}>
            <h2>My Account</h2> 
            {
                // if true, display the edit form
                editBtn ?
                <div onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn yes-btn">Edit Account</button>
                    {/* Set hook to false, which will hide the form without submitting it */}
                    <button className="btn no-btn" onClick={() => {setEditBtn(false)}} >Cancel</button>
                    </form>
                </div> :
                // display regular information
                <div className={styles.AccountInfo}>
                    <h4>Name</h4>
                    <p>{user.name}</p>
                    <h4>Username</h4>
                    <p>{user.username}</p>
                    <h4>Email</h4>
                    <p>{user.email} </p>
                    <h4>Account Type</h4>
                    <p style={{textTransform: 'capitalize'}}>{user.account}</p>
                    {/* sets hook to true, which will display the form */}
                    <div> 
                        <button className="btn main-btn" onClick={() => {setEditBtn(true)}}>Edit Account</button>
                        <button className="btn no-btn" onClick={handleDelete}>Delete Account</button>
                    </div>
                   
                </div>
            }
        </div>
)
}