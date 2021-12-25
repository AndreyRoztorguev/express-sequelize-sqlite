const router = require("express").Router();
const Article = require("./Article");
const pagination = require("../shared/pagination");
const basicAuthentication = require("../shared/basicAuthentication");
const User = require("../user/User");

router.get("/articles", pagination, async (req, res) => {
  const { page, size } = req.pagination;
  const articlesWithCount = await Article.findAndCountAll({
    limit: size,
    offset: page * size,
    attributes: ["id", "content"],
    include: [
      {
        model: User,
        as: "user", // field name in a response object should be equal with Article.belongsTo(User, { as: "user" });
        attributes: ["id", "username", "email"],
      },
    ],
  });
  res.send({
    content: articlesWithCount.rows,
    totalPages: Math.ceil(articlesWithCount.count / size),
  });
});

router.post("/articles", basicAuthentication, async (req, res) => {
  const authenticatedUser = req.authenticatedUser;
  if (!authenticatedUser) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const article = {
    content: req.body.content,
    userId: authenticatedUser.id,
  };

  await Article.create(article);

  res.send({ message: "Created" });
});

module.exports = router;
