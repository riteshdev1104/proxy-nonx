const express = require("express");
const Unblocker = require("unblocker");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(Unblocker({ prefix: "/proxy/" }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
