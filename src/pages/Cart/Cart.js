import { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import * as cartAPI from '../../utilities/carts-api'
export default function Cart() {
    const [cart, setCart] = useState([])
    useEffect(() => {
        (async () => {
            try{
                const res = await cartAPI.getCart()
                setCart(res)
            } catch(e) {
                console.log(`front end error ${e}`)
            }
        })()
    }, [])
    console.log('CART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(cart)

    return(
        <main className={styles.Cart}>
            <h1>Cart page</h1>
        </main>
    )
}