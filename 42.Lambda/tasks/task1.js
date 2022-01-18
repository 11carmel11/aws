//#region steps
/**
 * 1.Create a role for writing to s3 bucket.
 * 2.Create a `users-carmel` bucket.
 * 3.Create a `Writer lambda function.
 * 4.Create the function body. Read below.
 * 5.Create a test configuration. Read below.
 * 6.Test the lambda function.
 */
//#endregion

//#region lambda function - body
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = (event) => {
  const { users } = event;
  const bucket = "users-carmel";
  for (const user of users) {
    const params = {
      Bucket: bucket,
      Key: `user${user.userId}.json`,
      Body: JSON.stringify(user),
    };

    s3.putObject(params, (err, data) => {
      if (err) console.log("error:", err);
      else console.log("success", data);
    });
  }
};

//#endregion

//#region lambda function - test
/*
  {
    users: <`users.json` content> ,
  }
*/
//#endregion
