import axios from 'axios';

export const api = axios.create({
  baseURL: "http://192.168.18.28/backpizzaria/api/"
  //baseURL: "https://ieqpsj.com.br/api/"
})