import axios, { AxiosResponse } from "axios";

export const https = axios.create({
  // Another way to do this is using environment variables
  // to set the url, because in real projects there may be
  // different ones like dev, test, prod, QA
  baseURL: "https://hn.algolia.com/api/v1",
});

const responseData = ({ data }: AxiosResponse) => {
  // Sometimes it's useful to intercept the response to only get its data
  // like this:
  return data;
};

const catchError = async (error: any) => {
  // Here it's common to use a refresh token,
  // because services may fail if token is expired
  return Promise.reject(error);
};

https.interceptors.response.use(responseData, catchError);
