import styles from './Cart.module.css'
import * as cartAPI from '../../utilities/carts-api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Cart({user, cart, refresh, setRefresh}) {
    const navigate = useNavigate()
    const [invalid, setInvalid] = useState(false)
    const [color, setColor] = useState('')
 
    const handleDelete = async (evt, id, idx) => {
        evt.preventDefault()
        try {
            // if there is no user, send the id and index in the parameter
            if(user) return await cartAPI.deleteCart(id)
            return cartAPI.deleteCart(id, idx)
        } catch(err){
            console.log(err + ' on Cart page')
        }finally{
            if(cart.length === 1) navigate('/games')
            setRefresh(!refresh)
        }
    }

    const buyGame = async (evt, cartItem, idx) => {
        evt.preventDefault()
        try {
            return await cartAPI.buyCart(cartItem, idx)
        } catch(err){
            console.log(err + ' on Cart page')
        }finally{
            // this runs before cart is updated, so when cart length is 1 it's actually 0
            if(cart.length === 1) navigate('/games')
            setRefresh(!refresh)
        }
    }

    const handleChange = async (evt, idx) => {
        const input = evt.target.value
        const num = parseInt(input)
        if(input === '' || num < 1 || num > cart[idx].games[0].qty) return (setColor('red'), setInvalid(true))
        setInvalid(false)
        setColor('')
        try {
            await cartAPI.changeCart(cart[idx], idx, num)
            console.log('after try')
        } catch(err){
            console.log(err + ' on Cart page')
        } finally{
            setRefresh(!refresh)
        }
    }

    return(
        <main className={styles.Cart}>
            {
                cart.length === 0 ? <h2 className='text-center text-light'>Cart is Empty</h2> :
                cart.map((cartItem, idx) => {
                    return(
                        <div key={idx} className={styles.Game} style={cartItem.quantity <= cartItem.games[0].qty ? {border: 'solid green'}: {border: 'solid red'}}>
                            <div style={{backgroundImage: `url(${cartItem.games[0].img})`}}></div>
                            <div>
                                <h2>{cartItem.games[0].name}</h2>
                                <div className={styles.GameInfo}>
                                    {cartItem.games[0].price <= 0 ? <p>Free</p> : <p>${cartItem.games[0].price * cartItem.quantity} </p>}
                                    <div className={styles.Form}>
                                        <div>
                                            <label>Quantity:</label>
                                            <input name="buyNumber" className={styles.input} style={{color: `${color}`}} type="number" onChange={(evt) => {handleChange(evt, idx)}} defaultValue={cartItem.quantity}/>
                                        </div>
                                        {cartItem.games[0].qty > 0 ? <p className={styles.stock}>In Stock</p> : <p className={styles.stock} style={{color: 'red'}}>Out of Stock</p> }
                                        <button className='btn yes-btn' onClick={(evt) => {buyGame(evt, cartItem, idx)}} disabled={invalid}>Buy</button>
                                        <button className='btn no-btn' onClick={(evt) => {handleDelete(evt, cartItem._id, idx)}} >Remove</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })
            }              
        </main>
    )
}