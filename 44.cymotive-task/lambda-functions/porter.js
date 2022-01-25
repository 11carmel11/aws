const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const { report } = event.body;

  const Bucket = "reports-carmel";
  const { vehicleId } = report;

  const params = {
    Bucket,
    Key: `${vehicleId}.json`,
    Body: JSON.stringify(report),
  };

  const data = await s3.putObject(params).promise();
  return data;
};

/*
{
    body:{report:<REPORT>}
}
*/
