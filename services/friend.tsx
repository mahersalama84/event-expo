import { AuthRequests } from "./api";

const followApi = async (id: string | undefined) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(`/customers/follow`, {
      customer_id: id,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const processFollowerApi = async (follower_id: string | undefined) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(`/customers/processfollower`, {
      follower_id,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const paginateFollowersApi = async (
  customer_id: string | string[] | undefined,
  per_page: number,
  page: number,
  search: any = null
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(
      `/customers/followers?page=${page}&per_page=${per_page}`,
      { customer_id, search }
    )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const paginateFollowingsApi = async (
  customer_id: string | string[] | undefined,
  per_page: number,
  page: number,
  search: any = null
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(
      `/customers/followings?page=${page}&per_page=${per_page}`,
      { customer_id, search }
    )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export {
  followApi,
  processFollowerApi,
  paginateFollowersApi,
  paginateFollowingsApi,
};
