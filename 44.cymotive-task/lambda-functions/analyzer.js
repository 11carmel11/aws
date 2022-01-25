const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event) => {
  const { stat } = event.pathParameters;

  const params = { TableName: "ids-table" };

  const response = {
    statusCode: 403,
    body: "",
  };

  //#region helpers
  const removeDuplicate = (arr) =>
    arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  const isBetween = (max, min, sum) => sum >= min && sum <= max;
  //#endregion

  const fullData = await dynamoDB.scan(params).promise();

  switch (stat) {
    case "numberOfReports":
      params.Select = "COUNT";
      response.body = fullData.Count;
      response.statusCode = 200;
      break;

    case "numberOfVehicles":
      params.Select = "ALL_ATTRIBUTES";

      const allFullItems = fullData.Items;
      const vehicleIdArr = allFullItems.map((item) => {
        const formattedItem = AWS.DynamoDB.Converter.unmarshall(item);
        return formattedItem.vehicleId;
      });

      response.body = removeDuplicate(vehicleIdArr).length;
      response.statusCode = 200;
      break;

    case "numberOfAnomalies":
      params.ProjectionExpression = "signalsPerMinute";

      const signalsOfAllItems = fullData.Items;

      const formattedItems = signalsOfAllItems.map(
        (item) => AWS.DynamoDB.Converter.unmarshall(item).signalsPerMinute
      );

      const anomaliesArr = formattedItems.map((item) => {
        let anomaliesCounter = 0;

        for (const key in item) {
          const { acceptableMaxValue, acceptableMinValue, sum } = item[key];

          const isValid = isBetween(
            acceptableMaxValue,
            acceptableMinValue,
            sum
          );
          if (!isValid) anomaliesCounter++;
        }
        return anomaliesCounter;
      });

      response.body = sum(anomaliesArr);
      response.statusCode = 200;
      break;

    default:
      break;
  }

  return response;
};
