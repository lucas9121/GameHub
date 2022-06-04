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
    console.log(dtbsCart)
    console.log(strgCart)
    // user had a cart before logging in and also had a cart in the system
    if(dtbsCart.length > 0){
        for(let i = 0; i <dtbsCart.length; i++){
            const foundCart = strgCart.find((obj) => obj.games[0]._id === dtbsCart[i].games[0]._id)
            if(foundCart){
                const index = strgCart.indexOf(foundCart)
                console.log(index)
                console.log(foundCart)
                console.log(dtbsCart[i])
                updateCart(dtbsCart[i], foundCart.games.length)
                strgCart.splice(index, 1)
                console.log(strgCart)
            }
        }
        return getCart(dtbsCart.user)
    }
    for(let i = 0; i < strgCart.length; i++){
        createCart(strgCart[i])
    }
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

    // // if front end didn't define a quantity amount then leave it as 1
    // payload.quantity = payload.quantity ? payload.quantity : 1
    // const cart = JSON.parse(sessionStorage.getItem('cart'))
    // let foundCart = cart.find((obj) => obj.game._id === payload.game._id )
    // const newCart = [...cart, payload]
    // console.log(newCart)
    // console.log(payload)
    // // if game is already in a cart schema
    // if(foundCart){
    //     foundCart.quantity += payload.quantity
    //     console.log(foundCart)
    //     const index = cart.indexOf(foundCart)
    //     cart.splice(index, 1, foundCart)
    //     console.log(cart)
    //     // if user is logged in
    //     if(payload.user){
    //         console.log('user found cart')
    //         return updateCart(Array.from(foundCart))
    //     } else {
    //         return sessionStorage.setItem('cart', JSON.stringify(cart))
    //     }
    // // if game is not in a schema
    // //if user is logged in
    // } else if(payload.user){
    //     console.log('User is logged in')
    //     return sendRequest(BASE_URL, 'POST', payload)
    // } else {
    //     return sessionStorage.setItem('cart', JSON.stringify(newCart))
    // }
}


// Updates cart in database
export async function updateCart(payload, num){
    console.log('Update Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    for(let i = 0; i <= num; i++){
        payload.games = [...payload.games, payload.games[0]]
    }
    payload.quantity = payload.games.length
    console.log(payload.quantity)
    console.log(payload.games.length)
    // if there's a user logged in
    if(payload.user){
        return await sendRequest(BASE_URL, 'PUT', payload)
    // no user loged in
    } else {
        const cart = getSessionCart()
        const cartItem = cart.find((obj) => obj._id === payload._id)
        const index = cart.indexOf(cartItem)
        console.log(index)
        cartItem.games = payload.games
        cartItem.quantity = payload.quantity
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