import { AuthRequests, PublicRequests } from "./api";

const advertisementsApi = async () => {
  return new Promise((resolve, reject) => {
    PublicRequests.get("/advertisements")
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { advertisementsApi };
