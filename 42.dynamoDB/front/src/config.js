import axios from "axios";

const API = "http://localhost:8080/";

export const initDefs = [{ pos: "loading....", definitions: ["loading..."] }];
export const get = async (rest) => {
  return await axios.get(API + rest);
};
