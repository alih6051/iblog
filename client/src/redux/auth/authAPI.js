import axios from "axios";

const API_URL = "https://dull-jade-indri-hose.cyclic.app";
// const API_URL = "http://localhost:4500";

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);

  if (response.status == 200) {
    sessionStorage.setItem("jwt_iblog_user", JSON.stringify(response.data));
  }

  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);

  return response.data;
};

// Logout user
const logout = () => {
  sessionStorage.removeItem("jwt_iblog_user");
};

const authAPI = {
  login,
  register,
  logout,
};

export default authAPI;
