import sendRequest from "./send-request";

const BASE_URL = '/api/carts'

export async function getCart(userId){
    sessionStorage.clear()
    const cart = await sendRequest(BASE_URL)
    return sessionStorage.setItem('cart', cart)
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
    if(cart.length > 0){
        for(let i = 0; i < cart.length; i++){
            cart[i].user = userId
        }
    }
    return getCart(userId)
}