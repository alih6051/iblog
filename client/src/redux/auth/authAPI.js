import axios from "axios";

// Login user
const login = async (userData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/login`,
    userData
  );

  if (response.status == 200) {
    sessionStorage.setItem("jwt_iblog_user", JSON.stringify(response.data));
    sessionStorage.setItem(
      "saved_posts",
      JSON.stringify(response.data.saved_posts)
    );
  }

  return response.data;
};

// ADD TO SAVED
const addToSaved = async ({ id, token }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/users/saved/add`,
    { post_id: id },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (response.status == 200) {
    sessionStorage.setItem("saved_posts", JSON.stringify(response.data));
  }

  return response.data;
};

// REMOVE FROM SAVED
const removeToSaved = async ({ id, token }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/users/saved/remove`,
    { post_id: id },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (response.status == 200) {
    sessionStorage.setItem("saved_posts", JSON.stringify(response.data));
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
  sessionStorage.clear();
};

const authAPI = {
  login,
  register,
  logout,
  addToSaved,
  removeToSaved,
};

export default authAPI;
