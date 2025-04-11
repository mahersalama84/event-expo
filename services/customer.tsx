import { ExpoPushToken } from "expo-notifications";
import { AuthRequests } from "./api";

const deleteImageApi = async () => {
  return new Promise((resolve, reject) => {
    AuthRequests.get("/customers/deleteimage")
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const uploadImageApi = async (data) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post("/customers/uploadimage", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const profileApi = async () => {
  return new Promise((resolve, reject) => {
    AuthRequests.get("/customers/profile")
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateProfileApi = async (
  email: string | undefined,
  first_name: string | undefined,
  last_name: string | undefined
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post("/customers/updateprofile", {
      email,
      first_name,
      last_name,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const paginateCustomersApi = async (per_page: number, page: number) => {
  return new Promise((resolve, reject) => {
    AuthRequests.get(`/customers/paginate?page=${page}&per_page=${per_page}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const myOccasionsApi = async (per_page: number, page: number) => {
  return new Promise((resolve, reject) => {
    AuthRequests.get(`/customers/myoccasions?page=${page}&per_page=${per_page}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const searchCustomersApi = async (
  per_page: number,
  page: number,
  search: string
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(`/customers/search?page=${page}&per_page=${per_page}`, {
      search,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const otherOccasionsApi = async (
  following_id: string | string[] | undefined,
  per_page: number,
  page: number
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(
      `/customers/otheroccasions?page=${page}&per_page=${per_page}`,
      { following_id }
    )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const followingsOccasionsApi = async (
  per_page: number,
  page: number,
  search: any = null
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(
      `/customers/followingsoccasions?page=${page}&per_page=${per_page}`,
      { search }
    )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const registerExpoPushTokenApi = async (token: string | undefined) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post("/customers/registerexpopushtoken", {
      token,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export {
  deleteImageApi,
  uploadImageApi,
  profileApi,
  updateProfileApi,
  paginateCustomersApi,
  myOccasionsApi,
  searchCustomersApi,
  otherOccasionsApi,
  followingsOccasionsApi,
  registerExpoPushTokenApi,
};
