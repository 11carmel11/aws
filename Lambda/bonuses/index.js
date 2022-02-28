// bonus 2

const { nanoid } = require("nanoid");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = (event, context) => {
  const { users, user } = event;

  const bucket = "users-bucket-carmel";
  const eventId = context.awsRequestId;
  const params = {
    Bucket: bucket,
  };

  if (!!user) {
    user.userId = nanoid(10);
    params.Key = `singleUser${user.userId}.json`;
    params.Body = JSON.stringify(user);
  } else if (!!users) {
    params.Key = `${eventId}.json`;
    params.Body = JSON.stringify(
      users.map((user) => {
        user.userId = nanoid(10);
        return user;
      })
    );
  } else throw new Error("content must be a user or an array of users");

  s3.putObject(params, (err, data) => {
    if (err) console.log("error:", err);
    else console.log("success", data);
  });
};
