import axios from "axios";

const fetcher = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

fetcher.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error response is ", error);
    const prevRequest = error?.config;
    if (error?.response?.status === 400 && !prevRequest?.sent) {
      prevRequest.sent = true;
      return fetcher(prevRequest);
    }
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      localStorage.removeItem("expense_user");
      // window.location.replace("/login");
      window.location.href = "/login";
      return fetcher(prevRequest);
    }

    if (error?.response?.status === 403) {
      localStorage.removeItem("expense_user");
      // window.location.replace("/login");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default fetcher;
