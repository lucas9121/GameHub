import sendRequest from "./send-request";

const BASE_URL = '/api/carts'

export async function getCart(){
    return sendRequest(BASE_URL)
}