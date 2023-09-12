const express = require("express");
const { quoraPost } = require("quoraPost.js");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/publishpost", (req, res) => {
  quoraPost(req,res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});