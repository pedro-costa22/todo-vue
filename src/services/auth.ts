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
        setUserLocalStorage({
          name: response?.data?.newUser?.name,
          email:  response?.data?.newUser?.email,
          id: response?.data?.newUser?.id,
        });
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
      setUserLocalStorage({
        name: response?.data?.user?.name,
        email: response?.data?.user?.email,
        id: response?.data?.user?.id,
      });
      return response;
    }
    
  } catch (error) {
    return error;
  }
}





