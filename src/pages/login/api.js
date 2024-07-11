// api.js
import axios from "axios";

const API_URL = "https://668e540abf9912d4c92dcd67.mockapi.io";

export const login = async (username, password) => {
  try {
    const response = await axios.get(`${API_URL}/login`);
    const users = response.data;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      return user;
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    throw error;
  }
};
