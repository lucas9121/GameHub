import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editUser, deleteUser } from "../../utilities/users-service"
import styles from './MyAccount.module.css'

export default function MyAccount({user, setUser, refresh, setRefresh}) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [editBtn, setEditBtn] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const name = useRef(null)
    const username = useRef(null)
    const email = useRef(null)

    const handleDelete = async (event) => {
        // making this an async await makes the code terminate after the fetch request
        try {
            await deleteUser(user._id)
        } catch(e) {
            console.log(e)
        } finally {
            navigate('/games')
            setUser(null)
            setRefresh(!refresh)
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const newUser = user
        newUser.name = name.current.value
        newUser.username = username.current.value
        newUser.email = email.current.value
        try{
            const res = await editUser(newUser)
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
                // if true, display the edit form
                editBtn ?
                <div onSubmit={handleSubmit}>
                    <form autoComplete="off" className={styles.form}>
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