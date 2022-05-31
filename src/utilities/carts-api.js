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
        if(foundCart){
            dataCart[i].quantity += strgCart.quantity
            try{
                await sendRequest(BASE_URL, 'PUT', dataCart[i])
            }catch(err){
                console.log(`${err} in utitilies`)
            }
        }
    }
    return getCart(userId)
}


// Creates cart schema (only if there's a user) and adds it to storage
export function addToCart(payload){
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    let foundCart = cart.find((obj) => obj.game._id === payload.game._id )
    const newCart = [...cart, payload]
    // if game is already in a cart schema
    if(foundCart){
        foundCart.quantity += 1
        const index = cart.indexOf(foundCart)
        cart.splice(index, 1, foundCart)
        // if user is logged in
        if(payload.user){
            return updateCart(foundCart)
        } else {
            return sessionStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    // if game is not in a schema
    //if user is logged in
    if(payload.user){
        return updateCart(newCart)
    } else {
        return sessionStorage.setItem('cart', JSON.stringify(newCart))
    }
}

export async function updateCart(payload){
    if(payload.user){
        try{
            await sendRequest(BASE_URL, 'PUT', payload)
            return getCart(payload.user)
        }catch(err){
            console.log(`${err} in utitilies`)
        }
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