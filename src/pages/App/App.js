import styles from './App.module.css'
import {Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import Home from '../Home/Home'
import MyAccount from '../MyAccount/MyAccount'
import Cart from '../Cart/Cart'
import Show from '../Show/Show'
import Edit from '../Edit/Edit'
import New from '../New/New'
import { getUser} from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import SearchBar from '../../components/SearchBar/SearchBar'


export default function App(){
    const [games, setGames] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(getUser())
    const [userDlt, setUserDlt] = useState(false)
    const [actClk, setActClk] = useState(false)
    const [searchClk, setSearchClk] = useState(false)
    const [signClk, setSignClk] = useState(false)
    

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:3001/api/games')
                const data = await res.json()
                setGames(data)
                // will log me out with the refresh hook if userDlt hook is set to true
                if(userDlt){
                    setUser(getUser())
                    setUserDlt(false)
                }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [refresh])

    return(
        <main className={styles.App}>
            <NavBar user={user} setUser={setUser}  actClk={actClk} setActClk={setActClk} signClk={signClk} setSignClk={setSignClk} setSearchClk={setSearchClk}/>
            <SearchBar games={games} searchClk={searchClk} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk}/>
            <Routes>
                <Route path='/' element={<Home games={games} user={user} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk}/>} />
                <Route path='/new' element={<New user={user} refresh={refresh} setRefresh={setRefresh} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk}/>} />
                <Route path='/account/:id' element={<MyAccount user={user} setUserDlt={setUserDlt} refresh={refresh} setRefresh={setRefresh} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk} />} />
                <Route path='/cart' element={<Cart user={user} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk} />} />
                <Route path='/:id/edit' element={<Edit refresh={refresh} setRefresh={setRefresh} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk} />} />
                <Route path='/:id' element={<Show user={user} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk}/>} />
            </Routes>
        </main>
    )
}
