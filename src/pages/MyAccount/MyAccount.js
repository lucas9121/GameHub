export default function MyAccount({user}) {
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
            </div>
        </div>
)
}