const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(6000, () => {
  console.log("server started on port 6000");
});
