import { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import * as cartAPI from '../../utilities/carts-api'
export default function Cart({user, cart, setCart, refresh, setRefresh, setSignInClk, setSearchClk, setActClk}) {

    return(
        <main className={styles.Cart}>
            {
                cart.length === 0 ? <h2 className='text-center text-light'>Cart is Empty</h2> :
                cart.map((cartItem) => {
                    return(
                        <div className='cart-info'>
                            <img src={cartItem.games[0].img} alt={cartItem.games[0].img} />
                            <h2>{cartItem.games[0].name}</h2>
                            <div className='cart-choice'>
                                {cartItem.games[0].price <= 0 ? <p>Free</p> : <p>${cartItem.games[0].price * cartItem.quantity} </p>}
                                <form className='buy-form'>
                                    Qty: <input name="buyNumber" className='qty-input' type="number" defaultValue={cartItem.quantity}/>
                                    {cartItem.games[0].qty > 0 ? <p className="stock">In Stock</p> : <p className="stock" style={{color: 'red'}}>Out of Stock</p> }
                                    <input type="submit" className='btn yes-btn' value='Buy' />
                                </form>
                                <button type="submit" className='btn no-btn' value='Remove'>Remove</button>
                            </div>
                        </div>
                    )
                })
            }              
        </main>
    )
}