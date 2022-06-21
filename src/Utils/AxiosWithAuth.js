import axios from "axios";

const axiosWithAuth = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

axiosWithAuth.interceptors.request.use(
  async (request) => {
    const localStorageToken = localStorage.getItem("token");

    let modifiedRequest = request;
    modifiedRequest.headers = {
      ...modifiedRequest.headers,
      Authorization: `Bearer ${localStorageToken}`,
    };
    return modifiedRequest;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
