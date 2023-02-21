import axios from "axios";

const token =
  JSON.parse(sessionStorage.getItem("jwt_iblog_user"))?.token || null;

const API_URL = "https://dull-jade-indri-hose.cyclic.app";
// const API_URL = "http://localhost:4500";

// PUBLISH POST
const publish = async (post) => {
  const response = await axios.post(`${API_URL}/posts/create`, post, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

// GET POST
const getPost = async () => {
  const response = await axios.get(`${API_URL}/posts`);

  return response.data;
};

const postAPI = {
  publish,
  getPost,
};

export default postAPI;
