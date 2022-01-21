import axios from "axios";
import { Notyf } from "notyf";

const API = "https://g5w9fp7e6i.execute-api.eu-west-2.amazonaws.com/dev/";

export const initDefs = [
  { word: "loading...", pos: "loading....", definitions: ["loading..."] },
];

const notyf = new Notyf({ dismissible: true });

export const searchErrorHandler = (text, timeout) => {
  setTimeout(() => {
    window.location.href = "/";
  }, timeout);
  notyf.error(text);
};

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
