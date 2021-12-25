const sequelize = require("./src/config/database");
const app = require("./src/app");
const UserService = require("./src/user/UserService");

if (process.env.NODE_ENV === "production") {
  sequelize.sync();
} else {
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
}

app.listen(process.env.NODE_ENV || 3000, () => {
  console.log(
    `app is running on port ${process.env.NODE_ENV}, mode: ${process.env.NODE_ENV}`
  );
});
