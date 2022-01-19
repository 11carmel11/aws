const express = require("express");
const cors = require("cors");
const {
  dynamodb: DB,
  port,
  TableName,
  wordFormatter,
  posEnum,
  letters,
  randomItem,
} = require("./config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/pos/:pos", async (req, res) => {
  const {
    params: { pos },
    query: { letter },
  } = req;

  const randomLetter = letter || randomItem(letters);

  const params = {
    FilterExpression: "begins_with(word, :letterFormat) AND pos = :posFormat",
    ExpressionAttributeValues: {
      ":letterFormat": { S: randomLetter.toUpperCase() },
      ":posFormat": { S: posEnum[pos] },
    },
    TableName,
  };

  const { Items } = await DB.scan(params).promise();
  const randomizedItem = randomItem(Items.map(wordFormatter));
  const status = randomizedItem ? 200 : 404;
  res.status(status).json(randomizedItem || "NOT FOUND");
});

app.get("/:word", async (req, res) => {
  const { word } = req.params;
  const params = {
    FilterExpression: "word = :filter",
    ExpressionAttributeValues: {
      ":filter": { S: word },
    },
    TableName,
  };
  const { Items } = await DB.scan(params).promise();
  res.json(Items.map(wordFormatter));
});

app.get("/:word/:pos", async (req, res) => {
  const { word, pos } = req.params;
  if (pos in posEnum) {
    const params = {
      FilterExpression: "word = :wordFormat AND pos = :posFormat",
      ExpressionAttributeValues: {
        ":posFormat": { S: posEnum[pos] },
        ":wordFormat": { S: word },
      },
      TableName,
    };
    const { Items } = await DB.scan(params).promise();
    res.json(Items.map(wordFormatter));
  } else res.sendStatus(400);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
