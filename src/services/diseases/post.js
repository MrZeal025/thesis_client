import axios from 'axios';
import  { baseUrl } from "../baseUrl";

// get all location data
export const postOneDisease = (data) => {
  return axios.post(`${baseUrl}/disease`, data);
};
