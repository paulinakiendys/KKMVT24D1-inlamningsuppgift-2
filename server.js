const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 8080;
const dataPath = "./data.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/", (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(dataPath, jsonData, (err) => {
    if (err) {
      console.log(err);
    }

    res.sendFile("index.html", { root: __dirname });
  });
});

app.get("/profile", (req, res) => {
  res.sendFile("profile.html", { root: __dirname });
});

app.post("/profile", (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(dataPath, jsonData, (err) => {
    if (err) {
      console.log(err);
    }

    res.sendFile("profile.html", { root: __dirname });
  });
});

app.get("/data", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(JSON.stringify(data, null, 2));
  });
});
