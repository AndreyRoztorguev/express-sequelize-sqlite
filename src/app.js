const express = require("express");
const UserRouter = require("./user/UserRouter");
const ArticleRouter = require("./article/ArticleRouter");
const ErrorHandler = require("./error/ErrorHandler");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const path = require("path");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: path.join(
        __dirname,
        "../",
        "locales",
        "{{lng}}",
        "translation.json"
      ),
    },
  });
//EXAMPLE CLIENT POST CREATE USER ==> headers {Accept-Language: 'ru | 'en' | anyLng in locales folder}
const thisWillRunEveryRequest = (req, res, next) => {
  console.log("running the middleware for", req.method, req.originalUrl);
  next();
};

const app = express();
app.use(middleware.handle(i18next));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "..", "public"))); // http://localhost:3000/public/images/town.jpeg
app.use(thisWillRunEveryRequest);
app.use(UserRouter);
app.use(ArticleRouter);
app.use(ErrorHandler);

module.exports = app;
