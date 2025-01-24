import axios from "axios";
import store from "../store";
import { authActions } from "../store/reducers/authReducer";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const newConfig = config;
  const authState = store.getState().auth;

  if (authState.accessToken) {
    newConfig.headers.Authorization = `Bearer ${authState.accessToken}`;
  }

  if (authState.refreshToken) {
    newConfig.headers["x-refresh-token"] = authState.refreshToken;
  }

  return newConfig;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const tokenId = response.headers.Authorization;
    const refreshTokenId = response.headers["x-refresh-token"];

    if (tokenId) {
      store.dispatch(authActions.updateAccessToken(tokenId));
    }

    if (refreshTokenId) {
      store.dispatch(authActions.updateRefreshToken(refreshTokenId));
    }

    return response;
  },
  (error) => {
    const { status, statusText } = error.response;

    if (status === 401 && statusText === "Unauthorized") {
      store.dispatch(authActions.signout());
    }

    return Promise.reject(error);
  }
);

const useApi = () => axiosInstance;

export default useApi;
