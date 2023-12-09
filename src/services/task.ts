import axios from 'axios';
import { getUserLocalStorage } from './utils';
import INewTask from '../types/task';

const base_url = 'http://localhost:3000';
const idUser = getUserLocalStorage().id;

export async function createTask(task: INewTask) {
    try {
      const resp = await axios.post(`${base_url}/task`, {
        ...task,
        userId: idUser
      });
      console.log(resp);

      
    } catch (error) {
      return error;
    }
};