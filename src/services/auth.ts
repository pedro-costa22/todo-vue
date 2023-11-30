import axios from 'axios';
import { IUser, IUserLogin } from "../types/user";
import { setUserLocalStorage } from "./utils";

const base_url = 'http://localhost:3000';

export async function create(user: IUser) {
    try {
      const response = await axios.post(`${base_url}/register`, {
        ...user
      });

      if(response.status == 201) {
        setUserLocalStorage(user);
        return response;
      }
      
    } catch (error) {
      return error;
    }
};

export async function login(userLogin: IUserLogin) {
  try {
    const response = await axios.post(`${base_url}/login`, {
      ...userLogin
    });

    if(response.status == 200) {
      setUserLocalStorage(userLogin);
      return response;
    }
    
  } catch (error) {
    return error;
  }
}





