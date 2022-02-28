//#region steps
/**
 * 1.Adjust the body of Reader to identify the amount of inserted users. Read below
 * 2.Create `users-total-bucket-carmel` bucket.
 * 3.Create new objects with Writer to test.
 */
//#endregion

//#region lambda function - body

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const totalParams = {
    Bucket: "users-bucket-total-carmel",
    Key: "counter.json",
  };
  const data = await s3.getObject(totalParams).promise();

  let { counter } = JSON.parse(data.Body);

  const { key } = event.Records[0].s3.object;

  if (key.startsWith("singleUser")) {
    counter++;
  } else {
    const params = {
      Bucket: "users-bucket-carmel",
      Key: key,
    };

    const { Body } = await s3.getObject(params).promise();

    counter += JSON.parse(Body).length;
  }

  totalParams.Body = JSON.stringify({ counter });

  await s3.putObject(totalParams).promise();

  console.log("updated");
};

//#endregion

//#region lambda function - test
/* test the Writer */
//#endregion
