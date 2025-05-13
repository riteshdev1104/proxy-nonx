const express = require("express");
const Unblocker = require("unblocker");
const path = require("path");

const app = express();
const unblocker = Unblocker({
  prefix: "/proxy/",
  responseMiddleware: [
    // optional: remove CSP to allow iframe, JS, etc.
    (data, req, res, next) => {
      delete res.headers["content-security-policy"];
      next();
    },
  ]
});

app.use(express.static("public"));
app.use(unblocker);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("Proxy running at port " + port);
});
