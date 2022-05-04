import { logOut } from '../../utilities/users-service';
import {useNavigate} from "react-router-dom"
import styles from './UserLogOut.module.css'

export default function UserLogOut({ setUser }) {
  const navigate = useNavigate()
    function handleLogOut() {
      logOut();
      setUser(null);
      navigate('/')
    }

    return (
      <div className={styles.UserLogOut}>
        <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
      </div>
    );
}