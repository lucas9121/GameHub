import sendRequest from "./send-request";

const BASE_URL = '/api/games'

export async function getGames(){
    return await sendRequest(BASE_URL)
}

export async function createGame(payload){
    return await sendRequest(BASE_URL, "POST", payload)
}

export async function updateGame(id, payload){
    return await sendRequest(`${BASE_URL}/${id}`, "PUT", payload)
}

export async function deleteGame(id){
    return await sendRequest(`${BASE_URL}/${id}`, "DELETE")
}

export async function getOneGame(id){
    return await sendRequest(`${BASE_URL}/${id}`)
}