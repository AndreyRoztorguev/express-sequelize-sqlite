const sequelize = require("./src/config/database");
const app = require("./src/app");
const UserService = require("./src/user/UserService");

sequelize.sync({ force: true }).then(async () => {
  console.log("db in ready");
  for (let i = 1; i <= 5; i++) {
    const user = {
      username: `user${i}`,
      email: `user${i}@gmail.com`,
      password: `password`,
    };

    await UserService.create(user);
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
