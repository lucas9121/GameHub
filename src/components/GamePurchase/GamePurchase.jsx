import styles from './GamePurchase.module.css'
import { useState, useEffect } from 'react'
import * as gamesAPI from '../../utilities/games-api'

export default function GamePurchase({game, user, addToCart}) {
    const [addGameBtn, setAddGameBtn] = useState(false)

    const addGameQty = async (num) => {
        const newGame = game
        newGame.qty += num
        console.log(newGame.qty)
        try {
            await gamesAPI.updateGame(game._id, newGame)
        } catch(e) {
            console.log(e)
        } finally {
            setAddGameBtn(false)
        }
    }

    return(
        <div className={styles.purchase}>
            <div className={styles.title}>
                <h4>Buy {game.name} </h4>
            </div>
            <div>
                <p>Quantity: {game.qty} </p>
                <div className={styles.purchaseInfo}>
                    {game.price > 0  ? <p>Price: ${game.price}</p> : <p>Price: Free</p> }
                    {
                        //displays the add game quantity button for developer accounts 
                        user && user.account === 'developer' ?
                            <div>
                                <button className="btn sec-btn" style={addGameBtn ? {borderRadius: '10px 10px 0 0'} : null} onClick={() => setAddGameBtn(!addGameBtn)} >Add Game</button>
                                    { addGameBtn &&
                                        <ul className={styles.Add}>
                                            <li onClick={() => {addGameQty(10)}} >+10</li>
                                            <li onClick={() => {addGameQty(50)}} >+50</li>
                                            <li onClick={() => {addGameQty(100)}} >+100</li>
                                        </ul>
                                    }
                            </div> :
                        // disables add to cart button for admin account or if quantity is 0
                        user && user.account === 'admin' || game.qty <= 0 ?
                        <button className="btn sec-btn" disabled>Add to Cart</button> :
                        <button className="btn sec-btn" onClick={(evt) => addToCart(evt, game)}>Add to Cart</button>
                        
                    }
                </div>
            </div>
        </div>
    )
}