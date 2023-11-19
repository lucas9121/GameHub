import styles from './App.module.css'
import {Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react"
import * as gamesAPI from '../../utilities/games-api'
import * as cartAPI from '../../utilities/carts-api'
import Home from '../Home/Home'
import MyAccount from '../MyAccount/MyAccount'
import Cart from '../Cart/Cart'
import Show from '../Show/Show'
import Edit from '../Edit/Edit'
import New from '../New/New'
import { getUser} from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import AuthPage from '../AuthPage/AuthPage'
import SearchBar from '../../components/SearchBar/SearchBar'
import Footer from '../../components/Footer/Footer'
import DataPage from '../Data/Data'



export default function App(){
    const [games, setGames] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(getUser())
    const [isUpdated, setIsUpdated] = useState(false)
    const[loading, setLoading] = useState(true)

    //Cart
    const [cart, setCart] = useState([])
    const [newQty, setNewQty] = useState(0)

    // displays navbar dropdown options
    const [actClk, setActClk] = useState(false)
    const [searchClk, setSearchClk] = useState(false)
    const [signClk, setSignClk] = useState(false)

    // displays sign up/ log in div
    const [showSignin, setShowSignin] = useState(false)
    

    useEffect(() => {
        (async () => {
            try {
                const data = await gamesAPI.getGames()
                setGames(data)
                // when page mounts for the first time
                if(!sessionStorage.getItem('cart')){
                    const cart = []
                    sessionStorage.setItem('cart', JSON.stringify(cart))
                }
                // user info updated or deleted
                if(isUpdated){
                     setUser(getUser())
                     setIsUpdated(false)
                    }
                const cartItems = await cartAPI.getCart(user ? user._id : null)
                setCart(cartItems)
                setNewQty(cartItems.reduce((total, acc) => total + acc.quantity, 0))
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        })()
    }, [refresh])
    return(
        <main>
            <NavBar user={user} setUser={setUser} newQty={newQty} cart={cart} setCart={setCart} refresh={refresh} setRefresh={setRefresh} actClk={actClk} setActClk={setActClk} showSignin={showSignin} setShowSignin={setShowSignin} signClk={signClk} setSignClk={setSignClk} setSearchClk={setSearchClk}/>
            {
                // if the hook is true display this div
                showSignin &&
                <AuthPage setUser={setUser} refresh={refresh} setRefresh={setRefresh} signClk={signClk} setShowSignin={setShowSignin} setActClk={setActClk}/>
            }
            {
                loading && 
                <h2>Loading....</h2>
            }
            <div className={styles.mainDiv}>
                <div className={styles.App}>
                    <SearchBar user={user} games={games} searchClk={searchClk} setSearchClk={setSearchClk} setActClk={setActClk} setSignClk={setSignClk}/>
                    <Routes>
                        <Route path='/games' element={<Home games={games} user={user}/>} />
                        <Route path='/new' element={<New user={user} refresh={refresh} setRefresh={setRefresh}/>} />
                        <Route path='/account/:id' element={<MyAccount user={user} setIsUpdated={setIsUpdated} setUser={setUser} refresh={refresh} setRefresh={setRefresh} />} />
                        <Route path='/cart' element={<Cart user={user} cart={cart} refresh={refresh} setRefresh={setRefresh} />} />
                        <Route path='/data' element={<DataPage user={user} games={games} />} />
                        <Route path='/games/:id/edit' element={<Edit refresh={refresh} setRefresh={setRefresh} />} />
                        <Route path='/games/:id' element={<Show user={user} refresh={refresh} setRefresh={setRefresh}/>} />
                        <Route path='/*' element={<Navigate to='/games' />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </main>
    )
}
