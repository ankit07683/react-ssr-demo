export const RequestInterceptors = {
  onRequest: (reuest) => {
    return reuest;
  },
  onSuccess: (response) => {
    return response;
  },
  onError: (error) => {
    /**
     * You can call your error reporing serv
     */
    return error;
  },
};
