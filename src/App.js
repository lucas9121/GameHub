import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import MyAccount from './pages/MyAccount'
import Cart from './pages/Cart'

export default function App(){
    return(
        <main className='App'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<MyAccount />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </main>
    )
}
