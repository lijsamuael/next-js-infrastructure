import axios from "axios";

export const fetchData = (url: string) => {
  return axios
    .create({
      baseURL: url,
    })
    .get("/");
};
