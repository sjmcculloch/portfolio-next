import axios from "axios";
import Cookies from "js-cookie";

import { getCookieFromReq } from "../helpers/utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 3000
});

const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");

  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` }
    };
  }

  return undefined;
};

export const getSecretData = async req => {
  const url = "/secret";
  return await axiosInstance
    .get(url, setAuthHeader(req))
    .then(response => response.data);
};

export const getPortfolios = async req => {
  return await axiosInstance.get("/portfolios").then(response => response.data);
};

export const createPortfolio = async portfolioData => {
  return await axiosInstance
    .post("/portfolios", portfolioData, setAuthHeader())
    .then(response => response.data);
};
