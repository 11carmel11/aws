const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: "eu-west-2",
});
const port = process.env.PORT || 8080;

const TableName = "dictionary";

const dict = require("../db/dictionary.json");
const dynamodb = new AWS.DynamoDB();
const client = new AWS.DynamoDB.DocumentClient();

const wordFormatter = (wordObj) => {
  const format = { definitions: [] };
  format.wordId = wordObj.wordId.S;
  format.word = wordObj.word.S;
  format.pos = wordObj.pos.S;
  for (const def of wordObj.definitions.L) {
    format.definitions.push(def.S);
  }
  if ("synonyms" in wordObj) {
    format.synonyms = wordObj.synonyms.S;
  }
  return format;
};

module.exports = { port, dict, TableName, dynamodb, client, wordFormatter };
