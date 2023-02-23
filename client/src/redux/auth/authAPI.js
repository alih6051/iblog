import axios from "axios";

// Login user
const login = async (userData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/login`,
    userData
  );

  if (response.status == 200) {
    sessionStorage.setItem("jwt_iblog_user", JSON.stringify(response.data));
  }

  return response.data;
};

// REGISTER USER
const register = async (userData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/register`,
    userData
  );

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
