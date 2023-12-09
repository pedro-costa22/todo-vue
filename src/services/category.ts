import axios from 'axios';
import { getUserLocalStorage } from './utils';
;
const base_url = 'http://localhost:3000';
const idUser = getUserLocalStorage().id;

export async function createCategory(name: string) {
    try {
      const resp = await axios.post(`${base_url}/category/${idUser}`, name);

      if(resp.status == 201) {
        return resp;
      }
      
    } catch (error) {
      return error;
    }
};

export async function getAllCategories() {
  try {
    const resp = await axios.get(`${base_url}/categories/${idUser}`);

    if(resp.status == 200) {
      return resp;
    }
    
  } catch (error) {
    return error;
  }
};

export async function updateCategory(id: string | number, newName: string) {
  try {
    const resp = await axios.put(`${base_url}/category/${id}`, newName);
    
    if(resp.status == 200) {
      return resp;
    }
    
  } catch (error) {
    return error;
  }
};

export async function deleteCategory(id: string | number) {
  try {
    const resp = await axios.delete(`${base_url}/category/${id}`);

    if(resp.status == 200) {
      return resp;
    }
    
  } catch (error) {
    return error;
  }
}
