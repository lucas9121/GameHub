import * as usersAPI  from './users-api';
import { jwtDecode } from "jwt-decode"

export async function signUp(userData) {
  // Delete the network request code to the
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.signUp(userData);
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}

export async function getAll(){
  const sessionToken = await usersAPI.getAll()
  sessionStorage.setItem('sessionToken', sessionToken)
  return getAllUsers()
}

export function getToken() {
  const token = localStorage.getItem('token');
  // getItem will return null if no key
  if (!token) return null;
  try {
    const payload = decodeToken(token);
    // A JWT's expiration is expressed in seconds, not miliseconds
    if (payload.exp < Date.now() / 1000) {
      // Token has expired
      localStorage.removeItem('token');
      return null;
    }
    return token;
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem('token');
    return null;
  }
}

export function getSessionToken() {
  const sessionToken = sessionStorage.getItem('sessionToken');
  if (!sessionToken) return null;
  decodeToken(sessionToken);
  return sessionToken;
}

export function getAllUsers(){
  const sessionToken = getSessionToken();
  return sessionToken ? decodeToken(sessionToken).user : null;
}

export function getUser() {
  const token = getToken();
  if(token){ 
    const user = decodeToken(token).user;
    return user
  }
  return null
}

export async function editUser(payload){
  localStorage.removeItem('token')
  const token = await usersAPI.update(payload)
  localStorage.setItem('token', token);
  return getUser()
}

export async function deleteUser(id){
  await usersAPI.Delete(id)
  return logOut()
}

export async function findUser(id){
  const tempToken = await usersAPI.getUser(id)
  sessionStorage.setItem('tempToken', tempToken)
  return getTempUser()
}

export function getTempToken(){
  const tempToken = sessionStorage.getItem('tempToken');
  if(!tempToken) return null
  try {
    const payload = decodeToken(tempToken)
    return tempToken;
  } catch (error) {
    
  }
}

export function getTempUser(){
  const tempToken = getTempToken()
  return tempToken ? decodeToken(tempToken).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
  sessionStorage.clear()
  sessionStorage.setItem('cart', JSON.stringify([]))
}

// Add a helper function to decode the token
function decodeToken(token) {
  const test = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1NTlhYjZkNzQ1ZjYwNmRjNWM3NjhmNyIsIm5hbWUiOiJ0ZXN0IHVzZXIiLCJ1c2VybmFtZSI6InRlc3RVc2VyMSIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsImFjY291bnQiOiJnYW1lciIsImJvdWdodCI6W10sInF1ZXN0aW9uMSI6IldoYXQgaXMgdGhlIG5hbWUgb2YgeW91ciBmaXJzdCBwZXQ_IiwiYW5zd2VyMSI6InRlc3QiLCJxdWVzdGlvbjIiOiJXaGF0IGlzIHRoZSBuYW1lIG9mIHRoZSB0b3duIHdoZXJlIHlvdSB3ZXJlIGJvcm4_IiwiYW5zd2VyMiI6InRlcyIsImNyZWF0ZWRBdCI6IjIwMjMtMTEtMTlUMDY6MzA6MDUuNzQ5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMTEtMTlUMDY6MzI6MjAuMDQ4WiIsIl9fdiI6MH0sImlhdCI6MTcwMDM3OTMwMSwiZXhwIjoxNzAwNDY1NzAxfQ.LvwwpeV7lZ-ps-DnQpNJCKDTf8nErj9lC4S6h9Sajgs'
  // console.log(jwtDecode(test))
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    console.log("Token to decode:", token);
    return null;
  }
}