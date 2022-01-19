const express = require("express");
const cors = require("cors");
const { client, dynamodb: DB, port } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/:word", async (req, res) => {
  const { word } = req.params;
  const params = {
    FilterExpression: "word = :song",
    ExpressionAttributeValues: {
      ":song": { S: word },
    },
    TableName,
  };
  const { Items } = await DB.scan(params).promise();
  res.json(Items);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
