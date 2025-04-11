import AppConstants from "@/constants/AppConstants";
import { getStorageItemAsync } from "@/hooks/useStorageState";
import axios from "axios";
import { I18nManager } from "react-native";
const API_URL = "https://eveky.com/api/" + AppConstants.API_VERSION_1;
// const API_URL = "http://192.168.1.33:8000/api/" + AppConstants.API_VERSION_1;

const config = {
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "X-localization": I18nManager.isRTL ? "ar" : "en",
  },
};

export const PublicRequests = axios.create(config);
export const AuthRequests = axios.create(config);

AuthRequests.interceptors.request.use(async (config) => {
  let session = await getStorageItemAsync("session");
  if (session) config.headers.Authorization = `Bearer ${session}`;
  return config;
});
// PublicRequests.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("error", error);
//     return error;
//   }
// );

// AuthRequests.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("error", error);
//     if (error.response?.status === 401) {
//       const { data, status } = await axios.post(
//         "refresh",
//         {},
//         { withCredentials: true }
//       );
//       console.log(data);

//       if (status === 200) {
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.accessToken}`;
//       }
//       return axios(error.config);
//     }

//     return error;
//   }
// );
