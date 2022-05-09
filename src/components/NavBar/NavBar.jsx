import AuthPage from "../../pages/AuthPage/AuthPage"
import UserLogOut from "../UserLogOut/UserLogOut"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useState, useEffect } from "react"

export default function NavBar({ user, setUser, setActClk, actClk, setSearchClk, signClk, setSignClk}) {
    const [options, setOptions] = useState([])

    const dropdown = () => {
        // opens or closes dropdown on navbar
        setActClk(!actClk)
        //removes focus from search bar
        setSearchClk(false)
    }
    
    useEffect(() => {
        if(actClk){
            if(user.account ===  "gamer"){
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/cart', name: 'Cart' }, <UserLogOut setUser={setUser} actClk={actClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/> ]);
            } else {
                setOptions([{url: `/account/${user._id}`, name: 'My Account' }, {url: '/new', name: 'New Game' }]);
            }
        } else {
            setOptions([])
        } 
    }, [actClk])

    return(
        <nav className={styles.NavBar}>
            <Link to={'/'} onClick={() => {setActClk(false); setSearchClk(false)}} ><h1>GameHub</h1></Link>
            {
                user  ?
                <div>
                    <ul className={styles.dropdown}>
                        {/* I had to add this div to center the dropdown item */}
                        <div><p style={{margin: '1.5vh'}}></p></div>
                            <li style={actClk ? {listStyleType: 'disclosure-open'} : null}><button onClick={dropdown}>Hello {user.name}</button></li>
                                {
                                    options.map((option, idx) => {
                                        return(
                                            idx === options.length - 1 ?
                                            <li key={idx} style={{borderRadius: '0 0 10px 10px'}}>{option}</li>
                                            // <Link key={idx} to={`${option.url}`} style={{borderRadius: '0 0 10px 10px', position: 'relative', zIndex: '2'}} onClick={dropdown} >{option.name}</Link>
                                            :
                                            <li key={idx}><Link to={`${option.url}`} onClick={dropdown}>{option.name}</Link></li>
                                        )
                                    })
                                }

                    </ul>
                    <Link to='/cart'>Cart</Link>
                    {/* <UserLogOut setUser={setUser} actClk={actClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/> */}
                </div> :
                <div className={styles.noUser}>
                    <AuthPage user={user} setUser={setUser} signClk={signClk} setSignClk={setSignClk} setActClk={setActClk} setSearchClk={setSearchClk}/>
                </div>
            }
        </nav>
    )
}