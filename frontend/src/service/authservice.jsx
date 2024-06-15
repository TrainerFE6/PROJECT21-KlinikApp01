// src/services/authService.js
import axios from 'axios';

export const logout = async () => {
  try {
    const response = await axios.delete('http://localhost:5000/logout');
    console.log(response.data.msg); // Optional: Handle the response message
    return response.data;
  } catch (error) {
    console.error("There was an error logging out:", error);
    throw error;
  }
};


export const logoutUser = async () => {
  try {
    const response = await axios.delete('http://localhost:5000/LogoutUser');
    console.log(response.data.msg); // Optional: Handle the response message
    return response.data;
  } catch (error) {
    console.error("There was an error logging out:", error);
    throw error;
  }
};


