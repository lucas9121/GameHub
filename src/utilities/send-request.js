import { getToken, getSessionToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch takes an optional options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Ensure headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
  const sessionToken = getSessionToken()
  if(sessionToken){
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${sessionToken}`
  }
  try {
    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) {
      return res.json();
    } else {
      const errorResponse = await res.json();
      console.error('Error Response:', errorResponse);
      throw new Error(`Request failed with status ${res.status}`);
    }
    
  } catch (error) {
    console.error('Request Error ', error)
    throw new Error('Request failed. Please check your network connection and try again.');
    
  }
}