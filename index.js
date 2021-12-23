const sequelize = require("./src/config/database");
const app = require("./src/app");
const User = require("./src/user/User");
const Article = require("./src/article/Article");

sequelize.sync({ force: true }).then(async () => {
  console.log("db in ready");
  for (let i = 1; i <= 15; i++) {
    const user = {
      username: `user${i}`,
      email: `user${i}@gmail.com`,
      password: "password",
    };
    await User.create(user);

    const article = {
      content: `article content ${i}`,
    };
    await Article.create(article);
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
