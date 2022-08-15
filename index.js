require("dotenv").config();

const express = require("express"),
  app = express(),
  PORT = process.env.PORT;
app.use(require("cors")());

app.use(express.json());
app.listen(PORT, () => console.log("connection succeeded!"));
app.use("/", require("./Routes/mainRouter"));
require("./DL/db").myConnect();
