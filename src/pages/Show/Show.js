import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import GameReviews from "../../components/GameReviews/GameReviews"
import GameAbout from "../../components/GameAbout/GameAbout"
import GamePurchase from "../../components/GamePurchase/GamePurchase"
import DevGameButton from "../../components/DevGameButton/DevGameButton"
import AdminGameButtons from "../../components/AdminGameButtons/AdminGameButtons"
import * as gamesAPI from '../../utilities/games-api'
import * as cartsAPI from "../../utilities/carts-api"
import styles from './Show.module.css'

export default function Show({user, refresh, setRefresh}) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])

    // reloads the page
    const [render, setRender] = useState(false)

    //opens admin div box
    const [noBtn, setNoBtn] = useState(false)
    const noReason = useRef(null)

    const [cartData, setCartData] = useState({});


    // When page mounts, fetch the individual game from database
    useEffect(() => {
        (async () => {
            try {
                const data = await gamesAPI.getOneGame(id)
                setGame(data)
                setReviews(data.reviews)
            } catch(e) {
                console.log(e)
            }
        })() 
    }, [render, id])


    // changes the approved status of a game
    const handleApproved = async (event, response) => {
        event.preventDefault()
        const newGame = game
        newGame.approved = response
        try {
            if(response === 'yes'){
                // if admin clicked yes
                newGame.reason = ''
            } else {
                // if admin clicked no
                newGame.reason = noReason.current.value
            }
            await gamesAPI.updateGame(newGame._id, newGame)
        } catch(e) {
            console.log(e)
        } finally {
            setNoBtn(false)
            setRefresh(!refresh)
            navigate('/games')
        }
    }

    const handleCartClicked = async (evt, payload) => {
        evt.preventDefault()
        try {
            if(user) cartData.user = user._id
            cartData.games = [payload]
            await cartsAPI.addToCart(cartData)
            setRefresh(!refresh)
        } catch(err){
            console.log(err + ' Front end problem')
        }
    }



    return(
        <main className={styles.show}>
            <h2>{game.name} </h2>
            {
                // Developer user and Admin user buttons and messages
                user?.account === 'developer' && 
                <DevGameButton game={game} />
            }
            {
                // review buttons for admin user
                user?.account === 'admin' && 
                <AdminGameButtons game={game} noBtn={noBtn} setNoBtn={setNoBtn} noReason={noReason} handleApproved={handleApproved} /> 
            }
            <img src={game.img} alt={game.name} max-width="700" max-height="700" />
            <GamePurchase game={game} user={user} addToCart={handleCartClicked} />
            <GameAbout game={game} />
            <GameReviews user={user} reviews={reviews} render={render} setRender={setRender} id={id}/>
        </main>
    )
}