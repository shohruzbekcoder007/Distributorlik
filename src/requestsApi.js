import axios from './baseUrl';
import { getToken } from './globalState';

export const  getRequest = async (url) => {
    axios.get(url,
        // { headers: {"Authorization" : `Bearer ${getToken}`} 
    )}
