import sendRequest from "./send-request";

const BASE_URL = '/api/carts'


// Gets cart from database
export async function getCart(userId){
    sessionStorage.clear()
    try{
        const cart = await sendRequest(`${BASE_URL}?user=${userId}`)
        sessionStorage.setItem('cart', JSON.stringify(cart))
    } catch(err) {
        console.log(`${err} in utitilies`)
    }
}


// Compares cart in the database with storage cart for any repeated games
export async function compareCarts(userId, strgCart){
    const dataCart = await sendRequest(`${BASE_URL}?user=${userId}`)
    for(let i = 0; i <dataCart.length; i++){
        const foundCart = strgCart.find((obj) => obj.game._id === dataCart[i].game._id)
        console.log(foundCart)
        if(foundCart){
            dataCart[i].quantity += strgCart.quantity
        }
        // return updateCart(dataCart)
    }
}


// Creates cart schema (only if there's a user) and adds it to storage
export function addToCart(payload){
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    const newCart = [...cart, payload]
    if(payload.user){
        sessionStorage.setItem('cart', JSON.stringify(newCart))
        return sendRequest(BASE_URL, 'POST', payload)
    } else {
        sessionStorage.setItem('cart', JSON.stringify(newCart))
        console.log(new Blob(Object.values(sessionStorage)).size)
    }
}


// Checks if cart in storage is empty when logging in
export function checkCart(userId){
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    if(cart && cart.length > 0){
        return compareCarts(userId, cart)
    }
    return getCart(userId)
}