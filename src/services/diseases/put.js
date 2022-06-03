import axios from 'axios';
import  { baseUrl } from "../baseUrl";

// get all location data
export const putOneDisease = (data, id) => {
  return axios.put(`${baseUrl}/disease/${id}`, data);
};
