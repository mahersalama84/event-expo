import { PublicRequests, AuthRequests } from "./api";
const headers = {
  "Content-Type": "application/json",
};

const otpGuestApi = async (
  prefix: string | undefined,
  first_name: string | undefined,
  last_name: string | undefined,
  mobile: string | undefined,
  email: string | undefined
) => {
  return new Promise((resolve, reject) => {
    PublicRequests.post("/customers/otpguest", {
      prefix: prefix,
      first_name: first_name,
      last_name: last_name,
      mobile: mobile,
      email: email,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        // console.log(err?.response?.data?.message);

        reject(err);
      });
  });
};
const otpLoginApi = async (
  prefix: string | undefined,
  mobile: string | undefined
) => {
  return new Promise((resolve, reject) => {
    PublicRequests.post("/customers/otplogin", {
      prefix: prefix,
      mobile: mobile,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const loginApi = async (
  prefix: string | undefined,
  mobile: string | string[] | undefined,
  password: number
) => {
  return new Promise((resolve, reject) => {
    PublicRequests.post("/customers/login", {
      prefix: prefix,
      mobile: mobile,
      password: password,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const logoutApi = async () => {
  return new Promise((resolve, reject) => {
    AuthRequests.get("/customers/logout")
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { otpGuestApi, otpLoginApi, loginApi, logoutApi };
// export function signIn(): Promise<LoginResponse> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         token: "5|bDy3huvt8RDen4Xe2YZkDsHSsJmE10cwxSE4HulJc0d5d7f4",
//         user: {
//           id: "9c12aad3-b9c7-4a85-acff-cca59adc9a04",
//           first_name: "Ahmad",
//           last_name: "Ahmad",
//           mobile: "543333333",
//         },
//       });
//     }, 2000);
//   });
// }
