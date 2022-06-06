import sendRequest from "./send-request";
import { updateGame } from "./games-api";

const BASE_URL = '/api/carts'

// Gets cart from database
export async function getCart(userId){
    console.log('Get Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    if(!userId) return getSessionCart()
    try{
        return await sendRequest(`${BASE_URL}?user=${userId}`)
    } catch(err) {
        console.log(`${err} in utitilies`)
    }
}

function getSessionCart(){
    return JSON.parse(sessionStorage.getItem('cart'))
}


// Compares cart in the database with storage cart for any repeated games
function compareCarts(dtbsCart, strgCart){
    console.log('Compare Carts!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const userId = strgCart[0].user
    // user had a cart before logging in and also had a cart in the system
    if(dtbsCart.length > 0){
        for(let i = 0; i <dtbsCart.length; i++){
            const foundCart = strgCart.find((obj) => obj.games[0]._id === dtbsCart[i].games[0]._id)
            if(foundCart){
                updateCart(dtbsCart[i], foundCart.games.length)
                delete foundCart.user
            }
        }
    }
    for(let i = 0; i < strgCart.length; i++){
        createCart(strgCart[i])
    }
    return getCart(userId)
}


// Creates Schema if there is a user or adds to storage if there isn't one
async function createCart(payload){
    if(!payload.user){
        payload.quantity = payload.games.length
        payload._id = payload.games[0]._id
        const cart = getSessionCart()
        return sessionStorage.setItem('cart', JSON.stringify([...cart, payload]))  
    } 
    try{
        return await sendRequest(`${BASE_URL}`, 'POST', payload)
    } catch(err) {
        console.log(`${err} in utitilies`)
    }
}

// Checks if cart of a particular game already exists
async function findCart(payload){
    // if there's a user logged in
    if(payload.user){
        const cart = await getCart(payload.user)
        const foundCart = cart.find((obj) => payload.games[0]._id === obj.games[0]._id)
        return foundCart ? foundCart : null
    // no user loged in
    } else {
        const cart = getSessionCart()
        const foundCart = cart.find((obj) => payload.games[0]._id === obj.games[0]._id)
        return foundCart ? foundCart : null
    }
}

// Creates cart schema (only if there's a user) and adds it to storage
export async function addToCart(payload){
    console.log('Add to Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const cartItem = await findCart(payload)
    if(!cartItem) return await createCart(payload)
    return await updateCart(cartItem, 1)
}


// Updates cart in database
export async function updateCart(payload, num){
    console.log('Update Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    // if there's a user logged in
    if(payload.user){
        for(let i = 1; i <= num; i++){
            payload.games = [...payload.games, payload.games[0]]
        }
        payload.quantity = payload.games.length
        return await sendRequest(BASE_URL, 'PUT', payload)
    // no user loged in
    } else {
        const cart = getSessionCart()
        const cartItem = cart.find((obj) => obj._id === payload._id)
        cartItem.games = [...cartItem.games, payload.games[0]]
        cartItem.quantity = cartItem.games.length
        return sessionStorage.setItem('cart', JSON.stringify(cart))
    }
}


// Checks if cart in storage is empty when logging in
export async function checkCart(userId){
    console.log('Check Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const ssnCart = getSessionCart()
    const dtbsCart = await getCart(userId)
    // if there isn't a user signed in already (not a page refresh)
    if(ssnCart.length > 0){
        ssnCart.forEach((cartItem) => {
            cartItem.user = userId
            delete cartItem._id
        })
        return compareCarts(dtbsCart, ssnCart)
    } 
}

export async function deleteCart(id, idx){
    console.log('Delete Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    if(idx === undefined){
        try{
            return await sendRequest(`${BASE_URL}/${id}`, "DELETE")
        } catch(err) {
            console.log(`${err} in utitilies`)
            return
        } 
    } else {
        const cart = getSessionCart()
        cart.splice(idx, 1)
        return sessionStorage.setItem('cart', JSON.stringify(cart))
    }
}

export async function buyCart(payload, idx){
    console.log('Buy Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const gamePayload = payload.games[0]
    gamePayload.qty -= payload.quantity
    gamePayload.sold += payload.quantity
    await updateGame(gamePayload._id, gamePayload)
    if(payload.user){
        await deleteCart(payload._id)
        return
    }else {
        const cart = getSessionCart()
        cart.splice(idx, 1)
        return sessionStorage.setItem('cart', JSON.stringify(cart))
    }
}
