import axios from 'axios';
import  { baseUrl } from "../baseUrl";

export const loginAdmin = (data) => {
  return axios.post(`${baseUrl}/auth/login`, data);
};

export const checkAccess = (role) => {
  return axios.get(`${baseUrl}/roles/check/${role}`);
}