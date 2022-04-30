import { logOut } from '../../utilities/users-service';
import {useNavigate} from "react-router-dom"

export default function UserLogOut({ setUser }) {
  const navigate = useNavigate()
    function handleLogOut() {
      logOut();
      setUser(null);
      navigate('/')
    }

    return (
      <div className="UserLogOut">
        <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
      </div>
    );
}