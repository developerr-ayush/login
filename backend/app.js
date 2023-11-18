const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.listen(8080, () => {
  console.log("app is listening to port 8080");
});
app.post("/api/login", (req, res) => {
  console.log(req.body);
  res.send({ message: "success" });
});
app.get("/hello", (req, res) => {
  res.send("hello world");
});
