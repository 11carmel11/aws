const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const client = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const {
    bucket: { name },
    object: { key },
  } = event.Records[0].s3;

  const S3Params = { Bucket: name, Key: key };

  const TableName = "ids-table";
  const Item = JSON.parse(
    (await s3.getObject(S3Params).promise()).Body.toString()
  );

  const DynamoDBParams = { TableName, Item };

  await client.put(DynamoDBParams).promise();

  console.log(`inserted ${Item} to ${TableName} table!`);
};
