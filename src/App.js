import './App.css'
import {Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import Home from './pages/Home'
import MyAccount from './pages/MyAccount'
import Cart from './pages/Cart'
import Show from './pages/Show'
import Edit from './pages/Edit'

export default function App(){
    const [games, setGames] = useState([])

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
    }, [])

    return(
        <main className='App'>
            <Routes>
                <Route path='/' element={<Home games={games}/>} />
                <Route path='/account' element={<MyAccount />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/:id/edit' element={<Edit />} />
                <Route path='/:id' element={<Show />} />
            </Routes>
        </main>
    )
}
