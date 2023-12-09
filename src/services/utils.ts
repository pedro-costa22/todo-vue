import { IUserAuth } from "../types/user";

export function setUserLocalStorage(user: IUserAuth | null){
    localStorage.setItem('user', JSON.stringify(user));
 }
 
 export function getUserLocalStorage(){
    const json = localStorage.getItem('user');
 
    if(!json) {
       return null;
    }
 
    const user = JSON.parse(json);
    return user ?? null;
 }