require("dotenv").config();

const express = require("express"),
  app = express(),
  PORT = process.env.PORT;
app.use(require("cors")());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    " Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.listen(PORT, () => console.log("connection succeeded!"));
app.use("/", require("./Routes/mainRouter"));
require("./DL/db").myConnect();
