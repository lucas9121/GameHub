import * as usersAPI  from './users-api';
import * as cartsAPI from './carts-api'

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
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's expiration is expressed in seconds, not miliseconds
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getSessionToken() {
  const sessionToken = sessionStorage.getItem('sessionToken');
  if (!sessionToken) return null;
  JSON.parse(atob(sessionToken.split('.')[1]));
  return sessionToken;
}

export function getAllUsers(){
  const sessionToken = getSessionToken();
  return sessionToken ? JSON.parse(atob(sessionToken.split('.')[1])).user : null;
}

export function getUser() {
  const token = getToken();
  if(token){ 
    const user = JSON.parse(atob(token.split('.')[1])).user;
    return user
  }
  return null
}

export async function editUser(payload){
  const token = await usersAPI.update(payload)
  localStorage.setItem('token', token);
  return getUser()
}

export async function deleteUser(id){
  await usersAPI.Delete(id)
  return logOut()
}

export function logOut() {
  localStorage.removeItem('token');
  sessionStorage.clear()
  sessionStorage.setItem('cart', JSON.stringify([]))
}