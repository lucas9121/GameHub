import sendRequest from "./send-request";

const BASE_URL = '/api/carts'

async function getCart(){
    return sendRequest(BASE_URL)
}