import { RequestInterceptors as Interseptor } from "./RequestInterceptors";
import { constants } from "../constants/api-endpoints";

const axios = require("axios");
const instanceUrl = (requestType = "json") =>
  axios.create({
    baseURL: `${constants.host}/${constants.api_version}`,
    headers: {
      "Content-Type":
        requestType === "multipart"
          ? "multipart/form-data"
          : "application/json",
    },
    /**
     * Let transform your request headers
     */
    transformRequest: [
      function (data, headers) {
        if (typeof window !== "undefined" && localStorage["authToken"]) {
          headers["Authorization"] = "Bearer " + localStorage["authToken"];
        }
        return JSON.stringify(data);
      },
    ],
  });

/**
 * httpservice for JSON data
 * @returns {*}
 */
export const httpservice = () => {
  let axiosInstance = instanceUrl("json");
  axiosInstance.interceptors.request.use((request) =>
    Interseptor.onRequest(request)
  );
  axiosInstance.interceptors.response.use(
    (response) => Interseptor.onSuccess(response),
    (error) => Interseptor.onError(error)
  );
  return axiosInstance;
};

/**
 * httpservice for Multi-Part data
 * @returns
 */
export const httpserviceMultipart = () => {
  let axiosInstance = instanceUrl("multipart");
  axiosInstance.interceptors.request.use((request) =>
    Interseptor.requestHandler(request)
  );
  axiosInstance.interceptors.response.use(
    (response) => Interseptor.successHandler(response),
    (error) => Interseptor.errorHandler(error)
  );
  return axiosInstance;
};
