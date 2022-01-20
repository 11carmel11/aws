import axios from "axios";

const API = "http://localhost:8080/";

export const initDefs = [
  { word: "loading...", pos: "loading....", definitions: ["loading..."] },
];

export const get = async (rest) => {
  return await axios.get(API + rest);
};

export const isChars = (str) => /^[A-Z]+$/i.test(str);

export const poses = [
  "n",
  "prep",
  "a",
  "v",
  "adv",
  "p",
  "interj",
  "conj",
  "pron",
];
