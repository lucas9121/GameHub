import { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import * as cartAPI from '../../utilities/carts-api'
export default function Cart({user, cart, setCart, refresh, setRefresh, setSignInClk, setSearchClk, setActClk}) {

    const handleDelete = async (evt, id, idx) => {
        evt.preventDefault()
        try {
            // if there is no user, send the id and index in the parameter
            if(user) return await cartAPI.deleteCart(id)
            return cartAPI.deleteCart(id, idx)
        } catch(err){
            console.log(err + ' on Cart page')
        }finally{
            setRefresh(!refresh)
        }
    }

    return(
        <main className={styles.Cart}>
            {
                cart.length === 0 ? <h2 className='text-center text-light'>Cart is Empty</h2> :
                cart.map((cartItem, idx) => {
                    return(
                        <div className={styles.Game} style={cartItem.quantity <= cartItem.games[0].qty ? {border: 'solid green'}: {border: 'solid red'}}>
                            {/* <img src={cartItem.games[0].img} alt={cartItem.games[0].img} /> */}
                            <div style={{backgroundImage: `url(${cartItem.games[0].img})`}}></div>
                            <div>
                                <h2>{cartItem.games[0].name}</h2>
                                <div className={styles.GameInfo}>
                                    {cartItem.games[0].price <= 0 ? <p>Free</p> : <p>${cartItem.games[0].price * cartItem.quantity} </p>}
                                    <form className={styles.Form}>
                                        <div>
                                            <label>Quantity:</label>
                                            <input name="buyNumber" className={styles.input} type="number" defaultValue={cartItem.quantity}/>
                                        </div>
                                        {cartItem.games[0].qty > 0 ? <p className={styles.stock}>In Stock</p> : <p className={styles.stock} style={{color: 'red'}}>Out of Stock</p> }
                                        <input type="submit" className='btn yes-btn' value='Buy' />
                                        <button className='btn no-btn' onClick={(evt) => {handleDelete(evt, cartItem._id, idx)}} >Remove</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    )
                })
            }              
        </main>
    )
}