import sendRequest from "./send-request";

const BASE_URL = '/api/carts'

export function getCart(){
    return sendRequest(BASE_URL)
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

// export function addtoStorage(payload){
//     if(payload){
//         sessionStorage.setItem('cart', )
//     }
// }