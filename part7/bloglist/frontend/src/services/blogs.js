import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const post = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

const put = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

const remove = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

const addComment = async (blogId, comment) => {
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comment },
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response.data;
};

export default { getAll, post, put, remove, setToken, addComment };
