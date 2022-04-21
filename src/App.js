import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import MyAccount from './pages/MyAccount'

export default function App(){
    return(
        <main className='App'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<MyAccount />} />
            </Routes>
        </main>
    )
}
