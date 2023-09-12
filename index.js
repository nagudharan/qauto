const express = require("express");
const { quoraPost } = require("./quoraPost");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/publishpost", (req, res) => {
  quoraPost(req,res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});