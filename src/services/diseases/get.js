import axios from 'axios';
import  { baseUrl } from "../baseUrl";

// get all location data
export const getAllDiseases = () => {
  return axios.get(`${baseUrl}/disease/many`);
};
