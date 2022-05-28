import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import GameReviews from "../../components/GameReviews/GameReviews"
import GameAbout from "../../components/GameAbout/GameAbout"
import GamePurchase from "../../components/GamePurchase/GamePurchase"
import DevGameButton from "../../components/DevGameButton/DevGameButton"
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


    // When page mounts, fetch the individual game from database
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/games/${id}`)
                const data = await response.json()
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
        try {
            if(response === 'yes'){
                // if admin clicked yes
                await fetch(`/api/games/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        approved: response,
                        reason: ''
                    })
                })
            } else {
                // if admin clicked no
                await fetch(`/api/games/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        approved: response,
                        reason: noReason.current.value
                    })
                })
            }
        } catch(e) {
            console.log(e)
        } finally {
            setNoBtn(false)
            setRefresh(!refresh)
            navigate('/')
        }
    }



    return(
        <main className={styles.show}>
            <h2>{game.name} </h2>
            {
                // Developer User and Admin user buttons and messages
                // edit game button for developer user if game wasn't rejected
                user && user.account === 'developer' ? 
                <DevGameButton game={game} />:
                // review buttons for admin user
                user && user.account === 'admin' ? 
                // if admin has already been rejected the game before
                game.reason ?
                <>
                    <h5>Previous comment</h5>
                    <p>{game.reason}</p>
                    <>
                        <h5 style={{marginBottom: '10px'}}>Approved?</h5>
                        <rndm style={{display: 'flex', marginBottom: '10px', gap: '5px'}}>
                            <button className="btn yes-btn" onClick={(evt) => {handleApproved(evt, 'yes')}}>Yes</button>
                            <button className="btn no-btn" onClick={(evt) => {setNoBtn(true)}}>No</button>
                        </rndm> 
                    </>
                </> :
                // if game hasn't been rejected before
                <>
                    <h5 style={{marginBottom: '10px'}}>Approved?</h5>
                    <rndm style={{display: 'flex', marginBottom: '10px', gap: '5px'}}>
                        <button className="btn yes-btn" onClick={(evt) => {handleApproved(evt, 'yes')}}>Yes</button>
                        <button className="btn no-btn" onClick={(evt) => {setNoBtn(true)}}>No</button>
                    </rndm> 
                </>:
                null
            }
            {
                // if admin didn't approve the game show the text box to give reasons why
                noBtn ?
                <form onSubmit={(evt) => {handleApproved(evt, 'no')}}>
                    <label>Explain what needs to be changed</label>
                    <textarea cols="40" rows="3" ref={noReason} required></textarea>
                    <div>
                        <button type="submit" className="btn yes-btn">Submit</button>
                        <button className="btn no-btn" onClick={() => {setNoBtn(false)}}>Cancel</button>
                    </div>
                </form> : null
            }
            <img src={game.img} alt={game.name} max-width="700" max-height="700" />
            <GamePurchase game={game} user={user} />
            <GameAbout game={game} />
            <GameReviews user={user} reviews={reviews} render={render} setRender={setRender} id={id}/>
        </main>
    )
}