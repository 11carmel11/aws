//#region steps
/**
 * 1.Create a role for reading from s3 bucket.
 * 3.Create a `Writer lambda function.
 * 4.Create the function body. Read below.
 * 5.Create a test configuration. Read below.
 * 6.Test the lambda function.
 */
//#endregion

//#region lambda function - body
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const { name, key } = event.s3.bucket;
  const params = { Bucket: name, Key: key };

  try {
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body);
  } catch (error) {
    console.log("Error:\n", error);
  }
};

//#endregion

//#region lambda function - test
/*
{
  "s3": {
    "bucket": {
      "name": "users-carmel",
      "key": "user1.json"
    }
  }
}
*/
//#endregion
