import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

// const create = async newObject => {
//   const config = {
//     headers:{ Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

// const deleteUser = async (blogId) => {
//   const config = {
//     headers:{ Authorization: token },
//   }
//   const response = await axios.delete(`${baseUrl}/${blogId}`, config)
//   return response.data
// }

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getOne };
