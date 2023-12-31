const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get("/image", async (req, res) => {
  const query = req.query;
  const imglink = Object.keys(query)[0];
  console.log("imglink: ", imglink);
  try {
    const response = await axios.get(imglink, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
