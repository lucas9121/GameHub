import './App.css'
import {Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import Home from '../Home/Home'
import MyAccount from '../MyAccount/MyAccount'
import Cart from '../Cart/Cart'
import Show from '../Show/Show'
import Edit from '../Edit/Edit'
import New from '../New/New'
import AuthPage from '../AuthPage/AuthPage'

export default function App(){
    const [games, setGames] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:3001/api/games')
                const data = await res.json()
                setGames(data)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [refresh])

    return(
        <main className='App'>
            <AuthPage />
            <Routes>
                <Route path='/' element={<Home games={games}/>} />
                <Route path='/new' element={<New refresh={refresh} setRefresh={setRefresh}/>} />
                <Route path='/account' element={<MyAccount />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/:id/edit' element={<Edit refresh={refresh} setRefresh={setRefresh} />} />
                <Route path='/:id' element={<Show />} />
            </Routes>
        </main>
    )
}
