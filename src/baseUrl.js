import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://159.65.233.187:8000/api/',
  baseURL: 'https://ferzu-warehouse.herokuapp.com/api/'
}); 

export default instance;

// sell-order-list