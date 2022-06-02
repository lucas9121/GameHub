import sendRequest from "./send-request";
import { useMemo } from 'react'

const BASE_URL = '/api/carts'

// useMemo(() =>  compareCarts(userId, strgCart), [strgCart])
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

function getLocalCart(){
    return JSON.parse(localStorage.getItem('cart'))
}


// Compares cart in the database with storage cart for any repeated games
function compareCarts(dtbsCart, strgCart){
    console.log('Compare Carts!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(dtbsCart)
    for(let i = 0; i <dtbsCart.length; i++){
        const foundCart = strgCart.find((obj) => obj.game._id === dtbsCart[i].game._id)
        if(foundCart && foundCart.quantity !== dtbsCart[i].quantity){
            const index = strgCart.indexOf(foundCart)
            console.log(foundCart)
            console.log(dtbsCart[i])
            foundCart.quantity += dtbsCart[i].quantity
            console.log(dtbsCart[i])
            strgCart.splice(index, 1, foundCart)
            console.log(strgCart)
            // try{
            //     await sendRequest(BASE_URL, 'PUT', dataCart[i])
            // }catch(err){
            //     console.log(`${err} in utitilies`)
            // } finally {
            //     console.log('Finally block console log')
            //     strgCart.splice(index, 1)
            //     console.log(strgCart)
            // }
        }
    }
    return updateSessionCart(strgCart)
}


// Creates cart schema (only if there's a user) and adds it to storage
export function addToCart(payload){
    console.log('Add to Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    // if front end didn't define a quantity amount then leave it as 1
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
    console.log('Update Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
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

function updateSessionCart(games){
    const cart = sessionStorage.setItem('cart', games)
    return cart
}


// Checks if cart in storage is empty when logging in
export async function checkCart(userId){
    console.log('Check Cart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const lclCart = getLocalCart()
    const ssnCart = getSessionCart()
    const dtbsCart = await getCart(userId)
    console.log(lclCart)
    console.log(ssnCart)
    console.log(dtbsCart)
    // if there isn't a user signed in already (not a page refresh)
    if(!lclCart) return compareCarts(dtbsCart, ssnCart)
    // if(cart && cart.length > 0){
    //     console.log('checkCart found cart items')
    //     return compareCarts(userId, cart)
    // }
    // return getCart(userId)
}