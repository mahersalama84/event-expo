import { AuthRequests, PublicRequests } from "./api";

const addWishApi = async (data) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post("/customers/wishes", data, {
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

const updateWishApi = async (
  id: string | undefined,
  occasion_id: string | undefined,
  title: string | undefined,
  description: string | undefined
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.put(`/customers/wishes/${id}`, {
      occasion_id,
      title,
      description,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteWishApi = async (id: string | undefined) => {
  return new Promise((resolve, reject) => {
    AuthRequests.delete(`/customers/wishes/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const bookWishApi = async (
  id: string | undefined,
  show: boolean,
  note: string
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(`/customers/wishes/book`, {
      wish_id: id,
      show: show,
      note: note,
    })
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
    AuthRequests.post("/customers/wishes/uploadimage", data, {
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
export {
  addWishApi,
  updateWishApi,
  deleteWishApi,
  bookWishApi,
  uploadImageApi,
};
