const router = require("express").Router();
const Article = require("./Article");
const pagination = require("../shared/pagination");

router.get("/articles", pagination, async (req, res) => {
  const { page, size } = req.pagination;
  const articlesWithCount = await Article.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.send({
    content: articlesWithCount.rows,
    totalPages: Math.ceil(articlesWithCount.count / size),
  });
});

module.exports = router;
