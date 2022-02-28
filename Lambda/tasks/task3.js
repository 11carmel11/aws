//#region steps
/**
 * 1.Adjust the body of Writer to write to a single file. Read below
 * 2.Empty `users-bucket-carmel` bucket.
 * 3.Create a test configuration. Read below.
 * 4.Test the adjusted lambda function.
 */
//#endregion

//#region lambda function - body

// Writer
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = (event, context) => {
  const { users } = event;

  const bucket = "users-bucket-carmel";
  const eventId = context.awsRequestId;

  const params = {
    Bucket: bucket,
    Key: `${eventId}.json`,
    Body: JSON.stringify(users),
  };

  s3.putObject(params, (err, data) => {
    if (err) console.log("error:", err);
    else console.log("success", data);
  });
};

// Reader is unchanged

//#endregion

//#region lambda function - test
/* writer
  {
    users: <`users.json` content>
  }
  ||
  {
  "user": <single user from `users.json`>
  }
*/
/* reader is unchanged */
//#endregion
