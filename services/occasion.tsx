import DateFunctions from "@/utilities/DateFunctions";
import { AuthRequests, PublicRequests } from "./api";

const paginateOccasionsApi = async (per_page: number, page: number) => {
  return new Promise((resolve, reject) => {
    AuthRequests.get(`/occasions/paginate?page=${page}&per_page=${per_page}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addOccasionApi = async (
  title: string | undefined,
  description: string | undefined,
  startDate: string | undefined,
  startTime: string | undefined
) => {
  return new Promise((resolve, reject) => {
    let start_date = startDate;
    let start_time = startTime;
    AuthRequests.post("/customers/occasions", {
      title,
      description,
      start_date,
      start_time,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateOccasionApi = async (
  id: string | undefined,
  title: string | undefined,
  description: string | undefined,
  startDate: string | undefined,
  startTime: string | undefined
) => {
  return new Promise((resolve, reject) => {
    let start_date = startDate;
    let start_time = startTime;
    let time_zone = DateFunctions.customerTimeZone();
    AuthRequests.put(`/customers/occasions/${id}`, {
      title,
      description,
      start_date,
      start_time,
      time_zone,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteOccasionApi = async (id: string | undefined) => {
  return new Promise((resolve, reject) => {
    let time_zone = DateFunctions.customerTimeZone();
    AuthRequests.delete(`/customers/occasions/${id}`, { data: { time_zone } })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getWishesApi = async (
  occasion_id: string,
  per_page: number,
  page: number
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(
      `/customers/occasions/getwishes?page=${page}&per_page=${per_page}`,
      {
        occasion_id,
      }
    )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const attendApi = async (id: string | undefined) => {
  return new Promise((resolve, reject) => {
    let time_zone = DateFunctions.customerTimeZone();
    AuthRequests.post(`/customers/occasions/attend`, {
      occasion_id: id,
      time_zone,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const paginateAttendenceApi = async (
  id: string | undefined,
  per_page: number,
  page: number
) => {
  return new Promise((resolve, reject) => {
    AuthRequests.post(
      `/customers/occasions/paginateattendence?page=${page}&per_page=${per_page}`,
      {
        occasion_id: id,
      }
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
  paginateOccasionsApi,
  addOccasionApi,
  updateOccasionApi,
  deleteOccasionApi,
  getWishesApi,
  attendApi,
  paginateAttendenceApi,
};
