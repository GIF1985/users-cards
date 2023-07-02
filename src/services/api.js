import axios from "axios";

const API_BASE_URL = "https://649bd86a04807571923701c6.mockapi.io";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getTweets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tweets`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
};
