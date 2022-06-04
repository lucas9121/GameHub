import sendRequest from "./send-request";

const BASE_URL = '/api/carts'

// Gets cart from database
export async function getCart(userId){
    console.log('Get Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    try{
        return await sendRequest(`${BASE_URL}?user=${userId}`)
        // return sessionStorage.setItem('cart', JSON.stringify(cart))
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
        console.log(payload)
        console.log(cart)
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
    console.log(payload)
    console.log(payload.games[0])
    if(payload.user){
        const cart = await getCart(payload.user)
        const foundCart = cart.find((obj) => payload.games[0]._id === obj.games[0]._id)
        console.log('Cart was found!!!!!!!!!!')
        return foundCart ? foundCart : null
    // no user loged in
    } else {
        console.log("No user in find cart")
        const cart = getSessionCart()
        console.log(cart)
        const foundCart = cart.find((obj) => payload.games[0]._id === obj.games[0]._id)
        const index = cart.indexOf(foundCart)
        console.log(index)
        console.log(foundCart)
        return foundCart ? foundCart : null
    }
}

// Creates cart schema (only if there's a user) and adds it to storage
export async function addToCart(payload){
    console.log('Add to Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const cartItem = await findCart(payload)
    if(!cartItem) return await createCart(payload)
    console.log('cart item found')
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
        console.log(payload.quantity)
        console.log(payload.games.length)
        return await sendRequest(BASE_URL, 'PUT', payload)
    // no user loged in
    } else {
        const cart = getSessionCart()
        const cartItem = cart.find((obj) => obj._id === payload._id)
        const index = cart.indexOf(cartItem)
        console.log(index)
        cartItem.games = [...cartItem.games, payload.games[0]]
        cartItem.quantity = cartItem.games.length
        console.log(cartItem.quantity)
        return sessionStorage.setItem('cart', JSON.stringify(cart))
    }
}


// Checks if cart in storage is empty when logging in
export async function checkCart(userId){
    console.log('Check Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const ssnCart = getSessionCart()
    const dtbsCart = await getCart(userId)
    console.log(ssnCart)
    console.log(dtbsCart)
    // if there isn't a user signed in already (not a page refresh)
    if(ssnCart.length > 0){
        ssnCart.forEach((cartItem) => {
            cartItem.user = userId
            delete cartItem._id
        })
        return compareCarts(dtbsCart, ssnCart)
    } 
    // if(cart && cart.length > 0){
    //     console.log('checkCart found cart items')
    //     return compareCarts(userId, cart)
    // }
    // return getCart(userId)
}