import axios from "axios";

// PUBLISH POST
const publish = async ({ post, token }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/posts/create`,
    post,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

// GET POST
const getPost = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);

  return response.data;
};

const postAPI = {
  publish,
  getPost,
};

export default postAPI;
