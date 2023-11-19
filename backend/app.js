const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ExpressError = require("./ExpressError.js");
const AsyncWrap = require("./AsyncWrap.js");
const { validateUserSchema } = require("./Schema.js");
const app = express();
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: [8, "Password Length must be atleast 8 Letters"],
  },
});
const UserData = mongoose.model("UserData", userSchema);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/user");
}
app.use(express.json());
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.listen(8080, () => {
  console.log("app is listening to port 8080");
});
app.post(
  "/api/login",
  AsyncWrap(async (req, res) => {
    console.log(req.body);
    let result = validateUserSchema.validate(req.body);
    if (result.error) {
      throw new ExpressError(400, result.error.details[0].message);
    }
    let user = await UserData.findOne({ username: req.body.username });
    if (user) {
      if (user.password == req.body.password) {
        res.send({ message: "success" });
        console.log(user);
        return;
      } else {
        throw new ExpressError(400, "password is incorrect");
      }
    } else {
      throw new ExpressError(400, "user not found");
    }
    // let user = UserData(req.body);
    // await user.save();
  })
);
app.get("/hello", (req, res) => {
  res.send("hello world");
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});
