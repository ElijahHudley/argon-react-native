var express = require("express");
var authRouter = require("./auth");
var articleRouter = require("./article");

var app = express();

app.use("/auth/", authRouter);
app.use("/article/", articleRouter);

module.exports = app;