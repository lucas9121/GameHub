import styles from './Data.module.css'
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard'
export default function DataPage({user, games}){
    return(  
        <div className={styles.Data}>
            {
                // if admin account is logged in
                user.account === 'admin' ?
                <AdminDashboard user={user} games={games} /> :
                // if developer account is logged in
                <h1>Data Page</h1>
            }
        </div>
    )
}