const axios = require("axios");
const reports = require("./reports.json");

const API = "https://y2l13tgqj0.execute-api.eu-west-2.amazonaws.com/api";

const submit = async (report) => {
  const { data } = await axios.post(API, { body: { report } });
  console.log(data);
};

reports.forEach(submit);
