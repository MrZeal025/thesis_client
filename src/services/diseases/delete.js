import axios from 'axios';
import  { baseUrl } from "../baseUrl";

// get all location data
export const deleteOneDisease = (id) => {
  return axios.delete(`${baseUrl}/disease/${id}`);
};
