const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const dict = require("./db/dictionary.json");

AWS.config.update({
  region: "eu-west-2",
});

const TableName = "dictionary";

const params = {
  AttributeDefinitions: [
    {
      AttributeName: "wordId", //ATTRIBUTE_NAME_2
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    { AttributeName: "wordId", KeyType: "HASH" }, //Partition key
  ],
  TableName, //TABLE_NAME
  ProvisionedThroughput: {
    ReadCapacityUnits: 10000,
    WriteCapacityUnits: 10000,
  },
};

const dynamodb = new AWS.DynamoDB();
const create = async () => {
  try {
    console.group(`INSERTING TABLE '${TableName}'`);
    console.log("inserting table...");

    await dynamodb.createTable(params).promise();
    console.log("table inserted!");
    console.groupEnd();
  } catch (error) {
    console.error(error);
    console.groupEnd();
  }
};

const client = new AWS.DynamoDB.DocumentClient();
const insert = async () => {
  try {
    dict.forEach(async (Item, i) => {
      if (i >= 60000) {
        Item.wordId = nanoid(40);
        const putElementParams = {
          TableName,
          Item,
        };
        await client.put(putElementParams).promise();
      }
    });
    console.log("all items inserted!");
  } catch (error) {
    console.log(error);
  }
};

insert();

// module.exports = client;
