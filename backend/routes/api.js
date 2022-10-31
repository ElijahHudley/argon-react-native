var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var articleRouter = require("./article");

var app = express();

app.use("/auth/", authRouter);
app.use("/book/", bookRouter);
app.use("/article/", articleRouter);

module.exports = app;