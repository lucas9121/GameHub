import sendRequest from "./send-request";

const BASE_URL = '/api/carts'

export async function getCart(userId){
    sessionStorage.clear()
    let cart 
    try{
        cart = await sendRequest(`${BASE_URL}?user=${userId}`)
        sessionStorage.setItem('cart', JSON.stringify(cart))
        return cart
    } catch(err) {
        console.log(`${err} in utitilies`)
    }
}

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

export function checkCart(userId){
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    if(cart && cart.length > 0){
        for(let i = 0; i < cart.length; i++){
            cart[i].user = userId
            addToCart(cart[i])
        }
    }
    return getCart(userId)
}