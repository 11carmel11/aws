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

module.exports = { port, dict, TableName, dynamodb, client };
