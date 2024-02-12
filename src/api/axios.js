import axios from "axios";

const instance = axios.create({
  baseURL: "httl://api.themoviedb.org/3",
  params: {
    api_key: "2412f09060a5de513fbae60c0b83fb60",
    language: "en-US",
  },
});

export default instance;
