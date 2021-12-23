const express = require("express");
const UserRouter = require("./user/UserRouter");
const ArticleRouter = require("./article/ArticleRouter");
const ErrorHandler = require("./error/ErrorHandler");

const thisWillRunEveryRequest = (req, res, next) => {
  console.log("running the middleware for", req.method, req.originalUrl);
  next();
};

const app = express();

app.use(express.json());
app.use(thisWillRunEveryRequest);
app.use(UserRouter);
app.use(ArticleRouter);
app.use(ErrorHandler);

module.exports = app;
