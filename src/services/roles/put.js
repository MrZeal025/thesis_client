import axios from 'axios';
import  { baseUrl } from "../baseUrl";

// get all location data
export const putOneRole = (id, data) => {
  return axios.put(`${baseUrl}/roles/${id}`, data);
};
