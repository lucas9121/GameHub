import sendRequest from './send-request';

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users'

export async function signUp(userData) {
    // Fetch uses an options obejct as a second arg to make requests
    // other than basic GET requests, include data, headers, etc.
    const res = await fetch(BASE_URL, {
        method: 'POST',
        // Tells the backend what type of date it is receiving, which in this case it is JSON
        headers: { 'Content-Type': 'application/json'},
        //Fetch requires data payloads to be stringfied
        // and assigned tp a body property on the options obejct
        body: JSON.stringify(userData)
    })
    // Check if request was successful
    if(res.ok) {
        //res.json() will resolve to the JWT
        return res.json()
    } else {
        throw new Error('Invalid Sign Up')
    }
}

export function getAll(){
    return sendRequest(`${BASE_URL}/index`)
}

export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function update(userData){
    return sendRequest(`${BASE_URL}/${userData._id}`, 'PUT', userData)
}

export function Delete(id){
    return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE')
}

export function getUser(id){
    return sendRequest(`${BASE_URL}/${id}`)
}