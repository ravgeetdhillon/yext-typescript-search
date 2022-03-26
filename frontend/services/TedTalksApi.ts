import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import type { TedTalk, TedTalkAPI } from "../types/TedTalk";

const axios: Axios = new Axios({
  baseURL: "http://localhost:8888",
} as AxiosRequestConfig);

const TedTalksAPIService: TedTalkAPI = {
  search: async ({ query }) => {
    const response: AxiosResponse<any, any> = await axios.get("/talks/search", {
      params: {
        query: query,
      },
    });
    const data: TedTalk[] = JSON.parse(response.data);
    return data;
  },

  autocomplete: async ({ query }) => {
    const response: AxiosResponse<any, any> = await axios.get(
      "/talks/autocomplete",
      {
        params: {
          query: query,
        },
      }
    );
    const data: string[] = JSON.parse(response.data);
    return data;
  },
};

export { TedTalksAPIService };
