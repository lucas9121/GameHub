import sendRequest from "./send-request";

const BASE_URL = '/api/carts'


// Gets cart from database
export async function getCart(userId){
    console.log('Get Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
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
    console.log('Compare Carts!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const dataCart = await sendRequest(`${BASE_URL}?user=${userId}`)
    console.log(dataCart)
    console.log(strgCart)
    for(let i = 0; i <dataCart.length; i++){
        const foundCart = strgCart.find((obj) => obj.game._id === dataCart[i].game._id)
        if(foundCart && foundCart.quantity !== dataCart[i].quantity){
            console.log(foundCart)
            console.log(await dataCart[i])
            dataCart[i].quantity += 1
            console.log(dataCart[i])
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
    console.log('Add to Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    payload.quantity = payload.quantity ? payload.quantity : 1
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    let foundCart = cart.find((obj) => obj.game._id === payload.game._id )
    const newCart = [...cart, payload]
    console.log(newCart)
    console.log(payload)
    // if game is already in a cart schema
    if(foundCart){
        foundCart.quantity += payload.quantity
        console.log(foundCart)
        const index = cart.indexOf(foundCart)
        cart.splice(index, 1, foundCart)
        console.log(cart)
        // if user is logged in
        if(payload.user){
            console.log('user found cart')
            return updateCart(foundCart)
        } else {
            return sessionStorage.setItem('cart', JSON.stringify(cart))
        }
    // if game is not in a schema
    //if user is logged in
    } else if(payload.user){
        console.log('User is logged in')
        return sendRequest(BASE_URL, 'POST', payload)
    } else {
        return sessionStorage.setItem('cart', JSON.stringify(newCart))
    }
}

export async function updateCart(payload){
    if(payload.user){
        try{
            console.log(`Update console`)
            console.log(payload)
            console.log(payload._id)
            await sendRequest(BASE_URL, 'PUT', payload)
            return await getCart(payload.user)
        }catch(err){
            console.log(`${err} in utitilies`)
        }
    }
}


// Checks if cart in storage is empty when logging in
export function checkCart(userId){
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    if(cart && cart.length > 0){
        console.log('checkCart found cart items')
        return compareCarts(userId, cart)
    }
    return getCart(userId)
}